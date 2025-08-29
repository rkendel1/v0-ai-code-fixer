import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, BookOpen, Code2, Star, TrendingUp, Filter, Eye } from "lucide-react"
import { KnowledgeBaseAIQuery } from "@/components/knowledge-base-ai-query"

const knowledgeBaseStats = {
  totalEntries: 2847,
  categoriesCount: 12,
  avgRating: 4.6,
  recentlyAdded: 23,
  mostUsedSolutions: 156,
}

const categories = [
  { name: "Authentication Issues", count: 342, color: "bg-blue-100 text-blue-800" },
  { name: "CSS/Styling Problems", count: 298, color: "bg-green-100 text-green-800" },
  { name: "API Integration", count: 267, color: "bg-purple-100 text-purple-800" },
  { name: "Database Errors", count: 189, color: "bg-orange-100 text-orange-800" },
  { name: "Form Validation", count: 156, color: "bg-red-100 text-red-800" },
  { name: "Mobile Responsive", count: 134, color: "bg-yellow-100 text-yellow-800" },
  { name: "Performance Issues", count: 98, color: "bg-indigo-100 text-indigo-800" },
  { name: "Deployment Problems", count: 87, color: "bg-pink-100 text-pink-800" },
]

const recentSolutions = [
  {
    id: "KB-001",
    title: "Database Connection Pooling Implementation",
    category: "Database Errors",
    techStack: ["React", "Next.js", "PostgreSQL"],
    difficulty: "Advanced",
    rating: 4.9,
    views: 234,
    addedAt: "2024-01-15",
    summary: "Complete guide to implementing connection pooling to prevent database timeout errors",
    tags: ["database", "connection-pooling", "timeout", "postgresql"],
  },
  {
    id: "KB-002",
    title: "Stripe Webhook Validation Fix",
    category: "API Integration",
    techStack: ["React", "Next.js", "Stripe"],
    difficulty: "Intermediate",
    rating: 4.7,
    views: 189,
    addedAt: "2024-01-14",
    summary: "How to properly validate Stripe webhooks and handle payment processing errors",
    tags: ["stripe", "webhooks", "payment", "validation"],
  },
  {
    id: "KB-003",
    title: "Mobile Navigation Menu Fix",
    category: "CSS/Styling Problems",
    techStack: ["Vue", "Nuxt", "CSS"],
    difficulty: "Beginner",
    rating: 4.5,
    views: 156,
    addedAt: "2024-01-13",
    summary: "Fixing hamburger menu issues on mobile devices with proper CSS and JavaScript",
    tags: ["mobile", "navigation", "css", "responsive"],
  },
  {
    id: "KB-004",
    title: "JWT Authentication Implementation",
    category: "Authentication Issues",
    techStack: ["React", "Node.js", "JWT"],
    difficulty: "Intermediate",
    rating: 4.8,
    views: 298,
    addedAt: "2024-01-12",
    summary: "Complete JWT authentication setup with refresh tokens and secure storage",
    tags: ["jwt", "authentication", "security", "tokens"],
  },
]

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-red-100 text-red-800",
}

