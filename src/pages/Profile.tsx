import { Header } from '@/components/layout/Header';
import { useAuth } from '@/contexts/AuthContext';
import { cn } from '@/lib/utils';
import { Camera, Mail, Phone, MapPin, Calendar, Shield, Edit2, Check, CheckCircle, Star } from 'lucide-react';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Profile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || 'Ahmed Raza',
    email: user?.email || 'ahmed.raza@email.com',
    phone: user?.phone || '+92 300 1234567',
    address: '123 Shahrah-e-Faisal, Karachi, Pakistan',
  });

  const handleSave = () => {
    setIsEditing(false);
    toast.success('Profile updated successfully!');
  };

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-8">
      <Header title="My Profile" subtitle="Manage your personal information" />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Card */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-2xl border border-border p-6 text-center animate-scale-in">
            {/* Avatar */}
            <div className="relative inline-block mb-6">
              <img
                src={user?.avatar || 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face'}
                alt="Profile"
                className="w-32 h-32 rounded-full object-cover ring-4 ring-primary/20"
              />
              <button className="absolute bottom-0 right-0 w-10 h-10 rounded-full gradient-bg flex items-center justify-center text-white shadow-lg hover:scale-110 transition-transform">
                <Camera size={18} />
              </button>
            </div>

            <h2 className="text-2xl font-bold text-foreground mb-1">{formData.name}</h2>
            <p className="text-muted-foreground mb-4">Premium Member</p>

            <div className="flex items-center justify-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium flex items-center gap-1">
                <CheckCircle size={14} /> Verified
              </span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium flex items-center gap-1">
                <Star size={14} /> Gold
              </span>
            </div>

            <div className="text-sm text-muted-foreground">
              <p>Member since {user?.memberSince || 'January 2020'}</p>
              <p className="mt-1">Account: {user?.accountNumber || '****4582'}</p>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="bg-card rounded-2xl border border-border p-6 mt-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
            <h3 className="font-semibold text-foreground mb-4">Account Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Total Transactions</span>
                <span className="font-bold text-foreground">1,234</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">This Month</span>
                <span className="font-bold text-foreground">47</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-muted-foreground">Rewards Points</span>
                <span className="font-bold text-success">12,500</span>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '150ms' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold text-foreground">Personal Information</h3>
              <button
                onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                className={cn(
                  'flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-300',
                  isEditing
                    ? 'gradient-bg text-white'
                    : 'bg-secondary hover:bg-secondary/80'
                )}
              >
                {isEditing ? <Check size={18} /> : <Edit2 size={18} />}
                <span className="font-medium">{isEditing ? 'Save' : 'Edit'}</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <div className="relative">
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    disabled={!isEditing}
                    className={cn(
                      'w-full h-12 px-4 rounded-xl transition-all duration-300',
                      isEditing
                        ? 'bg-secondary border-2 border-primary'
                        : 'bg-secondary/50 border-2 border-transparent'
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    disabled={!isEditing}
                    className={cn(
                      'w-full h-12 pl-12 pr-4 rounded-xl transition-all duration-300',
                      isEditing
                        ? 'bg-secondary border-2 border-primary'
                        : 'bg-secondary/50 border-2 border-transparent'
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    disabled={!isEditing}
                    className={cn(
                      'w-full h-12 pl-12 pr-4 rounded-xl transition-all duration-300',
                      isEditing
                        ? 'bg-secondary border-2 border-primary'
                        : 'bg-secondary/50 border-2 border-transparent'
                    )}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-muted-foreground">Address</label>
                <div className="relative">
                  <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    disabled={!isEditing}
                    className={cn(
                      'w-full h-12 pl-12 pr-4 rounded-xl transition-all duration-300',
                      isEditing
                        ? 'bg-secondary border-2 border-primary'
                        : 'bg-secondary/50 border-2 border-transparent'
                    )}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '200ms' }}>
            <h3 className="font-semibold text-foreground mb-6">Security Settings</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-success/10 flex items-center justify-center">
                    <Shield size={20} className="text-success" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Two-Factor Authentication</p>
                    <p className="text-sm text-muted-foreground">Extra layer of security</p>
                  </div>
                </div>
                <span className="px-3 py-1 rounded-full bg-success/10 text-success text-sm font-medium">
                  Enabled
                </span>
              </div>

              <button className="w-full flex items-center justify-between p-4 bg-secondary/50 rounded-xl hover:bg-secondary transition-colors">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Calendar size={20} className="text-primary" />
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-foreground">Change Password</p>
                    <p className="text-sm text-muted-foreground">Last changed 30 days ago</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
