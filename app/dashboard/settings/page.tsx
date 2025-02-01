"use client"
import { AccountSettingsCard } from "@/components/AccountSettingsCard"
import { useState, useEffect } from "react"
import { useLayoutConfig } from "@/contexts/LayoutConfigContext"
import { useSearchParams, useRouter } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { useToast } from "@/hooks/use-toast"

export default function SettingsPage() {
  const { toast } = useToast()
  const { setConfig } = useLayoutConfig()
    const router = useRouter()
    const searchParams = useSearchParams()
    const [activeTab, setActiveTab] = useState(searchParams?.get("tab") || "overview")
 
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
      <div className="container mx-auto py-8 mr-2 ml-3">    
    <AccountSettingsCard />
    </div>
    </SidebarProvider>

  )
}