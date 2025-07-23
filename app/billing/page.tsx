import { Layout } from "@/components/layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CreditCard, Calendar, Download, Settings } from "lucide-react"

export default function BillingPage() {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-slate-900">Billing & Subscription</h2>
          <p className="text-slate-600 mt-1">Manage your InterRoom+ subscription and billing information</p>
        </div>

        {/* Current Plan */}
        <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-none shadow-md">
          <CardHeader>
            <CardTitle className="text-lg font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent flex items-center">
              <CreditCard className="h-5 w-5 mr-2 text-purple-600" />
              Current Plan
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold text-slate-800">InterRoom+ Premium</h3>
                <p className="text-slate-600">Active since January 15, 2024</p>
              </div>
              <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Active</Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-slate-800">Resume & LinkedIn</h4>
                <p className="text-sm text-slate-600 mt-1">Professional optimization</p>
                <p className="text-lg font-semibold text-purple-600 mt-2">$15/month</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-slate-800">Career Coaching</h4>
                <p className="text-sm text-slate-600 mt-1">1-on-1 expert guidance</p>
                <p className="text-lg font-semibold text-purple-600 mt-2">$25/month</p>
              </div>

              <div className="bg-white p-4 rounded-lg shadow-sm">
                <h4 className="font-medium text-slate-800">Job Applications</h4>
                <p className="text-sm text-slate-600 mt-1">10 applications/week</p>
                <p className="text-lg font-semibold text-purple-600 mt-2">$20/week</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t">
              <div>
                <p className="text-lg font-semibold text-slate-800">Total: $100/month</p>
                <p className="text-sm text-slate-600">Next billing date: February 15, 2024</p>
              </div>
              <Button variant="outline" className="flex items-center bg-transparent">
                <Settings className="h-4 w-4 mr-2" />
                Modify Plan
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Payment Method */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800">Payment Method</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-8 bg-gradient-to-r from-blue-600 to-blue-700 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
                <div>
                  <p className="font-medium text-slate-800">•••• •••• •••• 4242</p>
                  <p className="text-sm text-slate-600">Expires 12/26</p>
                </div>
              </div>
              <Button variant="outline">Update</Button>
            </div>
          </CardContent>
        </Card>

        {/* Billing History */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              Billing History
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { date: "Jan 15, 2024", amount: "$100.00", status: "Paid", invoice: "INV-001" },
                { date: "Dec 15, 2023", amount: "$100.00", status: "Paid", invoice: "INV-002" },
                { date: "Nov 15, 2023", amount: "$100.00", status: "Paid", invoice: "INV-003" },
              ].map((bill, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b last:border-b-0">
                  <div>
                    <p className="font-medium text-slate-800">{bill.invoice}</p>
                    <p className="text-sm text-slate-600">{bill.date}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-semibold text-slate-800">{bill.amount}</span>
                    <Badge className="bg-green-100 text-green-800 hover:bg-green-100">{bill.status}</Badge>
                    <Button variant="ghost" size="sm">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cancel Subscription */}
        <Card className="border-red-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-red-600">Danger Zone</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium text-slate-800">Cancel Subscription</h4>
                <p className="text-sm text-slate-600 mt-1">
                  You'll continue to have access until your next billing date
                </p>
              </div>
              <Button variant="destructive">Cancel Plan</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  )
}
