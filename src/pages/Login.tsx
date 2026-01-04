import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Eye, EyeOff, Mail, Lock, ArrowRight, Moon, Sun, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import nexbankLogo from '@/assets/nexbank-logo.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  
  const { login } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: { email?: string; password?: string } = {};
    
    if (!email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'Please enter a valid email';
    }
    
    if (!password) {
      newErrors.password = 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // First validate credentials
      const success = await login(email, password);
      if (success) {
        toast.success('Credentials verified', {
          description: 'Redirecting to 2FA verification...',
        });
        // Redirect to 2FA page
        navigate('/two-factor-auth', { state: { email } });
      } else {
        toast.error('Login failed', {
          description: 'Invalid email or password.',
        });
      }
    } catch (error) {
      toast.error('Something went wrong', {
        description: 'Please try again later.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-card relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="w-24 h-24 rounded-xl overflow-hidden flex items-center justify-center mb-6 shadow-xl animate-bounce-soft">
            <img src={nexbankLogo} alt="NexBank" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-3 text-center">NexBank</h1>
          <p className="text-lg text-white/80 text-center max-w-md mb-10">
            Your trusted digital banking partner for a smarter financial future
          </p>
          
          {/* Features */}
          <div className="grid gap-4 w-full max-w-sm">
            {['Secure Transactions', 'Instant Transfers', '24/7 Support'].map((feature, i) => (
              <div
                key={feature}
                className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg animate-slide-right"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="w-8 h-8 rounded-lg bg-white/20 flex items-center justify-center">
                  <Check size={14} />
                </div>
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-background">
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <div className="lg:hidden flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg overflow-hidden">
              <img src={nexbankLogo} alt="NexBank" className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-bold text-lg">NexBank</span>
          </div>
          <button
            onClick={toggleTheme}
            className="w-8 h-8 flex items-center justify-center rounded-lg bg-secondary hover:bg-secondary/80 transition-all duration-300 ml-auto"
          >
            {theme === 'dark' ? (
              <Sun size={16} className="text-warning" />
            ) : (
              <Moon size={16} className="text-primary" />
            )}
          </button>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-sm animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-display font-bold text-foreground mb-1">
                Welcome Back
              </h2>
              <p className="text-sm text-muted-foreground">
                Sign in to continue to your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={cn(
                      'w-full h-11 pl-10 pr-3 rounded-lg bg-secondary/50 border text-sm transition-all duration-300',
                      errors.email ? 'border-destructive' : 'border-transparent focus:border-primary'
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="text-xs text-destructive">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <label className="text-xs font-medium text-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={cn(
                      'w-full h-11 pl-10 pr-10 rounded-lg bg-secondary/50 border text-sm transition-all duration-300',
                      errors.password ? 'border-destructive' : 'border-transparent focus:border-primary'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-destructive">{errors.password}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end">
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary hover:underline transition-all"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  'w-full h-11 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300',
                  'gradient-bg text-white hover:opacity-90',
                  isLoading && 'opacity-70 cursor-not-allowed'
                )}
              >
                {isLoading ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-sm text-muted-foreground mt-6">
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-medium hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
