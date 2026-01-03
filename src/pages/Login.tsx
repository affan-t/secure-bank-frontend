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
      const success = await login(email, password);
      if (success) {
        toast.success('Welcome back!', {
          description: 'Successfully logged in to your account.',
        });
        navigate('/dashboard');
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
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/10 rounded-full animate-spin-slow" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full animate-spin-slow" style={{ animationDirection: 'reverse' }} />
        </div>
        
        {/* Content */}
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="w-28 h-28 rounded-2xl overflow-hidden flex items-center justify-center mb-8 shadow-2xl animate-bounce-soft">
            <img src={nexbankLogo} alt="NexBank" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-5xl font-display font-bold mb-4 text-center">NexBank</h1>
          <p className="text-xl text-white/80 text-center max-w-md mb-12">
            Your trusted digital banking partner for a smarter financial future
          </p>
          
          {/* Features */}
          <div className="grid gap-6 w-full max-w-sm">
              {['Secure Transactions', 'Instant Transfers', '24/7 Support'].map((feature, i) => (
              <div
                key={feature}
                className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl animate-slide-right"
                style={{ animationDelay: `${i * 150}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                  <Check size={18} />
                </div>
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-background">
        {/* Header */}
        <div className="flex justify-between items-center p-6">
          <div className="lg:hidden flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-glow">
              <img src={nexbankLogo} alt="NexBank" className="w-full h-full object-cover" />
            </div>
            <span className="font-display font-bold text-xl">NexBank</span>
          </div>
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-300 hover:scale-105 ml-auto"
          >
            {theme === 'dark' ? (
              <Sun size={18} className="text-warning" />
            ) : (
              <Moon size={18} className="text-primary" />
            )}
          </button>
        </div>

        {/* Form Container */}
        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md animate-fade-in">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">
                Welcome Back
              </h2>
              <p className="text-muted-foreground">
                Sign in to continue to your account
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <label className="text-sm font-medium text-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={cn(
                      'w-full h-14 pl-12 pr-4 rounded-xl bg-secondary/50 border-2 transition-all duration-300 input-animated',
                      errors.email ? 'border-destructive' : 'border-transparent focus:border-primary'
                    )}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-destructive animate-slide-down">{errors.email}</p>
                )}
              </div>

              {/* Password Field */}
              <div className="space-y-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <label className="text-sm font-medium text-foreground">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className={cn(
                      'w-full h-14 pl-12 pr-12 rounded-xl bg-secondary/50 border-2 transition-all duration-300 input-animated',
                      errors.password ? 'border-destructive' : 'border-transparent focus:border-primary'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-destructive animate-slide-down">{errors.password}</p>
                )}
              </div>

              {/* Forgot Password */}
              <div className="flex justify-end animate-slide-up" style={{ animationDelay: '300ms' }}>
                <Link
                  to="/forgot-password"
                  className="text-sm text-primary hover:underline transition-all"
                >
                  Forgot password?
                </Link>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  'w-full h-14 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300 animate-slide-up btn-ripple',
                  'gradient-bg text-white shadow-glow hover:shadow-xl hover:scale-[1.02]',
                  isLoading && 'opacity-70 cursor-not-allowed'
                )}
                style={{ animationDelay: '400ms' }}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    Sign In
                    <ArrowRight size={20} />
                  </>
                )}
              </button>
            </form>

            {/* Sign Up Link */}
            <p className="text-center text-muted-foreground mt-8 animate-fade-in" style={{ animationDelay: '700ms' }}>
              Don't have an account?{' '}
              <Link to="/signup" className="text-primary font-semibold hover:underline">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
