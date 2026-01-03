import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

export function DashboardLayout() {
  const { isRTL } = useLanguage();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className={cn(
        'min-h-screen transition-all duration-300',
        isRTL ? 'md:mr-64' : 'md:ml-64', // Sidebar width on desktop
        'pb-24 md:pb-0' // Bottom nav space on mobile
      )}>
        <div className="px-4 md:px-8 lg:px-12 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <BottomNav />
    </div>
  );
}
