"use client"; // This makes the component a client component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
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

export default function SecuritySettings() {
  const { toast } = useToast()
    const { setConfig } = useLayoutConfig()
      const router = useRouter()
      const searchParams = useSearchParams()
      const [activeTab, setActiveTab] = useState(searchParams?.get("tab") || "overview")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast({
      title: "Security Settings Updated",
      description: "Your security settings have been successfully updated.",
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
      <BreadcrumbPage>Security</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
<Card className="max-w-[1200px] mx-auto mr-2 ml-3">

        <CardHeader>
          <CardTitle>
          <Button className="px-2 bg-slate-500 hover:bg-slate-400 py-4 mr-4"
      onClick={() => window.location.href = '/dashboard/settings'}>← Go back</Button>
      Security Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="current-password">Current Password</Label>
                <Input id="current-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input id="new-password" type="password" />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm New Password</Label>
                <Input id="confirm-password" type="password" />
              </div>
            </div>
            <Button type="submit">Update Password</Button>
          </form>
        </CardContent>
      </Card>
    </div>
    </SidebarProvider>
  )
}