"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { DollarSign, CreditCard, Shield, Clock } from "lucide-react"

interface HumanFixPaymentProps {
  bugId: string
  userPlan: "free" | "pro"
  onPaymentSuccess?: () => void
}

export function HumanFixPayment({ bugId, userPlan, onPaymentSuccess }: HumanFixPaymentProps) {
  const [isProcessing, setIsProcessing] = useState(false)
  const [paymentComplete, setPaymentComplete] = useState(false)

  const price = userPlan === "pro" ? 49 : 99
  const savings = userPlan === "pro" ? 50 : 0

  const handlePayment = async () => {
    setIsProcessing(true)

    try {
      // Create payment intent
      const response = await fetch("/api/billing/create-human-fix-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ bugId, userPlan }),
      })

      const { clientSecret, amount } = await response.json()

      // In a real app, you would use Stripe Elements here
      // For demo purposes, we'll simulate payment processing
      setTimeout(() => {
        setPaymentComplete(true)
        setIsProcessing(false)
        onPaymentSuccess?.()
      }, 2000)
    } catch (error) {
      console.error("Payment failed:", error)
      setIsProcessing(false)
    }
  }

  if (paymentComplete) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center">
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-semibold text-green-900 mb-2">Payment Successful!</h3>
            <p className="text-sm text-green-800 mb-4">
              Your human developer fix has been requested. A developer will be assigned within 2 hours.
            </p>
            <Badge className="bg-green-100 text-green-800">
              <Clock className="h-3 w-3 mr-1" />
              Processing Started
            </Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5 text-green-600" />
          Request Human Developer Fix
        </CardTitle>
        <CardDescription>Get expert help from our professional developers</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-slate-50 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Bug ID:</span>
            <Badge variant="outline">{bugId}</Badge>
          </div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">Your Plan:</span>
            <Badge
              variant={userPlan === "pro" ? "default" : "outline"}
              className={userPlan === "pro" ? "bg-yellow-600" : ""}
            >
              {userPlan.toUpperCase()}
            </Badge>
          </div>
          {savings > 0 && (
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-slate-700">Pro Discount:</span>
              <span className="text-sm font-medium text-green-600">-${savings}</span>
            </div>
          )}
        </div>

        <Separator />

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-medium text-slate-900">Total Cost:</span>
            <div className="text-right">
              {savings > 0 && <span className="text-sm text-slate-500 line-through mr-2">${price + savings}</span>}
              <span className="text-2xl font-bold text-slate-900">${price}</span>
            </div>
          </div>

          <div className="text-sm text-slate-600">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-4 w-4 text-green-600" />
              <span>Secure payment processing</span>
            </div>
            <div className="flex items-center gap-2 mb-1">
              <Clock className="h-4 w-4 text-blue-600" />
              <span>Developer assigned within 2 hours</span>
            </div>
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-purple-600" />
              <span>100% satisfaction guarantee</span>
            </div>
          </div>
        </div>

        <Button onClick={handlePayment} disabled={isProcessing} className="w-full bg-green-600 hover:bg-green-700">
          {isProcessing ? (
            <>
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
              Processing Payment...
            </>
          ) : (
            <>
              <CreditCard className="h-4 w-4 mr-2" />
              Pay ${price} & Request Fix
            </>
          )}
        </Button>

        <p className="text-xs text-slate-500 text-center">
          By proceeding, you agree to our terms of service. Payment will be processed securely through Stripe.
        </p>
      </CardContent>
    </Card>
  )
}
