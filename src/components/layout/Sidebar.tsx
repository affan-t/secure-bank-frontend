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
} from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/accounts', label: 'Accounts', icon: Wallet },
  { path: '/transfer', label: 'Transfer', icon: ArrowRightLeft },
  { path: '/transactions', label: 'History', icon: History },
  { path: '/cards', label: 'Cards', icon: CreditCard },
  { path: '/profile', label: 'Profile', icon: User },
  { path: '/settings', label: 'Settings', icon: Settings },
];

export function Sidebar() {
  const location = useLocation();
  const { user, logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <aside
      className={cn(
        'hidden md:flex flex-col h-screen bg-sidebar text-sidebar-foreground transition-all duration-300 ease-smooth fixed left-0 top-0 z-40',
        collapsed ? 'w-20' : 'w-64'
      )}
    >
      {/* Logo */}
      <div className="flex items-center justify-between p-6 border-b border-sidebar-border">
        <div className={cn('flex items-center gap-3 transition-opacity duration-300', collapsed && 'opacity-0 w-0 overflow-hidden')}>
          <div className="w-10 h-10 rounded-xl gradient-card flex items-center justify-center shadow-glow">
            <span className="text-xl font-bold text-white">N</span>
          </div>
          <span className="font-display font-bold text-xl">NexBank</span>
        </div>
        {collapsed && (
          <div className="w-10 h-10 rounded-xl gradient-card flex items-center justify-center shadow-glow mx-auto">
            <span className="text-xl font-bold text-white">N</span>
          </div>
        )}
      </div>

      {/* Collapse Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-20 w-6 h-6 bg-primary rounded-full flex items-center justify-center text-primary-foreground shadow-lg hover:scale-110 transition-transform"
      >
        {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
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
                <div className="absolute right-2 w-1.5 h-1.5 bg-sidebar-primary-foreground rounded-full animate-pulse" />
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
          <span className={cn('font-medium', collapsed && 'hidden')}>Logout</span>
        </button>
      </div>
    </aside>
  );
}
