import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface ProfileCardProps {
  name: string
  title: string
  targetSalary: number
  experience: number
  location: string
  targetRole: string
  companiesInProgress: string[]
}

export function ProfileCard({
  name,
  title,
  targetSalary,
  experience,
  location,
  targetRole,
  companiesInProgress,
}: ProfileCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")

  return (
    <Card className="border border-[#E5DDFF] shadow-lg bg-white/80 backdrop-blur-sm">
      <CardHeader className="pb-2 bg-gradient-to-r from-[#F6F3FF] to-[#E5DDFF] border-b border-[#E5DDFF]">
        <CardTitle className="text-lg font-semibold text-[#44403C]">Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 p-5">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 border-2 border-[#C8B3FF] shadow-md">
            <AvatarFallback className="text-lg bg-gradient-to-br from-[#E5DDFF] to-[#C8B3FF] text-[#9458FA] font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold text-[#44403C]">{name}</h3>
            <p className="text-[#A8A29E]">{title}</p>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between py-1 border-b border-[#F6F3FF]">
            <span className="font-medium text-[#44403C]">Target Role:</span>
            <span className="text-[#9458FA] font-medium">{targetRole}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F6F3FF]">
            <span className="font-medium text-[#44403C]">Minimum Required Salary:</span>
            <span className="text-[#9458FA] font-medium">${targetSalary.toLocaleString()}</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F6F3FF]">
            <span className="font-medium text-[#44403C]">Experience:</span>
            <span className="text-[#9458FA] font-medium">{experience} years</span>
          </div>
          <div className="flex justify-between py-1 border-b border-[#F6F3FF]">
            <span className="font-medium text-[#44403C]">Location:</span>
            <span className="text-[#9458FA] font-medium">{location}</span>
          </div>
          <div className="flex justify-between py-1">
            <span className="font-medium text-[#44403C]">Companies in Progress:</span>
            <span className="text-[#9458FA] font-medium">{companiesInProgress.join(", ")}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
