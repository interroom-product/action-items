import Link from "next/link"
import { Crown, ArrowRight, Zap, Target, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function PremiumServicesCard() {
  return (
    <Card className="border border-[#E5DDFF] shadow-lg bg-gradient-to-br from-white to-[#F6F3FF] overflow-hidden">
      <CardHeader className="pb-2 bg-gradient-to-r from-[#F6F3FF] to-[#E5DDFF] border-b border-[#E5DDFF]">
        <CardTitle className="text-xl font-semibold text-[#44403C] flex items-center">
          <Crown className="h-6 w-6 mr-2 text-[#9458FA]" />
          InterRoom+ Premium
        </CardTitle>
        <p className="text-sm text-[#A8A29E] mt-1">Accelerate your job search with expert support</p>
      </CardHeader>

      <CardContent className="p-5">
        {/* Premium Features */}
        <div className="space-y-4 mb-6">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#E5DDFF] to-[#C8B3FF] rounded-full flex items-center justify-center">
              <Target className="h-4 w-4 text-[#9458FA]" />
            </div>
            <div>
              <h4 className="font-medium text-[#44403C] text-sm">Job Application Outsourcing</h4>
              <p className="text-xs text-[#A8A29E] mt-1">We apply to jobs for you, saving hours of work</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#E5DDFF] to-[#C8B3FF] rounded-full flex items-center justify-center">
              <Zap className="h-4 w-4 text-[#9458FA]" />
            </div>
            <div>
              <h4 className="font-medium text-[#44403C] text-sm">Resume & LinkedIn Optimization</h4>
              <p className="text-xs text-[#A8A29E] mt-1">Professional rewrite to maximize your impact</p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#E5DDFF] to-[#C8B3FF] rounded-full flex items-center justify-center">
              <Users className="h-4 w-4 text-[#9458FA]" />
            </div>
            <div>
              <h4 className="font-medium text-[#44403C] text-sm">1-on-1 Career Coaching</h4>
              <p className="text-xs text-[#A8A29E] mt-1">Personalized guidance from industry experts</p>
            </div>
          </div>
        </div>

        {/* Pricing Preview */}
        <div className="bg-gradient-to-r from-[#F6F3FF] to-[#E5DDFF] rounded-lg p-4 mb-6 border border-[#E5DDFF]">
          <div className="text-center">
            <p className="text-xs text-[#A8A29E] mb-1">Starting from</p>
            <p className="text-2xl font-bold text-[#9458FA]">
              $15<span className="text-sm font-normal">/service</span>
            </p>
            <p className="text-xs text-[#A8A29E] mt-1">Customizable based on your needs</p>
          </div>
        </div>

        {/* CTA Button */}
        <Link href="/premium-services">
          <Button className="w-full bg-gradient-to-r from-[#9458FA] to-[#AD88FD] hover:from-[#AD88FD] hover:to-[#C8B3FF] text-white border-none shadow-md transition-all duration-200 transform hover:scale-105">
            View Plans & Pricing
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>

        <p className="text-xs text-[#A8A29E] text-center mt-3">
          ✨ Join 500+ professionals who've accelerated their careers
        </p>
      </CardContent>
    </Card>
  )
}
