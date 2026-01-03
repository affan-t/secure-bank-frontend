import { Header } from '@/components/layout/Header';
import { useTheme } from '@/contexts/ThemeContext';
import { cn } from '@/lib/utils';
import { Moon, Sun, Bell, BellOff, Shield, Globe, Smartphone, Mail, LogOut, ChevronRight, Lock, Eye, CreditCard } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface SettingToggleProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  enabled: boolean;
  onToggle: () => void;
}

function SettingToggle({ icon, title, description, enabled, onToggle }: SettingToggleProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
          {icon}
        </div>
        <div>
          <p className="font-medium text-foreground">{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <button
        onClick={onToggle}
        className={cn(
          'w-12 h-6 rounded-full transition-all duration-300 relative',
          enabled ? 'bg-primary' : 'bg-muted'
        )}
      >
        <div
          className={cn(
            'w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-300 shadow-md',
            enabled ? 'left-6' : 'left-0.5'
          )}
        />
      </button>
    </div>
  );
}

interface SettingLinkProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick?: () => void;
  danger?: boolean;
}

function SettingLink({ icon, title, description, onClick, danger }: SettingLinkProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'w-full flex items-center justify-between p-4 bg-secondary/30 rounded-xl hover:bg-secondary/50 transition-colors text-left',
        danger && 'hover:bg-destructive/10'
      )}
    >
      <div className="flex items-center gap-4">
        <div className={cn(
          'w-10 h-10 rounded-xl flex items-center justify-center',
          danger ? 'bg-destructive/10' : 'bg-primary/10'
        )}>
          {icon}
        </div>
        <div>
          <p className={cn('font-medium', danger ? 'text-destructive' : 'text-foreground')}>{title}</p>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <ChevronRight size={20} className={danger ? 'text-destructive' : 'text-muted-foreground'} />
    </button>
  );
}

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    biometric: true,
    loginAlerts: true,
  });

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-8">
      <Header title="Settings" subtitle="Customize your banking experience" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance */}
        <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up">
          <h3 className="font-semibold text-foreground mb-6">Appearance</h3>
          
          <div className="flex gap-4">
            <button
              onClick={() => theme === 'dark' && toggleTheme()}
              className={cn(
                'flex-1 p-6 rounded-xl border-2 transition-all duration-300',
                theme === 'light'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-white border border-border flex items-center justify-center">
                <Sun size={24} className="text-yellow-500" />
              </div>
              <p className="font-medium text-foreground text-center">Light Mode</p>
            </button>

            <button
              onClick={() => theme === 'light' && toggleTheme()}
              className={cn(
                'flex-1 p-6 rounded-xl border-2 transition-all duration-300',
                theme === 'dark'
                  ? 'border-primary bg-primary/5'
                  : 'border-border hover:border-primary/50'
              )}
            >
              <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-slate-800 flex items-center justify-center">
                <Moon size={24} className="text-blue-400" />
              </div>
              <p className="font-medium text-foreground text-center">Dark Mode</p>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h3 className="font-semibold text-foreground mb-6">Notifications</h3>
          
          <div className="space-y-4">
            <SettingToggle
              icon={<Bell size={20} className="text-primary" />}
              title="Push Notifications"
              description="Receive instant alerts"
              enabled={settings.pushNotifications}
              onToggle={() => setSettings(s => ({ ...s, pushNotifications: !s.pushNotifications }))}
            />
            <SettingToggle
              icon={<Mail size={20} className="text-primary" />}
              title="Email Notifications"
              description="Get updates via email"
              enabled={settings.emailNotifications}
              onToggle={() => setSettings(s => ({ ...s, emailNotifications: !s.emailNotifications }))}
            />
            <SettingToggle
              icon={<Smartphone size={20} className="text-primary" />}
              title="SMS Notifications"
              description="Receive text messages"
              enabled={settings.smsNotifications}
              onToggle={() => setSettings(s => ({ ...s, smsNotifications: !s.smsNotifications }))}
            />
          </div>
        </div>

        {/* Security */}
        <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
          <h3 className="font-semibold text-foreground mb-6">Security</h3>
          
          <div className="space-y-4">
            <SettingToggle
              icon={<Eye size={20} className="text-primary" />}
              title="Biometric Login"
              description="Use fingerprint or face ID"
              enabled={settings.biometric}
              onToggle={() => setSettings(s => ({ ...s, biometric: !s.biometric }))}
            />
            <SettingToggle
              icon={<Shield size={20} className="text-primary" />}
              title="Login Alerts"
              description="Get notified of new logins"
              enabled={settings.loginAlerts}
              onToggle={() => setSettings(s => ({ ...s, loginAlerts: !s.loginAlerts }))}
            />
            <SettingLink
              icon={<Lock size={20} className="text-primary" />}
              title="Change Password"
              description="Update your password"
            />
            <SettingLink
              icon={<CreditCard size={20} className="text-primary" />}
              title="Manage Cards"
              description="View and control your cards"
              onClick={() => navigate('/cards')}
            />
          </div>
        </div>

        {/* More Options */}
        <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h3 className="font-semibold text-foreground mb-6">More</h3>
          
          <div className="space-y-4">
            <SettingLink
              icon={<Globe size={20} className="text-primary" />}
              title="Language"
              description="English (US)"
            />
            <SettingLink
              icon={<Shield size={20} className="text-primary" />}
              title="Privacy Policy"
              description="Read our privacy terms"
            />
            <SettingLink
              icon={<LogOut size={20} className="text-destructive" />}
              title="Logout"
              description="Sign out of your account"
              onClick={handleLogout}
              danger
            />
          </div>
        </div>
      </div>

      {/* App Version */}
      <div className="text-center text-sm text-muted-foreground animate-fade-in" style={{ animationDelay: '300ms' }}>
        <p>NexBank Version 2.0.0</p>
        <p className="mt-1">© 2024 NexBank. All rights reserved.</p>
      </div>
    </div>
  );
}
