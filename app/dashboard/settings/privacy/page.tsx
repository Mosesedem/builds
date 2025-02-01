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

export default function PrivacySettings() {
  const { toast } = useToast()
    const { setConfig } = useLayoutConfig()
      const router = useRouter()
      const searchParams = useSearchParams()
      const [activeTab, setActiveTab] = useState(searchParams?.get("tab") || "overview")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Privacy Settings Updated",
      description: "Your privacy preferences have been saved.",
    })
  }

      useEffect(() => {
        setConfig({ hideHeader: true, hideFooter: true })
        return () => setConfig({ hideHeader: false, hideFooter: false })
      }, [setConfig])

      const handleTabChange = (value: string) => {
        setActiveTab(value)
        router.push(`/dashboard?tab=${value}`)
      }
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
      <BreadcrumbPage>Privacy</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
<Card className="max-w-[1200px] mx-auto mr-2 ml-3">
        <CardHeader>
          <CardTitle>
          <Button className="px-2 bg-slate-500 hover:bg-slate-400 py-4 mr-4"
      onClick={() => window.location.href = '/dashboard/settings'}>← Go back</Button>
      Privacy Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Profile Visibility</Label>
                  <p className="text-sm text-muted-foreground">
                    Make your profile visible to other members
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Data Sharing</Label>
                  <p className="text-sm text-muted-foreground">
                    Share your data with our healthcare partners
                  </p>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label>Cookie Preferences</Label>
                  <p className="text-sm text-muted-foreground">
                    Manage your cookie preferences
                  </p>
                </div>
                <Switch />
              </div>
            </div>
            <Button type="submit">Save Privacy Settings</Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </SidebarProvider>
  )
}