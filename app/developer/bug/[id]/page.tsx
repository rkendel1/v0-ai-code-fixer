import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Github, Globe, MessageSquare, Upload, CheckCircle, Clock, DollarSign } from "lucide-react"
import Link from "next/link"

// Mock bug data
const bugDetails = {
  id: "BUG-003",
  title: "Database connection timeout",
  app: "Task Manager",
  priority: "critical",
  techStack: "React + Next.js",
  submittedAt: "2024-01-13T10:30:00Z",
  assignedAt: "2024-01-15T09:15:00Z",
  aiConfidence: 45,
  userPlan: "pro",
  payout: 49,
  complexity: "high",
  estimatedHours: 3,
  repoUrl: "https://github.com/user/task-manager",
  liveUrl: "https://taskmanager.vercel.app",
  description:
    "App crashes when trying to save tasks. Database connection times out after 30 seconds. Users lose their work and get frustrated. This happens intermittently but more frequently during peak hours.",
  stepsToReproduce:
    "1. Create a new task with detailed description\n2. Click 'Save Task' button\n3. Wait for 30+ seconds\n4. App shows timeout error\n5. Task is not saved",
  aiFindings: [
    "Custom ORM implementation causing connection leaks",
    "Missing connection pooling configuration",
    "Inefficient query patterns detected",
    "No retry mechanism for failed connections",
  ],
  userInfo: {
    name: "Sarah Johnson",
    email: "sarah@example.com",
    plan: "pro",
    timezone: "EST",
  },
}

