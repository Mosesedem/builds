import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import Image from "next/image"

interface PlanDetailsProps {
  children: React.ReactNode
  plan: {
    planName: string
    status: string
    startDate: string
    endDate: string
    type: "user" | "dependent"
    hmoId: string
  }
}

export function PlanDetailsDialog({ children, plan }: PlanDetailsProps) {
  const handleDownload = () => {
    // Create a link element
    const link = document.createElement("a")
    link.href = "https://cdn.iconscout.com/strapi/Usecase_2_d4184d6646.png" // Replace with actual image URL
    link.download = `HMO-ID-${plan.hmoId}.jpg`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">
            {plan.planName}
            <span
              className={`ml-2 px-2 py-1 text-xs font-medium rounded-full ${
                plan.status === "Active"
                  ? "bg-green-100 text-green-800"
                  : "bg-yellow-100 text-yellow-800"
              }`}
            >
              {plan.status}
            </span>
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Plan Details</p>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium">Start Date</p>
                <p className="text-sm text-muted-foreground">{plan.startDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium">End Date</p>
                <p className="text-sm text-muted-foreground">{plan.endDate}</p>
              </div>
              <div>
                <p className="text-sm font-medium">Plan Type</p>
                <p className="text-sm text-muted-foreground capitalize">{plan.type}</p>
              </div>
              <div>
                <p className="text-sm font-medium">HMO ID</p>
                <p className="text-sm text-muted-foreground">{plan.hmoId}</p>
              </div>
            </div>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">HMO ID Card</p>
            <div className="relative aspect-[1.586] w-full overflow-hidden rounded-lg border">
              <Image
                src="https://cdn.iconscout.com/strapi/Usecase_2_d4184d6646.png"
                alt="HMO ID Card"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
            <Button onClick={handleDownload} className="w-full mt-2">
              <Download className="mr-2 h-4 w-4" />
              Download ID Card
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}