"use client"

import { useState } from "react"
import { Star, Check, ArrowRight, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckoutModal } from "@/components/checkout-modal"

const individualServices = [
  {
    id: "job-applications",
    title: "Job Application Outsourcing",
    description:
      "Do you really want to spend hours on job applications every week? Let us handle the search while you focus on something more productive—or just more fun. Track progress via your client portal.",
    price: "$297",
    popular: true,
    features: [
      "Targeted job search based on your preferences and skills",
      "Application submission to both listed and unlisted roles",
      "Weekly updates on application status and new opportunities",
    ],
  },
  {
    id: "resume-linkedin",
    title: "Resume & LinkedIn Optimization",
    description:
      "AI can optimize, but humans get you hired. We mix smart tech with real expertise to sharpen your resume, beat the bots, and grab recruiters' attention.",
    price: "$197",
    popular: false,
    features: [
      "ATS optimization to ensure your resume passes automated filters",
      "Achievement-focused content that highlights your impact",
      "LinkedIn profile enhancement to attract recruiters",
    ],
  },
  {
    id: "career-coaching",
    title: "Career Coaching",
    description:
      "The right prep changes everything. With a dedicated team in your corner, we tailor coaching to your needs so you can land the best offer possible.",
    price: "$397",
    popular: false,
    features: [
      "Mock interviews with industry-specific questions",
      "Weekly check-ins to track progress and adjust strategy",
      "Salary negotiation support to maximize your compensation",
    ],
  },
]

const bundles = [
  {
    id: "accelerator",
    title: "Accelerator Bundle",
    badge: "Pay as you go",
    badgeColor: "green",
    price: "$447",
    popular: false,
    services: [
      { name: "Job Outsourcing", included: true },
      { name: "Resume Rewrite and LinkedIn Optimization", included: true },
      { name: "InterRoom Chat Support", included: true },
      { name: "Interview Coaching", included: false },
    ],
    features: [
      "Targeted job search based on your preferences and skills",
      "Application submission to both listed and unlisted roles",
      "Weekly updates on application status and new opportunities",
    ],
  },
  {
    id: "full-support",
    title: "Full Support Package",
    badge: "Success-Based Model",
    badgeColor: "purple",
    price: "$697",
    popular: true,
    recommended: true,
    services: [
      { name: "Job Outsourcing", included: true },
      { name: "Resume Rewrite and LinkedIn Optimization", included: true },
      { name: "InterRoom Chat Support", included: true },
      { name: "Interview Coaching", included: true },
    ],
    features: [
      "Everything in Accelerator Bundle",
      "Mock interviews with industry-specific questions",
      "Weekly check-ins to track progress and adjust strategy",
      "Salary negotiation support to maximize your compensation",
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
                        <span className="text-purple-600 font-bold mr-3 mt-0.5 flex-shrink-0">{index + 1}</span>
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

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {bundles.map((bundle) => (
              <Card
                key={bundle.id}
                className={`relative cursor-pointer transition-all duration-200 hover:shadow-lg border border-slate-200 hover:border-slate-300`}
                onClick={() => handleServiceClick(bundle)}
              >
                {/* Recommended Badge */}
                {bundle.recommended && (
                  <div className="absolute -top-3 right-4">
                    <Badge className="bg-purple-600 text-white px-3 py-1 text-xs font-semibold">RECOMMENDED</Badge>
                  </div>
                )}

                <CardContent className="p-8">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">{bundle.title}</h3>

                  {/* Bundle Badge */}
                  <div className="mb-6">
                    <Badge
                      className={`${
                        bundle.badgeColor === "green"
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-purple-100 text-purple-700 border-purple-200"
                      } border px-3 py-1 text-sm font-medium`}
                    >
                      {bundle.badge}
                    </Badge>
                  </div>

                  {/* Services List */}
                  <div className="space-y-4 mb-8">
                    {bundle.services.map((service, index) => (
                      <div key={index} className="flex items-center">
                        {service.included ? (
                          <div className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mr-3 flex-shrink-0">
                            <Check className="h-4 w-4 text-green-600" />
                          </div>
                        ) : (
                          <div className="w-6 h-6 rounded-full bg-red-100 flex items-center justify-center mr-3 flex-shrink-0">
                            <X className="h-4 w-4 text-red-600" />
                          </div>
                        )}
                        <span
                          className={`text-base ${service.included ? "text-slate-900" : "text-slate-400 line-through"}`}
                        >
                          {service.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Button className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white">
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
