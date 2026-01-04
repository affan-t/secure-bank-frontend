import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useTheme } from '@/contexts/ThemeContext';
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Moon, Sun, Check, Phone, Wallet, Building } from 'lucide-react';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';
import nexbankLogo from '@/assets/nexbank-logo.png';

export default function Signup() {
  const [step, setStep] = useState(1);
  
  // Step 1: Basic Info
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  // Step 2: Account Details
  const [accountType, setAccountType] = useState('savings');
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [cnic, setCnic] = useState('');
  
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

  const validateStep1 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) newErrors.name = 'Name is required';
    if (!email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Invalid email address';
    if (!password) newErrors.password = 'Password is required';
    else if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateStep2 = () => {
    const newErrors: Record<string, string> = {};
    
    if (!username.trim()) newErrors.username = 'Username is required';
    else if (username.length < 3) newErrors.username = 'Username must be at least 3 characters';
    if (!phone) newErrors.phone = 'Contact number is required';
    else if (!/^(\+92|0)?[3][0-9]{9}$/.test(phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter valid Pakistani phone number';
    }
    if (cnic && !/^[0-9]{5}-[0-9]{7}-[0-9]$/.test(cnic)) {
      newErrors.cnic = 'CNIC format: 12345-1234567-1';
    }
    if (!agreeTerms) newErrors.terms = 'You must agree to the terms';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep1()) {
      setStep(2);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep2()) return;
    
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

  const accountTypes = [
    { id: 'savings', label: 'Savings Account', icon: Wallet, desc: 'Earn interest on deposits' },
    { id: 'current', label: 'Current Account', icon: Building, desc: 'For daily transactions' },
  ];

  return (
    <div className="min-h-screen flex">
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-1/2 gradient-accent relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-white/10 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-white/5 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
        </div>
        
        <div className="relative z-10 flex flex-col justify-center items-center w-full p-12 text-white">
          <div className="w-24 h-24 rounded-xl overflow-hidden flex items-center justify-center mb-6 shadow-xl animate-bounce-soft">
            <img src={nexbankLogo} alt="NexBank" className="w-full h-full object-cover" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-3 text-center">Join NexBank</h1>
          <p className="text-lg text-white/80 text-center max-w-md mb-8">
            Start your journey to smarter banking today
          </p>
          
          {/* Step Indicator */}
          <div className="flex items-center gap-4 mb-8">
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
              step >= 1 ? 'bg-white text-primary' : 'bg-white/20 text-white'
            )}>1</div>
            <div className={cn('w-12 h-0.5 transition-all', step >= 2 ? 'bg-white' : 'bg-white/20')} />
            <div className={cn(
              'w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all',
              step >= 2 ? 'bg-white text-primary' : 'bg-white/20 text-white'
            )}>2</div>
          </div>
          
          <div className="grid gap-3 w-full max-w-sm">
            {[
              'Free account setup',
              'No hidden fees',
              'Premium banking features',
              'World-class security',
            ].map((feature, i) => (
              <div
                key={feature}
                className="flex items-center gap-3 p-3 bg-white/10 backdrop-blur-sm rounded-lg animate-slide-right"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <Check size={12} />
                </div>
                <span className="text-sm font-medium">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="w-full lg:w-1/2 flex flex-col bg-background overflow-y-auto">
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
            {theme === 'dark' ? <Sun size={16} className="text-warning" /> : <Moon size={16} className="text-primary" />}
          </button>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 md:p-8">
          <div className="w-full max-w-md animate-fade-in">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-display font-bold text-foreground mb-1">
                {step === 1 ? 'Create Account' : 'Account Details'}
              </h2>
              <p className="text-sm text-muted-foreground">
                {step === 1 ? 'Fill in your details to get started' : 'Set up your banking preferences'}
              </p>
            </div>

            {step === 1 ? (
              /* Step 1: Basic Information */
              <form onSubmit={(e) => { e.preventDefault(); handleNextStep(); }} className="space-y-4">
                {/* Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Full Name</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
                      className={cn(
                        'w-full h-11 pl-10 pr-3 rounded-lg bg-secondary/50 border text-sm transition-all duration-300',
                        errors.name ? 'border-destructive' : 'border-transparent focus:border-primary'
                      )}
                    />
                  </div>
                  {errors.name && <p className="text-xs text-destructive">{errors.name}</p>}
                </div>

                {/* Email */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Email Address</label>
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
                  {errors.email && <p className="text-xs text-destructive">{errors.email}</p>}
                </div>

                {/* Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Create a password"
                      className={cn(
                        'w-full h-11 pl-10 pr-10 rounded-lg bg-secondary/50 border text-sm transition-all duration-300',
                        errors.password ? 'border-destructive' : 'border-transparent focus:border-primary'
                      )}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  </div>
                  
                  {/* Password Strength */}
                  {password && (
                    <div className="space-y-1">
                      <div className="flex gap-1">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className={cn(
                              'h-1 flex-1 rounded-full transition-all duration-300',
                              i < passwordStrength() ? strengthColors[passwordStrength() - 1] : 'bg-muted'
                            )}
                          />
                        ))}
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Strength: <span className="font-medium">{strengthLabels[passwordStrength() - 1] || 'Too weak'}</span>
                      </p>
                    </div>
                  )}
                  {errors.password && <p className="text-xs text-destructive">{errors.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Confirm Password</label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="Confirm your password"
                      className={cn(
                        'w-full h-11 pl-10 pr-3 rounded-lg bg-secondary/50 border text-sm transition-all duration-300',
                        errors.confirmPassword ? 'border-destructive' : 'border-transparent focus:border-primary'
                      )}
                    />
                    {confirmPassword && password === confirmPassword && (
                      <Check className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-success" />
                    )}
                  </div>
                  {errors.confirmPassword && <p className="text-xs text-destructive">{errors.confirmPassword}</p>}
                </div>

                {/* Next Button */}
                <button
                  type="submit"
                  className="w-full h-11 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300 gradient-accent text-white hover:opacity-90"
                >
                  Continue <ArrowRight size={16} />
                </button>
              </form>
            ) : (
              /* Step 2: Account Details */
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Account Type */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Account Type</label>
                  <div className="grid grid-cols-2 gap-2">
                    {accountTypes.map((type) => {
                      const TypeIcon = type.icon;
                      return (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setAccountType(type.id)}
                          className={cn(
                            'p-3 rounded-lg border text-left transition-all',
                            accountType === type.id 
                              ? 'border-primary bg-primary/10' 
                              : 'border-border hover:border-primary/50'
                          )}
                        >
                          <TypeIcon size={18} className={cn(
                            'mb-1',
                            accountType === type.id ? 'text-primary' : 'text-muted-foreground'
                          )} />
                          <p className="text-xs font-medium">{type.label}</p>
                          <p className="text-xs text-muted-foreground">{type.desc}</p>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Username */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Username</label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value.toLowerCase().replace(/\s/g, ''))}
                      placeholder="Choose a username"
                      className={cn(
                        'w-full h-11 pl-10 pr-3 rounded-lg bg-secondary/50 border text-sm transition-all duration-300',
                        errors.username ? 'border-destructive' : 'border-transparent focus:border-primary'
                      )}
                    />
                  </div>
                  {errors.username && <p className="text-xs text-destructive">{errors.username}</p>}
                </div>

                {/* Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">Contact Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+92 300 1234567"
                      className={cn(
                        'w-full h-11 pl-10 pr-3 rounded-lg bg-secondary/50 border text-sm transition-all duration-300',
                        errors.phone ? 'border-destructive' : 'border-transparent focus:border-primary'
                      )}
                    />
                  </div>
                  {errors.phone && <p className="text-xs text-destructive">{errors.phone}</p>}
                </div>

                {/* CNIC (Optional) */}
                <div className="space-y-1.5">
                  <label className="text-xs font-medium">CNIC <span className="text-muted-foreground">(Optional)</span></label>
                  <input
                    type="text"
                    value={cnic}
                    onChange={(e) => setCnic(e.target.value)}
                    placeholder="12345-1234567-1"
                    className={cn(
                      'w-full h-11 px-3 rounded-lg bg-secondary/50 border text-sm transition-all duration-300',
                      errors.cnic ? 'border-destructive' : 'border-transparent focus:border-primary'
                    )}
                  />
                  {errors.cnic && <p className="text-xs text-destructive">{errors.cnic}</p>}
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                  <button
                    type="button"
                    onClick={() => setAgreeTerms(!agreeTerms)}
                    className={cn(
                      'w-4 h-4 rounded border flex items-center justify-center transition-all duration-300 mt-0.5 flex-shrink-0',
                      agreeTerms ? 'bg-primary border-primary' : 'border-muted-foreground',
                      errors.terms && 'border-destructive'
                    )}
                  >
                    {agreeTerms && <Check size={10} className="text-primary-foreground" />}
                  </button>
                  <p className="text-xs text-muted-foreground">
                    I agree to the{' '}
                    <Link to="#" className="text-primary hover:underline">Terms of Service</Link>
                    {' '}and{' '}
                    <Link to="#" className="text-primary hover:underline">Privacy Policy</Link>
                  </p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="flex-1 h-11 rounded-lg font-medium border border-border hover:bg-secondary transition-all"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className={cn(
                      'flex-1 h-11 rounded-lg font-medium flex items-center justify-center gap-2 transition-all duration-300',
                      'gradient-accent text-white hover:opacity-90',
                      isLoading && 'opacity-70 cursor-not-allowed'
                    )}
                  >
                    {isLoading ? (
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>Create Account <ArrowRight size={16} /></>
                    )}
                  </button>
                </div>
              </form>
            )}

            <p className="text-center text-sm text-muted-foreground mt-6">
              Already have an account?{' '}
              <Link to="/login" className="text-primary font-medium hover:underline">Sign in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
