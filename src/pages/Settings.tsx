import { Header } from '@/components/layout/Header';
import { useTheme } from '@/contexts/ThemeContext';
import { useLanguage, Language } from '@/contexts/LanguageContext';
import { cn } from '@/lib/utils';
import { Moon, Sun, Bell, Shield, Globe, Smartphone, Mail, LogOut, ChevronRight, Lock, Eye, CreditCard, Check } from 'lucide-react';
import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

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

const languages = [
  { code: 'en' as Language, name: 'English', nativeName: 'English' },
  { code: 'ur' as Language, name: 'Urdu', nativeName: 'اردو' },
  { code: 'ar' as Language, name: 'Arabic', nativeName: 'العربية' },
  { code: 'zh' as Language, name: 'Chinese', nativeName: '中文' },
];

export default function Settings() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage, t } = useLanguage();
  const { logout } = useAuth();
  const navigate = useNavigate();
  
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailNotifications: true,
    smsNotifications: false,
    biometric: true,
    loginAlerts: true,
  });

  const [showLanguageDialog, setShowLanguageDialog] = useState(false);
  const [showPasswordDialog, setShowPasswordDialog] = useState(false);
  const [showPrivacyDialog, setShowPrivacyDialog] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success('Logged out successfully');
    navigate('/login');
  };

  const handleLanguageChange = (langCode: Language) => {
    setLanguage(langCode);
    const lang = languages.find(l => l.code === langCode);
    toast.success(`Language changed to ${lang?.name}`);
    setShowLanguageDialog(false);
  };

  const handlePasswordChange = () => {
    toast.success('Password changed successfully');
    setShowPasswordDialog(false);
  };

  const currentLanguage = languages.find(l => l.code === language);

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-8">
      <Header title={t('settings')} subtitle="Customize your banking experience" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Appearance */}
        <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up">
          <h3 className="font-semibold text-foreground mb-6">{t('appearance')}</h3>
          
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
              <p className="font-medium text-foreground text-center">{t('lightMode')}</p>
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
              <p className="font-medium text-foreground text-center">{t('darkMode')}</p>
            </button>
          </div>
        </div>

        {/* Notifications */}
        <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h3 className="font-semibold text-foreground mb-6">{t('notifications')}</h3>
          
          <div className="space-y-4">
            <SettingToggle
              icon={<Bell size={20} className="text-primary" />}
              title={t('pushNotifications')}
              description="Receive instant alerts"
              enabled={settings.pushNotifications}
              onToggle={() => {
                setSettings(s => ({ ...s, pushNotifications: !s.pushNotifications }));
                toast.success(settings.pushNotifications ? 'Push notifications disabled' : 'Push notifications enabled');
              }}
            />
            <SettingToggle
              icon={<Mail size={20} className="text-primary" />}
              title={t('emailNotifications')}
              description="Get updates via email"
              enabled={settings.emailNotifications}
              onToggle={() => {
                setSettings(s => ({ ...s, emailNotifications: !s.emailNotifications }));
                toast.success(settings.emailNotifications ? 'Email notifications disabled' : 'Email notifications enabled');
              }}
            />
            <SettingToggle
              icon={<Smartphone size={20} className="text-primary" />}
              title={t('smsNotifications')}
              description="Receive text messages"
              enabled={settings.smsNotifications}
              onToggle={() => {
                setSettings(s => ({ ...s, smsNotifications: !s.smsNotifications }));
                toast.success(settings.smsNotifications ? 'SMS notifications disabled' : 'SMS notifications enabled');
              }}
            />
          </div>
        </div>

        {/* Security */}
        <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
          <h3 className="font-semibold text-foreground mb-6">{t('security')}</h3>
          
          <div className="space-y-4">
            <SettingToggle
              icon={<Eye size={20} className="text-primary" />}
              title={t('biometricLogin')}
              description="Use fingerprint or face ID"
              enabled={settings.biometric}
              onToggle={() => {
                setSettings(s => ({ ...s, biometric: !s.biometric }));
                toast.success(settings.biometric ? 'Biometric login disabled' : 'Biometric login enabled');
              }}
            />
            <SettingToggle
              icon={<Shield size={20} className="text-primary" />}
              title={t('loginAlerts')}
              description="Get notified of new logins"
              enabled={settings.loginAlerts}
              onToggle={() => {
                setSettings(s => ({ ...s, loginAlerts: !s.loginAlerts }));
                toast.success(settings.loginAlerts ? 'Login alerts disabled' : 'Login alerts enabled');
              }}
            />
            <SettingLink
              icon={<Lock size={20} className="text-primary" />}
              title={t('changePassword')}
              description="Update your password"
              onClick={() => setShowPasswordDialog(true)}
            />
            <SettingLink
              icon={<CreditCard size={20} className="text-primary" />}
              title={t('cards')}
              description="View and control your cards"
              onClick={() => navigate('/cards')}
            />
          </div>
        </div>

        {/* More Options */}
        <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
          <h3 className="font-semibold text-foreground mb-6">{t('more')}</h3>
          
          <div className="space-y-4">
            <SettingLink
              icon={<Globe size={20} className="text-primary" />}
              title={t('language')}
              description={currentLanguage?.nativeName || 'English'}
              onClick={() => setShowLanguageDialog(true)}
            />
            <SettingLink
              icon={<Shield size={20} className="text-primary" />}
              title={t('privacyPolicy')}
              description="Read our privacy terms"
              onClick={() => setShowPrivacyDialog(true)}
            />
            <SettingLink
              icon={<LogOut size={20} className="text-destructive" />}
              title={t('logout')}
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
        <p className="mt-1">2024 NexBank. All rights reserved.</p>
      </div>

      {/* Language Dialog */}
      <Dialog open={showLanguageDialog} onOpenChange={setShowLanguageDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('language')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-2 mt-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageChange(lang.code)}
                className={cn(
                  'w-full flex items-center justify-between p-4 rounded-xl transition-colors',
                  language === lang.code
                    ? 'bg-primary/10 border-2 border-primary'
                    : 'bg-secondary/50 hover:bg-secondary'
                )}
              >
                <div className="flex items-center gap-3">
                  <span className="font-medium text-foreground">{lang.name}</span>
                  <span className="text-muted-foreground">({lang.nativeName})</span>
                </div>
                {language === lang.code && (
                  <Check size={20} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </DialogContent>
      </Dialog>

      {/* Password Change Dialog */}
      <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{t('changePassword')}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Current Password</label>
              <input
                type="password"
                placeholder="Enter current password"
                className="w-full h-12 px-4 rounded-xl bg-secondary/50 border-2 border-transparent focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">New Password</label>
              <input
                type="password"
                placeholder="Enter new password"
                className="w-full h-12 px-4 rounded-xl bg-secondary/50 border-2 border-transparent focus:border-primary transition-colors"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Confirm Password</label>
              <input
                type="password"
                placeholder="Confirm new password"
                className="w-full h-12 px-4 rounded-xl bg-secondary/50 border-2 border-transparent focus:border-primary transition-colors"
              />
            </div>
            <button
              onClick={handlePasswordChange}
              className="w-full h-12 rounded-xl gradient-bg text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Update Password
            </button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Privacy Policy Dialog */}
      <Dialog open={showPrivacyDialog} onOpenChange={setShowPrivacyDialog}>
        <DialogContent className="sm:max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t('privacyPolicy')}</DialogTitle>
          </DialogHeader>
          <div className="prose prose-sm dark:prose-invert mt-4 text-muted-foreground">
            <h4 className="text-foreground">1. Information Collection</h4>
            <p>We collect information you provide directly to us, such as when you create an account, make a transaction, or contact us for support.</p>
            
            <h4 className="text-foreground">2. Use of Information</h4>
            <p>We use the information we collect to provide, maintain, and improve our services, process transactions, and send you technical notices.</p>
            
            <h4 className="text-foreground">3. Information Sharing</h4>
            <p>We do not share your personal information with third parties except as described in this policy or with your consent.</p>
            
            <h4 className="text-foreground">4. Security</h4>
            <p>We take reasonable measures to help protect your personal information from loss, theft, misuse, and unauthorized access.</p>
            
            <h4 className="text-foreground">5. Contact Us</h4>
            <p>If you have any questions about this Privacy Policy, please contact us at support@nexbank.com</p>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
