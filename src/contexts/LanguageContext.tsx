import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Language = 'en' | 'ur' | 'ar' | 'zh';

interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

const translations: Translations = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    accounts: 'Accounts',
    transfer: 'Transfer',
    transactions: 'History',
    cards: 'Cards',
    profile: 'Profile',
    settings: 'Settings',
    billPayment: 'Bill Payment',
    mobileRecharge: 'Mobile Recharge',
    home: 'Home',
    logout: 'Logout',
    
    // Dashboard
    welcomeBack: 'Welcome back',
    accountOverview: 'Your financial overview',
    totalBalance: 'Total Balance',
    availableBalance: 'Available Balance',
    recentTransactions: 'Recent Transactions',
    viewAll: 'View All',
    quickActions: 'Quick Actions',
    payBills: 'Pay Bills',
    addMoney: 'Add Money',
    scanQR: 'Scan QR',
    
    // Accounts
    myAccounts: 'My Accounts',
    manageAccounts: 'Manage your bank accounts',
    savingsAccount: 'Savings Account',
    currentAccount: 'Current Account',
    accountNumber: 'Account Number',
    balance: 'Balance',
    
    // Transfer
    moneyTransfer: 'Money Transfer',
    sendMoney: 'Send money to anyone instantly',
    selectAccount: 'Select Account',
    recipientDetails: 'Recipient Details',
    accountHolderName: 'Account Holder Name',
    enterName: 'Enter account holder name',
    amount: 'Amount',
    enterAmount: 'Enter amount',
    transferNow: 'Transfer Now',
    transferSuccess: 'Transfer Successful',
    
    // Transactions
    transactionHistory: 'Transaction History',
    trackSpending: 'Track your spending and income',
    all: 'All',
    income: 'Income',
    expense: 'Expense',
    search: 'Search',
    searchTransactions: 'Search transactions...',
    noTransactions: 'No transactions found',
    
    // Cards
    myCards: 'My Cards',
    manageCards: 'Manage your debit and credit cards',
    showDetails: 'Show Details',
    hideDetails: 'Hide Details',
    copyNumber: 'Copy Number',
    freezeCard: 'Freeze Card',
    unfreezeCard: 'Unfreeze',
    cardSettings: 'Card Settings',
    cardFrozen: 'Card Frozen',
    cardUnfrozen: 'Card Unfrozen',
    addNewCard: 'Add New Card',
    linkNewCard: 'Link a new card',
    
    // Profile
    myProfile: 'My Profile',
    managePersonalInfo: 'Manage your personal information',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    address: 'Address',
    personalInformation: 'Personal Information',
    securitySettings: 'Security Settings',
    twoFactorAuth: 'Two-Factor Authentication',
    changePassword: 'Change Password',
    edit: 'Edit',
    save: 'Save',
    
    // Settings
    appearance: 'Appearance',
    lightMode: 'Light Mode',
    darkMode: 'Dark Mode',
    notifications: 'Notifications',
    pushNotifications: 'Push Notifications',
    emailNotifications: 'Email Notifications',
    smsNotifications: 'SMS Notifications',
    security: 'Security',
    biometricLogin: 'Biometric Login',
    loginAlerts: 'Login Alerts',
    more: 'More',
    language: 'Language',
    privacyPolicy: 'Privacy Policy',
    
    // Bill Payment
    selectProvider: 'Select Provider',
    enterAccountNumber: 'Enter Account Number',
    customerNumber: 'Customer Number',
    fetchBill: 'Fetch Bill',
    payNow: 'Pay Now',
    billAmount: 'Bill Amount',
    dueDate: 'Due Date',
    paymentSuccess: 'Payment Successful',
    
    // Mobile Recharge
    selectOperator: 'Select Operator',
    mobileNumber: 'Mobile Number',
    enterMobileNumber: 'Enter Mobile Number',
    selectPackage: 'Select Package',
    rechargeNow: 'Recharge Now',
    rechargeSuccess: 'Recharge Successful',
    
    // Common
    cancel: 'Cancel',
    confirm: 'Confirm',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    pkr: 'PKR',
  },
  ur: {
    // Navigation
    dashboard: 'ڈیش بورڈ',
    accounts: 'اکاؤنٹس',
    transfer: 'منتقلی',
    transactions: 'تاریخ',
    cards: 'کارڈز',
    profile: 'پروفائل',
    settings: 'ترتیبات',
    billPayment: 'بل ادائیگی',
    mobileRecharge: 'موبائل ریچارج',
    home: 'ہوم',
    logout: 'لاگ آؤٹ',
    
    // Dashboard
    welcomeBack: 'خوش آمدید',
    accountOverview: 'آپ کا مالی جائزہ',
    totalBalance: 'کل بیلنس',
    availableBalance: 'دستیاب بیلنس',
    recentTransactions: 'حالیہ لین دین',
    viewAll: 'سب دیکھیں',
    quickActions: 'فوری کارروائیاں',
    payBills: 'بل ادا کریں',
    addMoney: 'رقم شامل کریں',
    scanQR: 'QR اسکین کریں',
    
    // Accounts
    myAccounts: 'میرے اکاؤنٹس',
    manageAccounts: 'اپنے بینک اکاؤنٹس کا انتظام کریں',
    savingsAccount: 'بچت اکاؤنٹ',
    currentAccount: 'کرنٹ اکاؤنٹ',
    accountNumber: 'اکاؤنٹ نمبر',
    balance: 'بیلنس',
    
    // Transfer
    moneyTransfer: 'رقم کی منتقلی',
    sendMoney: 'فوری طور پر کسی کو بھی رقم بھیجیں',
    selectAccount: 'اکاؤنٹ منتخب کریں',
    recipientDetails: 'وصول کنندہ کی تفصیلات',
    accountHolderName: 'اکاؤنٹ ہولڈر کا نام',
    enterName: 'اکاؤنٹ ہولڈر کا نام درج کریں',
    amount: 'رقم',
    enterAmount: 'رقم درج کریں',
    transferNow: 'ابھی منتقل کریں',
    transferSuccess: 'منتقلی کامیاب',
    
    // Transactions
    transactionHistory: 'لین دین کی تاریخ',
    trackSpending: 'اپنے اخراجات اور آمدنی کو ٹریک کریں',
    all: 'تمام',
    income: 'آمدنی',
    expense: 'اخراجات',
    search: 'تلاش',
    searchTransactions: 'لین دین تلاش کریں...',
    noTransactions: 'کوئی لین دین نہیں ملا',
    
    // Cards
    myCards: 'میرے کارڈز',
    manageCards: 'اپنے ڈیبٹ اور کریڈٹ کارڈز کا انتظام کریں',
    showDetails: 'تفصیلات دکھائیں',
    hideDetails: 'تفصیلات چھپائیں',
    copyNumber: 'نمبر کاپی کریں',
    freezeCard: 'کارڈ منجمد کریں',
    unfreezeCard: 'فعال کریں',
    cardSettings: 'کارڈ کی ترتیبات',
    cardFrozen: 'کارڈ منجمد ہو گیا',
    cardUnfrozen: 'کارڈ فعال ہو گیا',
    addNewCard: 'نیا کارڈ شامل کریں',
    linkNewCard: 'نیا کارڈ لنک کریں',
    
    // Profile
    myProfile: 'میری پروفائل',
    managePersonalInfo: 'اپنی ذاتی معلومات کا انتظام کریں',
    fullName: 'پورا نام',
    emailAddress: 'ای میل پتہ',
    phoneNumber: 'فون نمبر',
    address: 'پتہ',
    personalInformation: 'ذاتی معلومات',
    securitySettings: 'سیکیورٹی کی ترتیبات',
    twoFactorAuth: 'دو عنصر کی توثیق',
    changePassword: 'پاس ورڈ تبدیل کریں',
    edit: 'ترمیم',
    save: 'محفوظ کریں',
    
    // Settings
    appearance: 'ظاہری شکل',
    lightMode: 'لائٹ موڈ',
    darkMode: 'ڈارک موڈ',
    notifications: 'اطلاعات',
    pushNotifications: 'پش اطلاعات',
    emailNotifications: 'ای میل اطلاعات',
    smsNotifications: 'SMS اطلاعات',
    security: 'سیکیورٹی',
    biometricLogin: 'بائیو میٹرک لاگ ان',
    loginAlerts: 'لاگ ان الرٹس',
    more: 'مزید',
    language: 'زبان',
    privacyPolicy: 'رازداری کی پالیسی',
    
    // Bill Payment
    selectProvider: 'فراہم کنندہ منتخب کریں',
    enterAccountNumber: 'اکاؤنٹ نمبر درج کریں',
    customerNumber: 'کسٹمر نمبر',
    fetchBill: 'بل حاصل کریں',
    payNow: 'ابھی ادا کریں',
    billAmount: 'بل کی رقم',
    dueDate: 'آخری تاریخ',
    paymentSuccess: 'ادائیگی کامیاب',
    
    // Mobile Recharge
    selectOperator: 'آپریٹر منتخب کریں',
    mobileNumber: 'موبائل نمبر',
    enterMobileNumber: 'موبائل نمبر درج کریں',
    selectPackage: 'پیکج منتخب کریں',
    rechargeNow: 'ابھی ریچارج کریں',
    rechargeSuccess: 'ریچارج کامیاب',
    
    // Common
    cancel: 'منسوخ',
    confirm: 'تصدیق',
    loading: 'لوڈ ہو رہا ہے...',
    error: 'خرابی',
    success: 'کامیابی',
    pkr: 'روپے',
  },
  ar: {
    // Navigation
    dashboard: 'لوحة التحكم',
    accounts: 'الحسابات',
    transfer: 'تحويل',
    transactions: 'السجل',
    cards: 'البطاقات',
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    billPayment: 'دفع الفواتير',
    mobileRecharge: 'شحن الهاتف',
    home: 'الرئيسية',
    logout: 'تسجيل خروج',
    
    // Dashboard
    welcomeBack: 'مرحباً بعودتك',
    accountOverview: 'نظرة عامة مالية',
    totalBalance: 'الرصيد الإجمالي',
    availableBalance: 'الرصيد المتاح',
    recentTransactions: 'المعاملات الأخيرة',
    viewAll: 'عرض الكل',
    quickActions: 'إجراءات سريعة',
    payBills: 'دفع الفواتير',
    addMoney: 'إضافة أموال',
    scanQR: 'مسح QR',
    
    // Common
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    loading: 'جار التحميل...',
    error: 'خطأ',
    success: 'نجاح',
    pkr: 'روبية',
    
    // Accounts
    myAccounts: 'حساباتي',
    manageAccounts: 'إدارة حساباتك المصرفية',
    savingsAccount: 'حساب التوفير',
    currentAccount: 'الحساب الجاري',
    accountNumber: 'رقم الحساب',
    balance: 'الرصيد',
    
    // Transfer
    moneyTransfer: 'تحويل الأموال',
    sendMoney: 'أرسل الأموال فوراً',
    selectAccount: 'اختر الحساب',
    recipientDetails: 'تفاصيل المستلم',
    accountHolderName: 'اسم صاحب الحساب',
    enterName: 'أدخل اسم صاحب الحساب',
    amount: 'المبلغ',
    enterAmount: 'أدخل المبلغ',
    transferNow: 'حوّل الآن',
    transferSuccess: 'تم التحويل بنجاح',
    
    // Settings
    appearance: 'المظهر',
    lightMode: 'الوضع الفاتح',
    darkMode: 'الوضع الداكن',
    notifications: 'الإشعارات',
    language: 'اللغة',
    
    // Cards
    myCards: 'بطاقاتي',
    manageCards: 'إدارة بطاقاتك',
    showDetails: 'إظهار التفاصيل',
    hideDetails: 'إخفاء التفاصيل',
    cardSettings: 'إعدادات البطاقة',
    
    // Profile
    myProfile: 'ملفي الشخصي',
    changePassword: 'تغيير كلمة المرور',
    edit: 'تعديل',
    save: 'حفظ',
  },
  zh: {
    // Navigation
    dashboard: '仪表板',
    accounts: '账户',
    transfer: '转账',
    transactions: '历史记录',
    cards: '卡片',
    profile: '个人资料',
    settings: '设置',
    billPayment: '账单支付',
    mobileRecharge: '手机充值',
    home: '首页',
    logout: '登出',
    
    // Dashboard
    welcomeBack: '欢迎回来',
    accountOverview: '您的财务概览',
    totalBalance: '总余额',
    availableBalance: '可用余额',
    recentTransactions: '最近交易',
    viewAll: '查看全部',
    quickActions: '快捷操作',
    payBills: '支付账单',
    addMoney: '充值',
    scanQR: '扫描二维码',
    
    // Common
    cancel: '取消',
    confirm: '确认',
    loading: '加载中...',
    error: '错误',
    success: '成功',
    pkr: '卢比',
    
    // Accounts
    myAccounts: '我的账户',
    manageAccounts: '管理您的银行账户',
    savingsAccount: '储蓄账户',
    currentAccount: '活期账户',
    accountNumber: '账户号码',
    balance: '余额',
    
    // Transfer
    moneyTransfer: '转账',
    sendMoney: '即时转账',
    selectAccount: '选择账户',
    amount: '金额',
    transferNow: '立即转账',
    transferSuccess: '转账成功',
    
    // Settings
    appearance: '外观',
    lightMode: '浅色模式',
    darkMode: '深色模式',
    notifications: '通知',
    language: '语言',
    
    // Cards
    myCards: '我的卡片',
    manageCards: '管理您的银行卡',
    showDetails: '显示详情',
    hideDetails: '隐藏详情',
    cardSettings: '卡片设置',
    
    // Profile
    myProfile: '我的资料',
    changePassword: '修改密码',
    edit: '编辑',
    save: '保存',
  },
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isRTL: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('language');
    return (saved as Language) || 'en';
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
    
    // Set document direction for RTL languages
    if (lang === 'ur' || lang === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = lang;
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = lang;
    }
  };

  useEffect(() => {
    // Set initial direction
    if (language === 'ur' || language === 'ar') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = language;
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language;
    }
  }, []);

  const t = (key: string): string => {
    return translations[language]?.[key] || translations['en']?.[key] || key;
  };

  const isRTL = language === 'ur' || language === 'ar';

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
