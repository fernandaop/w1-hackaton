import { useEffect, useState } from "react";
import { AppLayout } from "@/components/layout/AppLayout";
import { InvestmentPieChart } from "@/components/dashboard/InvestmentPieChart";
import { InvestmentBarChart } from "@/components/dashboard/InvestmentBarChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Wallet, TrendingUp, TrendingDown, ShieldCheck } from "lucide-react";
import { userService } from "@/services/api";

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<any>(null);

  useEffect(() => {
    const userId = localStorage.getItem("userId");
    if (!userId) return;

    userService.getDashboardData(userId)
      .then((data) => setDashboardData(data))
      .catch((err) => {
        console.error("Erro ao carregar dados do dashboard:", err);
      });
  }, []);

  const formatCurrency = (value: number) =>
    `R$ ${Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}`;

  const metricCards = [
    {
      title: "Patrimônio Total",
      icon: <Wallet className="text-primary w-6 h-6" />,
      value: dashboardData ? formatCurrency(dashboardData.estimatedWealth) : "Carregando...",
    },
    {
      title: "Retorno Anual",
      icon: <TrendingUp className="text-green-600 w-6 h-6" />,
      value: dashboardData ? dashboardData.annualReturn : "Carregando...",
    },
    {
      title: "Economia Fiscal",
      icon: <TrendingDown className="text-yellow-500 w-6 h-6" />,
      value: dashboardData ? formatCurrency(dashboardData.taxSavings) : "Carregando...",
    },
    {
      title: "Índice de Proteção",
      icon: <ShieldCheck className="text-blue-600 w-6 h-6" />,
      value: dashboardData ? `${dashboardData.protectionIndex}%` : "Carregando...",
    },
  ];

  return (
    <AppLayout>
    <div className="pt-16 pb-10">
    <h1 className="text-3xl font-bold mb-1 tracking-tight leading-snug">Dashboard Patrimonial</h1>
      <p className="text-muted-foreground">Resumo dos seus ativos financeiros</p>
    </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metricCards.map((card, idx) => (
          <Card key={idx} className="rounded-xl border bg-white shadow-sm hover:shadow-md transition">
            <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
              <CardTitle className="text-sm font-medium text-muted-foreground">{card.title}</CardTitle>
              {card.icon}
            </CardHeader>
            <CardContent>
              <p className="text-lg font-bold">{card.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {dashboardData?.investments?.length > 0 && (
        <section className="p-6 bg-white rounded-xl shadow-sm mb-8">
          <InvestmentPieChart data={dashboardData.investments} />
        </section>

      )}

      {dashboardData?.investments?.length > 0 && (
        <section className="p-6 bg-white rounded-xl shadow-sm mb-8">
          <InvestmentBarChart data={dashboardData.investments} />
        </section>
      )}

      {dashboardData?.investments && (
        <div className="p-6 border rounded-2xl bg-white shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Seus Investimentos</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {dashboardData.investments.map((inv: any, index: number) => (
              <div key={index} className="p-4 border rounded-xl bg-gray-50 hover:shadow-md transition">
                <p className="font-semibold">{inv.asset_name} <span className="text-xs text-muted-foreground">({inv.category})</span></p>
                <p className="text-sm text-muted-foreground mt-1">
                  Investido: <span className="font-medium">{formatCurrency(inv.invested_amount)}</span><br />
                  Atual: <span className="font-medium">{formatCurrency(inv.current_value)}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </AppLayout>
  );
};

export default Dashboard;
