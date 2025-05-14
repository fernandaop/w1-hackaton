
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChartPie, Users, FileText } from "lucide-react";

const data = [
  {
    name: 'Atual',
    ir: 12.5,
    itcmd: 4,
    outros: 2.5,
    economia: 0,
  },
  {
    name: 'Holding',
    ir: 5.8,
    itcmd: 2,
    outros: 1.2,
    economia: 10,
  },
];

export function HoldingSimulator() {
  const [simulationType, setSimulationType] = useState("basic");
  const [assetsValue, setAssetsValue] = useState("2000000");
  const [structureType, setStructureType] = useState("familiar");
  
  return (
    <Card className="dashboard-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ChartPie className="h-5 w-5 text-w1.green" />
          Simulador de Holdings
        </CardTitle>
        <CardDescription>
          Simule diferentes cenários para organização patrimonial
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="simulator" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="simulator">Simulador</TabsTrigger>
            <TabsTrigger value="comparison">Comparação</TabsTrigger>
            <TabsTrigger value="report">Relatório</TabsTrigger>
          </TabsList>
          
          <TabsContent value="simulator" className="space-y-4 mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="simulationType">Tipo de Simulação</Label>
                  <Select value={simulationType} onValueChange={setSimulationType}>
                    <SelectTrigger id="simulationType">
                      <SelectValue placeholder="Selecione o tipo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Básica</SelectItem>
                      <SelectItem value="advanced">Avançada</SelectItem>
                      <SelectItem value="custom">Personalizada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="assetsValue">Valor Total dos Ativos (R$)</Label>
                  <Input 
                    id="assetsValue" 
                    type="text" 
                    value={assetsValue}
                    onChange={e => setAssetsValue(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="structureType">Tipo de Estrutura</Label>
                  <Select value={structureType} onValueChange={setStructureType}>
                    <SelectTrigger id="structureType">
                      <SelectValue placeholder="Selecione a estrutura" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="familiar">Holding Familiar</SelectItem>
                      <SelectItem value="imobiliaria">Holding Imobiliária</SelectItem>
                      <SelectItem value="patrimonial">Holding Patrimonial</SelectItem>
                      <SelectItem value="participacoes">Holding de Participações</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <Button className="w-full bg-w1.green hover:bg-green-600">
                  Simular Agora
                </Button>
              </div>

              <div className="border rounded-lg p-4">
                <h3 className="font-semibold text-lg mb-4">Resultado da Simulação</h3>
                
                <div className="space-y-6">
                  <div>
                    <p className="text-sm text-muted-foreground">Economia Estimada</p>
                    <p className="text-3xl font-bold text-w1.green">R$ 350.000,00</p>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Redução de Imposto de Renda</span>
                      <span className="font-semibold">6.7%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Redução de ITCMD</span>
                      <span className="font-semibold">2.0%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span>Outros Benefícios</span>
                      <span className="font-semibold">1.3%</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t">
                    <p className="text-sm mb-1">Proteção Patrimonial</p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-w1.purple h-2 rounded-full" style={{ width: '85%' }}></div>
                    </div>
                    <p className="text-xs text-right mt-1">85% de proteção</p>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="comparison" className="mt-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  width={500}
                  height={300}
                  data={data}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar name="Imposto de Renda" dataKey="ir" fill="#3B7DED" />
                  <Bar name="ITCMD" dataKey="itcmd" fill="#A96CF3" />
                  <Bar name="Outros Custos" dataKey="outros" fill="#FB6F5B" />
                  <Bar name="Economia" dataKey="economia" fill="#4CBF9F" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="mt-6 flex justify-between">
              <Button variant="outline" className="gap-2">
                <Users className="h-4 w-4" />
                <span>Comparar Cenários</span>
              </Button>
              
              <Button variant="outline" className="gap-2">
                <FileText className="h-4 w-4" />
                <span>Exportar Comparação</span>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="report" className="mt-6">
            <div className="border rounded-lg p-6 text-center">
              <FileText className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-semibold mb-2">Relatório Personalizado</h3>
              <p className="text-muted-foreground mb-6">
                Gere um relatório detalhado com análises específicas para o seu caso.
              </p>
              <Button>Gerar Relatório</Button>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
