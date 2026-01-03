import { Header } from '@/components/layout/Header';
import { accounts } from '@/data/bankData';
import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown, Eye, EyeOff, MoreVertical, Plus } from 'lucide-react';
import { useState } from 'react';

export default function Accounts() {
  const [showBalances, setShowBalances] = useState(true);

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-8">
      <Header title="My Accounts" subtitle="Manage all your accounts in one place" />

      {/* Toggle Balance Visibility */}
      <div className="flex justify-end">
        <button
          onClick={() => setShowBalances(!showBalances)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-300"
        >
          {showBalances ? <EyeOff size={18} /> : <Eye size={18} />}
          <span className="text-sm font-medium">{showBalances ? 'Hide' : 'Show'} Balances</span>
        </button>
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {accounts.map((account, index) => (
          <div
            key={account.id}
            className={cn(
              'relative p-6 rounded-2xl overflow-hidden transition-all duration-500 hover-lift animate-scale-in',
              account.type === 'savings' && 'gradient-card',
              account.type === 'current' && 'gradient-accent',
              account.type === 'credit' && 'gradient-gold'
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

            {/* Header */}
            <div className="relative flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <span className="text-3xl">{account.icon}</span>
                <div>
                  <p className="text-white/80 text-sm">{account.type.charAt(0).toUpperCase() + account.type.slice(1)}</p>
                  <p className="text-white font-semibold">{account.name}</p>
                </div>
              </div>
              <button className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors">
                <MoreVertical size={16} className="text-white" />
              </button>
            </div>

            {/* Balance */}
            <div className="relative mb-6">
              <p className="text-white/70 text-sm mb-1">Available Balance</p>
              <h2 className={cn(
                'text-3xl font-bold font-display text-white transition-all duration-300',
                !showBalances && 'blur-md select-none'
              )}>
                {account.balance < 0 ? '-' : ''}${Math.abs(account.balance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
              </h2>
            </div>

            {/* Account Number */}
            <div className="relative flex items-center justify-between">
              <span className="text-white/70 font-mono text-sm">{account.number}</span>
              <div className="flex items-center gap-1">
                {account.balance >= 0 ? (
                  <TrendingUp size={16} className="text-green-300" />
                ) : (
                  <TrendingDown size={16} className="text-red-300" />
                )}
                <span className="text-white text-sm font-medium">
                  {account.balance >= 0 ? '+2.5%' : '-1.2%'}
                </span>
              </div>
            </div>
          </div>
        ))}

        {/* Add New Account Card */}
        <button className="p-6 rounded-2xl border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all duration-300 flex flex-col items-center justify-center gap-4 min-h-[200px] group animate-fade-in">
          <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
            <Plus size={24} className="text-muted-foreground group-hover:text-primary" />
          </div>
          <div className="text-center">
            <p className="font-semibold text-foreground">Add New Account</p>
            <p className="text-sm text-muted-foreground">Link an external account</p>
          </div>
        </button>
      </div>

      {/* Account Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <TrendingUp size={24} className="text-primary" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Income</p>
              <p className="text-2xl font-bold text-foreground">$24,500</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center">
              <TrendingDown size={24} className="text-destructive" />
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Total Expenses</p>
              <p className="text-2xl font-bold text-foreground">$8,320</p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
              <span className="text-xl">💰</span>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Net Savings</p>
              <p className="text-2xl font-bold text-success">+$16,180</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
