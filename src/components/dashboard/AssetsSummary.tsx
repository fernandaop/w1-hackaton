
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { name: 'Imóveis', value: 45, color: '#3B7DED' },
  { name: 'Ações', value: 25, color: '#A96CF3' },
  { name: 'Renda Fixa', value: 20, color: '#4CBF9F' },
  { name: 'Outros', value: 10, color: '#FB6F5B' },
];

const COLORS = ['#3B7DED', '#A96CF3', '#4CBF9F', '#FB6F5B'];

export function AssetsSummary() {
  const totalValue = 2450000;
  
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Distribuição de Ativos</CardTitle>
        <CardDescription>Visualização por classe de ativo</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="w-full md:w-1/2 h-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [`${value}%`, 'Percentual']} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="w-full md:w-1/2">
            <p className="text-lg font-semibold mb-4">Patrimônio Total</p>
            <p className="text-3xl font-bold mb-6">
              {new Intl.NumberFormat('pt-BR', { 
                style: 'currency', 
                currency: 'BRL',
                minimumFractionDigits: 0, 
                maximumFractionDigits: 0,
              }).format(totalValue)}
            </p>
            
            <div className="space-y-2">
              {data.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span>{item.name}</span>
                  </div>
                  <span className="font-medium">{item.value}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
