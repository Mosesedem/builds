"use client"; // This makes the component a client component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { useToast } from "@/hooks/use-toast"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { useState, useEffect } from "react"
import { useLayoutConfig } from "@/contexts/LayoutConfigContext"
import { useSearchParams, useRouter } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"

export default function NotificationSettings() {
  const { toast } = useToast()
    const { setConfig } = useLayoutConfig()
      const router = useRouter()
      const searchParams = useSearchParams()
      const [activeTab, setActiveTab] = useState(searchParams?.get("tab") || "overview")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Notification Preferences Updated",
      description: "Your notification settings have been saved.",
    })
  }
  const handleTabChange = (value: string) => {
    setActiveTab(value)
    router.push(`/dashboard?tab=${value}`)
  }
  useEffect(() => {
    setConfig({ hideHeader: true, hideFooter: true })
    return () => setConfig({ hideHeader: false, hideFooter: false })
  }, [setConfig])

  return (
    <SidebarProvider>
      <AppSidebar activeTab={activeTab} onTabChange={handleTabChange} />
    <div className="container mx-auto py-8">
            <Breadcrumb className="py-10 px-5">
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/dashboard/settings">Settings</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Notifications</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
<Card className="max-w-[1200px] mx-auto mr-2 ml-3">
        <CardHeader>
          <CardTitle>
          <Button className="px-2 bg-slate-500 hover:bg-slate-400 py-4 mr-4"
      onClick={() => window.location.href = '/dashboard/settings'}>← Go back</Button>
      Notification Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive email updates about your account
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>SMS Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive text messages about your appointments
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Marketing Communications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive updates about new services and promotions
                  </p>
                </div>
                <Switch />
              </div>
            </div>
            <Button type="submit">Save Preferences</Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </SidebarProvider>
  )
}