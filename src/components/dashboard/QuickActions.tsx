import { quickActions } from '@/data/bankData';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';
import { ArrowRightLeft, FileText, Plus, QrCode, Receipt, Smartphone } from 'lucide-react';

export function QuickActions() {
  const { t } = useLanguage();

  const actions = [
    { name: t('transfer'), icon: ArrowRightLeft, link: '/transfer', color: 'bg-primary hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.3)]' },
    { name: t('payBills'), icon: Receipt, link: '/bill-payment', color: 'bg-accent hover:bg-accent/90 shadow-[0_0_20px_hsl(var(--accent)/0.3)]' },
    { name: t('mobileRecharge'), icon: Smartphone, link: '/mobile-recharge', color: 'bg-success hover:bg-success/90 shadow-[0_0_20px_hsl(var(--success)/0.3)]' },
    { name: t('scanQR'), icon: QrCode, link: '/transfer', color: 'bg-warning hover:bg-warning/90 shadow-[0_0_20px_hsl(var(--warning)/0.3)]' },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 md:gap-4 animate-fade-in">
      {actions.map((action, index) => {
        const Icon = action.icon;
        
        return (
          <Link
            key={action.name}
            to={action.link}
            className={cn(
              'flex flex-col items-center gap-2 p-4 md:p-6 rounded-2xl transition-all duration-300 animate-scale-in btn-ripple',
              action.color
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Icon size={20} className="text-white md:w-6 md:h-6" />
            </div>
            <span className="text-xs md:text-sm font-medium text-white text-center">{action.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
