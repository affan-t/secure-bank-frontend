import { useTheme } from '@/contexts/ThemeContext';
import { Bell, Search, Moon, Sun, CreditCard, AlertCircle, Gift, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState, useRef, useEffect } from 'react';
import { notifications as initialNotifications, Notification } from '@/data/bankData';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

const getNotificationIcon = (type: Notification['type']) => {
  switch (type) {
    case 'transaction':
      return <CreditCard size={16} className="text-primary" />;
    case 'alert':
      return <AlertCircle size={16} className="text-destructive" />;
    case 'promo':
      return <Gift size={16} className="text-success" />;
    default:
      return <Info size={16} className="text-muted-foreground" />;
  }
};

export function Header({ title, subtitle }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(initialNotifications);
  const notificationRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  return (
    <header className="flex items-center justify-between py-4 md:py-6 animate-slide-down">
      {/* Title Section */}
      <div className="flex-1">
        <h1 className="text-2xl md:text-3xl font-display font-bold text-foreground">
          {title}
        </h1>
        {subtitle && (
          <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 md:gap-4">
        {/* Search */}
        <div className={cn(
          'relative transition-all duration-300 ease-smooth',
          showSearch ? 'w-48 md:w-64' : 'w-10'
        )}>
          <button
            onClick={() => setShowSearch(!showSearch)}
            className={cn(
              'absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 flex items-center justify-center rounded-xl transition-all duration-300',
              showSearch ? 'bg-transparent' : 'bg-secondary hover:bg-secondary/80'
            )}
          >
            <Search size={18} className="text-muted-foreground" />
          </button>
          <input
            type="text"
            placeholder="Search..."
            className={cn(
              'w-full h-10 pl-10 pr-4 rounded-xl bg-secondary border-none text-sm focus:ring-2 focus:ring-primary transition-all duration-300 input-animated',
              showSearch ? 'opacity-100' : 'opacity-0 pointer-events-none'
            )}
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-300 hover:scale-105 btn-ripple"
        >
          {theme === 'dark' ? (
            <Sun size={18} className="text-warning animate-scale-in" />
          ) : (
            <Moon size={18} className="text-primary animate-scale-in" />
          )}
        </button>

        {/* Notifications */}
        <div className="relative" ref={notificationRef}>
          <button 
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-300 hover:scale-105 btn-ripple"
          >
            <Bell size={18} className="text-muted-foreground" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-5 h-5 bg-destructive rounded-full flex items-center justify-center text-[10px] font-bold text-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Notification Dropdown */}
          {showNotifications && (
            <div className="absolute right-0 top-12 w-80 md:w-96 bg-card border border-border rounded-2xl shadow-xl z-50 animate-scale-in overflow-hidden">
              <div className="flex items-center justify-between p-4 border-b border-border">
                <h3 className="font-semibold text-foreground">Notifications</h3>
                <div className="flex items-center gap-2">
                  {unreadCount > 0 && (
                    <button 
                      onClick={markAllAsRead}
                      className="text-xs text-primary hover:underline"
                    >
                      Mark all read
                    </button>
                  )}
                  <button 
                    onClick={() => setShowNotifications(false)}
                    className="w-6 h-6 flex items-center justify-center rounded-full hover:bg-secondary"
                  >
                    <X size={14} className="text-muted-foreground" />
                  </button>
                </div>
              </div>
              
              <div className="max-h-96 overflow-y-auto">
                {notifications.length === 0 ? (
                  <div className="p-8 text-center">
                    <Bell size={32} className="mx-auto text-muted-foreground mb-2" />
                    <p className="text-muted-foreground">No notifications</p>
                  </div>
                ) : (
                  notifications.map((notification) => (
                    <div
                      key={notification.id}
                      onClick={() => markAsRead(notification.id)}
                      className={cn(
                        'p-4 border-b border-border last:border-0 cursor-pointer transition-colors hover:bg-secondary/50',
                        !notification.read && 'bg-primary/5'
                      )}
                    >
                      <div className="flex gap-3">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                          {getNotificationIcon(notification.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={cn(
                              'text-sm text-foreground truncate',
                              !notification.read && 'font-semibold'
                            )}>
                              {notification.title}
                            </p>
                            {!notification.read && (
                              <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-1.5" />
                            )}
                          </div>
                          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
                            {notification.message}
                          </p>
                          <p className="text-xs text-muted-foreground/70 mt-1">
                            {notification.time}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
