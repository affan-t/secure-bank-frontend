import { Header } from '@/components/layout/Header';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/data/bankData';
import { useLanguage } from '@/contexts/LanguageContext';
import { toast } from 'sonner';
import { Check, Smartphone, Phone, Zap, Clock, Wifi, Gift } from 'lucide-react';

interface Operator {
  id: string;
  name: string;
  color: string;
  logo: string;
}

interface Package {
  id: string;
  name: string;
  price: number;
  validity: string;
  data?: string;
  minutes?: string;
  sms?: string;
  type: 'prepaid' | 'bundle';
}

const operators: Operator[] = [
  { id: 'jazz', name: 'Jazz', color: 'bg-red-500', logo: 'J' },
  { id: 'telenor', name: 'Telenor', color: 'bg-blue-500', logo: 'T' },
  { id: 'zong', name: 'Zong', color: 'bg-green-500', logo: 'Z' },
  { id: 'ufone', name: 'Ufone', color: 'bg-orange-500', logo: 'U' },
];

const packages: Record<string, Package[]> = {
  jazz: [
    { id: 'j1', name: 'Daily Load', price: 50, validity: '1 Day', type: 'prepaid' },
    { id: 'j2', name: 'Weekly Load', price: 200, validity: '7 Days', type: 'prepaid' },
    { id: 'j3', name: 'Monthly Load', price: 500, validity: '30 Days', type: 'prepaid' },
    { id: 'j4', name: 'Super Duper Card', price: 599, validity: '30 Days', data: '6GB', minutes: '1500', sms: '1500', type: 'bundle' },
    { id: 'j5', name: 'Weekly Premium', price: 350, validity: '7 Days', data: '5GB', minutes: '500', sms: '500', type: 'bundle' },
    { id: 'j6', name: 'Daily All-in-One', price: 55, validity: '1 Day', data: '500MB', minutes: '50', sms: '50', type: 'bundle' },
  ],
  telenor: [
    { id: 't1', name: 'Daily Load', price: 50, validity: '1 Day', type: 'prepaid' },
    { id: 't2', name: 'Weekly Load', price: 200, validity: '7 Days', type: 'prepaid' },
    { id: 't3', name: 'Monthly Load', price: 500, validity: '30 Days', type: 'prepaid' },
    { id: 't4', name: 'Monthly Pro', price: 799, validity: '30 Days', data: '12GB', minutes: '3000', sms: '3000', type: 'bundle' },
    { id: 't5', name: 'Weekly Social', price: 150, validity: '7 Days', data: '3GB', minutes: '300', sms: '300', type: 'bundle' },
    { id: 't6', name: 'Daily Smart', price: 35, validity: '1 Day', data: '200MB', minutes: '30', sms: '30', type: 'bundle' },
  ],
  zong: [
    { id: 'z1', name: 'Daily Load', price: 50, validity: '1 Day', type: 'prepaid' },
    { id: 'z2', name: 'Weekly Load', price: 200, validity: '7 Days', type: 'prepaid' },
    { id: 'z3', name: 'Monthly Load', price: 500, validity: '30 Days', type: 'prepaid' },
    { id: 'z4', name: 'Supreme Offer', price: 999, validity: '30 Days', data: '15GB', minutes: '5000', sms: '5000', type: 'bundle' },
    { id: 'z5', name: 'Weekly Max', price: 299, validity: '7 Days', data: '4GB', minutes: '1000', sms: '1000', type: 'bundle' },
    { id: 'z6', name: 'Daily Basic', price: 25, validity: '1 Day', data: '100MB', minutes: '20', sms: '20', type: 'bundle' },
  ],
  ufone: [
    { id: 'u1', name: 'Daily Load', price: 50, validity: '1 Day', type: 'prepaid' },
    { id: 'u2', name: 'Weekly Load', price: 200, validity: '7 Days', type: 'prepaid' },
    { id: 'u3', name: 'Monthly Load', price: 500, validity: '30 Days', type: 'prepaid' },
    { id: 'u4', name: 'Super Card Plus', price: 699, validity: '30 Days', data: '8GB', minutes: '2000', sms: '2000', type: 'bundle' },
    { id: 'u5', name: 'Weekly Power', price: 199, validity: '7 Days', data: '2GB', minutes: '500', sms: '500', type: 'bundle' },
    { id: 'u6', name: 'Daily Lite', price: 30, validity: '1 Day', data: '150MB', minutes: '25', sms: '25', type: 'bundle' },
  ],
};

