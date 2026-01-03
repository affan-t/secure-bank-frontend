import { Header } from '@/components/layout/Header';
import { cards } from '@/data/bankData';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Eye, EyeOff, Snowflake, Copy, Settings, Plus, CreditCard, Wifi } from 'lucide-react';
import { toast } from 'sonner';

export default function Cards() {
  const [selectedCard, setSelectedCard] = useState(cards[0]);
  const [showDetails, setShowDetails] = useState(false);
  const [cardStates, setCardStates] = useState<Record<string, boolean>>(
    cards.reduce((acc, card) => ({ ...acc, [card.id]: card.frozen }), {})
  );

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
                    {showDetails && selectedCard.id === card.id
                      ? card.number
                      : card.number.replace(/\d(?=\d{4})/g, '•')}
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
          <div className="flex-shrink-0 w-80 md:w-96 h-52 md:h-56 rounded-2xl border-2 border-dashed border-border flex items-center justify-center cursor-pointer hover:border-primary hover:bg-primary/5 transition-all duration-300 group animate-fade-in">
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

        <button className="flex flex-col items-center gap-3 p-6 bg-card rounded-2xl border border-border hover:border-primary transition-all duration-300 hover-lift">
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
                  ${selectedCard.balance.toLocaleString()} / ${selectedCard.limit.toLocaleString()}
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
              <span className="font-medium text-foreground">$5,000</span>
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
    </div>
  );
}
