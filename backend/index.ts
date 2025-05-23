import cors from 'cors';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { Pool } from 'pg';
import OpenAI from "openai";

// Carregar variáveis de ambiente
dotenv.config();

// Inicializar Express
const app = express();
const port = 8080;
app.use(cors());
app.use(express.json());


const pool = new Pool({
  connectionString: "postgres://w1db_user:pCbtjZgYAenhIxraX9s2rx6rARmNtqCI@dpg-d0o9nlqli9vc73fr73n0-a.oregon-postgres.render.com:5432/w1db",
  ssl: { rejectUnauthorized: false }
});

// Inicializar OpenAI
const openai = new OpenAI({
  apiKey: "process.env.OPENAI_API_KEY",
});

// === ROTA GPT-4 MINI ===
app.post('/api/assistant/query', async (req: Request, res: Response) => {
  const { userId, question } = req.body;

  try {
    const userData = await pool.query(
      `SELECT * FROM user_additional_info WHERE user_id = $1`,
      [userId]
    );

    const investments = await pool.query(
      `SELECT asset_name, invested_amount, current_value FROM user_investments WHERE user_id = $1`,
      [userId]
    );

    const prompt = `
Usuário ID ${userId} fez a seguinte pergunta: "${question}"

Aqui estão os dados do usuário:
${JSON.stringify(userData.rows[0])}

Aqui estão os investimentos:
${JSON.stringify(investments.rows)}

Com base nisso, gere uma resposta consultiva e personalizada em português.
`;

    const completion = await openai.chat.completions.create({
      model: "gpt-4", 
      messages: [
        { role: "system", content: "Você é uma consultora financeira especializada da W1 Consultoria Patrimonial." },
        { role: "user", content: prompt },
      ],
      max_tokens: 500,
    });

    const answer = completion.choices[0].message?.content;
    res.json({ answer });
  } catch (err) {
    console.error("Erro na IA:", err);
    res.status(500).json({ message: "Erro ao processar pergunta com a IA" });
  }
});

// === DEMAIS ROTAS ===

app.post('/api/users/register', async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, phone, password]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error('Erro ao cadastrar:', err);
    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
});

app.post('/api/users/:id/additional-info', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { companyName, cnpj, industrySegment, estimatedWealth, assetGoals, taxSavings } = req.body;

  try {
    await pool.query(
      `INSERT INTO user_additional_info
        (user_id, company_name, cnpj, industry_segment, estimated_wealth, tax_savings, asset_goals)
       VALUES ($1, $2, $3, $4, $5, $6, $7)
       ON CONFLICT (user_id)
       DO UPDATE SET
         company_name = $2,
         cnpj = $3,
         industry_segment = $4,
         estimated_wealth = $5,
         tax_savings = $6,
         asset_goals = $7`,
      [userId, companyName, cnpj, industrySegment, estimatedWealth, taxSavings, assetGoals]
    );
    res.status(201).json({ message: 'Informações salvas com sucesso' });
  } catch (err) {
    console.error('Erro ao salvar informações adicionais:', err);
    res.status(500).json({ message: 'Erro ao salvar informações' });
  }
});

app.get('/api/users/:id/dashboard', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id);

  try {
    const info = await pool.query(
      `SELECT estimated_wealth, tax_savings FROM user_additional_info WHERE user_id = $1`,
      [userId]
    );

    const inv = await pool.query(
      `SELECT asset_name, category, invested_amount, current_value
       FROM user_investments WHERE user_id = $1`,
      [userId]
    );

    const resumo = await pool.query(
      `SELECT SUM(invested_amount) AS total_invested, SUM(current_value) AS total_current
       FROM user_investments WHERE user_id = $1`,
      [userId]
    );

    if (info.rows.length === 0 || resumo.rows.length === 0) {
      res.status(404).json({ message: 'Dados insuficientes' });
      return;
    }

    const { estimated_wealth, tax_savings } = info.rows[0];
    const { total_invested, total_current } = resumo.rows[0];

    const returnPercentage =
      total_invested && total_invested > 0
        ? (((total_current - total_invested) / total_invested) * 100).toFixed(2) + '%'
        : '0%';

    res.json({
      estimatedWealth: estimated_wealth,
      annualReturn: returnPercentage,
      taxSavings: tax_savings ?? 0,
      protectionIndex: 85,
      investments: inv.rows
    });
  } catch (error) {
    console.error('Erro ao calcular dashboard:', error);
    res.status(500).json({ message: 'Erro ao calcular dashboard' });
  }
});


app.get('/api/users/:id/calendar-events', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    const result = await pool.query(
      `SELECT id, asset_name AS title, event_date AS date, event_type AS type,
              event_description AS description, event_amount AS amount
       FROM user_investments
       WHERE user_id = $1 AND event_date IS NOT NULL`,
      [userId]
    );

    const events = result.rows.map(event => ({
      ...event,
      date: new Date(event.date)
    }));

    res.json(events);
  } catch (err) {
    console.error("Erro ao buscar eventos do calendário:", err);
    res.status(500).json({ message: "Erro interno ao buscar eventos" });
  }
});

app.post('/api/users/:id/simulations', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { type, name, data } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO user_simulations (user_id, type, name, data)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [userId, type, name, data]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error("Erro ao salvar simulação:", err);
    res.status(500).json({ message: "Erro ao salvar simulação" });
  }
});

