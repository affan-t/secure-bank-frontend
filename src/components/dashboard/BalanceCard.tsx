import { cn } from '@/lib/utils';
import { Wallet, Building, CreditCard, Eye, EyeOff } from 'lucide-react';
import { formatCurrency } from '@/data/bankData';
import { useBalanceVisibility } from '@/contexts/BalanceVisibilityContext';

interface BalanceCardProps {
  type: 'savings' | 'current' | 'credit' | 'total';
  name: string;
  balance: number;
  accountNumber?: string;
  change?: number;
  icon: string;
  index?: number;
}

const iconMap: Record<string, any> = {
  savings: Wallet,
  account: Building,
  credit: CreditCard,
  total: Wallet,
};

export function BalanceCard({ type, name, balance, accountNumber, change, icon, index = 0 }: BalanceCardProps) {
  const { showBalance, toggleBalance } = useBalanceVisibility();
  const isNegative = balance < 0;
  const Icon = iconMap[icon] || Wallet;
  
  const gradients = {
    savings: 'gradient-card',
    current: 'gradient-accent',
    credit: 'gradient-gold',
    total: 'gradient-card',
  };

  const maskedBalance = '****';

  return (
    <div
      className={cn(
        'relative p-5 rounded-xl text-white overflow-hidden transition-all duration-300 hover:-translate-y-0.5 cursor-pointer animate-slide-up',
        gradients[type]
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-16 h-16 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
            <Icon size={20} className="text-white" />
          </div>
          <div className="flex items-center gap-2">
            {accountNumber && (
              <span className="text-xs text-white/70 font-mono">{accountNumber}</span>
            )}
            <button
              onClick={(e) => {
                e.stopPropagation();
                toggleBalance();
              }}
              className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
              title={showBalance ? 'Hide balance' : 'Show balance'}
            >
              {showBalance ? <Eye size={14} /> : <EyeOff size={14} />}
            </button>
          </div>
        </div>
        
        <p className="text-white/80 text-xs font-medium mb-1">{name}</p>
        
        <div className="flex items-end gap-2">
          <h3 className={cn(
            'text-xl md:text-2xl font-bold font-display transition-all duration-300',
            isNegative && 'text-red-200'
          )}>
            {showBalance ? (
              <>
                {isNegative ? '-' : ''}{formatCurrency(Math.abs(balance))}
              </>
            ) : (
              <span className="tracking-wider">{maskedBalance}</span>
            )}
          </h3>
          {change !== undefined && showBalance && (
            <span className={cn(
              'text-xs px-1.5 py-0.5 rounded-full mb-0.5',
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
