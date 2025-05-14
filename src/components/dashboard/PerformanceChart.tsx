
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

const data = [
  { month: 'Jan', patrimonio: 1950000 },
  { month: 'Fev', patrimonio: 2050000 },
  { month: 'Mar', patrimonio: 2100000 },
  { month: 'Abr', patrimonio: 2180000 },
  { month: 'Mai', patrimonio: 2150000 },
  { month: 'Jun', patrimonio: 2280000 },
  { month: 'Jul', patrimonio: 2320000 },
  { month: 'Ago', patrimonio: 2390000 },
  { month: 'Set', patrimonio: 2450000 },
];

export function PerformanceChart() {
  const [period, setPeriod] = useState("9m");
  
  return (
    <Card className="dashboard-card">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold">Evolução Patrimonial</CardTitle>
            <CardDescription>Evolução por período</CardDescription>
          </div>
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[120px]">
              <SelectValue placeholder="Período" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3m">3 meses</SelectItem>
              <SelectItem value="6m">6 meses</SelectItem>
              <SelectItem value="9m">9 meses</SelectItem>
              <SelectItem value="1y">1 ano</SelectItem>
              <SelectItem value="all">Tudo</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={data}
              margin={{
                top: 10,
                right: 30,
                left: 0,
                bottom: 0,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="month" />
              <YAxis
                tickFormatter={(value) => `R$${(value / 1000000).toFixed(1)}M`}
                domain={['dataMin - 100000', 'dataMax + 100000']}
              />
              <Tooltip 
                formatter={(value: number) => [
                  new Intl.NumberFormat('pt-BR', { 
                    style: 'currency', 
                    currency: 'BRL',
                    minimumFractionDigits: 0, 
                    maximumFractionDigits: 0,
                  }).format(value),
                  'Patrimônio'
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="patrimonio" 
                stroke="#3B7DED" 
                fill="url(#colorPatrimonio)" 
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="colorPatrimonio" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B7DED" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#3B7DED" stopOpacity={0}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
