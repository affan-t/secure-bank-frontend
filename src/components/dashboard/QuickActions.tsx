import { quickActions } from '@/data/bankData';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { ArrowRightLeft, FileText, Plus, QrCode } from 'lucide-react';

const iconMap: Record<string, any> = {
  'Transfer': ArrowRightLeft,
  'Pay Bills': FileText,
  'Add Money': Plus,
  'Scan QR': QrCode,
};

const colorMap: Record<string, string> = {
  'Transfer': 'bg-primary hover:bg-primary/90 shadow-[0_0_20px_hsl(var(--primary)/0.3)]',
  'Pay Bills': 'bg-accent hover:bg-accent/90 shadow-[0_0_20px_hsl(var(--accent)/0.3)]',
  'Add Money': 'bg-success hover:bg-success/90 shadow-[0_0_20px_hsl(var(--success)/0.3)]',
  'Scan QR': 'bg-warning hover:bg-warning/90 shadow-[0_0_20px_hsl(var(--warning)/0.3)]',
};

const linkMap: Record<string, string> = {
  'Transfer': '/transfer',
  'Pay Bills': '/transfer',
  'Add Money': '/transfer',
  'Scan QR': '/transfer',
};

export function QuickActions() {
  return (
    <div className="grid grid-cols-4 gap-3 md:gap-4 animate-fade-in">
      {quickActions.map((action, index) => {
        const Icon = iconMap[action.name];
        
        return (
          <Link
            key={action.id}
            to={linkMap[action.name]}
            className={cn(
              'flex flex-col items-center gap-2 p-4 md:p-6 rounded-2xl transition-all duration-300 animate-scale-in btn-ripple',
              colorMap[action.name]
            )}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/20 flex items-center justify-center">
              {Icon && <Icon size={20} className="text-white md:w-6 md:h-6" />}
            </div>
            <span className="text-xs md:text-sm font-medium text-white">{action.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
