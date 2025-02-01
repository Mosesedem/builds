import React from 'react';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { AlertCircle, CreditCard, RefreshCw } from 'lucide-react';

const PaymentChoiceDialog = ({ 
  open, 
  onClose, 
  onChoose, 
  price,
  duration
}: { 
  open: boolean; 
  onClose: () => void; 
  onChoose: (type: 'subscription' | 'onetime') => void;
  price: number;
  duration: string;
}) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
              <DialogContent className="sm:max-w-xl max-w-lg overflow-y-auto max-h-[80vh]">
        <DialogTitle className="text-center text-xl font-bold">
          How would you like to pay?
        </DialogTitle>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onChoose('subscription')}>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <RefreshCw className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">Subscription Based</h3>
              <p className="text-center text-sm text-gray-500">
                Auto-renew at the end of {duration} months to maintain continuous coverage
              </p>
              <div className="text-2xl font-bold text-primary">
                ${price}/{duration} Months
              </div>
              <ul className="text-sm space-y-2">
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Uninterrupted coverage
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Automatic renewals
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-500">✓</span> Cancel anytime
                </li>
              </ul>
            </div>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onChoose('onetime')}>
            <div className="flex flex-col items-center space-y-4">
              <div className="p-3 bg-primary/10 rounded-full">
                <CreditCard className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-lg">One-Time Payment</h3>
              <p className="text-center text-sm text-gray-500">
                Single payment for {duration} months worth of coverage
              </p>
              <div className="text-2xl font-bold text-primary">
                ${price}
              </div>
              <div className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg">
                <AlertCircle className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-yellow-700">
                  Your insurance cycle may be disrupted if your plan expires and is not renewed on time
                </p>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default PaymentChoiceDialog;