export default function KnowledgeBasePage() {
  const isSubscriber = true // This would come from user context/auth
  const remainingQueries = 3 // For free users

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-2">Knowledge Base</h1>
              <p className="text-slate-600">Explore solutions and learn from our community of developers</p>
            </div>
            <div className="flex items-center gap-2">
              <Badge className="bg-blue-100 text-blue-800">
                {knowledgeBaseStats.totalEntries.toLocaleString()} Solutions
              </Badge>
              <Button className="bg-blue-600 hover:bg-blue-700">
                <BookOpen className="h-4 w-4 mr-2" />
                Contribute Solution
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Total Solutions</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {knowledgeBaseStats.totalEntries.toLocaleString()}
                    </p>
                  </div>
                  <BookOpen className="h-8 w-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Categories</p>
                    <p className="text-2xl font-bold text-slate-900">{knowledgeBaseStats.categoriesCount}</p>
                  </div>
                  <Filter className="h-8 w-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Avg Rating</p>
                    <p className="text-2xl font-bold text-yellow-600">{knowledgeBaseStats.avgRating}★</p>
                  </div>
                  <Star className="h-8 w-8 text-yellow-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-600">Added This Week</p>
                    <p className="text-2xl font-bold text-purple-600">+{knowledgeBaseStats.recentlyAdded}</p>
                  </div>
                  <TrendingUp className="h-8 w-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>

          <Tabs defaultValue="browse" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="browse">Browse Solutions</TabsTrigger>
              <TabsTrigger value="ai-query">AI Query</TabsTrigger>
              <TabsTrigger value="categories">Categories</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>

            <TabsContent value="ai-query" className="space-y-6">
              <KnowledgeBaseAIQuery isSubscriber={isSubscriber} remainingQueries={remainingQueries} />
            </TabsContent>

            <TabsContent value="browse" className="space-y-6">
              {/* Search and Filters */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                        <Input placeholder="Search solutions..." className="pl-10" />
                      </div>
                    </div>
                    <Select>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Categories</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category.name} value={category.name.toLowerCase()}>
                            {category.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Tech Stack" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Tech Stacks</SelectItem>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="vue">Vue</SelectItem>
                        <SelectItem value="svelte">Svelte</SelectItem>
                        <SelectItem value="nextjs">Next.js</SelectItem>
                        <SelectItem value="nuxt">Nuxt</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select>
                      <SelectTrigger className="w-full md:w-48">
                        <SelectValue placeholder="Difficulty" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Levels</SelectItem>
                        <SelectItem value="beginner">Beginner</SelectItem>
                        <SelectItem value="intermediate">Intermediate</SelectItem>
                        <SelectItem value="advanced">Advanced</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardContent>
              </Card>

              {/* Solutions List */}
              <div className="space-y-4">
                {recentSolutions.map((solution) => (
                  <Card key={solution.id} className="hover:shadow-md transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="font-semibold text-slate-900">{solution.title}</h3>
                            <Badge variant="outline">{solution.id}</Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-3">{solution.summary}</p>
                          <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
                            <span>Category: {solution.category}</span>
                            <span>•</span>
                            <span>Added: {solution.addedAt}</span>
                            <span>•</span>
                            <span>{solution.views} views</span>
                          </div>
                          <div className="flex flex-wrap gap-1">
                            {solution.tags.map((tag) => (
                              <Badge key={tag} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className="text-sm font-medium">{solution.rating}</span>
                          </div>
                          <Badge className={difficultyColors[solution.difficulty as keyof typeof difficultyColors]}>
                            {solution.difficulty}
                          </Badge>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {solution.techStack.map((tech) => (
                              <Badge key={tech} variant="outline" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                        <div className="flex items-center gap-2">
                          <Code2 className="h-4 w-4 text-slate-400" />
                          <span className="text-sm text-slate-600">{solution.techStack.join(", ")} solution</span>
                        </div>
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View Solution
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="categories" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.map((category) => (
                  <Card key={category.name} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardContent className="pt-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-slate-900">{category.name}</h3>
                        <Badge className={category.color}>{category.count}</Badge>
                      </div>
                      <p className="text-sm text-slate-600 mb-4">
                        Browse {category.count} solutions for {category.name.toLowerCase()}
                      </p>
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Explore Category
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="trending" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Most Viewed This Week</CardTitle>
                    <CardDescription>Popular solutions developers are reading</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentSolutions
                        .sort((a, b) => b.views - a.views)
                        .slice(0, 3)
                        .map((solution, index) => (
                          <div key={solution.id} className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-900 text-sm">{solution.title}</h4>
                              <p className="text-xs text-slate-600">{solution.views} views</p>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {solution.category}
                            </Badge>
                          </div>
                        ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Highest Rated</CardTitle>
                    <CardDescription>Top-quality solutions from our community</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentSolutions
                        .sort((a, b) => b.rating - a.rating)
                        .slice(0, 3)
                        .map((solution, index) => (
                          <div key={solution.id} className="flex items-center gap-3">
                            <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                              {index + 1}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-slate-900 text-sm">{solution.title}</h4>
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                <span className="text-xs text-slate-600">{solution.rating}</span>
                              </div>
                            </div>
                            <Badge variant="outline" className="text-xs">
                              {solution.difficulty}
                            </Badge>
                          </div>
                        ))}
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
