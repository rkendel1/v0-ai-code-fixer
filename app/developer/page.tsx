import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Clock, CheckCircle, DollarSign, Star, Code2, MessageSquare } from "lucide-react"

const developerStats = {
  totalAssigned: 47,
  completed: 42,
  inProgress: 3,
  avgRating: 4.8,
  totalEarnings: 2940,
  thisMonthEarnings: 680,
}

const assignedBugs = [
  {
    id: "BUG-003",
    title: "Database connection timeout",
    app: "Task Manager",
    priority: "critical",
    techStack: "React + Next.js",
    submittedAt: "2024-01-13T10:30:00Z",
    aiConfidence: 45,
    userPlan: "pro",
    payout: 49,
    complexity: "high",
    estimatedHours: 3,
    description: "App crashes when trying to save tasks. Database connection times out after 30 seconds.",
    aiFindings: [
      "Custom ORM implementation causing connection leaks",
      "Missing connection pooling configuration",
      "Inefficient query patterns detected",
    ],
  },
  {
    id: "BUG-004",
    title: "Payment form validation errors",
    app: "E-commerce Store",
    priority: "high",
    techStack: "Vue + Nuxt",
    submittedAt: "2024-01-14T14:22:00Z",
    aiConfidence: 35,
    userPlan: "free",
    payout: 99,
    complexity: "medium",
    estimatedHours: 2,
    description: "Credit card validation fails for valid cards. Stripe integration issues.",
    aiFindings: ["Complex validation logic", "Third-party integration conflicts"],
  },
]

const completedBugs = [
  {
    id: "BUG-001",
    title: "Login form not submitting",
    app: "Portfolio Website",
    completedAt: "2024-01-12T16:45:00Z",
    rating: 5,
    payout: 49,
    timeSpent: "1.5 hours",
    userFeedback: "Perfect fix! Works exactly as expected. Very professional communication.",
  },
  {
    id: "BUG-002",
    title: "Mobile navigation broken",
    app: "Blog Platform",
    completedAt: "2024-01-11T11:20:00Z",
    rating: 4,
    payout: 99,
    timeSpent: "2 hours",
    userFeedback: "Good fix, but took a bit longer than expected. Overall satisfied.",
  },
]

export default function DeveloperDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage src="/placeholder.svg?height=48&width=48" />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold text-slate-900">Welcome back, John</h1>
                <p className="text-slate-600">Senior Full-Stack Developer</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-green-100 text-green-800">
                <Star className="h-3 w-3 mr-1" />
                {developerStats.avgRating} Rating
              </Badge>
              <Badge variant="outline">{developerStats.inProgress} Active</Badge>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Completed</p>
                    <p className="text-2xl font-bold text-slate-900">{developerStats.completed}</p>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">In Progress</p>
                    <p className="text-2xl font-bold text-blue-600">{developerStats.inProgress}</p>
                  </div>
                  <Clock className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">This Month</p>
                    <p className="text-2xl font-bold text-green-600">${developerStats.thisMonthEarnings}</p>
                  </div>
                  <DollarSign className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Earnings</p>
                    <p className="text-2xl font-bold text-slate-900">${developerStats.totalEarnings}</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="assigned" className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="assigned">Assigned Bugs ({assignedBugs.length})</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="earnings">Earnings</TabsTrigger>
            </TabsList>

            <TabsContent value="assigned" className="space-y-6">
              <div className="space-y-4">
                {assignedBugs.map((bug) => (
                  <Card key={bug.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-slate-900">{bug.title}</h3>
                            <Badge variant="outline">{bug.id}</Badge>
                            <Badge
                              className={
                                bug.priority === "critical"
                                  ? "bg-red-100 text-red-800"
                                  : bug.priority === "high"
                                    ? "bg-orange-100 text-orange-800"
                                    : "bg-yellow-100 text-yellow-800"
                              }
                            >
                              {bug.priority.toUpperCase()}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">{bug.description}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500">
                            <span>App: {bug.app}</span>
                            <span>•</span>
                            <span>{bug.techStack}</span>
                            <span>•</span>
                            <span>AI Confidence: {bug.aiConfidence}%</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className="bg-green-100 text-green-800">${bug.payout}</Badge>
                          <Badge variant="outline" className="text-xs">
                            {bug.userPlan.toUpperCase()} USER
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium text-slate-900 mb-2">AI Findings</h4>
                          <div className="flex flex-wrap gap-1">
                            {bug.aiFindings.map((finding, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {finding}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span>Complexity: {bug.complexity}</span>
                            <span>•</span>
                            <span>Est. {bug.estimatedHours}h</span>
                            <span>•</span>
                            <span>Submitted: {new Date(bug.submittedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <MessageSquare className="h-4 w-4 mr-2" />
                              Contact User
                            </Button>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              <Code2 className="h-4 w-4 mr-2" />
                              Start Working
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              <div className="space-y-4">
                {completedBugs.map((bug) => (
                  <Card key={bug.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-slate-900">{bug.title}</h3>
                            <Badge variant="outline">{bug.id}</Badge>
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">App: {bug.app}</p>
                          <p className="text-sm text-slate-700 italic">"{bug.userFeedback}"</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className="bg-green-100 text-green-800">${bug.payout}</Badge>
                          <div className="flex items-center gap-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3 w-3 ${
                                  i < bug.rating ? "text-yellow-400 fill-current" : "text-slate-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-slate-500">
                        <span>Time spent: {bug.timeSpent}</span>
                        <span>Completed: {new Date(bug.completedAt).toLocaleDateString()}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="earnings" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Earnings Summary</CardTitle>
                    <CardDescription>Your payment history and statistics</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Total Earned</span>
                      <span className="text-lg font-bold text-slate-900">${developerStats.totalEarnings}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">This Month</span>
                      <span className="text-lg font-bold text-green-600">${developerStats.thisMonthEarnings}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Average per Bug</span>
                      <span className="text-lg font-bold text-slate-900">
                        ${Math.round(developerStats.totalEarnings / developerStats.completed)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Pending Payout</span>
                      <span className="text-lg font-bold text-blue-600">$148</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                    <CardDescription>Your work quality and efficiency</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Average Rating</span>
                      <div className="flex items-center gap-1">
                        <span className="text-lg font-bold text-slate-900">{developerStats.avgRating}</span>
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Completion Rate</span>
                      <span className="text-lg font-bold text-green-600">
                        {Math.round((developerStats.completed / developerStats.totalAssigned) * 100)}%
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Avg Response Time</span>
                      <span className="text-lg font-bold text-slate-900">2.4 hours</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-slate-600">Bugs This Month</span>
                      <span className="text-lg font-bold text-blue-600">14</span>
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
