"use client"

import type React from "react"

import { useState } from "react"
import { CreditCard, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  service: {
    title: string
    price: string
    features: string[]
    services?: Array<{ name: string; included: boolean }>
  }
}

export function CheckoutModal({ isOpen, onClose, service }: CheckoutModalProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [formData, setFormData] = useState({
    email: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    name: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsProcessing(true)

    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsProcessing(false)
    onClose()

    // Show success message (you could add a toast notification here)
    alert("Payment successful! Welcome to InterRoom+")
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-6 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-white">Complete Your Purchase</DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            <h3 className="font-semibold">{service.title}</h3>
            <p className="text-2xl font-bold mt-1">{service.price}</p>
          </div>
        </div>

        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-sm font-medium text-slate-700">
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="mt-1"
                placeholder="your@email.com"
                required
              />
            </div>

            <div>
              <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                Cardholder Name
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange("name", e.target.value)}
                className="mt-1"
                placeholder="John Doe"
                required
              />
            </div>

            <div>
              <Label htmlFor="cardNumber" className="text-sm font-medium text-slate-700">
                Card Number
              </Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  value={formData.cardNumber}
                  onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                  className="mt-1 pl-10"
                  placeholder="1234 5678 9012 3456"
                  required
                />
                <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate" className="text-sm font-medium text-slate-700">
                  Expiry Date
                </Label>
                <Input
                  id="expiryDate"
                  value={formData.expiryDate}
                  onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                  className="mt-1"
                  placeholder="MM/YY"
                  required
                />
              </div>
              <div>
                <Label htmlFor="cvv" className="text-sm font-medium text-slate-700">
                  CVV
                </Label>
                <Input
                  id="cvv"
                  value={formData.cvv}
                  onChange={(e) => handleInputChange("cvv", e.target.value)}
                  className="mt-1"
                  placeholder="123"
                  required
                />
              </div>
            </div>

            <div className="bg-slate-50 p-4 rounded-lg">
              <h4 className="font-semibold text-slate-800 mb-2">What's included:</h4>
              {service.services ? (
                <ul className="space-y-1">
                  {service.services
                    .filter((s) => s.included)
                    .map((s, index) => (
                      <li key={index} className="text-sm text-slate-600 flex items-center">
                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                        {s.name}
                      </li>
                    ))}
                </ul>
              ) : (
                <ul className="space-y-1">
                  {service.features.slice(0, 3).map((feature, index) => (
                    <li key={index} className="text-sm text-slate-600 flex items-center">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></span>
                      {feature}
                    </li>
                  ))}
                  {service.features.length > 3 && (
                    <li className="text-sm text-slate-500">+{service.features.length - 3} more features</li>
                  )}
                </ul>
              )}
            </div>

            <Button
              type="submit"
              disabled={isProcessing}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white hover:from-purple-700 hover:to-blue-700 py-3"
            >
              {isProcessing ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Processing...
                </div>
              ) : (
                <div className="flex items-center">
                  <Lock className="h-4 w-4 mr-2" />
                  Complete Payment {service.price}
                </div>
              )}
            </Button>

            <p className="text-xs text-slate-500 text-center">
              🔒 Secure payment powered by Stripe • 30-day money-back guarantee
            </p>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  )
}
