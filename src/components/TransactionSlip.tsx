import { useRef } from 'react';
import { X, Download, CheckCircle, Printer, QrCode } from 'lucide-react';
import { formatCurrency } from '@/data/bankData';
import { useLanguage } from '@/contexts/LanguageContext';
import nexbankLogo from '@/assets/nexbank-logo.png';

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
    fromAccountNumber?: string;
    toAccount?: string;
    toAccountNumber?: string;
    beneficiaryName?: string;
    beneficiaryBank?: string;
    reference?: string;
    narration?: string;
  };
}

export function TransactionSlip({ isOpen, onClose, transactionDetails }: TransactionSlipProps) {
  const { t } = useLanguage();
  const slipRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handleDownload = () => {
    const slip = slipRef.current;
    if (!slip) return;

    const printContent = slip.innerHTML;
    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>Transaction Receipt - ${transactionDetails.transactionId}</title>
            <style>
              * {
                box-sizing: border-box;
                margin: 0;
                padding: 0;
              }
              body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                padding: 20px;
                background: #fff;
                color: #1a1a2e;
              }
              .receipt-container {
                max-width: 500px;
                margin: 0 auto;
                border: 1px solid #e5e7eb;
              }
              .receipt-header {
                background: linear-gradient(135deg, #1a1a2e 0%, #2d3561 100%);
                color: white;
                padding: 24px;
                text-align: center;
              }
              .bank-name {
                font-size: 28px;
                font-weight: 700;
                margin-bottom: 4px;
              }
              .receipt-title {
                font-size: 14px;
                opacity: 0.9;
              }
              .receipt-body {
                padding: 24px;
              }
              .section {
                border-bottom: 1px solid #e5e7eb;
                padding: 16px 0;
              }
              .section:last-child {
                border-bottom: none;
              }
              .section-label {
                color: #6b7280;
                font-size: 12px;
                text-transform: uppercase;
                letter-spacing: 0.5px;
                margin-bottom: 8px;
              }
              .section-content {
                text-align: right;
              }
              .primary-text {
                font-weight: 600;
                font-size: 15px;
                color: #1a1a2e;
              }
              .secondary-text {
                font-size: 13px;
                color: #6b7280;
                margin-top: 2px;
              }
              .amount-section {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
              .amount {
                font-size: 24px;
                font-weight: 700;
                color: #1a1a2e;
              }
              .status-badge {
                display: inline-block;
                padding: 4px 12px;
                border-radius: 20px;
                font-size: 12px;
                font-weight: 600;
              }
              .status-success {
                background: #dcfce7;
                color: #166534;
              }
              .receipt-footer {
                background: #f9fafb;
                padding: 20px 24px;
                border-top: 1px solid #e5e7eb;
              }
              .qr-section {
                display: flex;
                gap: 16px;
                align-items: flex-start;
              }
              .qr-placeholder {
                width: 60px;
                height: 60px;
                background: #e5e7eb;
                border-radius: 8px;
                display: flex;
                align-items: center;
                justify-content: center;
              }
              .footer-text {
                font-size: 11px;
                color: #6b7280;
                line-height: 1.5;
              }
              .bank-info {
                margin-top: 16px;
                padding-top: 16px;
                border-top: 1px solid #e5e7eb;
                text-align: center;
                font-size: 11px;
                color: #6b7280;
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

  const getTransactionTypeLabel = () => {
    switch (transactionDetails.type) {
      case 'bill': return 'BILL PAYMENT';
      case 'recharge': return 'MOBILE RECHARGE';
      case 'transfer': return 'FUND TRANSFER';
      default: return 'TRANSACTION';
    }
  };

  const maskAccountNumber = (number: string) => {
    if (!number || number.length < 8) return number;
    return number.slice(0, 4) + '****' + number.slice(-4);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-fade-in">
      <div className="bg-card w-full max-w-lg rounded-2xl border border-border shadow-2xl animate-scale-in overflow-hidden max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
          >
            <X size={20} className="text-white" />
          </button>
        </div>

        {/* Receipt Content */}
        <div ref={slipRef} className="receipt-container">
          {/* Header - Bank Branding */}
          <div className="receipt-header bg-gradient-to-br from-[#1a1a2e] to-[#2d3561] text-white p-6 text-center">
            <div className="flex justify-center mb-3">
              <img src={nexbankLogo} alt="NexBank" className="w-16 h-16 object-contain" />
            </div>
            <div className="bank-name text-3xl font-bold mb-1">NexBank</div>
            <div className="receipt-title text-sm opacity-90">Online Banking</div>
            <div className="text-xs mt-2 opacity-75">{t('transactionReceipt')}</div>
          </div>

          {/* Receipt Body */}
          <div className="receipt-body p-6 bg-card">
            {/* Status Section */}
            <div className="flex items-center justify-center gap-3 pb-6 border-b border-border">
              <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center">
                <CheckCircle size={28} className="text-success" />
              </div>
              <div>
                <p className="font-semibold text-foreground text-lg">
                  {transactionDetails.status === 'success' ? t('paymentSuccess') : 'Payment Failed'}
                </p>
                <p className="text-sm text-muted-foreground">{getTypeTitle()}</p>
              </div>
            </div>

            {/* Transfer Details */}
            {transactionDetails.type === 'transfer' && (
              <>
                {/* Payer Section */}
                <div className="section py-4 border-b border-border">
                  <div className="flex justify-between">
                    <div className="section-label text-xs uppercase tracking-wider text-muted-foreground">Payer</div>
                    <div className="section-content text-right">
                      <div className="primary-text font-semibold text-foreground">NEXBANK USER</div>
                      <div className="secondary-text text-sm text-muted-foreground">{maskAccountNumber(transactionDetails.fromAccountNumber || transactionDetails.fromAccount || '')}</div>
                      <div className="secondary-text text-sm text-muted-foreground">NexBank</div>
                    </div>
                  </div>
                </div>

                {/* Receiver Section */}
                <div className="section py-4 border-b border-border">
                  <div className="flex justify-between">
                    <div className="section-label text-xs uppercase tracking-wider text-muted-foreground">Receiver</div>
                    <div className="section-content text-right">
                      <div className="primary-text font-semibold text-foreground">{transactionDetails.beneficiaryName?.toUpperCase() || 'N/A'}</div>
                      <div className="secondary-text text-sm text-muted-foreground">{maskAccountNumber(transactionDetails.toAccountNumber || transactionDetails.toAccount || '')}</div>
                      <div className="secondary-text text-sm text-muted-foreground">{transactionDetails.beneficiaryBank || 'NexBank'}</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Bill Payment Details */}
            {transactionDetails.type === 'bill' && (
              <>
                <div className="section py-4 border-b border-border">
                  <div className="flex justify-between">
                    <div className="section-label text-xs uppercase tracking-wider text-muted-foreground">{t('provider')}</div>
                    <div className="section-content text-right">
                      <div className="primary-text font-semibold text-foreground">{transactionDetails.provider}</div>
                    </div>
                  </div>
                </div>
                <div className="section py-4 border-b border-border">
                  <div className="flex justify-between">
                    <div className="section-label text-xs uppercase tracking-wider text-muted-foreground">{t('consumerNumber')}</div>
                    <div className="section-content text-right">
                      <div className="primary-text font-semibold text-foreground">{transactionDetails.consumerNumber}</div>
                      <div className="secondary-text text-sm text-muted-foreground">{transactionDetails.consumerName}</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Recharge Details */}
            {transactionDetails.type === 'recharge' && (
              <>
                <div className="section py-4 border-b border-border">
                  <div className="flex justify-between">
                    <div className="section-label text-xs uppercase tracking-wider text-muted-foreground">{t('operator')}</div>
                    <div className="section-content text-right">
                      <div className="primary-text font-semibold text-foreground">{transactionDetails.operator}</div>
                    </div>
                  </div>
                </div>
                <div className="section py-4 border-b border-border">
                  <div className="flex justify-between">
                    <div className="section-label text-xs uppercase tracking-wider text-muted-foreground">{t('mobileNumber')}</div>
                    <div className="section-content text-right">
                      <div className="primary-text font-semibold text-foreground">{transactionDetails.mobileNumber}</div>
                    </div>
                  </div>
                </div>
                <div className="section py-4 border-b border-border">
                  <div className="flex justify-between">
                    <div className="section-label text-xs uppercase tracking-wider text-muted-foreground">{t('package')}</div>
                    <div className="section-content text-right">
                      <div className="primary-text font-semibold text-foreground">{transactionDetails.packageName}</div>
                      <div className="secondary-text text-sm text-muted-foreground">{transactionDetails.validity}</div>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Transaction Amount Section */}
            <div className="section py-4 border-b border-border">
              <div className="flex justify-between items-center">
                <div className="section-label text-xs uppercase tracking-wider text-muted-foreground">Transaction</div>
                <div className="section-content text-right">
                  <div className="amount text-2xl font-bold text-foreground">{formatCurrency(transactionDetails.amount)}</div>
                  <div className="secondary-text text-sm text-muted-foreground">{getTransactionTypeLabel()}</div>
                  <div className="secondary-text text-sm text-muted-foreground">{transactionDetails.date} at {transactionDetails.time}</div>
                </div>
              </div>
            </div>

            {/* Narration Section */}
            {transactionDetails.narration && (
              <div className="section py-4 border-b border-border">
                <div className="flex justify-between">
                  <div className="section-label text-xs uppercase tracking-wider text-muted-foreground">Narration</div>
                  <div className="section-content text-right">
                    <div className="primary-text font-semibold text-foreground text-sm">{transactionDetails.narration}</div>
                  </div>
                </div>
              </div>
            )}

            {/* Reference Section */}
            <div className="section py-4 border-b border-border">
              <div className="flex justify-between">
                <div className="section-label text-xs uppercase tracking-wider text-muted-foreground">Reference</div>
                <div className="section-content text-right">
                  <div className="primary-text font-semibold text-foreground text-xs font-mono">{transactionDetails.transactionId}</div>
                  <div className="mt-1">
                    <span className="status-badge inline-block px-3 py-1 rounded-full text-xs font-semibold bg-success/20 text-success">
                      {transactionDetails.status === 'success' ? 'SUCCESSFUL' : 'FAILED'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="receipt-footer bg-secondary/50 p-5 border-t border-border">
            <div className="qr-section flex gap-4">
              <div className="qr-placeholder w-14 h-14 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                <QrCode size={28} className="text-muted-foreground" />
              </div>
              <div className="footer-text text-xs text-muted-foreground leading-relaxed">
                <p>This is an electronic receipt of a transaction and does not require any signature.</p>
                <p className="mt-1">The authenticity of transaction can be confirmed with the Bank.</p>
                <p className="mt-1">For any other assistance, kindly call 0800-123-456 or email support@nexbank.pk</p>
              </div>
            </div>
            <div className="bank-info mt-4 pt-4 border-t border-border text-center text-xs text-muted-foreground">
              NexBank - Your Trusted Digital Banking Partner
            </div>
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
