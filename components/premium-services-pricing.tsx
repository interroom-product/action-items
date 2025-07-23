"use client"

import { useState } from "react"
import { Crown, Star, Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckoutModal } from "@/components/checkout-modal"

const individualServices = [
  {
    id: "job-applications",
    title: "Job Application Outsourcing",
    description: "Let our experts handle your job applications while you focus on interview preparation",
    price: "$297",
    popular: true,
    features: [
      "50+ job applications per week",
      "Personalized cover letters",
      "Application tracking & reporting",
      "Weekly progress updates",
      "ATS-optimized applications",
      "Industry-specific targeting",
    ],
  },
  {
    id: "resume-linkedin",
    title: "Resume & LinkedIn Optimization",
    description: "Professional rewrite by industry experts to maximize your visibility",
    price: "$197",
    popular: false,
    features: [
      "Complete resume rewrite",
      "LinkedIn profile optimization",
      "ATS compatibility check",
      "Industry keyword optimization",
      "Professional formatting",
      "2 rounds of revisions",
    ],
  },
  {
    id: "career-coaching",
    title: "Career Coaching",
    description: "1-on-1 sessions with senior career coaches to accelerate your search",
    price: "$397",
    popular: false,
    features: [
      "4 x 1-hour coaching sessions",
      "Personalized job search strategy",
      "Interview preparation & practice",
      "Salary negotiation guidance",
      "Career transition planning",
      "Ongoing email support",
    ],
  },
]

const bundles = [
  {
    id: "accelerator",
    title: "Accelerator Bundle",
    description: "Perfect combination of application outsourcing and profile optimization",
    price: "$447",
    originalPrice: "$494",
    savings: "$47",
    popular: true,
    features: [
      "Job Application Outsourcing (50+ apps/week)",
      "Resume & LinkedIn Optimization",
      "Priority support",
      "Weekly strategy calls",
      "Application performance analytics",
      "3-month job search guarantee",
    ],
  },
  {
    id: "full-service",
    title: "Full Service Bundle",
    description: "Complete job search solution with all premium services included",
    price: "$697",
    originalPrice: "$891",
    savings: "$194",
    popular: false,
    features: [
      "Everything in Accelerator Bundle",
      "Career Coaching (4 sessions)",
      "Interview preparation workshops",
      "Salary negotiation support",
      "Personal brand development",
      "6-month success guarantee",
      "Dedicated account manager",
    ],
  },
]

export function PremiumServicesPricing() {
  const [activeTab, setActiveTab] = useState<"individual" | "bundles">("individual")
  const [selectedService, setSelectedService] = useState<any>(null)
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false)

  const handleServiceClick = (service: any) => {
    setSelectedService(service)
    setIsCheckoutOpen(true)
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Tab Navigation */}
      <div className="flex justify-center mb-8">
        <div className="bg-slate-100 p-1 rounded-lg flex">
          <button
            onClick={() => setActiveTab("individual")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "individual" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            📄 Individual Services
          </button>
          <button
            onClick={() => setActiveTab("bundles")}
            className={`px-6 py-2 rounded-md text-sm font-medium transition-all ${
              activeTab === "bundles" ? "bg-white text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            👑 Bundles
          </button>
        </div>
      </div>

      {/* Individual Services Tab */}
      {activeTab === "individual" && (
        <div>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Individual Services</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Choose specific services that match your needs. Each service is designed to give you a competitive edge in
              your job search.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {individualServices.map((service) => (
              <Card
                key={service.id}
                className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  service.popular
                    ? "border-2 border-purple-300 shadow-lg"
                    : "border border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => handleServiceClick(service)}
              >
                {service.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-600 text-white px-3 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      POPULAR
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                  <p className="text-slate-600 mb-6 text-sm leading-relaxed">{service.description}</p>

                  <div className="mb-6">
                    <span className="text-3xl font-bold text-purple-600">{service.price}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-3 ${
                      service.popular
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Bundles Tab */}
      {activeTab === "bundles" && (
        <div>
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-slate-900 mb-4">Service Bundles</h1>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Save money and get comprehensive support with our carefully crafted service bundles.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {bundles.map((bundle) => (
              <Card
                key={bundle.id}
                className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg ${
                  bundle.popular
                    ? "border-2 border-purple-300 shadow-lg"
                    : "border border-slate-200 hover:border-slate-300"
                }`}
                onClick={() => handleServiceClick(bundle)}
              >
                {bundle.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <Badge className="bg-purple-600 text-white px-3 py-1">
                      <Star className="h-3 w-3 mr-1" />
                      POPULAR
                    </Badge>
                  </div>
                )}
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-slate-900">{bundle.title}</h3>
                    <Crown className="h-6 w-6 text-yellow-500" />
                  </div>

                  <p className="text-slate-600 mb-6 text-sm leading-relaxed">{bundle.description}</p>

                  <div className="mb-6">
                    <span className="text-3xl font-bold text-purple-600">{bundle.price}</span>
                    <span className="text-green-600 font-semibold ml-3">Save {bundle.savings}</span>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {bundle.features.map((feature, index) => (
                      <li key={index} className="flex items-start text-sm">
                        <Check className="h-4 w-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full py-3 ${
                      bundle.popular
                        ? "bg-purple-600 hover:bg-purple-700 text-white"
                        : "bg-slate-900 hover:bg-slate-800 text-white"
                    }`}
                  >
                    Get Started
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Checkout Modal */}
      {selectedService && (
        <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} service={selectedService} />
      )}
    </div>
  )
}