export default function DeveloperBugDetailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/developer">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900">{bugDetails.title}</h1>
              <p className="text-slate-600">
                {bugDetails.app} • {bugDetails.id} • Assigned {new Date(bugDetails.assignedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-red-100 text-red-800">CRITICAL</Badge>
              <Badge className="bg-green-100 text-green-800">${bugDetails.payout}</Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="details">Bug Details</TabsTrigger>
                  <TabsTrigger value="analysis">AI Analysis</TabsTrigger>
                  <TabsTrigger value="solution">My Solution</TabsTrigger>
                  <TabsTrigger value="communication">Chat</TabsTrigger>
                </TabsList>

                <TabsContent value="details" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Bug Description</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Description</h4>
                        <p className="text-slate-700">{bugDetails.description}</p>
                      </div>

                      <div>
                        <h4 className="font-medium text-slate-900 mb-2">Steps to Reproduce</h4>
                        <pre className="text-sm text-slate-700 whitespace-pre-wrap bg-slate-50 p-3 rounded-md">
                          {bugDetails.stepsToReproduce}
                        </pre>
                      </div>

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="font-medium text-slate-900">Tech Stack:</span>
                          <p className="text-slate-700">{bugDetails.techStack}</p>
                        </div>
                        <div>
                          <span className="font-medium text-slate-900">Complexity:</span>
                          <p className="text-slate-700 capitalize">{bugDetails.complexity}</p>
                        </div>
                      </div>

                      <div className="flex gap-4">
                        <Button variant="outline" size="sm">
                          <Github className="h-4 w-4 mr-2" />
                          View Repository
                        </Button>
                        <Button variant="outline" size="sm">
                          <Globe className="h-4 w-4 mr-2" />
                          View Live Site
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="analysis" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>AI Analysis Results</CardTitle>
                      <CardDescription>
                        AI confidence: {bugDetails.aiConfidence}% - Requires human expertise
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                        <p className="text-sm text-orange-800">
                          <strong>AI Assessment:</strong> This issue involves complex database architecture that
                          requires human expertise to properly diagnose and fix.
                        </p>
                      </div>

                      <div>
                        <h4 className="font-medium text-slate-900 mb-3">Issues Identified by AI</h4>
                        <div className="space-y-2">
                          {bugDetails.aiFindings.map((finding, index) => (
                            <div key={index} className="flex items-start gap-2 p-2 bg-slate-50 rounded">
                              <CheckCircle className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                              <span className="text-sm text-slate-700">{finding}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="text-sm text-slate-600">
                        <strong>Recommended approach:</strong> Review database connection configuration, implement
                        connection pooling, and add proper error handling with retry mechanisms.
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="solution" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Provide Your Solution</CardTitle>
                      <CardDescription>Document your fix and add it to the knowledge base</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="solution-summary">Solution Summary</Label>
                        <Input
                          id="solution-summary"
                          placeholder="Brief description of your fix (e.g., 'Implemented connection pooling and retry logic')"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="solution-details">Detailed Solution</Label>
                        <Textarea
                          id="solution-details"
                          placeholder="Explain your solution in detail. This will be added to the knowledge base to help AI fix similar issues in the future."
                          className="min-h-32"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="code-changes">Code Changes</Label>
                        <Textarea
                          id="code-changes"
                          placeholder="Paste the key code changes you made..."
                          className="min-h-24 font-mono text-sm"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="testing-notes">Testing & Verification</Label>
                        <Textarea
                          id="testing-notes"
                          placeholder="How did you test the fix? What should the user verify?"
                          className="min-h-20"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Attach Files (Optional)</Label>
                        <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-400 transition-colors">
                          <Upload className="h-6 w-6 text-slate-400 mx-auto mb-2" />
                          <p className="text-sm text-slate-600">Upload screenshots, code files, or documentation</p>
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4">
                        <Button className="bg-green-600 hover:bg-green-700">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Submit Solution
                        </Button>
                        <Button variant="outline">Save Draft</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="communication" className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <MessageSquare className="h-5 w-5" />
                        Communication with User
                      </CardTitle>
                      <CardDescription>Chat with {bugDetails.userInfo.name} about this bug</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-4 max-h-64 overflow-y-auto">
                        <div className="flex gap-3">
                          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            S
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-slate-900">{bugDetails.userInfo.name}</span>
                              <span className="text-xs text-slate-500">2 hours ago</span>
                            </div>
                            <p className="text-sm text-slate-700">
                              Hi! This issue is really affecting my users. It happens most often in the evening when
                              traffic is higher. Let me know if you need any additional information.
                            </p>
                          </div>
                        </div>

                        <div className="flex gap-3">
                          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                            J
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-medium text-slate-900">John (Developer)</span>
                              <span className="text-xs text-slate-500">1 hour ago</span>
                            </div>
                            <p className="text-sm text-slate-700">
                              Thanks for the details! I'm looking into the database connection issue. Can you tell me
                              approximately how many concurrent users you have during peak hours?
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <Textarea placeholder="Type your message..." className="min-h-20" />
                        <Button size="sm">Send Message</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* User Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">User Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-slate-900">Name:</span>
                    <p className="text-sm text-slate-700">{bugDetails.userInfo.name}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-900">Email:</span>
                    <p className="text-sm text-slate-700">{bugDetails.userInfo.email}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-900">Plan:</span>
                    <Badge variant="outline" className="ml-2">
                      {bugDetails.userInfo.plan.toUpperCase()}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-900">Timezone:</span>
                    <p className="text-sm text-slate-700">{bugDetails.userInfo.timezone}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Payment Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <DollarSign className="h-4 w-4" />
                    Payment Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Base Rate:</span>
                    <span className="font-medium">${bugDetails.userPlan === "pro" ? "49" : "99"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Complexity Bonus:</span>
                    <span className="font-medium">$0</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center">
                    <span className="font-medium text-slate-900">Total Payout:</span>
                    <span className="text-lg font-bold text-green-600">${bugDetails.payout}</span>
                  </div>
                  <p className="text-xs text-slate-500">Payment processed within 24 hours of solution approval</p>
                </CardContent>
              </Card>

              {/* Time Tracking */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Time Tracking
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Estimated:</span>
                    <span className="font-medium">{bugDetails.estimatedHours}h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Time Spent:</span>
                    <span className="font-medium">1.5h</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-slate-600">Started:</span>
                    <span className="text-sm">{new Date(bugDetails.assignedAt).toLocaleDateString()}</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <Clock className="h-4 w-4 mr-2" />
                    Start Timer
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
