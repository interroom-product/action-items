"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Briefcase, FileText, Users, ArrowLeft, ArrowRight, CheckCircle, CreditCard, Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Label } from "@/components/ui/label"

interface QuestionnaireAnswers {
  resumeHelp: boolean | null
  coachingHelp: boolean | null
  targetRoles: string
  applicationFrequency: number | null
}

interface PaymentForm {
  cardNumber: string
  expiryDate: string
  cvv: string
  nameOnCard: string
}

export function PremiumServicesQuestionnaire() {
  const router = useRouter()
  const [currentScreen, setCurrentScreen] = useState(1)
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({
    resumeHelp: null,
    coachingHelp: null,
    targetRoles: "",
    applicationFrequency: null,
  })
  const [paymentForm, setPaymentForm] = useState<PaymentForm>({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  })
  const [isProcessingPayment, setIsProcessingPayment] = useState(false)

  const totalScreens = 7
  const questionScreens = [2, 3, 4, 5] // Screens that have questions

  const nextScreen = () => {
    if (currentScreen < totalScreens) {
      setCurrentScreen(currentScreen + 1)
    }
  }

  const previousScreen = () => {
    if (currentScreen > 1) {
      setCurrentScreen(currentScreen - 1)
    }
  }

  const canContinue = () => {
    switch (currentScreen) {
      case 2:
        return answers.resumeHelp !== null
      case 3:
        return answers.coachingHelp !== null
      case 4:
        return answers.targetRoles.trim() !== ""
      case 5:
        return answers.applicationFrequency !== null && answers.applicationFrequency > 0
      case 6:
        return (
          paymentForm.cardNumber !== "" &&
          paymentForm.expiryDate !== "" &&
          paymentForm.cvv !== "" &&
          paymentForm.nameOnCard !== ""
        )
      default:
        return true
    }
  }

  const calculatePrice = () => {
    let total = 0
    if (answers.resumeHelp) total += 15
    if (answers.coachingHelp) total += 25
    if (answers.applicationFrequency) total += answers.applicationFrequency * 2
    return total
  }

  const handlePayment = async () => {
    setIsProcessingPayment(true)
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsProcessingPayment(false)
    nextScreen()
  }

  const getProgressPercentage = () => {
    if (currentScreen === 1) return 0
    if (currentScreen === 7) return 100
    return ((currentScreen - 1) / (totalScreens - 2)) * 100
  }

  // Screen 1: Introduction
  const IntroductionScreen = () => (
    <div className="max-w-4xl mx-auto">
      <Card className="bg-gradient-to-br from-purple-50 to-blue-50 border-none shadow-xl">
        <CardHeader className="text-center pb-6">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Supercharge Your Job Search with InterRoom+
          </CardTitle>
          <p className="text-lg text-slate-600 mt-4">Get personalized support to accelerate your career journey</p>
        </CardHeader>
        <CardContent className="space-y-8">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-purple-100">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Job Application Outsourcing</h3>
              <p className="text-slate-600 text-sm">
                We'll apply to jobs on your behalf, saving you hours of repetitive work
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-blue-100">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <FileText className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Resume Rewrite & LinkedIn Optimization</h3>
              <p className="text-slate-600 text-sm">
                Professional resume and LinkedIn profile optimization to stand out
              </p>
            </div>

            <div className="text-center p-6 bg-white rounded-xl shadow-sm border border-green-100">
              <div className="w-16 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">Career Coaching</h3>
              <p className="text-slate-600 text-sm">
                1-on-1 coaching sessions to refine your strategy and interview skills
              </p>
            </div>
          </div>

          <div className="text-center pt-6">
            <Button
              onClick={nextScreen}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Customize Your Plan
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Screen 2: Resume Help
  const ResumeHelpScreen = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white shadow-xl border-none">
        <CardHeader>
          <Progress value={getProgressPercentage()} className="mb-4" />
          <CardTitle className="text-2xl font-bold text-center text-slate-800">
            Do you need help with your resume and LinkedIn profile?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <Button
              variant={answers.resumeHelp === true ? "default" : "outline"}
              onClick={() => setAnswers({ ...answers, resumeHelp: true })}
              className={`p-6 h-auto text-left ${
                answers.resumeHelp === true
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "hover:bg-purple-50 border-purple-200"
              }`}
            >
              <div>
                <div className="font-semibold text-lg">Yes, I need help</div>
                <div className="text-sm opacity-80 mt-1">
                  Get professional resume rewrite and LinkedIn optimization ($15)
                </div>
              </div>
            </Button>

            <Button
              variant={answers.resumeHelp === false ? "default" : "outline"}
              onClick={() => setAnswers({ ...answers, resumeHelp: false })}
              className={`p-6 h-auto text-left ${
                answers.resumeHelp === false
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "hover:bg-purple-50 border-purple-200"
              }`}
            >
              <div>
                <div className="font-semibold text-lg">No, I'm good</div>
                <div className="text-sm opacity-80 mt-1">My resume and LinkedIn are already optimized</div>
              </div>
            </Button>
          </div>

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={previousScreen} className="flex items-center bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={nextScreen}
              disabled={!canContinue()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Screen 3: Coaching Help
  const CoachingHelpScreen = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white shadow-xl border-none">
        <CardHeader>
          <Progress value={getProgressPercentage()} className="mb-4" />
          <CardTitle className="text-2xl font-bold text-center text-slate-800">
            Are you interested in 1-on-1 career coaching?
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4">
            <Button
              variant={answers.coachingHelp === true ? "default" : "outline"}
              onClick={() => setAnswers({ ...answers, coachingHelp: true })}
              className={`p-6 h-auto text-left ${
                answers.coachingHelp === true
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "hover:bg-purple-50 border-purple-200"
              }`}
            >
              <div>
                <div className="font-semibold text-lg">Yes, I want coaching</div>
                <div className="text-sm opacity-80 mt-1">Get personalized career coaching sessions ($25)</div>
              </div>
            </Button>

            <Button
              variant={answers.coachingHelp === false ? "default" : "outline"}
              onClick={() => setAnswers({ ...answers, coachingHelp: false })}
              className={`p-6 h-auto text-left ${
                answers.coachingHelp === false
                  ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                  : "hover:bg-purple-50 border-purple-200"
              }`}
            >
              <div>
                <div className="font-semibold text-lg">No, thanks</div>
                <div className="text-sm opacity-80 mt-1">I can handle the coaching aspect myself</div>
              </div>
            </Button>
          </div>

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={previousScreen} className="flex items-center bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={nextScreen}
              disabled={!canContinue()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Screen 4: Target Roles
  const TargetRolesScreen = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white shadow-xl border-none">
        <CardHeader>
          <Progress value={getProgressPercentage()} className="mb-4" />
          <CardTitle className="text-2xl font-bold text-center text-slate-800">
            What job titles are you targeting?
          </CardTitle>
          <p className="text-center text-slate-600 mt-2">
            Enter the job titles you're interested in, separated by commas
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="targetRoles" className="text-sm font-medium text-slate-700">
              Job Titles
            </Label>
            <Input
              id="targetRoles"
              placeholder="e.g. Software Engineer, Full Stack Developer, Frontend Developer"
              value={answers.targetRoles}
              onChange={(e) => setAnswers({ ...answers, targetRoles: e.target.value })}
              className="text-base p-4 border-2 border-slate-200 focus:border-purple-500"
            />
            <p className="text-xs text-slate-500">This helps us find the most relevant job opportunities for you</p>
          </div>

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={previousScreen} className="flex items-center bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={nextScreen}
              disabled={!canContinue()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Screen 5: Application Frequency
  const ApplicationFrequencyScreen = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-white shadow-xl border-none">
        <CardHeader>
          <Progress value={getProgressPercentage()} className="mb-4" />
          <CardTitle className="text-2xl font-bold text-center text-slate-800">
            How many jobs should we apply to for you per week?
          </CardTitle>
          <p className="text-center text-slate-600 mt-2">We'll handle the entire application process for you</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="applicationFrequency" className="text-sm font-medium text-slate-700">
              Applications per week
            </Label>
            <Input
              id="applicationFrequency"
              type="number"
              min="1"
              max="50"
              placeholder="e.g. 10"
              value={answers.applicationFrequency || ""}
              onChange={(e) =>
                setAnswers({ ...answers, applicationFrequency: Number.parseInt(e.target.value) || null })
              }
              className="text-base p-4 border-2 border-slate-200 focus:border-purple-500"
            />
            <p className="text-xs text-slate-500">
              Each application costs $2. We recommend 10-20 applications per week for best results.
            </p>
          </div>

          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={previousScreen} className="flex items-center bg-transparent">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Button>
            <Button
              onClick={nextScreen}
              disabled={!canContinue()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
            >
              Continue
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // Screen 6: Summary & Payment
  const SummaryPaymentScreen = () => {
    const totalPrice = calculatePrice()

    return (
      <div className="max-w-2xl mx-auto">
        <Card className="bg-white shadow-xl border-none">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-center text-slate-800">Your InterRoom+ Plan</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Plan Summary */}
            <div className="bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg p-6 space-y-4">
              <h3 className="font-semibold text-lg text-slate-800">Plan Summary</h3>
              <div className="space-y-3">
                {answers.resumeHelp && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">Resume & LinkedIn Optimization</span>
                    <span className="font-semibold">$15</span>
                  </div>
                )}
                {answers.coachingHelp && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">Career Coaching</span>
                    <span className="font-semibold">$25</span>
                  </div>
                )}
                {answers.applicationFrequency && (
                  <div className="flex justify-between items-center">
                    <span className="text-slate-700">Job Applications ({answers.applicationFrequency}/week)</span>
                    <span className="font-semibold">${answers.applicationFrequency * 2}</span>
                  </div>
                )}
                <div className="border-t pt-3 flex justify-between items-center text-lg font-bold">
                  <span>Total</span>
                  <span className="text-purple-600">${totalPrice}</span>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Lock className="h-4 w-4 text-slate-500" />
                <span className="text-sm text-slate-600">Secure payment powered by Stripe</span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="nameOnCard">Name on Card</Label>
                <Input
                  id="nameOnCard"
                  placeholder="John Doe"
                  value={paymentForm.nameOnCard}
                  onChange={(e) => setPaymentForm({ ...paymentForm, nameOnCard: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input
                  id="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentForm.cardNumber}
                  onChange={(e) => setPaymentForm({ ...paymentForm, cardNumber: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiryDate">Expiry Date</Label>
                  <Input
                    id="expiryDate"
                    placeholder="MM/YY"
                    value={paymentForm.expiryDate}
                    onChange={(e) => setPaymentForm({ ...paymentForm, expiryDate: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input
                    id="cvv"
                    placeholder="123"
                    value={paymentForm.cvv}
                    onChange={(e) => setPaymentForm({ ...paymentForm, cvv: e.target.value })}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-between pt-6">
              <Button variant="outline" onClick={previousScreen} className="flex items-center bg-transparent">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back
              </Button>
              <Button
                onClick={handlePayment}
                disabled={!canContinue() || isProcessingPayment}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50 flex items-center"
              >
                {isProcessingPayment ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <CreditCard className="mr-2 h-4 w-4" />
                    Complete Payment (${totalPrice})
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Screen 7: Success Confirmation
  const SuccessScreen = () => (
    <div className="max-w-2xl mx-auto">
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 shadow-xl">
        <CardHeader className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
          <CardTitle className="text-3xl font-bold text-green-800">Welcome to InterRoom+!</CardTitle>
          <p className="text-green-700 mt-2">Your premium plan is now active</p>
        </CardHeader>
        <CardContent className="space-y-6">
          <Card className="bg-white border-green-200">
            <CardHeader>
              <CardTitle className="text-lg text-slate-800">Next Steps</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {answers.resumeHelp && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-purple-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-slate-800">Resume & LinkedIn Review</p>
                      <p className="text-sm text-slate-600">
                        Our team will contact you within 24 hours to schedule your consultation
                      </p>
                    </div>
                  </div>
                )}
                {answers.coachingHelp && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-slate-800">Career Coaching Setup</p>
                      <p className="text-sm text-slate-600">
                        Your dedicated coach will reach out to schedule your first session
                      </p>
                    </div>
                  </div>
                )}
                {answers.applicationFrequency && (
                  <div className="flex items-start gap-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="font-medium text-slate-800">Job Application Service</p>
                      <p className="text-sm text-slate-600">
                        We'll start applying to {answers.applicationFrequency} jobs per week based on your target roles:{" "}
                        {answers.targetRoles}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <div className="text-center pt-6">
            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg font-semibold"
            >
              Return to Dashboard
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )

  const renderCurrentScreen = () => {
    switch (currentScreen) {
      case 1:
        return <IntroductionScreen />
      case 2:
        return <ResumeHelpScreen />
      case 3:
        return <CoachingHelpScreen />
      case 4:
        return <TargetRolesScreen />
      case 5:
        return <ApplicationFrequencyScreen />
      case 6:
        return <SummaryPaymentScreen />
      case 7:
        return <SuccessScreen />
      default:
        return <IntroductionScreen />
    }
  }

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="container mx-auto">{renderCurrentScreen()}</div>
    </div>
  )
}
