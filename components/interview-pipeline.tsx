import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface InterviewStage {
  company: string
  position: string
  stage: "Phone Screen" | "Hiring Manager" | "Panel Interview" | "Final Stages" | "Offer Negotiation"
  progress: number
  date: string
  time: string
}

interface InterviewPipelineProps {
  interviews?: InterviewStage[]
}

export function InterviewPipeline({ interviews = [] }: InterviewPipelineProps) {
  return (
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-purple-600">Interview Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        {interviews.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No upcoming interviews. Your next interview will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {interviews.map((interview, index) => (
              <div key={index} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <h4 className="font-medium text-gray-900">{interview.company}</h4>
                    <p className="text-sm text-gray-600">{interview.position}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-xs px-2 py-1 rounded-full bg-purple-100 text-purple-700">
                      {interview.stage}
                    </span>
                    <p className="text-xs text-gray-500 mt-1">
                      {interview.date} at {interview.time}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}
