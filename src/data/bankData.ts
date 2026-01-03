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

export const accounts: Account[] = [
  {
    id: '1',
    type: 'savings',
    name: 'Premium Savings',
    number: '****4582',
    balance: 45892.50,
    currency: 'USD',
    icon: '💰',
    color: 'from-blue-500 to-blue-600',
  },
  {
    id: '2',
    type: 'current',
    name: 'Current Account',
    number: '****7891',
    balance: 12450.00,
    currency: 'USD',
    icon: '🏦',
    color: 'from-emerald-500 to-emerald-600',
  },
  {
    id: '3',
    type: 'credit',
    name: 'Platinum Credit',
    number: '****3456',
    balance: -2340.50,
    currency: 'USD',
    icon: '💳',
    color: 'from-purple-500 to-purple-600',
  },
];

export const transactions: Transaction[] = [
  {
    id: '1',
    type: 'debit',
    amount: 125.50,
    currency: 'USD',
    description: 'Amazon Purchase',
    category: 'Shopping',
    date: '2024-01-15',
    status: 'completed',
    icon: '🛒',
  },
  {
    id: '2',
    type: 'credit',
    amount: 3500.00,
    currency: 'USD',
    description: 'Salary Deposit',
    category: 'Income',
    date: '2024-01-14',
    status: 'completed',
    icon: '💵',
  },
  {
    id: '3',
    type: 'debit',
    amount: 45.00,
    currency: 'USD',
    description: 'Netflix Subscription',
    category: 'Entertainment',
    date: '2024-01-13',
    status: 'completed',
    icon: '🎬',
  },
  {
    id: '4',
    type: 'debit',
    amount: 250.00,
    currency: 'USD',
    description: 'Electric Bill',
    category: 'Utilities',
    date: '2024-01-12',
    status: 'completed',
    icon: '⚡',
  },
  {
    id: '5',
    type: 'debit',
    amount: 89.99,
    currency: 'USD',
    description: 'Spotify Annual',
    category: 'Entertainment',
    date: '2024-01-11',
    status: 'pending',
    icon: '🎵',
  },
  {
    id: '6',
    type: 'credit',
    amount: 500.00,
    currency: 'USD',
    description: 'Transfer from John',
    category: 'Transfer',
    date: '2024-01-10',
    status: 'completed',
    icon: '🔄',
  },
  {
    id: '7',
    type: 'debit',
    amount: 1200.00,
    currency: 'USD',
    description: 'Rent Payment',
    category: 'Housing',
    date: '2024-01-09',
    status: 'completed',
    icon: '🏠',
  },
  {
    id: '8',
    type: 'debit',
    amount: 65.30,
    currency: 'USD',
    description: 'Grocery Store',
    category: 'Food',
    date: '2024-01-08',
    status: 'completed',
    icon: '🛒',
  },
  {
    id: '9',
    type: 'debit',
    amount: 35.00,
    currency: 'USD',
    description: 'Uber Ride',
    category: 'Transport',
    date: '2024-01-07',
    status: 'completed',
    icon: '🚗',
  },
  {
    id: '10',
    type: 'credit',
    amount: 150.00,
    currency: 'USD',
    description: 'Cashback Reward',
    category: 'Rewards',
    date: '2024-01-06',
    status: 'completed',
    icon: '🎁',
  },
];

export const cards: Card[] = [
  {
    id: '1',
    type: 'visa',
    variant: 'debit',
    number: '4582 7891 3456 7890',
    holder: 'SARAH JOHNSON',
    expiry: '12/27',
    cvv: '***',
    balance: 45892.50,
    limit: 50000,
    frozen: false,
    color: 'gradient-card',
  },
  {
    id: '2',
    type: 'mastercard',
    variant: 'credit',
    number: '5412 7534 8901 2345',
    holder: 'SARAH JOHNSON',
    expiry: '08/26',
    cvv: '***',
    balance: 2340.50,
    limit: 15000,
    frozen: false,
    color: 'gradient-gold',
  },
];

export const quickActions = [
  { id: '1', name: 'Transfer', icon: '↗️', color: 'bg-primary' },
  { id: '2', name: 'Pay Bills', icon: '📄', color: 'bg-accent' },
  { id: '3', name: 'Add Money', icon: '➕', color: 'bg-success' },
  { id: '4', name: 'Scan QR', icon: '📱', color: 'bg-warning' },
];

export const monthlySpending = [
  { month: 'Jan', amount: 2400 },
  { month: 'Feb', amount: 1800 },
  { month: 'Mar', amount: 3200 },
  { month: 'Apr', amount: 2800 },
  { month: 'May', amount: 2100 },
  { month: 'Jun', amount: 3500 },
];

export const spendingByCategory = [
  { category: 'Shopping', amount: 1250, percentage: 35, color: 'hsl(217, 91%, 50%)' },
  { category: 'Food & Dining', amount: 850, percentage: 24, color: 'hsl(174, 72%, 46%)' },
  { category: 'Transport', amount: 450, percentage: 13, color: 'hsl(38, 92%, 50%)' },
  { category: 'Entertainment', amount: 350, percentage: 10, color: 'hsl(280, 70%, 50%)' },
  { category: 'Utilities', amount: 650, percentage: 18, color: 'hsl(152, 69%, 45%)' },
];

export const contacts = [
  { id: '1', name: 'John Doe', avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face', accountNumber: '****1234' },
  { id: '2', name: 'Jane Smith', avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', accountNumber: '****5678' },
  { id: '3', name: 'Mike Wilson', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face', accountNumber: '****9012' },
  { id: '4', name: 'Emily Brown', avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop&crop=face', accountNumber: '****3456' },
];
