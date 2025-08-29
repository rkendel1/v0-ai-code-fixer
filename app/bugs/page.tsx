import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Clock, CheckCircle, AlertCircle, User, Bot } from "lucide-react"

const mockBugs = [
  {
    id: "BUG-001",
    title: "Login form not submitting",
    app: "E-commerce Store",
    status: "ai-analyzing",
    priority: "high",
    createdAt: "2024-01-15",
    techStack: "React + Next.js",
    description: "Users can't log in, form submission fails silently",
  },
  {
    id: "BUG-002",
    title: "Mobile navigation menu broken",
    app: "Portfolio Website",
    status: "ai-fixed",
    priority: "medium",
    createdAt: "2024-01-14",
    techStack: "Vue + Nuxt",
    description: "Hamburger menu doesn't open on mobile devices",
  },
  {
    id: "BUG-003",
    title: "Database connection timeout",
    app: "Task Manager",
    status: "human-review",
    priority: "critical",
    createdAt: "2024-01-13",
    techStack: "React + Next.js",
    description: "App crashes when trying to save tasks",
  },
]

const statusConfig = {
  submitted: { label: "Submitted", color: "bg-slate-100 text-slate-800", icon: Clock },
  "ai-analyzing": { label: "AI Analyzing", color: "bg-blue-100 text-blue-800", icon: Bot },
  "ai-fixed": { label: "AI Fixed", color: "bg-green-100 text-green-800", icon: CheckCircle },
  "human-review": { label: "Human Review", color: "bg-orange-100 text-orange-800", icon: User },
  completed: { label: "Completed", color: "bg-green-100 text-green-800", icon: CheckCircle },
  failed: { label: "Failed", color: "bg-red-100 text-red-800", icon: AlertCircle },
}

const priorityConfig = {
  low: "bg-slate-100 text-slate-800",
  medium: "bg-yellow-100 text-yellow-800",
  high: "bg-orange-100 text-orange-800",
  critical: "bg-red-100 text-red-800",
}

export default function BugsPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Your Bug Reports</h1>
              <p className="text-slate-600">Track the status of your submitted bugs</p>
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700">Submit New Bug</Button>
          </div>

          {/* Filters */}
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <Input placeholder="Search bugs..." className="pl-10" />
                  </div>
                </div>
                <Select>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="submitted">Submitted</SelectItem>
                    <SelectItem value="ai-analyzing">AI Analyzing</SelectItem>
                    <SelectItem value="ai-fixed">AI Fixed</SelectItem>
                    <SelectItem value="human-review">Human Review</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full md:w-48">
                    <SelectValue placeholder="Filter by priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priority</SelectItem>
                    <SelectItem value="critical">Critical</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="low">Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Bug List */}
          <div className="space-y-4">
            {mockBugs.map((bug) => {
              const StatusIcon = statusConfig[bug.status as keyof typeof statusConfig].icon
              return (
                <Card key={bug.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-slate-900">{bug.title}</h3>
                          <Badge variant="outline" className="text-xs">
                            {bug.id}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-600 mb-3">{bug.description}</p>
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <span>App: {bug.app}</span>
                          <span>•</span>
                          <span>{bug.techStack}</span>
                          <span>•</span>
                          <span>Created: {bug.createdAt}</span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <Badge className={statusConfig[bug.status as keyof typeof statusConfig].color}>
                          <StatusIcon className="h-3 w-3 mr-1" />
                          {statusConfig[bug.status as keyof typeof statusConfig].label}
                        </Badge>
                        <Badge
                          variant="outline"
                          className={priorityConfig[bug.priority as keyof typeof priorityConfig]}
                        >
                          {bug.priority.toUpperCase()}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        {bug.status === "ai-fixed" && (
                          <Button size="sm" className="bg-green-600 hover:bg-green-700">
                            Download Fix
                          </Button>
                        )}
                        {bug.status === "human-review" && (
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Approve Human Fix ($49)
                          </Button>
                        )}
                      </div>
                      <div className="text-xs text-slate-400">Last updated: 2 hours ago</div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}
