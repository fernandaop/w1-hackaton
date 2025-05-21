import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Investment {
  asset_name: string;
  category: string;
  invested_amount: number;
  current_value: number;
}

interface InvestmentCardProps {
  investment: Investment;
  formatCurrency: (value: number) => string;
}

export const InvestmentCard = ({ investment, formatCurrency }: InvestmentCardProps) => {
  const performance = investment.current_value - investment.invested_amount;
  const percentChange = (performance / investment.invested_amount) * 100;
  const isPositive = performance >= 0;

  return (
    <Card className={cn(
      "transition-all hover:shadow-md",
      isPositive ? "hover:shadow-emerald-100/50" : "hover:shadow-rose-100/50"
    )}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="font-semibold">{investment.asset_name}</h3>
          <span className="text-xs px-2 py-0.5 rounded-full bg-secondary">
            {investment.category}
          </span>
        </div>

        <div className="flex justify-between items-center mt-3">
          <div>
            <p className="text-sm text-muted-foreground">Investido</p>
            <p className="font-medium">{formatCurrency(investment.invested_amount)}</p>
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Valor Atual</p>
            <p className="font-medium">{formatCurrency(investment.current_value)}</p>
          </div>
        </div>

        <div className="mt-3 flex items-center">
          {isPositive ? (
            <TrendingUp className="h-4 w-4 text-emerald-500 mr-1.5" />
          ) : (
            <TrendingDown className="h-4 w-4 text-rose-500 mr-1.5" />
          )}
          <span className={cn(
            "text-sm font-medium",
            isPositive ? "text-emerald-600" : "text-rose-600"
          )}>
            {isPositive ? "+" : ""}{formatCurrency(performance)} ({percentChange.toFixed(2)}%)
          </span>
        </div>
      </CardContent>
    </Card>
  );
};