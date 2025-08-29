import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bot, Brain, CheckCircle, Clock, AlertTriangle, Zap, Target, Activity } from "lucide-react"

const aiStats = {
  totalAnalyses: 1247,
  successfulFixes: 892,
  successRate: 71.5,
  avgAnalysisTime: "2.3 minutes",
  activeAnalyses: 12,
  queuedAnalyses: 8,
}

const recentAnalyses = [
  {
    id: "BUG-001",
    title: "Login form not submitting",
    status: "analyzing",
    confidence: 85,
    progress: 75,
    techStack: "React + Next.js",
    startTime: "2 minutes ago",
    issues: ["Form handler missing", "API endpoint error", "Missing validation"],
  },
  {
    id: "BUG-002",
    title: "Mobile navigation broken",
    status: "completed",
    confidence: 95,
    progress: 100,
    techStack: "Vue + Nuxt",
    startTime: "15 minutes ago",
    issues: ["CSS media query bug", "JavaScript event listener"],
  },
  {
    id: "BUG-003",
    title: "Database connection timeout",
    status: "failed",
    confidence: 45,
    progress: 100,
    techStack: "React + Next.js",
    startTime: "1 hour ago",
    issues: ["Complex database schema", "Custom ORM implementation"],
  },
]

const knowledgeBaseStats = {
  totalEntries: 2847,
  recentlyAdded: 23,
  topCategories: [
    { name: "Authentication Issues", count: 342 },
    { name: "CSS/Styling Problems", count: 298 },
    { name: "API Integration", count: 267 },
    { name: "Database Errors", count: 189 },
  ],
}

export default function AIAnalysisDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">AI Analysis Dashboard</h1>
              <p className="text-slate-600">Monitor AI performance and analysis results</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline">
                <Activity className="h-4 w-4 mr-2" />
                System Health
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Brain className="h-4 w-4 mr-2" />
                Train Model
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Analyses</p>
                    <p className="text-2xl font-bold text-slate-900">{aiStats.totalAnalyses.toLocaleString()}</p>
                  </div>
                  <Bot className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Success Rate</p>
                    <p className="text-2xl font-bold text-green-600">{aiStats.successRate}%</p>
                  </div>
                  <Target className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Avg Analysis Time</p>
                    <p className="text-2xl font-bold text-slate-900">{aiStats.avgAnalysisTime}</p>
                  </div>
                  <Zap className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Active Analyses</p>
                    <p className="text-2xl font-bold text-blue-600">{aiStats.activeAnalyses}</p>
                  </div>
                  <Activity className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="active" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="active">Active Analyses</TabsTrigger>
              <TabsTrigger value="completed">Completed</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge Base</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
            </TabsList>

            <TabsContent value="active" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Analyses */}
                <Card className="lg:col-span-2">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Bot className="h-5 w-5 text-blue-600" />
                      Real-time Analysis Progress
                    </CardTitle>
                    <CardDescription>Currently running AI analyses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentAnalyses
                        .filter((a) => a.status === "analyzing")
                        .map((analysis) => (
                          <div key={analysis.id} className="border border-slate-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h4 className="font-medium text-slate-900">{analysis.title}</h4>
                                  <Badge variant="outline">{analysis.id}</Badge>
                                </div>
                                <p className="text-sm text-slate-600">
                                  {analysis.techStack} • Started {analysis.startTime}
                                </p>
                              </div>
                              <Badge className="bg-blue-100 text-blue-800">
                                <Clock className="h-3 w-3 mr-1" />
                                Analyzing
                              </Badge>
                            </div>

                            <div className="space-y-3">
                              <div>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-sm font-medium text-slate-700">Analysis Progress</span>
                                  <span className="text-sm text-slate-600">{analysis.progress}%</span>
                                </div>
                                <Progress value={analysis.progress} className="h-2" />
                              </div>

                              <div>
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-sm font-medium text-slate-700">Issues Identified</span>
                                  <Badge variant="secondary">{analysis.confidence}% confidence</Badge>
                                </div>
                                <div className="flex flex-wrap gap-1">
                                  {analysis.issues.map((issue, index) => (
                                    <Badge key={index} variant="outline" className="text-xs">
                                      {issue}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="completed" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Completed Analyses</CardTitle>
                  <CardDescription>AI analysis results from the last 24 hours</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {recentAnalyses
                      .filter((a) => a.status !== "analyzing")
                      .map((analysis) => (
                        <div
                          key={analysis.id}
                          className="flex items-center justify-between p-4 border border-slate-200 rounded-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <h4 className="font-medium text-slate-900">{analysis.title}</h4>
                              <Badge variant="outline">{analysis.id}</Badge>
                            </div>
                            <p className="text-sm text-slate-600">
                              {analysis.techStack} • Completed {analysis.startTime}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge variant="secondary">{analysis.confidence}% confidence</Badge>
                            {analysis.status === "completed" ? (
                              <Badge className="bg-green-100 text-green-800">
                                <CheckCircle className="h-3 w-3 mr-1" />
                                Fixed
                              </Badge>
                            ) : (
                              <Badge className="bg-red-100 text-red-800">
                                <AlertTriangle className="h-3 w-3 mr-1" />
                                Failed
                              </Badge>
                            )}
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="knowledge" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Knowledge Base Stats</CardTitle>
                    <CardDescription>AI learning and knowledge accumulation</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Total Entries</span>
                      <span className="text-lg font-bold text-slate-900">
                        {knowledgeBaseStats.totalEntries.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-slate-700">Added This Week</span>
                      <Badge className="bg-green-100 text-green-800">+{knowledgeBaseStats.recentlyAdded}</Badge>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Top Issue Categories</CardTitle>
                    <CardDescription>Most common bug types in knowledge base</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {knowledgeBaseStats.topCategories.map((category, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-slate-700">{category.name}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full"
                                style={{
                                  width: `${(category.count / knowledgeBaseStats.topCategories[0].count) * 100}%`,
                                }}
                              ></div>
                            </div>
                            <span className="text-sm font-medium text-slate-900 w-8">{category.count}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Success Rate Trend</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-32">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-600 mb-1">↗ 71.5%</div>
                        <div className="text-sm text-slate-600">+5.2% this month</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Avg Response Time</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-32">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-600 mb-1">2.3min</div>
                        <div className="text-sm text-slate-600">-0.8min improvement</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">User Satisfaction</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-center h-32">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-600 mb-1">4.7★</div>
                        <div className="text-sm text-slate-600">Based on 1,247 reviews</div>
                      </div>
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
