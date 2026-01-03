import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  CreditCard,
  ArrowRightLeft,
  History,
  Wallet,
  User,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Receipt,
  Smartphone,
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { createContext, useContext, useState, ReactNode } from 'react';
import nexbankLogo from '@/assets/nexbank-logo.png';

// Create Sidebar Context for sharing collapsed state
interface SidebarContextType {
  collapsed: boolean;
  setCollapsed: (value: boolean) => void;
}

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    return { collapsed: false, setCollapsed: () => {} };
  }
  return context;
}

export function SidebarProvider({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);
  
  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </SidebarContext.Provider>
  );
}

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const { t, isRTL } = useLanguage();
  const { collapsed, setCollapsed } = useSidebar();

  const navItems = [
    { path: '/dashboard', label: t('dashboard'), icon: LayoutDashboard },
    { path: '/accounts', label: t('accounts'), icon: Wallet },
    { path: '/transfer', label: t('transfer'), icon: ArrowRightLeft },
    { path: '/transactions', label: t('transactions'), icon: History },
    { path: '/cards', label: t('cards'), icon: CreditCard },
    { path: '/bill-payment', label: t('billPayment'), icon: Receipt },
    { path: '/mobile-recharge', label: t('mobileRecharge'), icon: Smartphone },
    { path: '/profile', label: t('profile'), icon: User },
    { path: '/settings', label: t('settings'), icon: Settings },
  ];

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 ease-smooth fixed top-0 z-40',
        collapsed ? 'w-20' : 'w-64',
        isRTL ? 'right-0' : 'left-0'
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-center p-3 border-b border-sidebar-border min-h-[88px]">
        {collapsed ? (
          <div className="w-16 h-16 rounded-xl overflow-hidden shadow-glow flex-shrink-0 bg-[#0f172a] p-1">
            <img src={nexbankLogo} alt="NexBank" className="w-full h-full object-contain" />
          </div>
        ) : (
          <div className="flex items-center gap-3 w-full px-2">
            <div className="w-14 h-14 rounded-xl overflow-hidden shadow-glow flex-shrink-0 bg-[#0f172a] p-1">
              <img src={nexbankLogo} alt="NexBank" className="w-full h-full object-contain" />
            </div>
            <span className="font-display font-bold text-xl">NexBank</span>
          </div>
        )}
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          'absolute top-20 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg hover:scale-110 transition-transform',
          isRTL ? '-left-3' : '-right-3'
        )}
      >
        {isRTL ? (
          collapsed ? <ChevronLeft size={14} /> : <ChevronRight size={14} />
        ) : (
          collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 py-6 px-3 space-y-2 overflow-y-auto scrollbar-thin">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground shadow-glow'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {isActive && (
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer" />
              )}
              <Icon size={20} className={cn('transition-transform duration-300', isActive && 'scale-110')} />
              <span className={cn(
                'font-medium transition-all duration-300',
                collapsed && 'opacity-0 w-0 overflow-hidden'
              )}>
                {item.label}
              </span>
              {isActive && !collapsed && (
                <div className={cn(
                  'absolute w-1.5 h-1.5 bg-sidebar-primary-foreground rounded-full animate-pulse',
                  isRTL ? 'left-2' : 'right-2'
                )} />
              )}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="p-4 border-t border-sidebar-border">
        <div className={cn(
          'flex items-center gap-3 p-3 rounded-xl bg-sidebar-accent/50 transition-all duration-300',
          collapsed && 'justify-center'
        )}>
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'}
            alt="User"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-sidebar-primary/50"
          />
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate text-sm">{user?.name || 'Sarah Johnson'}</p>
              <p className="text-xs text-sidebar-foreground/60 truncate">{user?.email || 'sarah@email.com'}</p>
            </div>
          )}
        </div>
        
        <button
          onClick={logout}
          className={cn(
            'flex items-center gap-3 w-full mt-3 px-4 py-3 rounded-xl text-destructive hover:bg-destructive/10 transition-all duration-300',
            collapsed && 'justify-center'
          )}
        >
          <LogOut size={20} />
          <span className={cn('font-medium', collapsed && 'hidden')}>{t('logout')}</span>
        </button>
      </div>
    </aside>
  );
}
