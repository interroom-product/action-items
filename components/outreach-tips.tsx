import { Lightbulb, MessageCircle, Users, Search, Link2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function OutreachTips() {
  const tips = [
    {
      icon: MessageCircle,
      title: "Personalize Your Message",
      description: "Mention something specific about the company or role to show genuine interest.",
    },
    {
      icon: Users,
      title: "Find Common Connections",
      description: "Look for shared connections and ask for introductions to increase response rates.",
    },
    {
      icon: Search,
      title: "Research the Person",
      description: "Find talking points based on their background, publications, or interests.",
    },
    {
      icon: Link2,
      title: "Follow Up Thoughtfully",
      description: "If you don't hear back after a week, send a friendly follow-up message.",
    },
  ]

  return (
    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold flex items-center bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
          <Lightbulb className="h-5 w-5 mr-2 text-yellow-500" />
          Outreach Tips
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tips.map((tip, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
              <div className="flex items-start space-x-3">
                <div className="bg-purple-100 p-2 rounded-full">
                  <tip.icon className="h-4 w-4 text-purple-700" />
                </div>
                <div>
                  <h4 className="font-medium text-sm text-gray-800">{tip.title}</h4>
                  <p className="text-xs text-gray-600 mt-1">{tip.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
