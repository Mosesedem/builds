import React, { useState, useEffect } from 'react';
import Link from "next/link";
import { 
  Home, 
  FileText, 
  CreditCard, 
  Users, 
  Settings, 
  HelpCircle, 
  Menu, 
  X,
  ChevronLeft,
  ChevronRight,
  type LucideIcon
} from 'lucide-react';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

type MenuItem = {
  value: string;
  href: string;
  icon: LucideIcon;
  label: string;
};

interface AppSidebarProps {
  activeTab: string;
  onTabChange: (value: string) => void;
}

export function AppSidebar({ activeTab, onTabChange }: AppSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const TAB_ITEMS: MenuItem[] = [
    { value: "overview", href: "/dashboard?tab=overview", icon: Home, label: "Overview" },
    { value: "enrollment", href: "/dashboard?tab=enrollment", icon: FileText, label: "Enrollment" },
    { value: "dependents", href: "/dashboard?tab=dependents", icon: Users, label: "Dependents" },
    { value: "wallet", href: "/dashboard?tab=wallet", icon: CreditCard, label: "Wallet" },
    { value: "settings", href: "/dashboard?tab=settings", icon: Settings, label: "Settings" },
    { value: "contact", href: "/dashboard?tab=contact", icon: HelpCircle, label: "Contact" }
  ];
  
  const handleItemClick = (item: MenuItem) => {
    onTabChange(item.value);
    setIsMobileMenuOpen(false);
  };

  const renderMenuItems = (items: MenuItem[]) => (
    <SidebarMenu>
      {items.map((item) => (
        <SidebarMenuItem key={item.value}>
          <SidebarMenuButton
            onClick={() => handleItemClick(item)}
            className={`w-full flex items-center p-2 rounded-lg transition-colors
              ${activeTab === item.value ? 'bg-primary/10 text-primary' : 'hover:bg-primary/5'}
              ${isSidebarCollapsed ? 'justify-center' : 'justify-start'}`}
          >
            <item.icon className="h-5 w-5" />
            {!isSidebarCollapsed && (
              <span className="ml-3 text-sm">{item.label}</span>
            )}
          </SidebarMenuButton>
        </SidebarMenuItem>
      ))}
    </SidebarMenu>
  );

  if (!isClient) return null;

  return (
    <>
      {/* Desktop Sidebar */}
      <Sidebar className={`hidden md:flex h-screen border-r transition-all duration-300
        ${isSidebarCollapsed ? 'w-16' : 'w-64'}`}
      >
        <SidebarHeader className="p-4 flex items-center justify-between">
          {!isSidebarCollapsed && (
            <h2 className="text-xl font-bold">Proton Medicare</h2>
          )}
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
            className="ml-auto"
          >
            {isSidebarCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          </Button>
        </SidebarHeader>
        
        <SidebarContent className="flex-grow overflow-y-auto px-2">
          {renderMenuItems(TAB_ITEMS)}
        </SidebarContent>

        <SidebarFooter className="border-t p-4">
          <div className="flex items-center justify-center">
            <ModeToggle />
          </div>
        </SidebarFooter>
      </Sidebar>

      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsMobileMenuOpen(true)}
        className="md:hidden fixed top-4 left-4 z-40"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Mobile Sidebar */}
      <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <div className="flex flex-col h-full">
            <div className="p-4 border-b flex items-center justify-between">
              <h2 className="text-xl font-bold">Proton Medicare</h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {/* <X className="h-4 w-4" /> */}
              </Button>
            </div>
            
            <div className="flex-grow overflow-y-auto px-2 py-4">
              {renderMenuItems(TAB_ITEMS)}
            </div>
            
            <div className="border-t p-4">
              <div className="flex items-center justify-center">
                <ModeToggle />
              </div>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}