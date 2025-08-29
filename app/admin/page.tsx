import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Bot, Users, DollarSign, TrendingUp, Clock, Settings, BarChart3 } from "lucide-react"
import Link from "next/link"

const dashboardStats = {
  totalUsers: 1247,
  activeSubscriptions: 342,
  monthlyRevenue: 15680,
  totalBugsFixed: 2847,
  aiSuccessRate: 71.5,
  avgResponseTime: "2.3 minutes",
  pendingReviews: 12,
  recentActivity: [
    { type: "bug_submitted", user: "john@example.com", time: "2 minutes ago" },
    { type: "ai_fix_completed", bugId: "BUG-001", time: "5 minutes ago" },
    { type: "subscription_created", user: "sarah@example.com", time: "12 minutes ago" },
    { type: "human_review_requested", bugId: "BUG-003", time: "1 hour ago" },
  ],
}

export default function AdminDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Admin Dashboard</h1>
              <p className="text-slate-600">Monitor platform performance and user activity</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Settings className="h-4 w-4 mr-2" />
                Settings
              </Button>
              <Link href="/admin/ai-dashboard">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Bot className="h-4 w-4 mr-2" />
                  AI Dashboard
                </Button>
              </Link>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Users</p>
                    <p className="text-2xl font-bold text-slate-900">{dashboardStats.totalUsers.toLocaleString()}</p>
                    <p className="text-xs text-green-600">+12% this month</p>
                  </div>
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-slate-900">
                      ${dashboardStats.monthlyRevenue.toLocaleString()}
                    </p>
                    <p className="text-xs text-green-600">+8% this month</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">AI Success Rate</p>
                    <p className="text-2xl font-bold text-slate-900">{dashboardStats.aiSuccessRate}%</p>
                    <p className="text-xs text-green-600">+5.2% this month</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Pending Reviews</p>
                    <p className="text-2xl font-bold text-slate-900">{dashboardStats.pendingReviews}</p>
                    <p className="text-xs text-orange-600">Needs attention</p>
                  </div>
                  <Clock className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest platform events and user actions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dashboardStats.recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-slate-900">
                          {activity.type === "bug_submitted" && `New bug submitted by ${activity.user}`}
                          {activity.type === "ai_fix_completed" && `AI completed fix for ${activity.bugId}`}
                          {activity.type === "subscription_created" && `New subscription from ${activity.user}`}
                          {activity.type === "human_review_requested" && `Human review requested for ${activity.bugId}`}
                        </p>
                        <p className="text-xs text-slate-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
                <CardDescription>Common administrative tasks</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link href="/admin/ai-dashboard">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Bot className="h-4 w-4 mr-2" />
                    View AI Analysis Dashboard
                  </Button>
                </Link>
                <Link href="/admin/users">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users & Subscriptions
                  </Button>
                </Link>
                <Link href="/admin/reviews">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <Clock className="h-4 w-4 mr-2" />
                    Pending Human Reviews ({dashboardStats.pendingReviews})
                  </Button>
                </Link>
                <Link href="/admin/analytics">
                  <Button variant="outline" className="w-full justify-start bg-transparent">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    View Analytics & Reports
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
