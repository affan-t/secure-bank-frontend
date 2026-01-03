import { cn } from '@/lib/utils';

interface BalanceCardProps {
  type: 'savings' | 'current' | 'credit' | 'total';
  name: string;
  balance: number;
  accountNumber?: string;
  change?: number;
  icon: string;
  index?: number;
}

export function BalanceCard({ type, name, balance, accountNumber, change, icon, index = 0 }: BalanceCardProps) {
  const isNegative = balance < 0;
  
  const gradients = {
    savings: 'gradient-card',
    current: 'gradient-accent',
    credit: 'gradient-gold',
    total: 'gradient-card',
  };

  return (
    <div
      className={cn(
        'relative p-6 rounded-2xl text-white overflow-hidden transition-all duration-500 hover-lift cursor-pointer animate-slide-up',
        gradients[type]
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-3xl">{icon}</span>
          {accountNumber && (
            <span className="text-sm text-white/70 font-mono">{accountNumber}</span>
          )}
        </div>
        
        <p className="text-white/80 text-sm font-medium mb-1">{name}</p>
        
        <div className="flex items-end gap-2">
          <h3 className={cn(
            'text-2xl md:text-3xl font-bold font-display animate-count-up',
            isNegative && 'text-red-200'
          )}>
            {isNegative ? '-' : ''}${Math.abs(balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </h3>
          {change !== undefined && (
            <span className={cn(
              'text-xs px-2 py-1 rounded-full mb-1',
              change >= 0 ? 'bg-white/20 text-white' : 'bg-red-500/20 text-red-200'
            )}>
              {change >= 0 ? '+' : ''}{change}%
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
