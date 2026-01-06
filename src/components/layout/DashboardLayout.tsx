import { Outlet } from 'react-router-dom';
import { Sidebar, SidebarProvider, useSidebar } from './Sidebar';
import { BottomNav } from './BottomNav';
import { cn } from '@/lib/utils';
import { useLanguage } from '@/contexts/LanguageContext';

function DashboardContent() {
  const { isRTL } = useLanguage();
  const { collapsed } = useSidebar();

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className={cn(
        'min-h-screen transition-all duration-300',
        isRTL 
          ? collapsed ? 'md:mr-[80px]' : 'md:mr-[260px]'
          : collapsed ? 'md:ml-[80px]' : 'md:ml-[260px]',
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

export function DashboardLayout() {
  return (
    <SidebarProvider>
      <DashboardContent />
    </SidebarProvider>
  );
}
