import { Header } from '@/components/layout/Header';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/data/bankData';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Check, Zap, Flame, Droplets, Phone, Wifi, Tv, Building2, ArrowRight, Receipt } from 'lucide-react';
import { TransactionSlip } from '@/components/TransactionSlip';

interface TransactionDetails {
  type: 'bill' | 'recharge' | 'transfer';
  transactionId: string;
  date: string;
  time: string;
  amount: number;
  status: 'success' | 'failed';
  provider?: string;
  consumerNumber?: string;
  consumerName?: string;
}

interface Provider {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  color: string;
}

const providers: Provider[] = [
  { id: 'kelectric', name: 'K-Electric', icon: <Zap size={24} />, category: 'electricity', color: 'bg-yellow-500' },
  { id: 'lesco', name: 'LESCO', icon: <Zap size={24} />, category: 'electricity', color: 'bg-orange-500' },
  { id: 'iesco', name: 'IESCO', icon: <Zap size={24} />, category: 'electricity', color: 'bg-blue-500' },
  { id: 'pesco', name: 'PESCO', icon: <Zap size={24} />, category: 'electricity', color: 'bg-green-500' },
  { id: 'sngpl', name: 'SNGPL', icon: <Flame size={24} />, category: 'gas', color: 'bg-red-500' },
  { id: 'ssgc', name: 'SSGC', icon: <Flame size={24} />, category: 'gas', color: 'bg-orange-600' },
  { id: 'ptcl', name: 'PTCL', icon: <Phone size={24} />, category: 'telephone', color: 'bg-emerald-500' },
  { id: 'nayatel', name: 'Nayatel', icon: <Wifi size={24} />, category: 'internet', color: 'bg-purple-500' },
  { id: 'stormfiber', name: 'StormFiber', icon: <Wifi size={24} />, category: 'internet', color: 'bg-cyan-500' },
  { id: 'fesco', name: 'FESCO', icon: <Zap size={24} />, category: 'electricity', color: 'bg-indigo-500' },
  { id: 'wasa', name: 'WASA', icon: <Droplets size={24} />, category: 'water', color: 'bg-blue-400' },
  { id: 'cable', name: 'Cable TV', icon: <Tv size={24} />, category: 'tv', color: 'bg-pink-500' },
];

const categories = [
  { id: 'all', name: 'All' },
  { id: 'electricity', name: 'Electricity' },
  { id: 'gas', name: 'Gas' },
  { id: 'telephone', name: 'Telephone' },
  { id: 'internet', name: 'Internet' },
  { id: 'water', name: 'Water' },
];

