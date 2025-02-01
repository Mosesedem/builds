import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Settings, User, Lock, Bell, CreditCard, Shield } from "lucide-react";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export function AccountSettingsCard() {
  const settingsOptions = [
    {
      icon: User,
      label: "Profile Settings",
      description: "Manage personal information",
      path: "/dashboard/settings/profile",
    },
    {
      icon: Lock,
      label: "Security",
      description: "Password & security settings",
      path: "/dashboard/settings/security",
    },
    {
      icon: Bell,
      label: "Notifications",
      description: "Manage notification settings",
      path: "/dashboard/settings/notifications",
    },
    {
      icon: CreditCard,
      label: "Billing",
      description: "View and manage billing",
      path: "/dashboard/settings/billing",
    },
    {
      icon: Shield,
      label: "Privacy",
      description: "Manage privacy settings",
      path: "/dashboard/settings/privacy",
    },
  ];

  return (
<Card className="max-w-[1200px] mx-auto">
  <div className="sticky top-0 z-10 bg-card border-b">
    <Breadcrumb className="px-4 sm:px-6 py-4">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink
            href="/dashboard"
            className="hover:text-primary transition-colors"
          >
            Dashboard
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Settings</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>

    <CardHeader className="px-4 sm:px-6 py-4">
      <CardTitle className="flex items-center gap-2 text-xl sm:text-2xl">
      {/* <Button className="px-2 bg-slate-500 hover:bg-slate-400"
      onClick={() => window.location.href = '/dashboard'}>← Go back</Button> */}
        <Settings className="h-6 w-6" />
        Account Settings
      </CardTitle>
    </CardHeader>
  </div>

  <CardContent className="p-4 sm:p-6">
    <div
      className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3"
    >
      {settingsOptions.map((option, index) => {
        const Icon = option.icon;
        return (
          <Button
            key={index}
            variant="outline"
            className="group h-auto p-4 sm:p-6 justify-start w-full transition-all hover:shadow-md hover:border-primary"
            asChild
          >
            <Link href={option.path}>
              <div className="flex items-start sm:items-center gap-4 w-full">
                <div className="flex-shrink-0">
                  <Icon className="h-5 w-5 sm:h-6 sm:w-6 group-hover:text-primary transition-colors" />
                </div>
                <div className="flex-grow text-left min-w-0">
                  <div className="font-medium text-base sm:text-lg group-hover:text-primary transition-colors">
                    {option.label}
                  </div>
                  <div className="text-sm text-muted-foreground mt-1 line-clamp-2 sm:line-clamp-1">
                    {option.description}
                  </div>
                </div>
              </div>
            </Link>
          </Button>
        );
      })}
    </div>
  </CardContent>
</Card>

  );
}