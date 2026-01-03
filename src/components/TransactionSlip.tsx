import { useRef } from 'react';
import { X, Download, CheckCircle, Printer } from 'lucide-react';
import { formatCurrency } from '@/data/bankData';
import { useLanguage } from '@/contexts/LanguageContext';

interface TransactionSlipProps {
  isOpen: boolean;
  onClose: () => void;
  transactionDetails: {
    type: 'bill' | 'recharge' | 'transfer';
    transactionId: string;
    date: string;
    time: string;
    amount: number;
    status: 'success' | 'failed';
    // Bill specific
    provider?: string;
    consumerNumber?: string;
    consumerName?: string;
    billMonth?: string;
    // Recharge specific
    operator?: string;
    mobileNumber?: string;
    packageName?: string;
    validity?: string;
    // Transfer specific
    fromAccount?: string;
    toAccount?: string;
    beneficiaryName?: string;
    reference?: string;
  };
}

export function TransactionSlip({ isOpen, onClose, transactionDetails }: TransactionSlipProps) {
  const { t } = useLanguage();
  const slipRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDownload = () => {
    const slip = slipRef.current;
    if (!slip) return;

    // Create a printable version
    const printContent = slip.innerHTML;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Transaction Receipt - ${transactionDetails.transactionId}</title>
            <style>
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                padding: 40px;
                max-width: 400px;
                margin: 0 auto;
                background: #fff;
              }
              .slip-header {
                text-align: center;
                padding-bottom: 20px;
                border-bottom: 2px dashed #e5e7eb;
                margin-bottom: 20px;
              }
              .logo {
                font-size: 24px;
                font-weight: bold;
                color: #6366f1;
                margin-bottom: 10px;
              }
              .success-icon {
                width: 60px;
                height: 60px;
                background: #10b981;
                border-radius: 50%;
                margin: 0 auto 15px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .success-icon svg {
                color: white;
              }
              .status-text {
                font-size: 18px;
                font-weight: 600;
                color: #10b981;
              }
              .amount-section {
                text-align: center;
                padding: 20px 0;
                border-bottom: 2px dashed #e5e7eb;
                margin-bottom: 20px;
              }
              .amount {
                font-size: 32px;
                font-weight: bold;
                color: #1f2937;
              }
              .details-section {
                padding: 0;
              }
              .detail-row {
                display: flex;
                justify-content: space-between;
                padding: 10px 0;
                border-bottom: 1px solid #f3f4f6;
              }
              .detail-row:last-child {
                border-bottom: none;
              }
              .detail-label {
                color: #6b7280;
                font-size: 14px;
              }
              .detail-value {
                color: #1f2937;
                font-weight: 500;
                font-size: 14px;
                text-align: right;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                padding-top: 20px;
                border-top: 2px dashed #e5e7eb;
                color: #6b7280;
                font-size: 12px;
              }
            </style>
          </head>
          <body>
            ${printContent}
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.print();
    }
  };

  const getTypeTitle = () => {
    switch (transactionDetails.type) {
      case 'bill': return t('billPayment');
      case 'recharge': return t('mobileRecharge');
      case 'transfer': return t('transfer');
      default: return 'Transaction';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-card w-full max-w-md rounded-2xl border border-border shadow-2xl animate-scale-in overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">{t('transactionReceipt')}</h2>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
          >
            <X size={20} className="text-muted-foreground" />
          </button>
        </div>

        {/* Slip Content */}
        <div ref={slipRef} className="p-6">
          <div className="slip-header text-center pb-6 border-b-2 border-dashed border-border mb-6">
            <div className="logo text-2xl font-bold text-primary mb-3">NexBank</div>
            <div className="success-icon w-16 h-16 bg-success rounded-full mx-auto mb-4 flex items-center justify-center">
              <CheckCircle size={32} className="text-white" />
            </div>
            <p className="status-text text-lg font-semibold text-success">
              {transactionDetails.status === 'success' ? t('paymentSuccess') : 'Payment Failed'}
            </p>
            <p className="text-sm text-muted-foreground mt-1">{getTypeTitle()}</p>
          </div>

          {/* Amount */}
          <div className="amount-section text-center pb-6 border-b-2 border-dashed border-border mb-6">
            <p className="text-sm text-muted-foreground mb-1">{t('totalAmount')}</p>
            <p className="amount text-3xl font-bold text-foreground">
              {formatCurrency(transactionDetails.amount)}
            </p>
          </div>

          {/* Transaction Details */}
          <div className="details-section space-y-3">
            <div className="detail-row flex justify-between py-2 border-b border-border/50">
              <span className="detail-label text-sm text-muted-foreground">{t('transactionId')}</span>
              <span className="detail-value text-sm font-medium text-foreground">{transactionDetails.transactionId}</span>
            </div>

            <div className="detail-row flex justify-between py-2 border-b border-border/50">
              <span className="detail-label text-sm text-muted-foreground">{t('date')}</span>
              <span className="detail-value text-sm font-medium text-foreground">{transactionDetails.date}</span>
            </div>

            <div className="detail-row flex justify-between py-2 border-b border-border/50">
              <span className="detail-label text-sm text-muted-foreground">{t('time')}</span>
              <span className="detail-value text-sm font-medium text-foreground">{transactionDetails.time}</span>
            </div>

            {/* Bill Payment Details */}
            {transactionDetails.type === 'bill' && (
              <>
                <div className="detail-row flex justify-between py-2 border-b border-border/50">
                  <span className="detail-label text-sm text-muted-foreground">{t('provider')}</span>
                  <span className="detail-value text-sm font-medium text-foreground">{transactionDetails.provider}</span>
                </div>
                <div className="detail-row flex justify-between py-2 border-b border-border/50">
                  <span className="detail-label text-sm text-muted-foreground">{t('consumerNumber')}</span>
                  <span className="detail-value text-sm font-medium text-foreground">{transactionDetails.consumerNumber}</span>
                </div>
                <div className="detail-row flex justify-between py-2 border-b border-border/50">
                  <span className="detail-label text-sm text-muted-foreground">{t('consumerName')}</span>
                  <span className="detail-value text-sm font-medium text-foreground">{transactionDetails.consumerName}</span>
                </div>
              </>
            )}

            {/* Recharge Details */}
            {transactionDetails.type === 'recharge' && (
              <>
                <div className="detail-row flex justify-between py-2 border-b border-border/50">
                  <span className="detail-label text-sm text-muted-foreground">{t('operator')}</span>
                  <span className="detail-value text-sm font-medium text-foreground">{transactionDetails.operator}</span>
                </div>
                <div className="detail-row flex justify-between py-2 border-b border-border/50">
                  <span className="detail-label text-sm text-muted-foreground">{t('mobileNumber')}</span>
                  <span className="detail-value text-sm font-medium text-foreground">{transactionDetails.mobileNumber}</span>
                </div>
                <div className="detail-row flex justify-between py-2 border-b border-border/50">
                  <span className="detail-label text-sm text-muted-foreground">{t('package')}</span>
                  <span className="detail-value text-sm font-medium text-foreground">{transactionDetails.packageName}</span>
                </div>
                <div className="detail-row flex justify-between py-2 border-b border-border/50">
                  <span className="detail-label text-sm text-muted-foreground">{t('validity')}</span>
                  <span className="detail-value text-sm font-medium text-foreground">{transactionDetails.validity}</span>
                </div>
              </>
            )}

            {/* Transfer Details */}
            {transactionDetails.type === 'transfer' && (
              <>
                <div className="detail-row flex justify-between py-2 border-b border-border/50">
                  <span className="detail-label text-sm text-muted-foreground">{t('fromAccount')}</span>
                  <span className="detail-value text-sm font-medium text-foreground">{transactionDetails.fromAccount}</span>
                </div>
                <div className="detail-row flex justify-between py-2 border-b border-border/50">
                  <span className="detail-label text-sm text-muted-foreground">{t('toAccount')}</span>
                  <span className="detail-value text-sm font-medium text-foreground">{transactionDetails.toAccount}</span>
                </div>
                <div className="detail-row flex justify-between py-2 border-b border-border/50">
                  <span className="detail-label text-sm text-muted-foreground">{t('beneficiaryName')}</span>
                  <span className="detail-value text-sm font-medium text-foreground">{transactionDetails.beneficiaryName}</span>
                </div>
                {transactionDetails.reference && (
                  <div className="detail-row flex justify-between py-2 border-b border-border/50">
                    <span className="detail-label text-sm text-muted-foreground">{t('reference')}</span>
                    <span className="detail-value text-sm font-medium text-foreground">{transactionDetails.reference}</span>
                  </div>
                )}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="footer text-center mt-6 pt-6 border-t-2 border-dashed border-border">
            <p className="text-xs text-muted-foreground">Thank you for using NexBank</p>
            <p className="text-xs text-muted-foreground mt-1">Customer Support: 0800-123-456</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3 p-4 border-t border-border bg-secondary/30">
          <button
            onClick={handleDownload}
            className="flex-1 h-12 rounded-xl bg-primary text-primary-foreground font-semibold flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <Download size={18} />
            {t('downloadReceipt')}
          </button>
          <button
            onClick={handleDownload}
            className="h-12 px-4 rounded-xl border border-border bg-card hover:bg-secondary transition-colors flex items-center justify-center"
          >
            <Printer size={18} className="text-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
}