import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Shield, RefreshCw, Moon, Sun, ArrowLeft, Mail, Smartphone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import nexbankLogo from '@/assets/nexbank-logo.png';

export default function TwoFactorAuth() {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const [resendCooldown, setResendCooldown] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [method, setMethod] = useState<'email' | 'app'>('email');
  const [error, setError] = useState('');
  
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  
  const email = location.state?.email || 'a***@email.com';

  // Countdown timer
  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendCooldown]);

  // Auto-focus first input
  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError('');

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;
    
    const newOtp = [...otp];
    pastedData.split('').forEach((char, i) => {
      if (i < 6) newOtp[i] = char;
    });
    setOtp(newOtp);
    
    const lastFilledIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastFilledIndex]?.focus();
  };

  const handleResend = async () => {
    if (!canResend) return;
    
    setCanResend(false);
    setResendCooldown(60);
    
    toast.success('Code resent', {
      description: `A new verification code has been sent to ${email}`,
    });
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const code = otp.join('');
    if (code.length !== 6) {
      setError('Please enter the complete 6-digit code');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Demo: Accept any 6-digit code
    if (code.length === 6) {
      toast.success('Verification successful', {
        description: 'Redirecting to your dashboard...',
      });
      navigate('/dashboard');
    } else {
      setError('Invalid or expired code. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    }
    
    setIsLoading(false);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="flex justify-between items-center p-4 border-b border-border">
        <button
          onClick={() => navigate('/login')}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm">Back to login</span>
        </button>
        <button
          onClick={toggleTheme}
          className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary hover:bg-secondary/80 transition-all"
        >
          {theme === 'dark' ? <Sun size={16} className="text-warning" /> : <Moon size={16} className="text-primary" />}
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-sm animate-fade-in">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <div className="w-14 h-14 rounded-xl overflow-hidden mb-4 bg-[#0c1929]">
              <img src={nexbankLogo} alt="NexBank" className="w-full h-full object-contain p-1" />
            </div>
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
              <Shield size={24} className="text-primary" />
            </div>
            <h1 className="text-xl font-display font-bold text-center">Two-Factor Authentication</h1>
            <p className="text-sm text-muted-foreground text-center mt-1">
              Enter the 6-digit code sent to your {method === 'email' ? 'email' : 'authenticator app'}
            </p>
          </div>

          {/* Method Selector */}
          <div className="flex gap-2 mb-6">
            <button
              onClick={() => setMethod('email')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border text-sm transition-all',
                method === 'email' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border hover:border-primary/50'
              )}
            >
              <Mail size={16} />
              Email
            </button>
            <button
              onClick={() => setMethod('app')}
              className={cn(
                'flex-1 flex items-center justify-center gap-2 p-2.5 rounded-lg border text-sm transition-all',
                method === 'app' 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : 'border-border hover:border-primary/50'
              )}
            >
              <Smartphone size={16} />
              Auth App
            </button>
          </div>

          {/* OTP Input */}
          <form onSubmit={handleVerify} className="space-y-4">
            <div className="flex justify-center gap-2">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={el => inputRefs.current[index] = el}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  onPaste={handlePaste}
                  className={cn(
                    'w-11 h-12 text-center text-lg font-bold rounded-lg border-2 bg-secondary/50 transition-all duration-200',
                    'focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none',
                    error ? 'border-destructive' : 'border-border',
                    digit && 'border-primary bg-primary/5'
                  )}
                />
              ))}
            </div>

            {error && (
              <p className="text-xs text-destructive text-center animate-slide-down">{error}</p>
            )}

            {/* Timer and Resend */}
            <div className="text-center">
              {canResend ? (
                <button
                  type="button"
                  onClick={handleResend}
                  className="inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
                >
                  <RefreshCw size={14} />
                  Resend code
                </button>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Resend code in <span className="font-medium text-foreground">{formatTime(resendCooldown)}</span>
                </p>
              )}
            </div>

            {/* Verify Button */}
            <button
              type="submit"
              disabled={isLoading || otp.join('').length !== 6}
              className={cn(
                'w-full h-11 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300',
                'gradient-bg text-white',
                (isLoading || otp.join('').length !== 6) ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-90'
              )}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                'Verify & Continue'
              )}
            </button>
          </form>

          {/* Help Text */}
          <p className="text-xs text-muted-foreground text-center mt-6">
            Didn't receive the code? Check your spam folder or{' '}
            <button className="text-primary hover:underline">contact support</button>
          </p>
        </div>
      </div>
    </div>
  );
}