app.get('/api/users/:id/simulations', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    const result = await pool.query(
      `SELECT id, type, name, data, created_at
       FROM user_simulations
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar simulações:", err);
    res.status(500).json({ message: "Erro ao buscar simulações" });
  }
});

app.post('/api/users/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT id, name FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ message: 'Credenciais inválidas' });
      return;
    }

    const { id, name } = result.rows[0];

    res.json({ id, name, token: "fake-token" });
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    res.status(500).json({ message: "Erro interno ao fazer login" });
  }
});


// Rota de cadastro
app.post('/api/users/register', async (req, res) => {
  const { name, email, phone, password } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, phone, password) VALUES ($1, $2, $3, $4) RETURNING id',
      [name, email, phone, password]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error('Erro ao cadastrar:', err);
    res.status(500).json({ message: 'Erro ao cadastrar usuário' });
  }
});

app.post('/api/users/:id/additional-info', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { companyName, cnpj, industrySegment, estimatedWealth, assetGoals } = req.body;

  try {
    await pool.query(
      `INSERT INTO user_additional_info
        (user_id, company_name, cnpj, industry_segment, estimated_wealth, asset_goals)
       VALUES ($1, $2, $3, $4, $5, $6)`,
      [userId, companyName, cnpj, industrySegment, estimatedWealth, assetGoals]
    );
    res.status(201).json({ message: 'Informações salvas com sucesso' });
  } catch (err) {
    console.error('Erro ao salvar informações adicionais:', err);
    res.status(500).json({ message: 'Erro ao salvar informações' });
  }
});

app.get('/api/users/:id/dashboard', async (req: Request<{ id: string }>, res: Response): Promise<void> => {
  const userId = parseInt(req.params.id);

  try {
    const info = await pool.query(
      `SELECT estimated_wealth FROM user_additional_info WHERE user_id = $1`,
      [userId]
    );

    const inv = await pool.query(
      `SELECT asset_name, category, invested_amount, current_value
       FROM user_investments WHERE user_id = $1`,
      [userId]
    );

    const resumo = await pool.query(
      `SELECT SUM(invested_amount) AS total_invested, SUM(current_value) AS total_current
       FROM user_investments WHERE user_id = $1`,
      [userId]
    );

    if (info.rows.length === 0 || resumo.rows.length === 0) {
      res.status(404).json({ message: 'Dados insuficientes' });
      return;
    }

    const { estimated_wealth } = info.rows[0];
    const { total_invested, total_current } = resumo.rows[0];

    const returnPercentage =
      total_invested && total_invested > 0
        ? (((total_current - total_invested) / total_invested) * 100).toFixed(2) + '%'
        : '0%';

    res.json({
      estimatedWealth: estimated_wealth,
      annualReturn: returnPercentage,
      taxSavings: 183000, // exemplo fixo
      protectionIndex: 85, // exemplo fixo
      investments: inv.rows
    });
  } catch (error) {
    console.error('Erro ao calcular dashboard:', error);
    res.status(500).json({ message: 'Erro ao calcular dashboard' });
  }
});


app.get('/api/users/:id/calendar-events', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    const result = await pool.query(
      `SELECT id, asset_name AS title, event_date AS date, event_type AS type,
              event_description AS description, event_amount AS amount
       FROM user_investments
       WHERE user_id = $1 AND event_date IS NOT NULL`,
      [userId]
    );

    const events = result.rows.map(event => ({
      ...event,
      date: new Date(event.date) // necessário para frontend interpretar corretamente
    }));

    res.json(events);
  } catch (err) {
    console.error("Erro ao buscar eventos do calendário:", err);
    res.status(500).json({ message: "Erro interno ao buscar eventos" });
  }
});

app.post('/api/users/:id/simulations', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);
  const { type, name, data } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO user_simulations (user_id, type, name, data)
       VALUES ($1, $2, $3, $4) RETURNING id`,
      [userId, type, name, data]
    );
    res.status(201).json({ id: result.rows[0].id });
  } catch (err) {
    console.error("Erro ao salvar simulação:", err);
    res.status(500).json({ message: "Erro ao salvar simulação" });
  }
});

app.get('/api/users/:id/simulations', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    const result = await pool.query(
      `SELECT id, type, name, data, created_at
       FROM user_simulations
       WHERE user_id = $1
       ORDER BY created_at DESC`,
      [userId]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Erro ao buscar simulações:", err);
    res.status(500).json({ message: "Erro ao buscar simulações" });
  }
});

app.post('/api/users/login', async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const result = await pool.query(
      'SELECT id, name FROM users WHERE email = $1 AND password = $2',
      [email, password]
    );

    if (result.rows.length === 0) {
      res.status(401).json({ message: 'Credenciais inválidas' });
      return;
    }

    const { id, name } = result.rows[0];

    res.json({ id, name, token: "fake-token" }); // Em produção, gere um JWT de verdade
  } catch (err) {
    console.error("Erro ao fazer login:", err);
    res.status(500).json({ message: "Erro interno ao fazer login" });
  }
});
app.get('/api/users/:id/simulation-data', async (req: Request, res: Response) => {
  const userId = parseInt(req.params.id);

  try {
    const [info, investments] = await Promise.all([
      pool.query(`SELECT estimated_wealth FROM user_additional_info WHERE user_id = $1`, [userId]),
      pool.query(`SELECT invested_amount FROM user_investments WHERE user_id = $1`, [userId])
    ]);

    const totalInvested = investments.rows.reduce((acc, row) => acc + Number(row.invested_amount), 0);

    res.json({
      estimatedWealth: info.rows[0]?.estimated_wealth ?? 0,
      totalInvested
    });
  } catch (err) {
    console.error("Erro ao buscar dados da simulação:", err);
    res.status(500).json({ message: "Erro ao buscar dados da simulação" });
  }
});


// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
