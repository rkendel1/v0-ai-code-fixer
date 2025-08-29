import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Zap, DollarSign, TrendingUp, Calendar, Crown, AlertTriangle } from "lucide-react"
import Link from "next/link"

const usageData = {
  user: {
    plan: "free",
    aiFixesUsed: 4,
    aiFixesLimit: 5,
    humanFixesThisMonth: 2,
    totalSpent: 198,
    nextBillingDate: "2024-02-15",
  },
  monthlyUsage: [
    { month: "Jan 2024", aiFixes: 4, humanFixes: 2, spent: 198 },
    { month: "Dec 2023", aiFixes: 5, humanFixes: 1, spent: 99 },
    { month: "Nov 2023", aiFixes: 3, humanFixes: 0, spent: 0 },
    { month: "Oct 2023", aiFixes: 2, humanFixes: 1, spent: 99 },
  ],
  recentTransactions: [
    {
      id: "txn-001",
      date: "2024-01-15",
      description: "Human developer fix - Database timeout issue",
      amount: 99,
      status: "completed",
      bugId: "BUG-003",
    },
    {
      id: "txn-002",
      date: "2024-01-10",
      description: "Human developer fix - Payment form validation",
      amount: 99,
      status: "completed",
      bugId: "BUG-004",
    },
  ],
  projectedSavings: {
    withPro: 148, // What they would have saved with pro plan
    monthlyProCost: 29,
    breakEvenPoint: 2, // Number of human fixes needed to break even
  },
}

export default function UsagePage() {
  const { user, monthlyUsage, recentTransactions, projectedSavings } = usageData
  const usagePercentage = user.aiFixesLimit ? (user.aiFixesUsed / user.aiFixesLimit) * 100 : 0
  const isNearLimit = user.aiFixesLimit && user.aiFixesUsed >= user.aiFixesLimit * 0.8

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Usage & Billing</h1>
              <p className="text-slate-600">Monitor your usage and manage your spending</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge
                variant={user.plan === "pro" ? "default" : "outline"}
                className={user.plan === "pro" ? "bg-yellow-600" : ""}
              >
                {user.plan.toUpperCase()} PLAN
              </Badge>
              {user.plan === "free" && (
                <Link href="/pricing">
                  <Button className="bg-blue-600 hover:bg-blue-700">
                    <Crown className="h-4 w-4 mr-2" />
                    Upgrade to Pro
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Current Usage Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className={isNearLimit ? "border-orange-200 bg-orange-50" : ""}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-slate-600">AI Fixes Used</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {user.aiFixesUsed}
                      {user.aiFixesLimit ? `/${user.aiFixesLimit}` : ""}
                    </p>
                  </div>
                  <Zap className="h-8 w-8 text-blue-600" />
                </div>
                {user.aiFixesLimit && <Progress value={usagePercentage} className="h-2" />}
                {isNearLimit && (
                  <div className="flex items-center gap-1 mt-2 text-xs text-orange-600">
                    <AlertTriangle className="h-3 w-3" />
                    <span>Near limit</span>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Human Fixes</p>
                    <p className="text-2xl font-bold text-slate-900">{user.humanFixesThisMonth}</p>
                    <p className="text-xs text-slate-500">This month</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Spent</p>
                    <p className="text-2xl font-bold text-slate-900">${user.totalSpent}</p>
                    <p className="text-xs text-slate-500">All time</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Next Billing</p>
                    <p className="text-lg font-bold text-slate-900">
                      {user.plan === "free" ? "N/A" : new Date(user.nextBillingDate).toLocaleDateString()}
                    </p>
                    <p className="text-xs text-slate-500">{user.plan === "free" ? "Pay per use" : "Monthly"}</p>
                  </div>
                  <Calendar className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Pro Plan Savings Alert */}
          {user.plan === "free" && user.humanFixesThisMonth >= projectedSavings.breakEvenPoint && (
            <Card className="mb-8 border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <Crown className="h-8 w-8 text-blue-600 flex-shrink-0 mt-1" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-blue-900 mb-2">You could save money with Pro!</h3>
                    <p className="text-sm text-blue-800 mb-3">
                      Based on your usage this month, you would have saved <strong>${projectedSavings.withPro}</strong>{" "}
                      with a Pro plan. Pro users get unlimited AI fixes and pay only $49 for human fixes (vs $99).
                    </p>
                    <div className="flex gap-2">
                      <Link href="/pricing">
                        <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                          Upgrade to Pro - $29/month
                        </Button>
                      </Link>
                      <Button variant="outline" size="sm">
                        Learn More
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Tabs defaultValue="history" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="history">Usage History</TabsTrigger>
              <TabsTrigger value="transactions">Transactions</TabsTrigger>
              <TabsTrigger value="limits">Limits & Pricing</TabsTrigger>
            </TabsList>

            <TabsContent value="history" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Usage Breakdown</CardTitle>
                  <CardDescription>Your usage patterns over the last few months</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {monthlyUsage.map((month, index) => (
                      <div
                        key={month.month}
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900">{month.month}</h4>
                          <div className="flex items-center gap-4 text-sm text-slate-600 mt-1">
                            <span>{month.aiFixes} AI fixes</span>
                            <span>•</span>
                            <span>{month.humanFixes} human fixes</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-slate-900">${month.spent}</p>
                          <p className="text-sm text-slate-600">spent</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="transactions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Your payment history for human developer fixes</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                      >
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-900">{transaction.description}</h4>
                          <div className="flex items-center gap-2 text-sm text-slate-600 mt-1">
                            <span>{new Date(transaction.date).toLocaleDateString()}</span>
                            <span>•</span>
                            <Badge variant="outline" className="text-xs">
                              {transaction.bugId}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-slate-900">${transaction.amount}</p>
                          <Badge className="bg-green-100 text-green-800 text-xs">{transaction.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="limits" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Free Plan Limits</CardTitle>
                    <CardDescription>Current plan restrictions and pricing</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">AI Fixes per month</span>
                      <span className="font-medium">5 fixes</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Human Fix Price</span>
                      <span className="font-medium">$99 each</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Monthly Cost</span>
                      <span className="font-medium text-green-600">$0</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-blue-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Crown className="h-5 w-5 text-blue-600" />
                      Pro Plan Benefits
                    </CardTitle>
                    <CardDescription>Upgrade for better value and unlimited fixes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">AI Fixes per month</span>
                      <span className="font-medium text-blue-600">Unlimited</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Human Fix Price</span>
                      <span className="font-medium text-blue-600">$49 each</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Monthly Cost</span>
                      <span className="font-medium">$29</span>
                    </div>
                    <Link href="/pricing">
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 mt-4">Upgrade to Pro</Button>
                    </Link>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
