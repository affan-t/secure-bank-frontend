import { monthlySpending, formatCurrency } from '@/data/bankData';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

export function SpendingChart() {
  const [animated, setAnimated] = useState(false);
  const maxAmount = Math.max(...monthlySpending.map(m => m.amount));
  const totalSpending = monthlySpending.reduce((acc, m) => acc + m.amount, 0);
  const averageSpending = Math.round(totalSpending / monthlySpending.length);

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

      {/* Bar Chart with Responsive Grid */}
      <div className="space-y-6">
        {/* Chart Visualization */}
        <div className="flex items-end justify-between gap-1 md:gap-2 h-48 bg-secondary/30 rounded-lg p-4">
          {monthlySpending.map((data, index) => (
            <div key={data.month} className="flex-1 flex flex-col items-center gap-2 h-full justify-end">
              {/* Tooltip on hover */}
              <div className="group relative w-full h-full flex items-end justify-center">
                <div
                  className={cn(
                    'w-full gradient-card rounded-t-lg transition-all duration-1000 ease-out hover:opacity-80 cursor-pointer relative group',
                    animated ? '' : 'h-0'
                  )}
                  style={{
                    height: animated ? `${(data.amount / maxAmount) * 100}%` : '0%',
                    transitionDelay: `${index * 100}ms`,
                  }}
                >
                  {/* Hover Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block bg-foreground text-background text-xs font-medium px-2 py-1 rounded whitespace-nowrap z-10">
                    {formatCurrency(data.amount)}
                  </div>
                </div>
              </div>
              <span className="text-xs text-muted-foreground font-medium">{data.month}</span>
            </div>
          ))}
        </div>

        {/* Amount Legend */}
        <div className="hidden md:flex justify-between text-xs text-muted-foreground px-4">
          <span>0</span>
          <span>{formatCurrency(Math.round(maxAmount / 2))}</span>
          <span>{formatCurrency(maxAmount)}</span>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid grid-cols-2 gap-3 mt-6">
        <div className="p-4 bg-secondary/50 rounded-xl">
          <p className="text-xs text-muted-foreground mb-1">Total Spending</p>
          <p className="text-lg md:text-xl font-bold text-foreground">
            {formatCurrency(totalSpending)}
          </p>
        </div>
        <div className="p-4 bg-secondary/50 rounded-xl">
          <p className="text-xs text-muted-foreground mb-1">Monthly Average</p>
          <p className="text-lg md:text-xl font-bold text-foreground">
            {formatCurrency(averageSpending)}
          </p>
        </div>
      </div>
    </div>
  );
}
