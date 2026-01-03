import { transactions, Transaction, formatCurrency } from '@/data/bankData';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownLeft, ShoppingCart, Banknote, Film, Zap, Music, RefreshCw, Home, Coffee, Car, Gift } from 'lucide-react';

const iconMap: Record<string, any> = {
  shopping: ShoppingCart,
  income: Banknote,
  entertainment: Film,
  utilities: Zap,
  transfer: RefreshCw,
  housing: Home,
  food: Coffee,
  transport: Car,
  rewards: Gift,
};

interface TransactionItemProps {
  transaction: Transaction;
  index: number;
}

function TransactionItem({ transaction, index }: TransactionItemProps) {
  const isCredit = transaction.type === 'credit';
  const Icon = iconMap[transaction.icon] || ShoppingCart;
  
  return (
    <div
      className="flex items-center gap-4 p-4 rounded-xl bg-card hover:bg-secondary/50 transition-all duration-300 cursor-pointer animate-slide-up card-animated"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Icon */}
      <div className={cn(
        'w-12 h-12 rounded-xl flex items-center justify-center',
        isCredit ? 'bg-success/10' : 'bg-secondary'
      )}>
        <Icon size={20} className={isCredit ? 'text-success' : 'text-muted-foreground'} />
      </div>
      
      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="font-medium text-foreground truncate">{transaction.description}</p>
        <p className="text-sm text-muted-foreground">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
      </div>
      
      {/* Amount */}
      <div className="text-right">
        <div className="flex items-center gap-1">
          {isCredit ? (
            <ArrowDownLeft size={16} className="text-success" />
          ) : (
            <ArrowUpRight size={16} className="text-destructive" />
          )}
          <span className={cn(
            'font-semibold',
            isCredit ? 'text-success' : 'text-foreground'
          )}>
            {isCredit ? '+' : '-'}{formatCurrency(transaction.amount)}
          </span>
        </div>
        <span className={cn(
          'text-xs px-2 py-0.5 rounded-full',
          transaction.status === 'completed' ? 'bg-success/10 text-success' :
          transaction.status === 'pending' ? 'bg-warning/10 text-warning' :
          'bg-destructive/10 text-destructive'
        )}>
          {transaction.status}
        </span>
      </div>
    </div>
  );
}

export function RecentTransactions() {
  const recentTransactions = transactions.slice(0, 5);
  
  return (
    <div className="bg-card rounded-2xl border border-border p-6 animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recent Transactions</h3>
        <button className="text-sm text-primary hover:underline transition-colors">
          View All
        </button>
      </div>
      
      <div className="space-y-3">
        {recentTransactions.map((transaction, index) => (
          <TransactionItem key={transaction.id} transaction={transaction} index={index} />
        ))}
      </div>
    </div>
  );
}
