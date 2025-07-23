"use client"

import { useState } from "react"
import Link from "next/link"
import { Crown, Star, Briefcase, FileText, Users, CheckCircle, DollarSign, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"

const services = [
  {
    id: "job-applications",
    title: "Job Application Outsourcing",
    description: "We apply to 50+ jobs per week on your behalf.",
    icon: Briefcase,
    popular: true,
    benefits: [
      "Money-back guarantee",
      "Dedicated support specialist",
      "Weekly progress reports",
      "Custom application tracking",
      "ATS-optimized applications",
    ],
    price: "$99/week",
  },
  {
    id: "resume-linkedin",
    title: "Resume & LinkedIn Optimization",
    description:
      "Professional rewrite by industry experts to get more inbound on LinkedIn and increase replies from cold applications.",
    icon: FileText,
    popular: false,
    benefits: [
      "Industry expert review",
      "ATS optimization",
      "LinkedIn headline optimization",
      "Keyword optimization",
      "2 rounds of revisions",
    ],
    price: "$149 one-time",
  },
  {
    id: "career-coaching",
    title: "Career Coaching",
    description: "1-on-1 session with interview experts from your field.",
    icon: Users,
    popular: false,
    benefits: [
      "Personalized career strategy",
      "Mock interview sessions",
      "Salary negotiation guidance",
      "Industry insights",
      "Follow-up support",
    ],
    price: "$79/session",
  },
]

export function PremiumServicesPricing() {
  const [selectedService, setSelectedService] = useState<(typeof services)[0] | null>(null)

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <Crown className="h-8 w-8 text-purple-600" />
        </div>
        <h1 className="text-4xl font-bold text-slate-800 mb-4">Premium Services</h1>
        <p className="text-xl text-slate-600 max-w-2xl mx-auto">
          Accelerate your job search with our expert-backed premium services
        </p>
      </div>

      {/* Main Services Card */}
      <Card className="mb-8 border border-[#E5DDFF] shadow-lg">
        <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50 border-b border-[#E5DDFF]">
          <CardTitle className="text-2xl text-slate-800">Featured Services</CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="space-y-4">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <Dialog key={service.id}>
                  <DialogTrigger asChild>
                    <div className="flex items-start gap-4 p-4 rounded-lg border border-slate-200 hover:border-purple-300 hover:bg-purple-50/50 cursor-pointer transition-all duration-200 group">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <IconComponent className="h-6 w-6 text-purple-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold text-slate-800 group-hover:text-purple-700">
                            {service.title}
                          </h3>
                          {service.popular && (
                            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-400 text-white">
                              <Star className="h-3 w-3 mr-1" />
                              Popular
                            </Badge>
                          )}
                        </div>
                        <p className="text-slate-600">{service.description}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-purple-600">{service.price}</p>
                        <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-purple-600 ml-auto mt-1" />
                      </div>
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <IconComponent className="h-5 w-5 text-purple-600" />
                        {service.title}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-slate-600">{service.description}</p>

                      <div>
                        <h4 className="font-semibold text-slate-800 mb-3">Key Benefits:</h4>
                        <ul className="space-y-2">
                          {service.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                              <span className="text-sm text-slate-600">{benefit}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="bg-purple-50 p-4 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-slate-800">Price:</span>
                          <span className="text-xl font-bold text-purple-600">{service.price}</span>
                        </div>
                        <p className="text-sm text-slate-600">Money-back guarantee • Dedicated support</p>
                      </div>

                      <Link href="/billing">
                        <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700">
                          View Pricing & Purchase
                        </Button>
                      </Link>
                    </div>
                  </DialogContent>
                </Dialog>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Bundle Promotion */}
      <Card className="mb-8 border-2 border-gradient-to-r from-purple-300 to-blue-300 shadow-lg">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-2xl font-bold text-slate-800 mb-2">Bundle & Save</h3>
            <p className="text-slate-600 mb-4">Combine multiple services and save up to 30% on your premium package</p>
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg mb-6">
              <p className="text-lg font-semibold text-green-700">
                🎉 Limited Time: Get all 3 services for just $199/month
              </p>
              <p className="text-sm text-green-600 mt-1">Regular price: $285/month • You save $86/month</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main CTAs */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Link href="/billing">
          <Button
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 px-8"
          >
            View All Services
          </Button>
        </Link>
        <Link href="/billing">
          <Button
            size="lg"
            variant="outline"
            className="border-purple-300 text-purple-600 hover:bg-purple-50 px-8 bg-transparent"
          >
            See Bundles
          </Button>
        </Link>
      </div>

      {/* Trust indicators */}
      <div className="text-center mt-8 text-sm text-slate-500">
        <p>✨ Trusted by 500+ job seekers • 💰 Money-back guarantee • 🔒 Secure payment</p>
      </div>
    </div>
  )
}
