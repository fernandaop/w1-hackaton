import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface Investment {
  category: string;
  invested_amount: number;
}

interface Props {
  data: Investment[];
}

export const InvestmentBarChart = ({ data }: Props) => {
  const formatCurrency = (value: number) =>
    new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Investimentos por Categoria</h2>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="category" />
          <YAxis tickFormatter={formatCurrency} width={110} />
          <Tooltip formatter={(value) => formatCurrency(Number(value))} />
          <Bar dataKey="invested_amount" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
