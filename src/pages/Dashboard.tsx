
import { AppLayout } from "@/components/layout/AppLayout";
import { AssetsSummary } from "@/components/dashboard/AssetsSummary";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { HoldingStructure } from "@/components/dashboard/HoldingStructure";
import { EventsCalendar } from "@/components/dashboard/EventsCalendar";
import { VirtualAssistant } from "@/components/assistant/VirtualAssistant";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Battery, CreditCard, Wallet, TrendingUp, TrendingDown } from "lucide-react";

const Dashboard = () => {
  return (
    <AppLayout>
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">Dashboard Patrimonial</h1>
        <p className="text-muted-foreground">
          Acompanhamento e visualização do seu patrimônio
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card className="dashboard-card">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Patrimônio Total</p>
                <p className="text-2xl font-bold">R$ 2,45M</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +5,2% este mês
                </p>
              </div>
              <div className="bg-w1.blue/10 rounded-lg p-2 h-fit">
                <Wallet className="h-6 w-6 text-w1.blue" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Retorno Anual</p>
                <p className="text-2xl font-bold">12,8%</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +2,1% que IPCA
                </p>
              </div>
              <div className="bg-w1.purple/10 rounded-lg p-2 h-fit">
                <TrendingUp className="h-6 w-6 text-w1.purple" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Economia Fiscal</p>
                <p className="text-2xl font-bold">R$ 183K</p>
                <p className="text-xs text-green-600 flex items-center mt-1">
                  <TrendingUp className="h-3 w-3 mr-1" /> +15% que ano anterior
                </p>
              </div>
              <div className="bg-w1.green/10 rounded-lg p-2 h-fit">
                <CreditCard className="h-6 w-6 text-w1.green" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dashboard-card">
          <CardContent className="p-6">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Índice Proteção</p>
                <p className="text-2xl font-bold">85%</p>
                <p className="text-xs text-red-500 flex items-center mt-1">
                  <TrendingDown className="h-3 w-3 mr-1" /> Meta: 95%
                </p>
              </div>
              <div className="bg-w1.coral/10 rounded-lg p-2 h-fit">
                <Battery className="h-6 w-6 text-w1.coral" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        <div className="lg:col-span-2">
          <PerformanceChart />
        </div>
        <div>
          <AssetsSummary />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 gap-6">
            <HoldingStructure />
            <EventsCalendar />
          </div>
        </div>
        <div>
          <VirtualAssistant />
        </div>
      </div>
    </AppLayout>
  );
};

export default Dashboard;
