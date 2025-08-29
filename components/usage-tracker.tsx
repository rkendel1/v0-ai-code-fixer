"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Zap, Crown, AlertTriangle, TrendingUp } from "lucide-react"
import Link from "next/link"

interface UsageTrackerProps {
  plan: "free" | "pro"
  aiFixesUsed: number
  aiFixesLimit: number | null
  humanFixesThisMonth: number
  totalSpent: number
}

export function UsageTracker({ plan, aiFixesUsed, aiFixesLimit, humanFixesThisMonth, totalSpent }: UsageTrackerProps) {
  const isNearLimit = aiFixesLimit && aiFixesUsed >= aiFixesLimit * 0.8
  const isAtLimit = aiFixesLimit && aiFixesUsed >= aiFixesLimit
  const usagePercentage = aiFixesLimit ? (aiFixesUsed / aiFixesLimit) * 100 : 0

  return (
    <Card className={`${isNearLimit ? "border-orange-200 bg-orange-50" : ""}`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            {plan === "pro" ? <Crown className="h-5 w-5 text-yellow-600" /> : <Zap className="h-5 w-5 text-blue-600" />}
            Usage Overview
          </CardTitle>
          <Badge variant={plan === "pro" ? "default" : "outline"} className={plan === "pro" ? "bg-yellow-600" : ""}>
            {plan.toUpperCase()} PLAN
          </Badge>
        </div>
        <CardDescription>Track your AI fixes and spending</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* AI Fixes Usage */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-slate-700">AI Fixes</span>
            <span className="text-sm text-slate-600">
              {aiFixesUsed}
              {aiFixesLimit ? `/${aiFixesLimit}` : ""} used
            </span>
          </div>
          {aiFixesLimit ? (
            <Progress value={usagePercentage} className={`h-2 ${isNearLimit ? "bg-orange-200" : ""}`} />
          ) : (
            <div className="flex items-center gap-2 text-sm text-green-600">
              <Crown className="h-4 w-4" />
              <span>Unlimited AI fixes</span>
            </div>
          )}
          {isAtLimit && (
            <div className="flex items-center gap-2 text-sm text-orange-600">
              <AlertTriangle className="h-4 w-4" />
              <span>You've reached your AI fix limit</span>
            </div>
          )}
        </div>

        {/* Human Fixes */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Human Fixes This Month</span>
          <span className="text-sm text-slate-600">{humanFixesThisMonth}</span>
        </div>

        {/* Total Spent */}
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-slate-700">Total Spent</span>
          <span className="text-sm font-semibold text-slate-900">${totalSpent}</span>
        </div>

        {/* Upgrade Prompt for Free Users */}
        {plan === "free" && isNearLimit && (
          <div className="p-3 bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Crown className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-900">Upgrade to Pro</span>
            </div>
            <p className="text-xs text-blue-800 mb-3">Get unlimited AI fixes and 50% off human developer fixes</p>
            <Link href="/pricing">
              <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                Upgrade Now - $29/month
              </Button>
            </Link>
          </div>
        )}

        {/* Usage Analytics Link */}
        <Link href="/usage">
          <Button variant="outline" size="sm" className="w-full bg-transparent">
            <TrendingUp className="h-4 w-4 mr-2" />
            View Detailed Usage
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
