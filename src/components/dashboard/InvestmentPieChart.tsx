import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Investment {
  asset_name: string;
  invested_amount: number;
}

interface Props {
  data: Investment[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];

export const InvestmentPieChart = ({ data }: Props) => {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  const grouped = data.reduce((acc: Record<string, number>, item) => {
    acc[item.asset_name] = (acc[item.asset_name] || 0) + Number(item.invested_amount);
    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(([asset_name, value]) => ({
    name: asset_name,
    value,
  }));

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Distribuição por Investimento</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label={({ name, value }) =>
                `${name}: ${formatCurrency(value)}`
              }
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
