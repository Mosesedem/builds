import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Plus, Users } from "lucide-react"
import { useState, useEffect } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import EnrollmentForm from '@/components/EnrollmentForm'
import { PlanDetailsDialog } from "@/components/plan-details-dialog"

export function DependentsCard() {
  const [dependents, setDependents] = useState([
    {
      id: 1,
      name: "Jane Doe",
      relation: "Spouse",
      hmoId: "HMO98766",
      planName: "Family Health Plan",
      status: "Active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      type: "dependent" as const,
    },
    {
      id: 2,
      name: "Jimmy Doe",
      relation: "Child",
      hmoId: "HMO98767",
      planName: "Family Health Plan",
      status: "Active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      type: "dependent" as const,
    },
  ])

  const [isMobile, setIsMobile] = useState(false)
  const [hasFamilyPlan, setHasFamilyPlan] = useState(true) // You should fetch this from your backend

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <Card className="w-100">
      <CardTitle className="mt-3 ml-5">Dependents</CardTitle>
      <CardHeader className="flex flex-row items-center justify-between">
        {hasFamilyPlan ? (
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Dependent
              </Button>
            </DialogTrigger>
            <DialogContent className={`
              w-[95vw]
              max-w-[95vw]
              sm:max-w-[600px]
              md:max-w-[700px]
              lg:max-w-[400px]
              h-[90vh]
              overflow-y-auto
              ${isMobile ? 'p-2' : 'p-6'}
            `}>
              <DialogHeader>
                <DialogTitle>Add New Dependent</DialogTitle>
                <DialogDescription>
                  Add a family member to your health insurance plan.
                </DialogDescription>
              </DialogHeader>
              <EnrollmentForm />
            </DialogContent>
          </Dialog>
        ) : (
          <Button size="sm" variant="secondary">
            <Plus className="mr-2 h-4 w-4" />
            Purchase Family Plan
          </Button>
        )}
      </CardHeader>
      <CardContent>
        {hasFamilyPlan ? (
          <div className="space-y-4">
            {dependents.map((dependent) => (
              <PlanDetailsDialog
                key={dependent.id}
                plan={dependent}
              >
                <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                  <div className="flex items-center space-x-4">
                    <Users className="h-5 w-5 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{dependent.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {dependent.relation} • HMO ID: {dependent.hmoId}
                      </p>
                    </div>
                  </div>
                </div>
              </PlanDetailsDialog>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              Purchase a family plan to add dependents to your coverage.
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}