import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Moon, Sun, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

export default function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  const { signup } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const passwordStrength = () => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['bg-destructive', 'bg-warning', 'bg-accent', 'bg-success'];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!agreeTerms) newErrors.terms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      const success = await signup(name, email, password);
      if (success) {
        toast.success('Account created!', {
          description: 'Welcome to NexBank. Your account is ready.',
        });
        navigate('/dashboard');
      } else {
        toast.error('Signup failed', {
          description: 'Please try again.',
        });
      }
    } catch (error) {
      toast.error('Something went wrong');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-accent relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="w-20 h-20 rounded-2xl bg-white/20 backdrop-blur-xl flex items-center justify-center mb-8 shadow-2xl animate-bounce-soft">
            <span className="text-4xl font-bold">N</span>
          </div>
          <h1 className="text-5xl font-display font-bold mb-4 text-center">Join NexBank</h1>
          <p className="text-xl text-white/80 text-center max-w-md mb-12">
            Start your journey to smarter banking today
          </p>
          
          <div className="grid gap-4 w-full max-w-sm">
            {[
              'Free account setup',
              'No hidden fees',
              'Premium banking features',
              'World-class security',
            ].map((feature, i) => (
              <div
                key={feature}
                className="flex items-center gap-4 p-4 bg-white/10 backdrop-blur-sm rounded-xl animate-slide-right"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                  <Check size={16} />
                </div>
                <span className="font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-background overflow-y-auto">
        <div className="flex justify-between items-center p-6">
          <div className="lg:hidden flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl gradient-card flex items-center justify-center shadow-glow">
              <span className="text-xl font-bold text-white">N</span>
            </div>
            <span className="font-display font-bold text-xl">NexBank</span>
          </div>
          <button
            onClick={toggleTheme}
            className="w-10 h-10 flex items-center justify-center rounded-xl bg-secondary hover:bg-secondary/80 transition-all duration-300 ml-auto"
          >
            {theme === 'dark' ? <Sun size={18} className="text-warning" /> : <Moon size={18} className="text-primary" />}
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center p-6 md:p-12">
          <div className="w-full max-w-md animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-display font-bold text-foreground mb-2">Create Account</h2>
              <p className="text-muted-foreground">Fill in your details to get started</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Name */}
              <div className="space-y-2 animate-slide-up" style={{ animationDelay: '100ms' }}>
                <label className="text-sm font-medium">Full Name</label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className={cn(
                      'w-full h-14 pl-12 pr-4 rounded-xl bg-secondary/50 border-2 transition-all duration-300',
                      errors.name ? 'border-destructive' : 'border-transparent focus:border-primary'
                    )}
                  />
                </div>
                {errors.name && <p className="text-sm text-destructive">{errors.name}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2 animate-slide-up" style={{ animationDelay: '150ms' }}>
                <label className="text-sm font-medium">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className={cn(
                      'w-full h-14 pl-12 pr-4 rounded-xl bg-secondary/50 border-2 transition-all duration-300',
                      errors.email ? 'border-destructive' : 'border-transparent focus:border-primary'
                    )}
                  />
                </div>
                {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2 animate-slide-up" style={{ animationDelay: '200ms' }}>
                <label className="text-sm font-medium">Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className={cn(
                      'w-full h-14 pl-12 pr-12 rounded-xl bg-secondary/50 border-2 transition-all duration-300',
                      errors.password ? 'border-destructive' : 'border-transparent focus:border-primary'
                    )}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                
                {/* Password Strength */}
                {password && (
                  <div className="space-y-2 animate-fade-in">
                    <div className="flex gap-1">
                      {[0, 1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className={cn(
                            'h-1.5 flex-1 rounded-full transition-all duration-300',
                            i < passwordStrength() ? strengthColors[passwordStrength() - 1] : 'bg-muted'
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Password strength: <span className="font-medium">{strengthLabels[passwordStrength() - 1] || 'Too weak'}</span>
                    </p>
                  </div>
                )}
                {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2 animate-slide-up" style={{ animationDelay: '250ms' }}>
                <label className="text-sm font-medium">Confirm Password</label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirm your password"
                    className={cn(
                      'w-full h-14 pl-12 pr-4 rounded-xl bg-secondary/50 border-2 transition-all duration-300',
                      errors.confirmPassword ? 'border-destructive' : 'border-transparent focus:border-primary'
                    )}
                  />
                  {confirmPassword && password === confirmPassword && (
                    <Check className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-success animate-scale-in" />
                  )}
                </div>
                {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
              </div>

              {/* Terms */}
              <div className="flex items-start gap-3 animate-slide-up" style={{ animationDelay: '300ms' }}>
                <button
                  type="button"
                  onClick={() => setAgreeTerms(!agreeTerms)}
                  className={cn(
                    'w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-300 mt-0.5',
                    agreeTerms ? 'bg-primary border-primary' : 'border-muted-foreground',
                    errors.terms && 'border-destructive'
                  )}
                >
                  {agreeTerms && <Check size={12} className="text-primary-foreground" />}
                </button>
                <p className="text-sm text-muted-foreground">
                  I agree to the{' '}
                  <Link to="#" className="text-primary hover:underline">Terms of Service</Link>
                  {' '}and{' '}
                  <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>
                </p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isLoading}
                className={cn(
                  'w-full h-14 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 transition-all duration-300',
                  'gradient-accent text-white shadow-glow hover:shadow-xl hover:scale-[1.02]',
                  isLoading && 'opacity-70 cursor-not-allowed'
                )}
              >
                {isLoading ? (
                  <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>Create Account <ArrowRight size={20} /></>
                )}
              </button>
            </form>

            <p className="text-center text-muted-foreground mt-8">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-semibold hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
