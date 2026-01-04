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
        'hidden md:flex flex-col h-screen bg-sidebar text-sidebar-foreground fixed top-0 z-40',
        'transition-[width] duration-300 ease-in-out',
        collapsed ? 'w-[80px]' : 'w-[260px]',
        isRTL ? 'right-0' : 'left-0'
      )}
    >
      {/* Logo Section */}
      <div className="h-[88px] flex items-center border-b border-sidebar-border px-4">
        <div className={cn(
          'flex items-center transition-all duration-300 ease-in-out',
          collapsed ? 'justify-center w-full' : 'justify-start w-full gap-3'
        )}>
          {/* Logo Icon - Always Visible */}
          <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0 bg-[#0c1929] border border-sidebar-border">
            <img 
              src={nexbankLogo} 
              alt="NexBank" 
              className="w-full h-full object-contain p-0.5" 
            />
          </div>
          
          {/* Logo Text - Hidden when collapsed */}
          <span 
            className={cn(
              'font-display font-bold text-xl whitespace-nowrap transition-all duration-300 ease-in-out',
              collapsed 
                ? 'opacity-0 w-0 overflow-hidden' 
                : 'opacity-100 w-auto'
            )}
          >
            NexBank
          </span>
        </div>
      </div>

      {/* Collapse Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className={cn(
          'absolute top-[100px] w-7 h-7 bg-primary rounded-full flex items-center justify-center',
          'text-primary-foreground shadow-lg hover:scale-110 transition-transform z-50',
          isRTL ? '-left-3.5' : '-right-3.5'
        )}
      >
        {isRTL ? (
          collapsed ? <ChevronLeft size={16} /> : <ChevronRight size={16} />
        ) : (
          collapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />
        )}
      </button>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto overflow-x-hidden scrollbar-thin">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              title={collapsed ? item.label : undefined}
              className={cn(
                'flex items-center h-10 rounded-lg transition-all duration-200 group relative',
                collapsed ? 'justify-center px-0' : 'justify-start px-3 gap-2',
                isActive
                  ? 'bg-sidebar-primary text-sidebar-primary-foreground'
                  : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'
              )}
            >
              {/* Active indicator bar */}
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-sidebar-primary-foreground rounded-r" />
              )}
              
              {/* Icon - Always Visible */}
              <Icon 
                size={18} 
                className="flex-shrink-0 relative z-10"
              />
              
              {/* Label - Hidden when collapsed */}
              <span 
                className={cn(
                  'text-xs font-medium whitespace-nowrap transition-all duration-300 ease-in-out relative z-10',
                  collapsed 
                    ? 'opacity-0 w-0 overflow-hidden' 
                    : 'opacity-100 w-auto'
                )}
              >
                {item.label}
              </span>
              
            </Link>
          );
        })}
      </nav>

      {/* User Profile Section */}
      <div className="border-t border-sidebar-border p-3">
        {/* User Info */}
        <div className={cn(
          'flex items-center h-14 rounded-xl bg-sidebar-accent/50 transition-all duration-300',
          collapsed ? 'justify-center px-0' : 'justify-start px-3 gap-3'
        )}>
          {/* Avatar - Always Visible */}
          <img
            src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'}
            alt="User"
            className="w-8 h-8 rounded-full object-cover ring-1 ring-sidebar-border flex-shrink-0"
          />
          
          {/* User Details - Hidden when collapsed */}
          <div className={cn(
            'flex-1 min-w-0 transition-all duration-300 ease-in-out',
            collapsed 
              ? 'opacity-0 w-0 overflow-hidden' 
              : 'opacity-100 w-auto'
          )}>
            <p className="font-medium truncate text-sm">{user?.name || 'Ahmed Khan'}</p>
            <p className="text-xs text-sidebar-foreground/60 truncate">{user?.email || 'ahmed@email.com'}</p>
          </div>
        </div>
        
        {/* Logout Button */}
        <button
          onClick={logout}
          title={collapsed ? t('logout') : undefined}
          className={cn(
            'flex items-center h-12 w-full mt-2 rounded-xl text-destructive hover:bg-destructive/10 transition-all duration-200',
            collapsed ? 'justify-center px-0' : 'justify-start px-4 gap-3'
          )}
        >
          {/* Logout Icon - Always Visible */}
          <LogOut size={20} className="flex-shrink-0" />
          
          {/* Logout Text - Hidden when collapsed */}
          <span 
            className={cn(
              'font-medium whitespace-nowrap transition-all duration-300 ease-in-out',
              collapsed 
                ? 'opacity-0 w-0 overflow-hidden' 
                : 'opacity-100 w-auto'
            )}
          >
            {t('logout')}
          </span>
        </button>
      </div>
    </aside>
  );
}