export default function MobileRecharge() {
  const { t } = useLanguage();
  const [selectedOperator, setSelectedOperator] = useState<Operator | null>(null);
  const [mobileNumber, setMobileNumber] = useState('');
  const [selectedPackage, setSelectedPackage] = useState<Package | null>(null);
  const [packageType, setPackageType] = useState<'prepaid' | 'bundle'>('bundle');
  const [isLoading, setIsLoading] = useState(false);

  const filteredPackages = selectedOperator
    ? packages[selectedOperator.id].filter(p => p.type === packageType)
    : [];

  const handleRecharge = () => {
    if (!selectedOperator || !mobileNumber || !selectedPackage) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!/^03\d{9}$/.test(mobileNumber)) {
      toast.error('Please enter a valid Pakistani mobile number (03XXXXXXXXX)');
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      toast.success(t('rechargeSuccess'), {
        description: `${selectedPackage.name} of ${formatCurrency(selectedPackage.price)} recharged to ${mobileNumber}`,
      });
      setIsLoading(false);
      setSelectedPackage(null);
      setMobileNumber('');
    }, 2000);
  };

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-8">
      <Header title={t('mobileRecharge')} subtitle="Recharge prepaid and buy bundles" />

      {/* Operator Selection */}
      <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Smartphone size={20} className="text-primary" />
          {t('selectOperator')}
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {operators.map((operator, index) => (
            <button
              key={operator.id}
              onClick={() => {
                setSelectedOperator(operator);
                setSelectedPackage(null);
              }}
              className={cn(
                'flex flex-col items-center gap-3 p-6 rounded-2xl border-2 transition-all duration-300 animate-scale-in hover-lift',
                selectedOperator?.id === operator.id
                  ? 'border-primary bg-primary/5 shadow-glow'
                  : 'border-transparent bg-secondary/50 hover:bg-secondary'
              )}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={cn('w-16 h-16 rounded-2xl flex items-center justify-center text-white text-2xl font-bold', operator.color)}>
                {operator.logo}
              </div>
              <span className="font-semibold text-foreground">{operator.name}</span>
              {selectedOperator?.id === operator.id && (
                <Check size={20} className="text-primary" />
              )}
            </button>
          ))}
        </div>
      </div>

      {selectedOperator && (
        <>
          {/* Mobile Number Input */}
          <div className="bg-card rounded-2xl border border-border p-6 animate-fade-in">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Phone size={20} className="text-primary" />
              {t('mobileNumber')}
            </h3>

            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-medium">+92</span>
                  <input
                    type="tel"
                    value={mobileNumber}
                    onChange={(e) => setMobileNumber(e.target.value.replace(/\D/g, '').slice(0, 11))}
                    placeholder="3XX XXXXXXX"
                    className="w-full h-14 pl-14 pr-4 rounded-xl bg-secondary/50 border-2 border-transparent focus:border-primary transition-colors text-lg"
                  />
                </div>
                <p className="text-sm text-muted-foreground mt-2">Enter {selectedOperator.name} number</p>
              </div>
            </div>
          </div>

          {/* Package Type Toggle */}
          <div className="flex gap-2 p-1 bg-secondary/50 rounded-xl w-fit">
            <button
              onClick={() => {
                setPackageType('bundle');
                setSelectedPackage(null);
              }}
              className={cn(
                'px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2',
                packageType === 'bundle'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Gift size={18} />
              Bundles
            </button>
            <button
              onClick={() => {
                setPackageType('prepaid');
                setSelectedPackage(null);
              }}
              className={cn(
                'px-6 py-3 rounded-lg font-medium transition-all duration-300 flex items-center gap-2',
                packageType === 'prepaid'
                  ? 'bg-primary text-primary-foreground shadow-md'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              <Zap size={18} />
              Prepaid
            </button>
          </div>

          {/* Package Selection */}
          <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Gift size={20} className="text-primary" />
              {t('selectPackage')}
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredPackages.map((pkg, index) => (
                <button
                  key={pkg.id}
                  onClick={() => setSelectedPackage(pkg)}
                  className={cn(
                    'p-4 rounded-xl border-2 text-left transition-all duration-300 animate-scale-in',
                    selectedPackage?.id === pkg.id
                      ? 'border-primary bg-primary/5'
                      : 'border-transparent bg-secondary/50 hover:bg-secondary'
                  )}
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <p className="font-semibold text-foreground">{pkg.name}</p>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                        <Clock size={14} />
                        {pkg.validity}
                      </div>
                    </div>
                    <p className="text-lg font-bold text-primary">{formatCurrency(pkg.price)}</p>
                  </div>

                  {pkg.type === 'bundle' && (
                    <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-border">
                      {pkg.data && (
                        <div className="text-center p-2 bg-background rounded-lg">
                          <Wifi size={16} className="mx-auto text-primary mb-1" />
                          <p className="text-xs font-medium text-foreground">{pkg.data}</p>
                          <p className="text-[10px] text-muted-foreground">Data</p>
                        </div>
                      )}
                      {pkg.minutes && (
                        <div className="text-center p-2 bg-background rounded-lg">
                          <Phone size={16} className="mx-auto text-success mb-1" />
                          <p className="text-xs font-medium text-foreground">{pkg.minutes}</p>
                          <p className="text-[10px] text-muted-foreground">Mins</p>
                        </div>
                      )}
                      {pkg.sms && (
                        <div className="text-center p-2 bg-background rounded-lg">
                          <Smartphone size={16} className="mx-auto text-warning mb-1" />
                          <p className="text-xs font-medium text-foreground">{pkg.sms}</p>
                          <p className="text-[10px] text-muted-foreground">SMS</p>
                        </div>
                      )}
                    </div>
                  )}

                  {selectedPackage?.id === pkg.id && (
                    <div className="absolute top-2 right-2">
                      <Check size={20} className="text-primary" />
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Recharge Button */}
          {selectedPackage && (
            <div className="bg-card rounded-2xl border border-border p-6 animate-fade-in">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Amount</p>
                  <p className="text-2xl font-bold text-foreground">{formatCurrency(selectedPackage.price)}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-muted-foreground">Package</p>
                  <p className="font-semibold text-foreground">{selectedPackage.name}</p>
                </div>
              </div>

              <button
                onClick={handleRecharge}
                disabled={isLoading || !mobileNumber}
                className={cn(
                  'w-full h-14 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300',
                  isLoading || !mobileNumber
                    ? 'bg-muted text-muted-foreground cursor-not-allowed'
                    : 'gradient-bg text-white hover:opacity-90'
                )}
              >
                {isLoading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    {t('rechargeNow')}
                    <Zap size={18} />
                  </>
                )}
              </button>
            </div>
          )}
        </>
      )}

      {/* Recent Recharges */}
      <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
        <h3 className="font-semibold text-foreground mb-4">Recent Recharges</h3>
        <div className="space-y-3">
          {[
            { operator: 'Jazz', number: '0300 1234567', amount: 599, date: '28 Dec 2024', package: 'Super Duper Card' },
            { operator: 'Telenor', number: '0345 9876543', amount: 200, date: '25 Dec 2024', package: 'Weekly Load' },
            { operator: 'Zong', number: '0311 5555666', amount: 999, date: '20 Dec 2024', package: 'Supreme Offer' },
          ].map((recharge, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={cn(
                  'w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold',
                  recharge.operator === 'Jazz' ? 'bg-red-500' :
                  recharge.operator === 'Telenor' ? 'bg-blue-500' :
                  recharge.operator === 'Zong' ? 'bg-green-500' : 'bg-orange-500'
                )}>
                  {recharge.operator[0]}
                </div>
                <div>
                  <p className="font-medium text-foreground">{recharge.number}</p>
                  <p className="text-sm text-muted-foreground">{recharge.package}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="font-semibold text-foreground">{formatCurrency(recharge.amount)}</p>
                <p className="text-sm text-muted-foreground">{recharge.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
