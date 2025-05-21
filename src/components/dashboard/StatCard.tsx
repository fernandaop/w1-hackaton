import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: string;
    positive: boolean;
  };
  className?: string;
}

export const StatCard = ({
  title,
  value,
  icon: Icon,
  trend,
  className,
}: StatCardProps) => {
  return (
    <Card className={cn("overflow-hidden transition-all hover:shadow-md", className)}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1.5">
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
            
            {trend && (
              <div className="flex items-center mt-2">
                <span className={cn(
                  "text-sm flex items-center gap-1",
                  trend.positive ? "text-emerald-500" : "text-rose-500"
                )}>
                  {trend.positive ? (
                    <span className="text-xs">▲</span>
                  ) : (
                    <span className="text-xs">▼</span>
                  )}
                  {trend.value}
                </span>
              </div>
            )}
          </div>
          
          <div className="rounded-full p-2.5 bg-muted/80">
            <Icon className="h-5 w-5 text-primary/80" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
