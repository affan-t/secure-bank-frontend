import { monthlySpending, spendingByCategory } from '@/data/bankData';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function SpendingChart() {
  const [animated, setAnimated] = useState(false);
  const maxAmount = Math.max(...monthlySpending.map(m => m.amount));

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-card rounded-2xl border border-border p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Monthly Spending</h3>
        <select className="text-sm bg-secondary rounded-lg px-3 py-1.5 text-muted-foreground border-none focus:ring-2 focus:ring-primary">
          <option>Last 6 months</option>
          <option>Last year</option>
        </select>
      </div>

      {/* Bar Chart */}
      <div className="flex items-end justify-between gap-2 h-40 mb-4">
        {monthlySpending.map((data, index) => (
          <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
            <div className="w-full bg-secondary rounded-lg overflow-hidden h-full flex items-end">
              <div
                className={cn(
                  'w-full gradient-card rounded-lg transition-all duration-1000 ease-out',
                  animated ? '' : 'h-0'
                )}
                style={{
                  height: animated ? `${(data.amount / maxAmount) * 100}%` : '0%',
                  transitionDelay: `${index * 100}ms`,
                }}
              />
            </div>
            <span className="text-xs text-muted-foreground">{data.month}</span>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
        <div>
          <p className="text-sm text-muted-foreground">Total Spending</p>
          <p className="text-xl font-bold text-foreground">
            ${monthlySpending.reduce((acc, m) => acc + m.amount, 0).toLocaleString()}
          </p>
        </div>
        <div className="text-right">
          <p className="text-sm text-muted-foreground">Average</p>
          <p className="text-xl font-bold text-foreground">
            ${Math.round(monthlySpending.reduce((acc, m) => acc + m.amount, 0) / monthlySpending.length).toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  );
}

export function CategoryBreakdown() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="bg-card rounded-2xl border border-border p-6 animate-fade-in" style={{ animationDelay: '200ms' }}>
      <h3 className="text-lg font-semibold text-foreground mb-6">Spending by Category</h3>

      {/* Donut Chart Visualization */}
      <div className="relative w-40 h-40 mx-auto mb-6">
        <svg className="w-full h-full transform -rotate-90">
          {spendingByCategory.map((category, index) => {
            const prevPercentages = spendingByCategory
              .slice(0, index)
              .reduce((acc, c) => acc + c.percentage, 0);
            const circumference = 2 * Math.PI * 60;
            const strokeDasharray = (category.percentage / 100) * circumference;
            const strokeDashoffset = -(prevPercentages / 100) * circumference;

            return (
              <circle
                key={category.category}
                cx="80"
                cy="80"
                r="60"
                fill="none"
                stroke={category.color}
                strokeWidth="20"
                strokeDasharray={`${animated ? strokeDasharray : 0} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
                style={{ transitionDelay: `${index * 150}ms` }}
              />
            );
          })}
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold text-foreground">
              ${spendingByCategory.reduce((acc, c) => acc + c.amount, 0).toLocaleString()}
            </p>
            <p className="text-xs text-muted-foreground">Total</p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="space-y-3">
        {spendingByCategory.map((category, index) => (
          <div
            key={category.category}
            className="flex items-center justify-between animate-slide-right"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: category.color }}
              />
              <span className="text-sm text-foreground">{category.category}</span>
            </div>
            <div className="text-right">
              <span className="text-sm font-medium text-foreground">${category.amount}</span>
              <span className="text-xs text-muted-foreground ml-2">{category.percentage}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
