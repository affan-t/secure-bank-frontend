import { Header } from '@/components/layout/Header';
import { cards, formatCurrency } from '@/data/bankData';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Eye, EyeOff, Snowflake, Copy, Settings, Plus, Wifi, CreditCard, Shield, Globe, Bell } from 'lucide-react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

export default function Cards() {
  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [showDetails, setShowDetails] = useState(false);
  const [cardStates, setCardStates] = useState<Record<string, boolean>>(
    cards.reduce((acc, card) => ({ ...acc, [card.id]: card.frozen }), {})
  );
  const [showSettingsDialog, setShowSettingsDialog] = useState(false);
  const [showAddCardDialog, setShowAddCardDialog] = useState(false);
  const [cardSettings, setCardSettings] = useState({
    onlinePayments: true,
    international: true,
    atmWithdrawal: true,
    contactless: true,
  });

  const toggleFreeze = (cardId: string) => {
    setCardStates(prev => ({ ...prev, [cardId]: !prev[cardId] }));
    toast.success(cardStates[cardId] ? 'Card unfrozen' : 'Card frozen', {
      description: cardStates[cardId] ? 'Your card is now active' : 'Your card has been frozen',
    });
  };

  const copyCardNumber = () => {
    navigator.clipboard.writeText(selectedCard.number.replace(/\s/g, ''));
    toast.success('Card number copied!');
  };

  const handleAddCard = () => {
    toast.success('Card request submitted!', {
      description: 'We will process your request within 3-5 business days.',
    });
    setShowAddCardDialog(false);
  };

  return (
    <div className="py-4 md:py-8 space-y-6 md:space-y-8">
      <Header title="My Cards" subtitle="Manage your debit and credit cards" />

      {/* Cards Carousel */}
      <div className="relative">
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin">
          {cards.map((card, index) => (
            <div
              key={card.id}
              onClick={() => setSelectedCard(card)}
              className={cn(
                'relative flex-shrink-0 w-80 md:w-96 h-52 md:h-56 rounded-2xl p-6 cursor-pointer transition-all duration-500 animate-slide-right',
                card.color,
                selectedCard.id === card.id ? 'scale-100 shadow-card' : 'scale-95 opacity-70 hover:opacity-90',
                cardStates[card.id] && 'grayscale'
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Frozen Overlay */}
              {cardStates[card.id] && (
                <div className="absolute inset-0 bg-background/50 backdrop-blur-sm rounded-2xl flex items-center justify-center z-10">
                  <div className="text-center">
                    <Snowflake size={40} className="mx-auto mb-2 text-foreground animate-pulse" />
                    <p className="font-semibold text-foreground">Card Frozen</p>
                  </div>
                </div>
              )}

              {/* Card Background Pattern */}
              <div className="absolute inset-0 overflow-hidden rounded-2xl">
                <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />
                <div className="absolute top-1/2 right-8 w-24 h-24 border border-white/10 rounded-full" />
              </div>

              {/* Card Content */}
              <div className="relative z-5 h-full flex flex-col justify-between text-white">
                {/* Header */}
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-white/80 uppercase">
                    {card.variant} Card
                  </span>
                  <Wifi size={24} className="rotate-90 text-white/80" />
                </div>

                {/* Chip */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-9 rounded-md bg-gradient-to-br from-yellow-300 via-yellow-400 to-yellow-500" />
                </div>

                {/* Card Number */}
                <div>
                  <p className="font-mono text-lg md:text-xl tracking-widest">
                    {showDetails
                      ? card.number
                      : '•••• •••• •••• ' + card.number.slice(-4)}
                  </p>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/60">Card Holder</p>
                    <p className="font-semibold">{card.holder}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/60">Expires</p>
                    <p className="font-semibold">{card.expiry}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-white/60">CVV</p>
                    <p className="font-semibold">{showDetails ? '321' : '•••'}</p>
                  </div>
                  <div className="text-right">
                    {card.type === 'visa' ? (
                      <p className="text-2xl font-bold italic">VISA</p>
                    ) : (
                      <div className="flex">
                        <div className="w-8 h-8 rounded-full bg-red-500 opacity-80" />
                        <div className="w-8 h-8 rounded-full bg-yellow-500 opacity-80 -ml-4" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Add Card */}
          <div 
            onClick={() => setShowAddCardDialog(true)}
            className="flex-shrink-0 w-80 md:w-96 h-52 md:h-56 rounded-2xl border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300 group animate-fade-in"
          >
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                <Plus size={24} className="text-muted-foreground group-hover:text-primary" />
              </div>
              <p className="font-semibold text-foreground">Add New Card</p>
              <p className="text-sm text-muted-foreground">Link a new card</p>
            </div>
          </div>
        </div>
      </div>

      {/* Card Actions */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <button
          onClick={() => setShowDetails(!showDetails)}
          className="flex flex-col items-center gap-3 p-6 bg-card rounded-2xl border border-border hover:border-primary transition-all duration-300 hover-lift"
        >
          {showDetails ? <EyeOff size={24} className="text-primary" /> : <Eye size={24} className="text-primary" />}
          <span className="font-medium text-foreground">{showDetails ? 'Hide' : 'Show'} Details</span>
        </button>

        <button
          onClick={copyCardNumber}
          className="flex flex-col items-center gap-3 p-6 bg-card rounded-2xl border border-border hover:border-primary transition-all duration-300 hover-lift"
        >
          <Copy size={24} className="text-primary" />
          <span className="font-medium text-foreground">Copy Number</span>
        </button>

        <button
          onClick={() => toggleFreeze(selectedCard.id)}
          className={cn(
            'flex flex-col items-center gap-3 p-6 rounded-2xl border transition-all duration-300 hover-lift',
            cardStates[selectedCard.id]
              ? 'bg-primary/10 border-primary'
              : 'bg-card border-border hover:border-primary'
          )}
        >
          <Snowflake size={24} className={cardStates[selectedCard.id] ? 'text-primary' : 'text-muted-foreground'} />
          <span className="font-medium text-foreground">
            {cardStates[selectedCard.id] ? 'Unfreeze' : 'Freeze'} Card
          </span>
        </button>

        <button 
          onClick={() => setShowSettingsDialog(true)}
          className="flex flex-col items-center gap-3 p-6 bg-card rounded-2xl border border-border hover:border-primary transition-all duration-300 hover-lift"
        >
          <Settings size={24} className="text-primary" />
          <span className="font-medium text-foreground">Card Settings</span>
        </button>
      </div>

      {/* Card Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up">
          <h3 className="font-semibold text-foreground mb-4">Card Information</h3>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Card Type</span>
              <span className="font-medium text-foreground capitalize">{selectedCard.variant}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Network</span>
              <span className="font-medium text-foreground uppercase">{selectedCard.type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Expiry Date</span>
              <span className="font-medium text-foreground">{selectedCard.expiry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">CVV</span>
              <span className="font-medium text-foreground">{showDetails ? '321' : '***'}</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-2xl border border-border p-6 animate-slide-up" style={{ animationDelay: '100ms' }}>
          <h3 className="font-semibold text-foreground mb-4">Usage & Limits</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Spent</span>
                <span className="font-medium text-foreground">
                  {formatCurrency(selectedCard.balance)} / {formatCurrency(selectedCard.limit)}
                </span>
              </div>
              <div className="h-3 bg-secondary rounded-full overflow-hidden">
                <div
                  className="h-full gradient-card rounded-full transition-all duration-1000"
                  style={{ width: `${(selectedCard.balance / selectedCard.limit) * 100}%` }}
                />
              </div>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Daily Limit</span>
              <span className="font-medium text-foreground">{formatCurrency(500000)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Online Payments</span>
              <span className="font-medium text-success">Enabled</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">International</span>
              <span className="font-medium text-success">Enabled</span>
            </div>
          </div>
        </div>
      </div>

      {/* Card Settings Dialog */}
      <Dialog open={showSettingsDialog} onOpenChange={setShowSettingsDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Card Settings</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-primary" />
                <div>
                  <p className="font-medium text-foreground">Online Payments</p>
                  <p className="text-sm text-muted-foreground">Enable online transactions</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setCardSettings(s => ({ ...s, onlinePayments: !s.onlinePayments }));
                  toast.success(cardSettings.onlinePayments ? 'Online payments disabled' : 'Online payments enabled');
                }}
                className={cn(
                  'w-12 h-6 rounded-full transition-all duration-300 relative',
                  cardSettings.onlinePayments ? 'bg-primary' : 'bg-muted'
                )}
              >
                <div className={cn(
                  'w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-300 shadow-md',
                  cardSettings.onlinePayments ? 'left-6' : 'left-0.5'
                )} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
              <div className="flex items-center gap-3">
                <Globe size={20} className="text-primary" />
                <div>
                  <p className="font-medium text-foreground">International</p>
                  <p className="text-sm text-muted-foreground">Allow foreign transactions</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setCardSettings(s => ({ ...s, international: !s.international }));
                  toast.success(cardSettings.international ? 'International transactions disabled' : 'International transactions enabled');
                }}
                className={cn(
                  'w-12 h-6 rounded-full transition-all duration-300 relative',
                  cardSettings.international ? 'bg-primary' : 'bg-muted'
                )}
              >
                <div className={cn(
                  'w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-300 shadow-md',
                  cardSettings.international ? 'left-6' : 'left-0.5'
                )} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
              <div className="flex items-center gap-3">
                <CreditCard size={20} className="text-primary" />
                <div>
                  <p className="font-medium text-foreground">ATM Withdrawal</p>
                  <p className="text-sm text-muted-foreground">Enable cash withdrawals</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setCardSettings(s => ({ ...s, atmWithdrawal: !s.atmWithdrawal }));
                  toast.success(cardSettings.atmWithdrawal ? 'ATM withdrawals disabled' : 'ATM withdrawals enabled');
                }}
                className={cn(
                  'w-12 h-6 rounded-full transition-all duration-300 relative',
                  cardSettings.atmWithdrawal ? 'bg-primary' : 'bg-muted'
                )}
              >
                <div className={cn(
                  'w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-300 shadow-md',
                  cardSettings.atmWithdrawal ? 'left-6' : 'left-0.5'
                )} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/30 rounded-xl">
              <div className="flex items-center gap-3">
                <Wifi size={20} className="text-primary" />
                <div>
                  <p className="font-medium text-foreground">Contactless</p>
                  <p className="text-sm text-muted-foreground">Tap to pay</p>
                </div>
              </div>
              <button
                onClick={() => {
                  setCardSettings(s => ({ ...s, contactless: !s.contactless }));
                  toast.success(cardSettings.contactless ? 'Contactless disabled' : 'Contactless enabled');
                }}
                className={cn(
                  'w-12 h-6 rounded-full transition-all duration-300 relative',
                  cardSettings.contactless ? 'bg-primary' : 'bg-muted'
                )}
              >
                <div className={cn(
                  'w-5 h-5 rounded-full bg-white absolute top-0.5 transition-all duration-300 shadow-md',
                  cardSettings.contactless ? 'left-6' : 'left-0.5'
                )} />
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Add Card Dialog */}
      <Dialog open={showAddCardDialog} onOpenChange={setShowAddCardDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request New Card</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Card Type</label>
              <select className="w-full h-12 px-4 rounded-xl bg-secondary/50 border-2 border-transparent focus:border-primary transition-colors">
                <option value="debit">Debit Card</option>
                <option value="credit">Credit Card</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Card Network</label>
              <select className="w-full h-12 px-4 rounded-xl bg-secondary/50 border-2 border-transparent focus:border-primary transition-colors">
                <option value="visa">Visa</option>
                <option value="mastercard">Mastercard</option>
              </select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Delivery Address</label>
              <textarea
                placeholder="Enter your delivery address"
                rows={3}
                className="w-full px-4 py-3 rounded-xl bg-secondary/50 border-2 border-transparent focus:border-primary transition-colors resize-none"
              />
            </div>
            <button
              onClick={handleAddCard}
              className="w-full h-12 rounded-xl gradient-bg text-white font-semibold hover:opacity-90 transition-opacity"
            >
              Request Card
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
