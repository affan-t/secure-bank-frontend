import { Header } from '@/components/layout/Header';
import { accounts, contacts, formatCurrency } from '@/data/bankData';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ArrowRight, Check, User, Building, CreditCard, ChevronDown, Wallet } from 'lucide-react';
import { toast } from 'sonner';
import { TransactionSlip } from '@/components/TransactionSlip';
import { useLanguage } from '@/contexts/LanguageContext';

type TransferType = 'own' | 'contact' | 'other';

const iconMap: Record<string, any> = {
  savings: Wallet,
  account: Building,
  credit: CreditCard,
};

export default function Transfer() {
  const { t } = useLanguage();
  const [transferType, setTransferType] = useState<TransferType>('contact');
  const [fromAccount, setFromAccount] = useState(accounts[0]);
  const [toContact, setToContact] = useState(contacts[0]);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showFromDropdown, setShowFromDropdown] = useState(false);
  const [showReceipt, setShowReceipt] = useState(false);
  const [transactionDetails, setTransactionDetails] = useState<any>(null);

  // Other bank transfer fields
  const [otherBankName, setOtherBankName] = useState('');
  const [otherAccountNumber, setOtherAccountNumber] = useState('');
  const [otherBeneficiaryName, setOtherBeneficiaryName] = useState('');

  const handleTransfer = async () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Please enter a valid amount');
      return;
    }

    if (parseFloat(amount) > fromAccount.balance) {
      toast.error('Insufficient balance');
      return;
    }

    if (transferType === 'other' && (!otherBankName || !otherAccountNumber || !otherBeneficiaryName)) {
      toast.error('Please fill all beneficiary details');
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsSuccess(true);

    const now = new Date();
    const txnId = 'NXB' + now.getFullYear() + (now.getMonth() + 1).toString().padStart(2, '0') + now.getDate().toString().padStart(2, '0') + Math.random().toString().slice(2, 12);

    const details = {
      type: 'transfer' as const,
      transactionId: txnId,
      date: now.toLocaleDateString('en-PK', { day: 'numeric', month: 'long', year: 'numeric' }),
      time: now.toLocaleTimeString('en-PK', { hour: '2-digit', minute: '2-digit', hour12: true }),
      amount: parseFloat(amount),
      status: 'success' as const,
      fromAccount: fromAccount.name,
      fromAccountNumber: fromAccount.number,
      toAccount: transferType === 'other' ? otherAccountNumber : toContact.accountNumber,
      toAccountNumber: transferType === 'other' ? otherAccountNumber : toContact.accountNumber,
      beneficiaryName: transferType === 'other' ? otherBeneficiaryName : toContact.name,
      beneficiaryBank: transferType === 'other' ? otherBankName : 'NexBank',
      narration: note || `TRF TO ${(transferType === 'other' ? otherBeneficiaryName : toContact.name).toUpperCase()}`,
      reference: note || 'Fund Transfer',
    };

    setTransactionDetails(details);
    setShowReceipt(true);

    toast.success('Transfer successful!', {
      description: `${formatCurrency(parseFloat(amount))} sent to ${transferType === 'other' ? otherBeneficiaryName : toContact.name}`,
    });
  };

  const handleNewTransfer = () => {
    setIsSuccess(false);
    setAmount('');
    setNote('');
    setShowReceipt(false);
    setTransactionDetails(null);
    setOtherBankName('');
    setOtherAccountNumber('');
    setOtherBeneficiaryName('');
  };

  if (isSuccess && !showReceipt) {
    return (
      <div className="py-4 md:py-8 flex items-center justify-center min-h-[80vh]">
        <div className="text-center animate-scale-in">
          <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center">
            <Check size={48} className="text-success animate-bounce-soft" />
          </div>
          <h2 className="text-3xl font-display font-bold text-foreground mb-2">{t('transferSuccess')}</h2>
          <p className="text-muted-foreground mb-2">{t('youSent')}</p>
          <p className="text-4xl font-bold text-foreground mb-2">{formatCurrency(parseFloat(amount))}</p>
          <p className="text-muted-foreground mb-8">to {transferType === 'other' ? otherBeneficiaryName : toContact.name}</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={() => setShowReceipt(true)}
              className="px-6 py-3 rounded-xl border border-primary text-primary font-semibold hover:bg-primary/10 transition-colors"
            >
              {t('viewReceipt')}
            </button>
            <button
              onClick={handleNewTransfer}
              className="px-8 py-3 rounded-xl gradient-bg text-white font-semibold hover:scale-105 transition-transform"
            >
              {t('makeAnotherTransfer')}
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-8">
      <Header title={t('transfer')} subtitle={t('sendMoneyQuickly')} />

      {/* Transfer Type Tabs */}
      <div className="flex gap-2 p-1 bg-secondary rounded-xl animate-fade-in">
        {[
          { type: 'contact' as TransferType, label: t('toContact'), icon: User },
          { type: 'own' as TransferType, label: t('ownAccount'), icon: CreditCard },
          { type: 'other' as TransferType, label: t('otherBank'), icon: Building },
        ].map(({ type, label, icon: Icon }) => (
          <button
            key={type}
            onClick={() => setTransferType(type)}
            className={cn(
              'flex-1 flex items-center justify-center gap-2 py-3 rounded-lg transition-all duration-300',
              transferType === type
                ? 'bg-card text-foreground shadow-md'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            <Icon size={18} />
            <span className="hidden sm:inline font-medium">{label}</span>
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Transfer Form */}
        <div className="space-y-6">
          {/* From Account */}
          <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up">
            <label className="text-sm font-medium text-muted-foreground mb-4 block">{t('fromAccount')}</label>
            <div className="relative">
              <button
                onClick={() => setShowFromDropdown(!showFromDropdown)}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-secondary hover:bg-secondary/80 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {(() => {
                    const Icon = iconMap[fromAccount.icon] || Wallet;
                    return (
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                        <Icon size={20} className="text-primary" />
                      </div>
                    );
                  })()}
                  <div className="text-left">
                    <p className="font-medium text-foreground">{fromAccount.name}</p>
                    <p className="text-sm text-muted-foreground">{fromAccount.number}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-semibold text-foreground">
                    {formatCurrency(fromAccount.balance)}
                  </span>
                  <ChevronDown size={18} className={cn('transition-transform', showFromDropdown && 'rotate-180')} />
                </div>
              </button>

              {showFromDropdown && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-card rounded-xl border border-border shadow-xl z-10 overflow-hidden animate-slide-down">
                  {accounts.filter(a => a.id !== fromAccount.id && a.balance > 0).map((account) => {
                    const Icon = iconMap[account.icon] || Wallet;
                    return (
                      <button
                        key={account.id}
                        onClick={() => {
                          setFromAccount(account);
                          setShowFromDropdown(false);
                        }}
                        className="w-full flex items-center justify-between p-4 hover:bg-secondary transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Icon size={20} className="text-primary" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-foreground">{account.name}</p>
                            <p className="text-sm text-muted-foreground">{account.number}</p>
                          </div>
                        </div>
                        <span className="font-medium">{formatCurrency(account.balance)}</span>
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          {/* Amount */}
          <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <label className="text-sm font-medium text-muted-foreground mb-4 block">{t('amount')}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-2xl font-bold text-foreground">PKR</span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full h-20 pl-20 pr-4 text-3xl font-bold text-foreground bg-transparent border-2 border-border rounded-xl focus:border-primary focus:ring-0 transition-colors"
              />
            </div>
            <div className="flex gap-2 mt-4">
              {[10000, 25000, 50000, 100000].map((preset) => (
                <button
                  key={preset}
                  onClick={() => setAmount(preset.toString())}
                  className="flex-1 py-2 rounded-lg bg-secondary hover:bg-primary hover:text-primary-foreground transition-all duration-300 text-sm font-medium"
                >
                  {formatCurrency(preset)}
                </button>
              ))}
            </div>
          </div>

          {/* Note */}
          <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <label className="text-sm font-medium text-muted-foreground mb-4 block">{t('noteOptional')}</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder={t('addMessage')}
              className="w-full h-24 p-4 bg-secondary rounded-xl resize-none focus:ring-2 focus:ring-primary border-none transition-all"
            />
          </div>
        </div>

        {/* Recipient Selection */}
        <div className="space-y-6">
          {transferType === 'other' ? (
            /* Other Bank Transfer Form */
            <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
              <label className="text-sm font-medium text-muted-foreground mb-4 block">{t('beneficiaryDetails')}</label>
              
              <div className="space-y-4">
                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">{t('bankName')}</label>
                  <select
                    value={otherBankName}
                    onChange={(e) => setOtherBankName(e.target.value)}
                    className="w-full p-4 bg-secondary rounded-xl border-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="">{t('selectBank')}</option>
                    <option value="Habib Bank Limited">Habib Bank Limited (HBL)</option>
                    <option value="United Bank Limited">United Bank Limited (UBL)</option>
                    <option value="MCB Bank">MCB Bank</option>
                    <option value="Allied Bank">Allied Bank</option>
                    <option value="Bank Alfalah">Bank Alfalah</option>
                    <option value="Meezan Bank">Meezan Bank</option>
                    <option value="Faysal Bank">Faysal Bank</option>
                    <option value="Askari Bank">Askari Bank</option>
                    <option value="Standard Chartered">Standard Chartered</option>
                    <option value="JS Bank">JS Bank</option>
                    <option value="Bank Al Habib">Bank Al Habib</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">{t('accountNumber')}</label>
                  <input
                    type="text"
                    value={otherAccountNumber}
                    onChange={(e) => setOtherAccountNumber(e.target.value)}
                    placeholder={t('enterBeneficiaryAccountNumber')}
                    className="w-full p-4 bg-secondary rounded-xl border-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label className="text-xs text-muted-foreground mb-2 block">{t('beneficiaryName')}</label>
                  <input
                    type="text"
                    value={otherBeneficiaryName}
                    onChange={(e) => setOtherBeneficiaryName(e.target.value)}
                    placeholder={t('enterBeneficiaryName')}
                    className="w-full p-4 bg-secondary rounded-xl border-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
              <label className="text-sm font-medium text-muted-foreground mb-4 block">{t('sendTo')}</label>
              
              {/* Recent Contacts */}
              <div className="grid grid-cols-4 gap-4 mb-6">
                {contacts.map((contact) => (
                  <button
                    key={contact.id}
                    onClick={() => setToContact(contact)}
                    className={cn(
                      'flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-300',
                      toContact.id === contact.id
                        ? 'bg-primary/10 ring-2 ring-primary'
                        : 'hover:bg-secondary'
                    )}
                  >
                    <img
                      src={contact.avatar}
                      alt={contact.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <span className="text-xs font-medium text-foreground truncate w-full text-center">
                      {contact.name.split(' ')[0]}
                    </span>
                  </button>
                ))}
              </div>

              {/* Selected Contact Details */}
              <div className="p-4 bg-secondary rounded-xl">
                <div className="flex items-center gap-4">
                  <img
                    src={toContact.avatar}
                    alt={toContact.name}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-primary/30"
                  />
                  <div>
                    <p className="font-semibold text-foreground">{toContact.name}</p>
                    <p className="text-sm text-muted-foreground">{t('account')}: {toContact.accountNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Transfer Summary */}
          <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '250ms' }}>
            <h3 className="font-semibold text-foreground mb-4">{t('transferSummary')}</h3>
            <div className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t('amount')}</span>
                <span className="font-medium text-foreground">{amount ? formatCurrency(parseFloat(amount)) : 'PKR 0'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">{t('transferFee')}</span>
                <span className="font-medium text-success">{t('free')}</span>
              </div>
              <div className="h-px bg-border my-2" />
              <div className="flex justify-between">
                <span className="font-medium text-foreground">{t('total')}</span>
                <span className="font-bold text-lg text-foreground">{amount ? formatCurrency(parseFloat(amount)) : 'PKR 0'}</span>
              </div>
            </div>
          </div>

          {/* Transfer Button */}
          <button
            onClick={handleTransfer}
            disabled={isLoading || !amount}
            className={cn(
              'w-full h-14 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300',
              'gradient-bg text-white shadow-glow hover:shadow-xl hover:scale-[1.02]',
              (isLoading || !amount) && 'opacity-70 cursor-not-allowed'
            )}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                {t('sendMoney')}
                <ArrowRight size={20} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Transaction Receipt */}
      {showReceipt && transactionDetails && (
        <TransactionSlip
          isOpen={showReceipt}
          onClose={() => setShowReceipt(false)}
          transactionDetails={transactionDetails}
        />
      )}
    </div>
  );
}
