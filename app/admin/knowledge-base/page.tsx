import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BookOpen, TrendingUp, Users, Eye, Edit, Trash2, CheckCircle, AlertTriangle, Plus } from "lucide-react"

const kbStats = {
  totalEntries: 2847,
  pendingReview: 12,
  publishedThisMonth: 89,
  avgRating: 4.6,
  totalViews: 45672,
  topContributors: 23,
}

const pendingEntries = [
  {
    id: "KB-PENDING-001",
    title: "React Hook Form Validation Patterns",
    author: "Sarah Wilson",
    submittedAt: "2024-01-15T10:30:00Z",
    category: "Form Validation",
    techStack: ["React", "TypeScript"],
    status: "pending-review",
    quality: "high",
  },
  {
    id: "KB-PENDING-002",
    title: "Next.js API Route Error Handling",
    author: "Mike Johnson",
    submittedAt: "2024-01-15T08:15:00Z",
    category: "API Integration",
    techStack: ["Next.js", "TypeScript"],
    status: "needs-revision",
    quality: "medium",
  },
]

const recentEntries = [
  {
    id: "KB-001",
    title: "Database Connection Pooling Implementation",
    author: "John Smith",
    publishedAt: "2024-01-14T16:45:00Z",
    category: "Database Errors",
    views: 234,
    rating: 4.9,
    status: "published",
    aiUsage: 23,
  },
  {
    id: "KB-002",
    title: "Stripe Webhook Validation Fix",
    author: "Emily Davis",
    publishedAt: "2024-01-13T11:20:00Z",
    category: "API Integration",
    views: 189,
    rating: 4.7,
    status: "published",
    aiUsage: 18,
  },
]

const qualityColors = {
  high: "bg-green-100 text-green-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-red-100 text-red-800",
}

const statusColors = {
  "pending-review": "bg-blue-100 text-blue-800",
  "needs-revision": "bg-orange-100 text-orange-800",
  published: "bg-green-100 text-green-800",
  rejected: "bg-red-100 text-red-800",
}

export default function AdminKnowledgeBasePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Knowledge Base Management</h1>
              <p className="text-slate-600">Curate and manage the AI knowledge base</p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-orange-100 text-orange-800">
                <AlertTriangle className="h-3 w-3 mr-1" />
                {kbStats.pendingReview} Pending Review
              </Badge>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="h-4 w-4 mr-2" />
                Add Entry
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Entries</p>
                    <p className="text-2xl font-bold text-slate-900">{kbStats.totalEntries.toLocaleString()}</p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">This Month</p>
                    <p className="text-2xl font-bold text-green-600">+{kbStats.publishedThisMonth}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Views</p>
                    <p className="text-2xl font-bold text-purple-600">{kbStats.totalViews.toLocaleString()}</p>
                  </div>
                  <Eye className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Contributors</p>
                    <p className="text-2xl font-bold text-orange-600">{kbStats.topContributors}</p>
                  </div>
                  <Users className="h-8 w-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="pending" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="pending">Pending Review ({pendingEntries.length})</TabsTrigger>
              <TabsTrigger value="published">Published</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
              <TabsTrigger value="contributors">Contributors</TabsTrigger>
            </TabsList>

            <TabsContent value="pending" className="space-y-6">
              {/* Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <Input placeholder="Search pending entries..." className="flex-1" />
                    <Select>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        <SelectItem value="authentication">Authentication</SelectItem>
                        <SelectItem value="database">Database</SelectItem>
                        <SelectItem value="api">API Integration</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Quality" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Quality</SelectItem>
                        <SelectItem value="high">High Quality</SelectItem>
                        <SelectItem value="medium">Medium Quality</SelectItem>
                        <SelectItem value="low">Low Quality</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Pending Entries */}
              <div className="space-y-4">
                {pendingEntries.map((entry) => (
                  <Card key={entry.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-slate-900">{entry.title}</h3>
                            <Badge variant="outline">{entry.id}</Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-600 mb-3">
                            <span>By {entry.author}</span>
                            <span>•</span>
                            <span>Category: {entry.category}</span>
                            <span>•</span>
                            <span>Submitted: {new Date(entry.submittedAt).toLocaleDateString()}</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {entry.techStack.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <Badge className={statusColors[entry.status as keyof typeof statusColors]}>
                            {entry.status === "pending-review" ? "Pending Review" : "Needs Revision"}
                          </Badge>
                          <Badge className={qualityColors[entry.quality as keyof typeof qualityColors]}>
                            {entry.quality.toUpperCase()} QUALITY
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="text-sm text-slate-500">
                          Submitted {new Date(entry.submittedAt).toLocaleDateString()}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">
                            <Eye className="h-4 w-4 mr-2" />
                            Review
                          </Button>
                          <Button variant="outline" size="sm">
                            <Edit className="h-4 w-4 mr-2" />
                            Edit
                          </Button>
                          <Button size="sm" className="bg-red-600 hover:bg-red-700">
                            <Trash2 className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="published" className="space-y-6">
              <div className="space-y-4">
                {recentEntries.map((entry) => (
                  <Card key={entry.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-slate-900">{entry.title}</h3>
                            <Badge variant="outline">{entry.id}</Badge>
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Published
                            </Badge>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-slate-600">
                            <span>By {entry.author}</span>
                            <span>•</span>
                            <span>Category: {entry.category}</span>
                            <span>•</span>
                            <span>{entry.views} views</span>
                            <span>•</span>
                            <span>Used by AI: {entry.aiUsage} times</span>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-1">
                            <span className="text-sm font-medium">{entry.rating}</span>
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <div
                                  key={i}
                                  className={`w-3 h-3 ${
                                    i < Math.floor(entry.rating) ? "text-yellow-400" : "text-slate-300"
                                  }`}
                                >
                                  ★
                                </div>
                              ))}
                            </div>
                          </div>
                          <span className="text-xs text-slate-500">
                            Published {new Date(entry.publishedAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>AI Usage Statistics</CardTitle>
                    <CardDescription>How often AI uses knowledge base entries</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Total AI References</span>
                        <span className="text-lg font-bold text-slate-900">1,247</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Success Rate Improvement</span>
                        <span className="text-lg font-bold text-green-600">+12.3%</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Most Referenced Entry</span>
                        <span className="text-sm font-medium text-slate-900">Database Connection Pooling</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Content Performance</CardTitle>
                    <CardDescription>User engagement with knowledge base</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Average Rating</span>
                        <span className="text-lg font-bold text-yellow-600">{kbStats.avgRating}★</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Total Views</span>
                        <span className="text-lg font-bold text-purple-600">{kbStats.totalViews.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-600">Avg. Time on Page</span>
                        <span className="text-lg font-bold text-slate-900">4m 32s</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="contributors" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Top Contributors</CardTitle>
                  <CardDescription>Developers who contribute the most valuable content</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {["John Smith", "Sarah Wilson", "Mike Johnson"].map((contributor, index) => (
                      <div
                        key={contributor}
                        className="flex items-center justify-between p-3 border border-slate-200 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <h4 className="font-medium text-slate-900">{contributor}</h4>
                            <p className="text-sm text-slate-600">Senior Full-Stack Developer</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium text-slate-900">{23 - index * 5} contributions</p>
                          <p className="text-sm text-slate-600">4.{9 - index} avg rating</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  )
}
