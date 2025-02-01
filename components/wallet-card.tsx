"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DollarSign } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Define the props interface
interface WalletCardProps {
  balance: number;
  onBalanceChange?: (newBalance: number) => void;
}

export function WalletCard({ balance, onBalanceChange }: WalletCardProps) {
  const [currentBalance, setCurrentBalance] = useState<number>(balance);
  const [amount, setAmount] = useState<string>("");
  const { toast } = useToast();

  const handleAddFunds = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid positive number",
        variant: "destructive",
      });
      return;
    }

    const newBalance = currentBalance + Number(amount);
    setCurrentBalance(newBalance);
    onBalanceChange?.(newBalance); // Call the callback if provided
    setAmount("");
    
    toast({
      title: "Funds added successfully",
      description: `$${Number(amount).toFixed(2)} has been added to your wallet`,
    });
  };

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // Only allow positive numbers with up to 2 decimal places
    const value = e.target.value;
    if (value === "" || /^\d*\.?\d{0,2}$/.test(value)) {
      setAmount(value);
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-6 w-6" />
          Wallet Balance
        </CardTitle>
        <CardDescription>Manage your account balance and transactions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
          <p className="text-sm text-muted-foreground">Available Balance</p>
          <p className="text-3xl font-bold text-blue-600">${currentBalance.toFixed(2)}</p>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="amount">Add Funds</Label>
            <div className="flex gap-2">
              <Input
                id="amount"
                placeholder="Enter amount"
                type="number"
                min="0"
                step="0.01"
                value={amount}
                onChange={handleAmountChange}
                className="flex-1"
              />
              <Button 
                onClick={handleAddFunds} 
                disabled={!amount || Number(amount) <= 0}
                className="whitespace-nowrap"
              >
                Add Funds
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default WalletCard;