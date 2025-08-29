import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DollarSign, TrendingUp, Users, AlertTriangle, Download } from "lucide-react"

const billingStats = {
  monthlyRevenue: 15680,
  totalRevenue: 89420,
  activeSubscriptions: 342,
  humanFixRevenue: 8940,
  subscriptionRevenue: 6740,
  averageRevenuePerUser: 45.8,
  churnRate: 3.2,
}

const recentTransactions = [
  {
    id: "txn-001",
    user: "john@example.com",
    type: "human_fix",
    amount: 49,
    status: "completed",
    date: "2024-01-15T14:30:00Z",
    bugId: "BUG-003",
  },
  {
    id: "txn-002",
    user: "sarah@example.com",
    type: "subscription",
    amount: 29,
    status: "completed",
    date: "2024-01-15T10:15:00Z",
    plan: "pro",
  },
  {
    id: "txn-003",
    user: "mike@example.com",
    type: "human_fix",
    amount: 99,
    status: "completed",
    date: "2024-01-14T16:45:00Z",
    bugId: "BUG-004",
  },
]

const subscriptionMetrics = {
  newSubscriptions: 23,
  canceledSubscriptions: 8,
  upgrades: 12,
  downgrades: 3,
  netGrowth: 15,
}

export default function AdminBillingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Billing & Revenue</h1>
              <p className="text-slate-600">Monitor revenue, subscriptions, and payment analytics</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Export Report
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <DollarSign className="h-4 w-4 mr-2" />
                Revenue Dashboard
              </Button>
            </div>
          </div>

          {/* Revenue Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-slate-900">${billingStats.monthlyRevenue.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+12% from last month</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Subscriptions</p>
                    <p className="text-2xl font-bold text-slate-900">{billingStats.activeSubscriptions}</p>
                    <p className="text-xs text-green-600">+{subscriptionMetrics.netGrowth} this month</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Avg Revenue/User</p>
                    <p className="text-2xl font-bold text-slate-900">${billingStats.averageRevenuePerUser}</p>
                    <p className="text-xs text-green-600">+8% improvement</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Churn Rate</p>
                    <p className="text-2xl font-bold text-slate-900">{billingStats.churnRate}%</p>
                    <p className="text-xs text-orange-600">+0.5% from last month</p>
                  </div>
                  <AlertTriangle className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="transactions" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
              <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
              <TabsTrigger value="revenue">Revenue Breakdown</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="transactions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Transactions</CardTitle>
                  <CardDescription>Latest payments and subscription activities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentTransactions.map((transaction) => (
                      <div
                        key={transaction.id}
                        className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <span className="font-medium text-slate-900">{transaction.user}</span>
                            <Badge variant="outline" className="text-xs">
                              {transaction.id}
                            </Badge>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <span className="capitalize">{transaction.type.replace("_", " ")}</span>
                            {transaction.bugId && (
                              <>
                                <span>•</span>
                                <span>{transaction.bugId}</span>
                              </>
                            )}
                            {transaction.plan && (
                              <>
                                <span>•</span>
                                <span className="capitalize">{transaction.plan} plan</span>
                              </>
                            )}
                            <span>•</span>
                            <span>{new Date(transaction.date).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-slate-900">${transaction.amount}</span>
                          <Badge className="bg-green-100 text-green-800">{transaction.status}</Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="subscriptions" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Subscription Metrics</CardTitle>
                    <CardDescription>Monthly subscription changes</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">New Subscriptions</span>
                      <span className="font-medium text-green-600">+{subscriptionMetrics.newSubscriptions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Canceled Subscriptions</span>
                      <span className="font-medium text-red-600">-{subscriptionMetrics.canceledSubscriptions}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Upgrades</span>
                      <span className="font-medium text-blue-600">+{subscriptionMetrics.upgrades}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Downgrades</span>
                      <span className="font-medium text-orange-600">-{subscriptionMetrics.downgrades}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="font-medium text-slate-900">Net Growth</span>
                      <span className="font-bold text-green-600">+{subscriptionMetrics.netGrowth}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Plan Distribution</CardTitle>
                    <CardDescription>Current subscription breakdown</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Free Users</span>
                      <span className="font-medium">1,247 (78%)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Pro Subscribers</span>
                      <span className="font-medium">342 (22%)</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="font-medium text-slate-900">Total Users</span>
                      <span className="font-bold text-slate-900">1,589</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="revenue" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Sources</CardTitle>
                    <CardDescription>Breakdown by revenue type</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Subscription Revenue</span>
                      <span className="font-medium">${billingStats.subscriptionRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Human Fix Revenue</span>
                      <span className="font-medium">${billingStats.humanFixRevenue.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t">
                      <span className="font-medium text-slate-900">Total Monthly</span>
                      <span className="font-bold text-slate-900">${billingStats.monthlyRevenue.toLocaleString()}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Growth Metrics</CardTitle>
                    <CardDescription>Revenue growth indicators</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Month-over-Month</span>
                      <span className="font-medium text-green-600">+12%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Year-over-Year</span>
                      <span className="font-medium text-green-600">+156%</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Projected Annual</span>
                      <span className="font-medium text-blue-600">
                        ${(billingStats.monthlyRevenue * 12).toLocaleString()}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Success Rate</CardTitle>
                    <CardDescription>Transaction success metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-green-600 mb-2">98.7%</div>
                      <div className="text-sm text-slate-600">Successful payments</div>
                      <div className="text-xs text-slate-500 mt-1">1.3% failed due to card issues</div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Average Transaction Value</CardTitle>
                    <CardDescription>Mean payment amount</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-blue-600 mb-2">$67</div>
                      <div className="text-sm text-slate-600">Per transaction</div>
                      <div className="text-xs text-slate-500 mt-1">Mix of $29 subscriptions and $49-99 fixes</div>
                    </div>
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
