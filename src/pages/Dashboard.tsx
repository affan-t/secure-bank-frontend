import { Header } from '@/components/layout/Header';
import { BalanceCard } from '@/components/dashboard/BalanceCard';
import { QuickActions } from '@/components/dashboard/QuickActions';
import { RecentTransactions } from '@/components/dashboard/RecentTransactions';
import { SpendingChart } from '@/components/dashboard/SpendingChart';
import { accounts } from '@/data/bankData';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';

export default function Dashboard() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const totalBalance = accounts.reduce((acc, account) => acc + account.balance, 0);

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-8">
      <Header 
        title={`${t('welcomeBack')}, ${user?.name?.split(' ')[0] || 'Ahmed'}`}
        subtitle={t('accountOverview')}
      />

      {/* Balance Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <BalanceCard
          type="total"
          name={t('totalBalance')}
          balance={totalBalance}
          icon="total"
          change={12.5}
          index={0}
        />
        {accounts.map((account, index) => (
          <BalanceCard
            key={account.id}
            type={account.type}
            name={account.name}
            balance={account.balance}
            accountNumber={account.number}
            icon={account.icon}
            index={index + 1}
          />
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">{t('quickActions')}</h3>
        <QuickActions />
      </div>

      {/* Charts and Transactions */}
      <div className="space-y-6">
        <SpendingChart />
        <RecentTransactions />
      </div>
    </div>
  );
}
