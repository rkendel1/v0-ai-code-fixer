import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ArrowLeft, Bot, CheckCircle, Clock, MessageSquare, Github, Globe } from "lucide-react"
import Link from "next/link"

// Mock data for a specific bug
const bugDetails = {
  id: "BUG-001",
  title: "Login form not submitting",
  app: "E-commerce Store",
  status: "ai-analyzing",
  priority: "high",
  createdAt: "2024-01-15T10:30:00Z",
  updatedAt: "2024-01-15T14:22:00Z",
  techStack: "React + Next.js",
  repoUrl: "https://github.com/user/ecommerce-store",
  liveUrl: "https://mystore.vercel.app",
  description:
    "Users can't log in to their accounts. The login form appears to submit but nothing happens. No error messages are shown to the user.",
  stepsToReproduce:
    "1. Go to /login page\n2. Enter valid email and password\n3. Click 'Sign In' button\n4. Form doesn't submit, no feedback given",
  browser: "Chrome 120, Firefox 121",
  aiAnalysis: {
    status: "in-progress",
    findings: [
      "Form submission handler missing preventDefault()",
      "API endpoint /api/auth/login returns 500 error",
      "Missing error handling in login component",
    ],
    confidence: 85,
    estimatedFixTime: "15 minutes",
  },
  timeline: [
    {
      timestamp: "2024-01-15T10:30:00Z",
      type: "submitted",
      title: "Bug Report Submitted",
      description: "User submitted bug report with detailed information",
    },
    {
      timestamp: "2024-01-15T10:32:00Z",
      type: "ai-started",
      title: "AI Analysis Started",
      description: "Automated analysis of codebase and error patterns initiated",
    },
    {
      timestamp: "2024-01-15T14:22:00Z",
      type: "ai-progress",
      title: "Issues Identified",
      description: "AI found 3 potential issues in the authentication flow",
    },
  ],
}

export default function BugDetailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/bugs">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Bugs
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900">{bugDetails.title}</h1>
              <p className="text-slate-600">
                {bugDetails.app} • {bugDetails.id}
              </p>
            </div>
            <div className="flex gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                <Bot className="h-3 w-3 mr-1" />
                AI Analyzing
              </Badge>
              <Badge variant="outline" className="bg-orange-100 text-orange-800">
                HIGH
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Bug Details */}
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
                      <span className="font-medium text-slate-900">Browser:</span>
                      <p className="text-slate-700">{bugDetails.browser}</p>
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

              {/* AI Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bot className="h-5 w-5 text-blue-600" />
                    AI Analysis
                  </CardTitle>
                  <CardDescription>Our AI is analyzing your code and identifying potential fixes</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent"></div>
                      <span className="text-sm font-medium text-blue-900">Analysis in progress...</span>
                    </div>
                    <Badge variant="secondary">{bugDetails.aiAnalysis.confidence}% confidence</Badge>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-900 mb-2">Issues Identified</h4>
                    <ul className="space-y-2">
                      {bugDetails.aiAnalysis.findings.map((finding, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-700">{finding}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-sm text-slate-600">
                    <strong>Estimated fix time:</strong> {bugDetails.aiAnalysis.estimatedFixTime}
                  </div>
                </CardContent>
              </Card>

              {/* Comments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Comments & Updates
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-slate-900">Vibe Fix AI</span>
                          <span className="text-xs text-slate-500">2 hours ago</span>
                        </div>
                        <p className="text-sm text-slate-700">
                          I've identified the main issue in your login form. The form submission is missing proper error
                          handling. I'm preparing a fix now.
                        </p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Add a comment</label>
                    <Textarea placeholder="Ask questions or provide additional context..." />
                    <Button size="sm">Post Comment</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Status Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Progress Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {bugDetails.timeline.map((event, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="flex flex-col items-center">
                          <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                          {index < bugDetails.timeline.length - 1 && <div className="w-px h-8 bg-slate-200 mt-2"></div>}
                        </div>
                        <div className="flex-1 pb-4">
                          <h4 className="font-medium text-slate-900 text-sm">{event.title}</h4>
                          <p className="text-xs text-slate-600 mb-1">{event.description}</p>
                          <p className="text-xs text-slate-400">{new Date(event.timestamp).toLocaleString()}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full" disabled>
                    <Clock className="h-4 w-4 mr-2" />
                    Waiting for AI Fix
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Request Human Review ($49)
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    Cancel Request
                  </Button>
                </CardContent>
              </Card>

              {/* Pricing Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pricing</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>AI Analysis & Fix:</span>
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      FREE
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span>Human Developer Fix:</span>
                    <Badge variant="outline">$49</Badge>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    You're on the Pro plan. Human fixes are discounted from $99 to $49.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
