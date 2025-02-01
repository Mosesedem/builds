import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { FileText, Plus } from "lucide-react"
import { EnrollmentDialog } from "@/components/enrollment-dialog"
import { PlanDetailsDialog } from "@/components/plan-details-dialog"

export function EnrollmentCard() {
  const enrollments = [
    {
      planName: "Premium Health Plan",
      status: "Active",
      startDate: "2024-01-01",
      endDate: "2024-12-31",
      type: "user" as const,
      hmoId: "HMO12345",
    },
  ]

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Plans</CardTitle>
        <EnrollmentDialog>
          <Button size="sm">
            <Plus className="mr-2 h-4 w-4" />
            New Enrollment
          </Button>
        </EnrollmentDialog>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {enrollments.map((enrollment, index) => (
            <PlanDetailsDialog key={index} plan={enrollment}>
              <div className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-accent transition-colors">
                <div className="flex items-center space-x-4">
                  <FileText className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium">{enrollment.planName}</p>
                    <p className="text-sm text-muted-foreground">
                      {enrollment.startDate} to {enrollment.endDate}
                    </p>
                  </div>
                </div>
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-full ${
                    enrollment.status === "Active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {enrollment.status}
                </span>
              </div>
            </PlanDetailsDialog>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}