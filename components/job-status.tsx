import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface JobApplication {
  company: string
  position: string
  status: "Applied" | "Interview" | "Offer"
  progress: number
}

interface JobStatusProps {
  applications?: JobApplication[]
}

export function JobStatus({ applications = [] }: JobStatusProps) {
  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          Job Application Status
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {applications.map((app, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium">{app.company}</h4>
                  <p className="text-sm text-muted-foreground">{app.position}</p>
                </div>
                <span
                  className={`text-xs px-2 py-1 rounded-full ${
                    app.status === "Offer"
                      ? "bg-green-100 text-green-800"
                      : app.status === "Interview"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-100 text-gray-800"
                  }`}
                >
                  {app.status}
                </span>
              </div>
              <Progress
                value={app.progress}
                className="h-2 [&>div]:bg-gradient-to-r [&>div]:from-purple-500 [&>div]:to-blue-500"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
