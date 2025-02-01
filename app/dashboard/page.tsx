"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileText, CreditCard, User, Phone, Mail, MessageCircle, Check, Copy } from "lucide-react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { WalletCard } from "@/components/wallet-card";
import { PlanInfoCard } from "@/components/plan-info-card";
import { ContactUsDialog } from "@/components/contact-us-dialog";
import { SubscriptionCard } from "@/components/subscription-card";
import { useLayoutConfig } from "@/contexts/LayoutConfigContext";
import { DependentsCard } from "@/components/DependentsCard";
import { AccountSettingsCard } from "@/components/AccountSettingsCard";
import { EnrollmentCard } from "@/components/EnrollmentCard";
import { useSearchParams, useRouter } from "next/navigation";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface DashboardProps {
  bankName?: string;
}

interface Transaction {
  id: string;
  date: string;
  type: "credit" | "debit";
  amount: number;
  description: string;
}

interface UserInfo {
  name: string;
  planId: string;
  hmoId: string;
  walletBalance: number;
}

interface VirtualAccountDetails {
  accountNumber: string;
  routingNumber: string;
  bankName: string;
}

export default function DashboardPage({ bankName = "Chase Bank" }: DashboardProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();
  const { setConfig } = useLayoutConfig();
  
  const [activeTab, setActiveTab] = useState(searchParams?.get("tab") || "overview");
  const [isCopied, setIsCopied] = useState(false);
  const [userInfo, setUserInfo] = useState<UserInfo>({
    name: "John Doe",
    planId: "MA12345",
    hmoId: "HMO98765",
    walletBalance: 500,
  });

  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: "1",
      date: "2024-02-20",
      type: "credit",
      amount: 500,
      description: "Funds added",
    },
    {
      id: "2",
      date: "2024-02-19",
      type: "debit",
      amount: 100,
      description: "Health plan payment",
    },
  ]);

  const virtualAccountDetails: VirtualAccountDetails = {
    accountNumber: "1234567890",
    routingNumber: "021000021",
    bankName,
  };

  useEffect(() => {
    setConfig({ hideHeader: true, hideFooter: true });
    return () => setConfig({ hideHeader: false, hideFooter: false });
  }, [setConfig]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    router.push(`/dashboard?tab=${value}`);
  };

  const handleBalanceChange = (newBalance: number) => {
    setUserInfo(prev => ({
      ...prev,
      walletBalance: newBalance
    }));
  };

  const copyToClipboard = async (text: string, description: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      toast({
        title: "Copied!",
        description,
      });
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  const renderVirtualAccountDetails = () => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Virtual Account Details</CardTitle>
        <CardDescription>Your account information for transfers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Bank Name</p>
              <p className="font-medium">{virtualAccountDetails.bankName}</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Account Number</p>
              <p className="font-medium">{virtualAccountDetails.accountNumber}</p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => copyToClipboard(
                virtualAccountDetails.accountNumber,
                "Account number copied to clipboard"
              )}
            >
              {isCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const renderTransactions = () => (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Transaction History</CardTitle>
        <CardDescription>Your recent wallet activity</CardDescription>
      </CardHeader>
      <CardContent>
        {transactions.length > 0 ? (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Description</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell className="font-medium">
                    {new Date(transaction.date).toLocaleDateString()}
                  </TableCell>
                  <TableCell>{transaction.description}</TableCell>
                  <TableCell
                    className={`text-right ${
                      transaction.type === "credit" ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    {transaction.type === "credit" ? "+" : "-"}${transaction.amount.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <Alert>
            <AlertDescription>No transactions to display</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );

  return (
    <SidebarProvider>
      <div className="flex h-screen overflow-hidden bg-background">
        <AppSidebar activeTab={activeTab} onTabChange={handleTabChange} />
        <main className="flex-1 overflow-y-auto">
          <div className="container mx-auto p-4 lg:p-8 max-w-7xl">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-0">
                Welcome, {userInfo.name}
              </h1>
            </div>

            <div className="md:hidden mb-6">
              <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
                <TabsList className="w-full overflow-x-auto flex whitespace-nowrap pb-2 mb-2">
                  <div className="flex space-x-2 min-w-full px-1">
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="enrollment">Enrollment</TabsTrigger>
                    <TabsTrigger value="dependents">Dependents</TabsTrigger>
                    <TabsTrigger value="wallet">Wallet</TabsTrigger>
                    <TabsTrigger value="settings">Settings</TabsTrigger>
                    <TabsTrigger value="contact">Contact</TabsTrigger>
                  </div>
                </TabsList>
              </Tabs>
            </div>

            <div className="space-y-6">
              {activeTab === "overview" && (
                <>
                  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    <PlanInfoCard planId={userInfo.planId} hmoId={userInfo.hmoId} />
                    <WalletCard 
                      balance={userInfo.walletBalance} 
                      onBalanceChange={handleBalanceChange}
                    />
                    <SubscriptionCard />
                  </div>
                  <EnrollmentCard />
                  <DependentsCard />
                </>
              )}

              {activeTab === "enrollment" && <EnrollmentCard />}
              {activeTab === "dependents" && <DependentsCard />}

              {activeTab === "wallet" && (
                <div className="space-y-6">
                  <WalletCard 
                    balance={userInfo.walletBalance}
                    onBalanceChange={handleBalanceChange}
                  />
                  {renderVirtualAccountDetails()}
                  {renderTransactions()}
                </div>
              )}

              {activeTab === "settings" && <AccountSettingsCard />}

              {activeTab === "contact" && (
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Support</CardTitle>
                    <CardDescription>Get help with your insurance needs</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                      <ContactUsDialog type="phone">
                        <Button variant="outline" className="w-full justify-start">
                          <Phone className="mr-2 h-4 w-4" />
                          Call Us
                        </Button>
                      </ContactUsDialog>
                      <ContactUsDialog type="email">
                        <Button variant="outline" className="w-full justify-start">
                          <Mail className="mr-2 h-4 w-4" />
                          Email Us
                        </Button>
                      </ContactUsDialog>
                      <ContactUsDialog type="chat">
                        <Button variant="outline" className="w-full justify-start">
                          <MessageCircle className="mr-2 h-4 w-4" />
                          Live Chat
                        </Button>
                      </ContactUsDialog>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}