import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  CreditCard,
  ArrowRightLeft,
  History,
  User,
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

export function BottomNav() {
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/dashboard', label: t('home'), icon: LayoutDashboard },
    { path: '/transactions', label: t('transactions'), icon: History },
    { path: '/transfer', label: t('transfer'), icon: ArrowRightLeft },
    { path: '/cards', label: t('cards'), icon: CreditCard },
    { path: '/profile', label: t('profile'), icon: User },
  ];

  return (
    <nav className="bottom-nav">
      <div className="flex items-center justify-around py-2 px-4">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center gap-1 py-2 px-3 rounded-xl transition-all duration-300 relative',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground'
              )}
            >
              {isActive && (
                <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-8 h-1 rounded-full bg-primary animate-scale-in" />
              )}
              <div className={cn(
                'p-2 rounded-xl transition-all duration-300',
                isActive && 'bg-primary/10 scale-110'
              )}>
                <Icon size={22} className={cn(isActive && 'animate-bounce-soft')} />
              </div>
              <span className={cn(
                'text-[10px] font-medium transition-all duration-300',
                isActive ? 'opacity-100' : 'opacity-70'
              )}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
