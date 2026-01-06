import { Header } from '@/components/layout/Header';
import { transactions, formatCurrency } from '@/data/bankData';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Search, Filter, Download, ArrowUpRight, ArrowDownLeft, Calendar, ShoppingCart, Banknote, Film, Zap, RefreshCw, Home, Coffee, Car, Gift } from 'lucide-react';
import { toast } from 'sonner';

type FilterType = 'all' | 'credit' | 'debit';

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

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<FilterType>('all');
  const [showFilters, setShowFilters] = useState(false);

  const filteredTransactions = transactions.filter((t) => {
    const matchesSearch = t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = filterType === 'all' || t.type === filterType;
    return matchesSearch && matchesType;
  });

  const groupedTransactions = filteredTransactions.reduce((groups, transaction) => {
    const date = new Date(transaction.date).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
    if (!groups[date]) groups[date] = [];
    groups[date].push(transaction);
    return groups;
  }, {} as Record<string, typeof transactions>);

  const handleExport = () => {
    toast.success('Export started!', {
      description: 'Your transaction history will be downloaded shortly.',
    });
  };

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-8">
      <Header title="Transaction History" subtitle="View and manage all your transactions" />

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 animate-fade-in">
        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search transactions..."
            className="w-full h-12 pl-12 pr-4 rounded-xl bg-card border border-border focus:ring-2 focus:ring-primary transition-all"
          />
        </div>

        <button
          onClick={() => setShowFilters(!showFilters)}
          className={cn(
            'flex items-center gap-2 px-6 h-12 rounded-xl border transition-all duration-300',
            showFilters ? 'bg-primary text-primary-foreground border-primary' : 'bg-card border-border hover:border-primary'
          )}
        >
          <Filter size={18} />
          <span className="font-medium">Filters</span>
        </button>

        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-6 h-12 rounded-xl bg-card border border-border hover:border-primary transition-all duration-300"
        >
          <Download size={18} />
          <span className="font-medium hidden sm:inline">Export</span>
        </button>
      </div>

      {/* Filter Options */}
      {showFilters && (
        <div className="flex flex-wrap gap-3 p-4 bg-card rounded-xl border border-border animate-slide-down">
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Type:</span>
            {(['all', 'credit', 'debit'] as FilterType[]).map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300',
                  filterType === type
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary hover:bg-secondary/80'
                )}
              >
                {type.charAt(0).toUpperCase() + type.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4 animate-slide-up">
          <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
            <ArrowDownLeft size={20} className="text-success" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Income</p>
            <p className="text-xl font-bold text-success">
              +{formatCurrency(transactions.filter(t => t.type === 'credit').reduce((sum, t) => sum + t.amount, 0))}
            </p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
            <ArrowUpRight size={20} className="text-destructive" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Expenses</p>
            <p className="text-xl font-bold text-destructive">
              -{formatCurrency(transactions.filter(t => t.type === 'debit').reduce((sum, t) => sum + t.amount, 0))}
            </p>
          </div>
        </div>

        <div className="bg-card rounded-xl border border-border p-4 flex items-center gap-4 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
            <Calendar size={20} className="text-primary" />
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Transactions</p>
            <p className="text-xl font-bold text-foreground">{transactions.length}</p>
          </div>
        </div>
      </div>

      {/* Transactions List */}
      <div className="space-y-6">
        {Object.entries(groupedTransactions).map(([date, dayTransactions], groupIndex) => (
          <div key={date} className="animate-fade-in" style={{ animationDelay: `${groupIndex * 100}ms` }}>
            <h3 className="text-sm font-medium text-muted-foreground mb-3">{date}</h3>
            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              {dayTransactions.map((transaction, index) => {
                const Icon = iconMap[transaction.icon] || ShoppingCart;
                return (
                  <div
                    key={transaction.id}
                    className={cn(
                      'flex items-center gap-4 p-4 hover:bg-secondary/50 transition-all duration-300 cursor-pointer',
                      index !== dayTransactions.length - 1 && 'border-b border-border'
                    )}
                  >
                    {/* Icon */}
                    <div className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center',
                      transaction.type === 'credit' ? 'bg-success/10' : 'bg-secondary'
                    )}>
                      <Icon size={20} className={transaction.type === 'credit' ? 'text-success' : 'text-muted-foreground'} />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground truncate">{transaction.description}</p>
                      <p className="text-sm text-muted-foreground">{transaction.category}</p>
                    </div>

                    {/* Amount & Status */}
                    <div className="text-right">
                      <div className="flex items-center justify-end gap-1">
                        {transaction.type === 'credit' ? (
                          <ArrowDownLeft size={16} className="text-success" />
                        ) : (
                          <ArrowUpRight size={16} className="text-destructive" />
                        )}
                        <span className={cn(
                          'font-semibold',
                          transaction.type === 'credit' ? 'text-success' : 'text-foreground'
                        )}>
                          {transaction.type === 'credit' ? '+' : '-'}{formatCurrency(transaction.amount)}
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
              })}
            </div>
          </div>
        ))}
      </div>

      {filteredTransactions.length === 0 && (
        <div className="text-center py-12 animate-fade-in">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
            <Search size={24} className="text-muted-foreground" />
          </div>
          <p className="text-lg font-medium text-foreground">No transactions found</p>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}
