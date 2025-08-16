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
    <Card className="bg-white shadow-sm border border-gray-200">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-semibold text-purple-600">Profile</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16 bg-gray-200">
            <AvatarFallback className="text-lg bg-gray-200 text-gray-600 font-semibold">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-xl font-semibold text-gray-900">{name}</h3>
            <p className="text-gray-600">{title}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-900">Target Role:</span>
            <span className="text-gray-700">{targetRole}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-900">Minimum Required Salary:</span>
            <span className="text-gray-700">${targetSalary.toLocaleString()}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-900">Experience:</span>
            <span className="text-gray-700">{experience} years</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="font-medium text-gray-900">Location:</span>
            <span className="text-gray-700">{location}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
