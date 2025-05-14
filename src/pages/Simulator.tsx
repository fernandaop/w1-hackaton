
import { AppLayout } from "@/components/layout/AppLayout";
import { HoldingSimulator } from "@/components/simulator/HoldingSimulator";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ChartPie, Users, Lightbulb } from "lucide-react";

const Simulator = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Simulações Patrimoniais</h1>
        <p className="text-muted-foreground">
          Configure e compare diferentes cenários para otimização patrimonial
        </p>
      </div>

      {/* Introduction Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-w1.green/10 p-3 rounded-full mb-4">
              <ChartPie className="h-6 w-6 text-w1.green" />
            </div>
            <h3 className="text-lg font-medium mb-2">Simulações Avançadas</h3>
            <p className="text-sm text-muted-foreground">
              Modelos complexos para simulação de diferentes estruturas patrimoniais.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-w1.blue/10 p-3 rounded-full mb-4">
              <Lightbulb className="h-6 w-6 text-w1.blue" />
            </div>
            <h3 className="text-lg font-medium mb-2">Cenários Fiscais</h3>
            <p className="text-sm text-muted-foreground">
              Compare a tributação em diferentes modelos de estruturação.
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 flex flex-col items-center text-center">
            <div className="bg-w1.purple/10 p-3 rounded-full mb-4">
              <Users className="h-6 w-6 text-w1.purple" />
            </div>
            <h3 className="text-lg font-medium mb-2">Proteção Familiar</h3>
            <p className="text-sm text-muted-foreground">
              Analise opções para proteção do patrimônio familiar e sucessão.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Simulator Tabs */}
      <Tabs defaultValue="holdings">
        <TabsList className="mb-6 w-full grid grid-cols-3">
          <TabsTrigger value="holdings">Holdings</TabsTrigger>
          <TabsTrigger value="succession">Sucessão</TabsTrigger>
          <TabsTrigger value="tax">Tributação</TabsTrigger>
        </TabsList>
        
        <TabsContent value="holdings" className="mt-0">
          <HoldingSimulator />
        </TabsContent>
        
        <TabsContent value="succession" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Planejamento Sucessório</CardTitle>
              <CardDescription>
                Simule diferentes cenários para transferência de patrimônio entre gerações
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Ferramenta em desenvolvimento</p>
                <p>Disponível em breve</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="tax" className="mt-0">
          <Card>
            <CardHeader>
              <CardTitle>Otimização Tributária</CardTitle>
              <CardDescription>
                Compare cargas tributárias em diferentes cenários e estruturas
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[400px] flex items-center justify-center">
              <div className="text-center text-muted-foreground">
                <p>Ferramenta em desenvolvimento</p>
                <p>Disponível em breve</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </AppLayout>
  );
};

export default Simulator;
