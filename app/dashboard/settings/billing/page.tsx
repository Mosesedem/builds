"use client"; // This makes the component a client component

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CreditCard, Plus } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
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

export default function BillingSettings() {
  const { toast } = useToast()
    const { setConfig } = useLayoutConfig()
      const router = useRouter()
      const searchParams = useSearchParams()
      const [activeTab, setActiveTab] = useState(searchParams?.get("tab") || "overview")

  const handleAddCard = () => {
    toast({
      title: "Coming Soon",
      description: "Payment method management will be available soon.",
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
      <BreadcrumbPage>Billing</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>


<Card className="max-w-[1200px] mx-auto px-2 mr-2 ml-3">
        <CardHeader>
          <CardTitle>
          <Button className="px-2 bg-slate-500 hover:bg-slate-400 py-4 mr-4"
      onClick={() => window.location.href = '/dashboard/settings'}>← Go back</Button>
      Billing Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Payment Methods</h3>
            <div className="grid gap-4">
              <Card>
                <CardContent className="flex items-center justify-between p-6">
                  <div className="flex items-center space-x-4">
                    <CreditCard className="h-6 w-6" />
                    <div>
                      <p className="font-medium">•••• 4242</p>
                      <p className="text-sm text-muted-foreground">Expires 04/24</p>
                    </div>
                  </div>
                  <Button variant="outline">Remove</Button>
                </CardContent>
              </Card>
              <Button onClick={handleAddCard} variant="outline" className="flex items-center">
                <Plus className="mr-2 h-4 w-4" />
                Add Payment Method
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Billing History</h3>
            <div className="rounded-md border">
              <div className="p-4">
                <p className="text-sm text-muted-foreground">No billing history available</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      </div>
      </SidebarProvider>

  )
}