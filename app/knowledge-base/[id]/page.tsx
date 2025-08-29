import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ArrowLeft, Star, Eye, ThumbsUp, ThumbsDown, Copy, Download, Share } from "lucide-react"
import Link from "next/link"

// Mock solution data
const solutionDetails = {
  id: "KB-001",
  title: "Database Connection Pooling Implementation",
  category: "Database Errors",
  techStack: ["React", "Next.js", "PostgreSQL"],
  difficulty: "Advanced",
  rating: 4.9,
  views: 234,
  likes: 89,
  addedAt: "2024-01-15",
  author: "John Smith",
  authorRole: "Senior Full-Stack Developer",
  summary: "Complete guide to implementing connection pooling to prevent database timeout errors",
  tags: ["database", "connection-pooling", "timeout", "postgresql"],
  problem: `Database connections are timing out after 30 seconds, causing the application to crash when trying to save data. This happens more frequently during peak hours when there are multiple concurrent users.

The issue occurs because:
1. Each request creates a new database connection
2. Connections are not being properly closed
3. The database server reaches its connection limit
4. No retry mechanism exists for failed connections`,
  solution: `The solution involves implementing proper connection pooling and retry logic:

1. **Install pg-pool package**
   \`npm install pg-pool\`

2. **Create a connection pool configuration**
   Configure the pool with appropriate limits and timeouts.

3. **Implement retry logic**
   Add exponential backoff for failed connections.

4. **Update database queries**
   Use the pool instead of creating new connections.

5. **Add proper error handling**
   Gracefully handle connection failures and timeouts.`,
  codeExample: `// lib/db-pool.ts
import { Pool } from 'pg-pool'

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20, // Maximum number of connections
  idleTimeoutMillis: 30000, // Close idle connections after 30 seconds
  connectionTimeoutMillis: 2000, // Return error after 2 seconds if connection could not be established
  maxUses: 7500, // Close connection after 7500 queries (optional)
})

// Retry logic with exponential backoff
export async function queryWithRetry(text: string, params?: any[], maxRetries = 3) {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      const client = await pool.connect()
      try {
        const result = await client.query(text, params)
        return result
      } finally {
        client.release()
      }
    } catch (error) {
      console.error(\`Database query attempt \${attempt} failed:\`, error)
      
      if (attempt === maxRetries) {
        throw error
      }
      
      // Exponential backoff: wait 2^attempt * 100ms
      const delay = Math.pow(2, attempt) * 100
      await new Promise(resolve => setTimeout(resolve, delay))
    }
  }
}

// Usage in API routes
export async function createTask(title: string, description: string) {
  const query = 'INSERT INTO tasks (title, description, created_at) VALUES ($1, $2, NOW()) RETURNING *'
  const result = await queryWithRetry(query, [title, description])
  return result.rows[0]
}`,
  testing: `To test the implementation:

1. **Load Testing**
   Use tools like Artillery or k6 to simulate concurrent users
   
2. **Connection Monitoring**
   Monitor active connections in your database dashboard
   
3. **Error Logging**
   Implement proper logging to track connection failures
   
4. **Health Checks**
   Add database health check endpoints

Example health check:
\`\`\`typescript
// app/api/health/db/route.ts
export async function GET() {
  try {
    await queryWithRetry('SELECT 1')
    return Response.json({ status: 'healthy' })
  } catch (error) {
    return Response.json({ status: 'unhealthy', error: error.message }, { status: 500 })
  }
}
\`\`\``,
  relatedSolutions: [
    { id: "KB-005", title: "PostgreSQL Performance Optimization", category: "Database Errors" },
    { id: "KB-012", title: "Handling Database Migrations", category: "Database Errors" },
    { id: "KB-023", title: "Redis Caching Implementation", category: "Performance Issues" },
  ],
}

const difficultyColors = {
  Beginner: "bg-green-100 text-green-800",
  Intermediate: "bg-yellow-100 text-yellow-800",
  Advanced: "bg-red-100 text-red-800",
}