export default function BillPayment() {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProvider, setSelectedProvider] = useState<Provider | null>(null);
  const [consumerNumber, setConsumerNumber] = useState('');
  const [billFetched, setBillFetched] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showSlip, setShowSlip] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<TransactionDetails | null>(null);
  const [billDetails, setBillDetails] = useState({
    amount: 0,
    dueDate: '',
    consumerName: '',
  });

  const filteredProviders = selectedCategory === 'all' 
    ? providers 
    : providers.filter(p => p.category === selectedCategory);

  const handleFetchBill = () => {
    if (!selectedProvider || !consumerNumber) {
      toast.error('Please select a provider and enter consumer number');
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setBillDetails({
        amount: Math.floor(Math.random() * 20000) + 2000,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-PK'),
        consumerName: 'Ahmad Khan',
      });
      setBillFetched(true);
      setIsLoading(false);
    }, 1500);
  };

  const handlePayBill = () => {
    setIsLoading(true);
    
    setTimeout(() => {
      const now = new Date();
      const txnDetails: TransactionDetails = {
        type: 'bill',
        transactionId: `TXN${Date.now()}`,
        date: now.toLocaleDateString('en-PK'),
        time: now.toLocaleTimeString('en-PK'),
        amount: billDetails.amount,
        status: 'success',
        provider: selectedProvider?.name,
        consumerNumber: consumerNumber,
        consumerName: billDetails.consumerName,
      };
      
      setTransactionDetails(txnDetails);
      setShowSlip(true);
      toast.success(t('paymentSuccess'), {
        description: `${formatCurrency(billDetails.amount)} paid to ${selectedProvider?.name}`,
      });
      setIsLoading(false);
      setBillFetched(false);
      setSelectedProvider(null);
      setConsumerNumber('');
    }, 2000);
  };

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-8">
      <Header title={t('billPayment')} subtitle="Pay your utility bills instantly" />
      
      {/* Transaction Slip Modal */}
      {transactionDetails && (
        <TransactionSlip
          isOpen={showSlip}
          onClose={() => setShowSlip(false)}
          transactionDetails={transactionDetails}
        />
      )}

      {/* Category Filters */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={cn(
              'px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all duration-300',
              selectedCategory === cat.id
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary text-muted-foreground hover:bg-secondary/80'
            )}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Provider Selection */}
        <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Building2 size={20} className="text-primary" />
            {t('selectProvider')}
          </h3>
          
          <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
            {filteredProviders.map((provider, index) => (
              <button
                key={provider.id}
                onClick={() => {
                  setSelectedProvider(provider);
                  setBillFetched(false);
                }}
                className={cn(
                  'flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all duration-300 animate-scale-in',
                  selectedProvider?.id === provider.id
                    ? 'border-primary bg-primary/5'
                    : 'border-transparent bg-secondary/50 hover:bg-secondary'
                )}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-white', provider.color)}>
                  {provider.icon}
                </div>
                <span className="text-xs font-medium text-foreground text-center">{provider.name}</span>
                {selectedProvider?.id === provider.id && (
                  <Check size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Bill Details Form */}
        <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
            <Receipt size={20} className="text-primary" />
            Bill Details
          </h3>

          {selectedProvider ? (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-secondary/50 rounded-xl">
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center text-white', selectedProvider.color)}>
                  {selectedProvider.icon}
                </div>
                <div>
                  <p className="font-semibold text-foreground">{selectedProvider.name}</p>
                  <p className="text-sm text-muted-foreground capitalize">{selectedProvider.category}</p>
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">
                  {t('customerNumber')}
                </label>
                <input
                  type="text"
                  value={consumerNumber}
                  onChange={(e) => setConsumerNumber(e.target.value)}
                  placeholder="Enter your consumer/reference number"
                  className="w-full h-12 px-4 rounded-xl bg-secondary/50 border-2 border-transparent focus:border-primary transition-colors"
                />
              </div>

              {!billFetched ? (
                <button
                  onClick={handleFetchBill}
                  disabled={isLoading || !consumerNumber}
                  className={cn(
                    'w-full h-12 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300',
                    isLoading || !consumerNumber
                      ? 'bg-muted text-muted-foreground cursor-not-allowed'
                      : 'gradient-bg text-white hover:opacity-90'
                  )}
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      {t('fetchBill')}
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              ) : (
                <div className="space-y-4 animate-fade-in">
                  <div className="p-4 bg-success/10 rounded-xl border border-success/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">Consumer Name</span>
                      <span className="font-medium text-foreground">{billDetails.consumerName}</span>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">{t('dueDate')}</span>
                      <span className="font-medium text-foreground">{billDetails.dueDate}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-success/20">
                      <span className="text-sm font-medium text-foreground">{t('billAmount')}</span>
                      <span className="text-xl font-bold text-success">{formatCurrency(billDetails.amount)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePayBill}
                    disabled={isLoading}
                    className="w-full h-12 rounded-xl gradient-bg text-white font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        {t('payNow')} - {formatCurrency(billDetails.amount)}
                        <Check size={18} />
                      </>
                    )}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <Building2 size={32} className="text-muted-foreground" />
              </div>
              <p className="text-muted-foreground">Select a provider to continue</p>
            </div>
          )}
        </div>
      </div>

      {/* Recent Bills */}
      <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <h3 className="font-semibold text-foreground mb-4">Recent Bill Payments</h3>
        <div className="space-y-3">
          {[
            { provider: 'K-Electric', amount: 8500, date: '28 Dec 2024', status: 'Paid' },
            { provider: 'SNGPL', amount: 3200, date: '25 Dec 2024', status: 'Paid' },
            { provider: 'PTCL', amount: 2100, date: '20 Dec 2024', status: 'Paid' },
          ].map((bill, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <Receipt size={20} className="text-primary" />
                </div>
                <div>
                  <p className="font-medium text-foreground">{bill.provider}</p>
                  <p className="text-sm text-muted-foreground">{bill.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{formatCurrency(bill.amount)}</p>
                <span className="text-xs px-2 py-1 rounded-full bg-success/10 text-success">{bill.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
