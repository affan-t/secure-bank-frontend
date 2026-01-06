// Dummy data for the banking application

export interface Account {
  id: string;
  type: 'savings' | 'current' | 'credit';
  name: string;
  number: string;
  balance: number;
  currency: string;
  icon: string;
  color: string;
}

export interface Transaction {
  id: string;
  type: 'credit' | 'debit';
  amount: number;
  currency: string;
  description: string;
  category: string;
  date: string;
  status: 'completed' | 'pending' | 'failed';
  icon: string;
}

export interface Card {
  id: string;
  type: 'visa' | 'mastercard';
  variant: 'debit' | 'credit';
  number: string;
  holder: string;
  expiry: string;
  cvv: string;
  balance: number;
  limit: number;
  frozen: boolean;
  color: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: 'transaction' | 'alert' | 'promo' | 'info';
}

export const accounts: Account[] = [
  {
    id: '1',
    type: 'savings',
    name: 'Premium Savings',
    number: '****4582',
    balance: 4589250,
    currency: 'PKR',
    icon: 'savings',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: '2',
    type: 'current',
    name: 'Current Account',
    number: '****7891',
    balance: 1245000,
    currency: 'PKR',
    icon: 'account',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: '3',
    type: 'credit',
    name: 'Platinum Credit',
    number: '****3456',
    balance: -234050,
    currency: 'PKR',
    icon: 'credit',
    color: 'from-purple-500 to-purple-600',
  },
];

export const transactions: Transaction[] = [
  {
    id: '1',
    type: 'debit',
    amount: 12550,
    currency: 'PKR',
    description: 'Daraz Purchase',
    category: 'Shopping',
    date: '2024-01-15',
    status: 'completed',
    icon: 'shopping',
  },
  {
    id: '2',
    type: 'credit',
    amount: 350000,
    currency: 'PKR',
    description: 'Salary Deposit',
    category: 'Income',
    date: '2024-01-14',
    status: 'completed',
    icon: 'income',
  },
  {
    id: '3',
    type: 'debit',
    amount: 4500,
    currency: 'PKR',
    description: 'Netflix Subscription',
    category: 'Entertainment',
    date: '2024-01-13',
    status: 'completed',
    icon: 'entertainment',
  },
  {
    id: '4',
    type: 'debit',
    amount: 25000,
    currency: 'PKR',
    description: 'K-Electric Bill',
    category: 'Utilities',
    date: '2024-01-12',
    status: 'completed',
    icon: 'utilities',
  },
  {
    id: '5',
    type: 'debit',
    amount: 8999,
    currency: 'PKR',
    description: 'Spotify Annual',
    category: 'Entertainment',
    date: '2024-01-11',
    status: 'pending',
    icon: 'entertainment',
  },
  {
    id: '6',
    type: 'credit',
    amount: 50000,
    currency: 'PKR',
    description: 'Transfer from Ahmed',
    category: 'Transfer',
    date: '2024-01-10',
    status: 'completed',
    icon: 'transfer',
  },
  {
    id: '7',
    type: 'debit',
    amount: 120000,
    currency: 'PKR',
    description: 'Rent Payment',
    category: 'Housing',
    date: '2024-01-09',
    status: 'completed',
    icon: 'housing',
  },
  {
    id: '8',
    type: 'debit',
    amount: 6530,
    currency: 'PKR',
    description: 'Imtiaz Super Market',
    category: 'Food',
    date: '2024-01-08',
    status: 'completed',
    icon: 'food',
  },
  {
    id: '9',
    type: 'debit',
    amount: 3500,
    currency: 'PKR',
    description: 'Careem Ride',
    category: 'Transport',
    date: '2024-01-07',
    status: 'completed',
    icon: 'transport',
  },
  {
    id: '10',
    type: 'credit',
    amount: 15000,
    currency: 'PKR',
    description: 'Cashback Reward',
    category: 'Rewards',
    date: '2024-01-06',
    status: 'completed',
    icon: 'rewards',
  },
];

export const cards: Card[] = [
  {
    id: '1',
    type: 'visa',
    variant: 'debit',
    number: '4582 7891 3456 7890',
    holder: 'AHMED RAZA',
    expiry: '12/27',
    cvv: '***',
    balance: 4589250,
    limit: 5000000,
    frozen: false,
    color: 'gradient-card',
  },
  {
    id: '2',
    type: 'mastercard',
    variant: 'credit',
    number: '5412 7534 8901 2345',
    holder: 'AHMED RAZA',
    expiry: '08/26',
    cvv: '***',
    balance: 234050,
    limit: 1500000,
    frozen: false,
    color: 'gradient-gold',
  },
];

export const quickActions = [
  { id: '1', name: 'Transfer', icon: 'transfer', color: 'bg-primary' },
  { id: '2', name: 'Pay Bills', icon: 'bills', color: 'bg-accent' },
  { id: '3', name: 'Add Money', icon: 'add', color: 'bg-success' },
  { id: '4', name: 'Scan QR', icon: 'qr', color: 'bg-warning' },
];

export const monthlySpending = [
  { month: 'Jan', amount: 240000 },
  { month: 'Feb', amount: 180000 },
  { month: 'Mar', amount: 320000 },
  { month: 'Apr', amount: 280000 },
  { month: 'May', amount: 210000 },
  { month: 'Jun', amount: 350000 },
];

export const spendingByCategory = [
  { category: 'Shopping', amount: 125000, percentage: 35, color: 'hsl(217, 91%, 50%)' },
  { category: 'Food & Dining', amount: 85000, percentage: 24, color: 'hsl(174, 72%, 46%)' },
  { category: 'Transport', amount: 45000, percentage: 13, color: 'hsl(38, 92%, 50%)' },
  { category: 'Entertainment', amount: 35000, percentage: 10, color: 'hsl(280, 70%, 50%)' },
  { category: 'Utilities', amount: 65000, percentage: 18, color: 'hsl(152, 69%, 45%)' },
];

export const contacts = [
  { id: '1', name: 'Ahmed Khan', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', accountNumber: '****1234' },
  { id: '2', name: 'Fatima Ali', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', accountNumber: '****5678' },
  { id: '3', name: 'Hassan Malik', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', accountNumber: '****9012' },
  { id: '4', name: 'Ayesha Noor', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', accountNumber: '****3456' },
];

export const notifications: Notification[] = [
  {
    id: '1',
    title: 'Payment Received',
    message: 'You received PKR 50,000 from Ahmed Khan',
    time: '2 min ago',
    read: false,
    type: 'transaction',
  },
  {
    id: '2',
    title: 'Bill Due Soon',
    message: 'Your K-Electric bill of PKR 8,500 is due tomorrow',
    time: '1 hour ago',
    read: false,
    type: 'alert',
  },
  {
    id: '3',
    title: 'Special Offer',
    message: 'Get 10% cashback on online shopping this weekend',
    time: '3 hours ago',
    read: true,
    type: 'promo',
  },
  {
    id: '4',
    title: 'Security Alert',
    message: 'New login detected from Karachi, Pakistan',
    time: 'Yesterday',
    read: true,
    type: 'alert',
  },
  {
    id: '5',
    title: 'Transfer Successful',
    message: 'PKR 25,000 sent to Fatima Ali',
    time: 'Yesterday',
    read: true,
    type: 'transaction',
  },
];

export const formatCurrency = (amount: number): string => {
  const absAmount = Math.abs(amount);
  return new Intl.NumberFormat('en-PK', {
    style: 'currency',
    currency: 'PKR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(absAmount);
};
