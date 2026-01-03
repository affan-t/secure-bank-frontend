import { useTheme } from '@/contexts/ThemeContext';
import { Bell, Search, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface HeaderProps {
  title: string;
  subtitle?: string;
}

export function Header({ title, subtitle }: HeaderProps) {
  const { theme, toggleTheme } = useTheme();
  const [showSearch, setShowSearch] = useState(false);

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
        <button className="relative w-10 h-10 flex items-center justify-center rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-300 hover:scale-105 btn-ripple">
          <Bell size={18} className="text-muted-foreground" />
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-destructive rounded-full animate-pulse" />
        </button>
      </div>
    </header>
  );
}
