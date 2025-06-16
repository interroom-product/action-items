import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"

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
    <Card className="border border-[#E5DDFF] shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-[#9458FA]">Interview Pipeline</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {interviews.map((interview, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="font-medium text-[#44403C]">{interview.company}</h4>
                  <p className="text-sm text-[#A8A29E]">{interview.position}</p>
                </div>
                <div className="text-right">
                  <Badge className="text-xs px-2 py-1 rounded-full bg-[#E5DDFF] text-[#9458FA] border-[#C8B3FF] hover:bg-[#E5DDFF]">
                    {interview.stage}
                  </Badge>
                  <p className="text-xs text-[#A8A29E] mt-1">
                    {interview.date} at {interview.time}
                  </p>
                </div>
              </div>
              <Progress
                value={interview.progress}
                className="h-2 bg-[#F6F3FF] [&>div]:bg-gradient-to-r [&>div]:from-[#9458FA] [&>div]:to-[#AD88FD]"
              />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
