import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface Investment {
  category: string;
  invested_amount: number;
}

interface Props {
  data: Investment[];
}

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#a4de6c', '#d0ed57'];

export const InvestmentPieChart = ({ data }: Props) => {
  const grouped = data.reduce((acc: Record<string, number>, item) => {
    acc[item.category] = (acc[item.category] || 0) + Number(item.invested_amount);
    return acc;
  }, {});

  const chartData = Object.entries(grouped).map(([category, value]) => ({
    name: category,
    value,
  }));

  return (
    <div className="p-4 border rounded-lg bg-white shadow-sm">
      <h2 className="text-lg font-semibold mb-4">Distribuição por Categoria</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={90}
            label
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