export default function SolutionDetailPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Link href="/knowledge-base">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Knowledge Base
              </Button>
            </Link>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-slate-900">{solutionDetails.title}</h1>
              <p className="text-slate-600">
                {solutionDetails.category} • Added {new Date(solutionDetails.addedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Share className="h-4 w-4 mr-2" />
                Share
              </Button>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-3 space-y-6">
              {/* Overview */}
              <Card>
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="mb-2">{solutionDetails.title}</CardTitle>
                      <CardDescription>{solutionDetails.summary}</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 text-yellow-400 fill-current" />
                        <span className="font-medium">{solutionDetails.rating}</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500">
                        <Eye className="h-4 w-4" />
                        <span className="text-sm">{solutionDetails.views}</span>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {solutionDetails.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                  <div className="flex items-center gap-4 text-sm text-slate-600">
                    <span>By {solutionDetails.author}</span>
                    <span>•</span>
                    <span>{solutionDetails.authorRole}</span>
                    <span>•</span>
                    <Badge className={difficultyColors[solutionDetails.difficulty as keyof typeof difficultyColors]}>
                      {solutionDetails.difficulty}
                    </Badge>
                  </div>
                </CardContent>
              </Card>

              {/* Problem Description */}
              <Card>
                <CardHeader>
                  <CardTitle>Problem Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-slate max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-slate-700 bg-slate-50 p-4 rounded-lg">
                      {solutionDetails.problem}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Solution */}
              <Card>
                <CardHeader>
                  <CardTitle>Solution</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-slate max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-slate-700 bg-slate-50 p-4 rounded-lg mb-4">
                      {solutionDetails.solution}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Code Example */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle>Code Implementation</CardTitle>
                    <Button variant="outline" size="sm">
                      <Copy className="h-4 w-4 mr-2" />
                      Copy Code
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <ScrollArea className="h-96 w-full">
                    <pre className="text-xs text-slate-700 whitespace-pre-wrap bg-slate-900 text-slate-100 p-4 rounded-lg">
                      {solutionDetails.codeExample}
                    </pre>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Testing */}
              <Card>
                <CardHeader>
                  <CardTitle>Testing & Verification</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="prose prose-slate max-w-none">
                    <pre className="whitespace-pre-wrap text-sm text-slate-700 bg-slate-50 p-4 rounded-lg">
                      {solutionDetails.testing}
                    </pre>
                  </div>
                </CardContent>
              </Card>

              {/* Feedback */}
              <Card>
                <CardHeader>
                  <CardTitle>Was this solution helpful?</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-4 mb-4">
                    <Button variant="outline" size="sm">
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Helpful ({solutionDetails.likes})
                    </Button>
                    <Button variant="outline" size="sm">
                      <ThumbsDown className="h-4 w-4 mr-2" />
                      Not Helpful
                    </Button>
                  </div>
                  <Separator className="my-4" />
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-900">Add a comment or suggestion</label>
                    <Textarea placeholder="Share your experience with this solution..." />
                    <Button size="sm">Post Comment</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Info</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div>
                    <span className="text-sm font-medium text-slate-900">Category:</span>
                    <p className="text-sm text-slate-700">{solutionDetails.category}</p>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-900">Difficulty:</span>
                    <Badge className={difficultyColors[solutionDetails.difficulty as keyof typeof difficultyColors]}>
                      {solutionDetails.difficulty}
                    </Badge>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-900">Tech Stack:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {solutionDetails.techStack.map((tech) => (
                        <Badge key={tech} variant="outline" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <span className="text-sm font-medium text-slate-900">Views:</span>
                    <p className="text-sm text-slate-700">{solutionDetails.views}</p>
                  </div>
                </CardContent>
              </Card>

              {/* Related Solutions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Related Solutions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {solutionDetails.relatedSolutions.map((related) => (
                      <div
                        key={related.id}
                        className="p-3 border border-slate-200 rounded-lg hover:bg-slate-50 cursor-pointer"
                      >
                        <h4 className="font-medium text-slate-900 text-sm mb-1">{related.title}</h4>
                        <p className="text-xs text-slate-600">{related.category}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Author Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">About the Author</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <h4 className="font-medium text-slate-900">{solutionDetails.author}</h4>
                    <p className="text-sm text-slate-600">{solutionDetails.authorRole}</p>
                    <p className="text-xs text-slate-500">Contributed 23 solutions to the knowledge base</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
