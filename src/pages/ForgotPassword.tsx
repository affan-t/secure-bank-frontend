import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTheme } from '@/contexts/ThemeContext';
import { Mail, ArrowLeft, ArrowRight, Moon, Sun, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import nexbankLogo from '@/assets/nexbank-logo.png';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');
  
  const { theme, toggleTheme } = useTheme();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      setError('Email is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email');
      return;
    }
    
    setError('');
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    setIsSuccess(true);
    toast.success('Email sent!', {
      description: 'Check your inbox for reset instructions.',
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '3s' }} />
      </div>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 w-10 h-10 flex items-center justify-center rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-300"
      >
        {theme === 'dark' ? <Sun size={18} className="text-warning" /> : <Moon size={18} className="text-primary" />}
      </button>

      <div className="w-full max-w-md relative z-10 animate-scale-in">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-12 h-12 rounded-xl overflow-hidden shadow-glow bg-[#0c1929]">
            <img src={nexbankLogo} alt="NexBank" className="w-full h-full object-contain p-0.5" />
          </div>
          <span className="font-display font-bold text-2xl">NexBank</span>
        </div>

        {/* Card */}
        <div className="bg-card rounded-3xl shadow-xl p-8 border border-border animate-fade-in">
          {!isSuccess ? (
            <>
              <div className="text-center mb-8">
                <div className="w-16 h-16 mx-auto mb-6 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Mail className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                  Forgot Password?
                </h2>
                <p className="text-muted-foreground">
                  No worries! Enter your email and we'll send you reset instructions.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className={cn(
                        'w-full h-14 pl-12 pr-4 rounded-xl bg-secondary/50 border-2 transition-all duration-300',
                        error ? 'border-destructive' : 'border-transparent focus:border-primary'
                      )}
                    />
                  </div>
                  {error && <p className="text-sm text-destructive animate-slide-down">{error}</p>}
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className={cn(
                    'w-full h-14 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300',
                    'gradient-bg text-white shadow-glow hover:shadow-xl hover:scale-[1.02]',
                    isLoading && 'opacity-70 cursor-not-allowed'
                  )}
                >
                  {isLoading ? (
                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>Send Reset Link <ArrowRight size={20} /></>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center animate-scale-in">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-success/20 flex items-center justify-center">
                <Check className="w-10 h-10 text-success animate-bounce-soft" />
              </div>
              <h2 className="text-2xl font-display font-bold text-foreground mb-2">
                Check Your Email
              </h2>
              <p className="text-muted-foreground mb-6">
                We've sent a password reset link to<br />
                <span className="font-medium text-foreground">{email}</span>
              </p>
              <p className="text-sm text-muted-foreground mb-8">
                Didn't receive the email?{' '}
                <button onClick={() => setIsSuccess(false)} className="text-primary hover:underline">
                  Try again
                </button>
              </p>
            </div>
          )}

          <Link
            to="/login"
            className="flex items-center justify-center gap-2 mt-6 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft size={18} />
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
