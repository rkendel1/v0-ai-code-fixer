"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, Sparkles, Code2, BookOpen, Star, ArrowRight } from "lucide-react"

interface QueryResult {
  id: string
  title: string
  summary: string
  relevanceScore: number
  category: string
  codeExample?: string
  tags: string[]
  difficulty: "Beginner" | "Intermediate" | "Advanced"
}

interface AIQueryProps {
  isSubscriber: boolean
  remainingQueries?: number
}

export function KnowledgeBaseAIQuery({ isSubscriber, remainingQueries = 0 }: AIQueryProps) {
  const [query, setQuery] = useState("")
  const [codeContext, setCodeContext] = useState("")
  const [isQuerying, setIsQuerying] = useState(false)
  const [results, setResults] = useState<QueryResult[]>([])
  const [aiSummary, setAiSummary] = useState("")

  const handleAIQuery = async () => {
    if (!query.trim()) return

    setIsQuerying(true)

    // Simulate AI-powered knowledge base search
    setTimeout(() => {
      const mockResults: QueryResult[] = [
        {
          id: "KB-089",
          title: "Authentication State Management with Context",
          summary:
            "Complete implementation of authentication state using React Context with TypeScript, including login persistence and automatic token refresh.",
          relevanceScore: 0.94,
          category: "Authentication Issues",
          codeExample: `const AuthContext = createContext<AuthContextType | null>(null)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    if (token) {
      validateToken(token).then(setUser)
    }
    setIsLoading(false)
  }, [])

  return (
    <AuthContext.Provider value={{ user, setUser, isLoading }}>
      {children}
    </AuthContext.Provider>
  )
}`,
          tags: ["authentication", "context", "typescript", "react"],
          difficulty: "Intermediate",
        },
        {
          id: "KB-156",
          title: "Form Validation with Zod and React Hook Form",
          summary:
            "Robust form validation setup using Zod schemas with React Hook Form, including custom error messages and async validation.",
          relevanceScore: 0.87,
          category: "Form Validation",
          codeExample: `const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters")
})

const { register, handleSubmit, formState: { errors } } = useForm({
  resolver: zodResolver(loginSchema)
})`,
          tags: ["validation", "zod", "react-hook-form", "forms"],
          difficulty: "Intermediate",
        },
        {
          id: "KB-203",
          title: "Next.js API Route Error Handling Best Practices",
          summary:
            "Comprehensive error handling patterns for Next.js API routes with proper HTTP status codes and error logging.",
          relevanceScore: 0.82,
          category: "API Integration",
          codeExample: `export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Validate input
    const result = schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: "Invalid input", details: result.error.issues },
        { status: 400 }
      )
    }
    
    // Process request
    const data = await processData(result.data)
    return NextResponse.json(data)
    
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}`,
          tags: ["nextjs", "api", "error-handling", "typescript"],
          difficulty: "Advanced",
        },
      ]

      setResults(mockResults)
      setAiSummary(
        `Based on your query about "${query}", I found ${mockResults.length} highly relevant solutions in our knowledge base. The top match shows a ${Math.round(mockResults[0].relevanceScore * 100)}% relevance score. These solutions cover authentication patterns, form validation, and API error handling - all common issues in modern web applications.`,
      )
      setIsQuerying(false)
    }, 3000)
  }

  const canQuery = isSubscriber || remainingQueries > 0

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          AI-Powered Knowledge Base Query
          {!isSubscriber && (
            <Badge variant="outline" className="ml-auto">
              {remainingQueries} queries left
            </Badge>
          )}
        </CardTitle>
        <CardDescription>
          {isSubscriber
            ? "Ask our AI to find the most relevant solutions from our knowledge base"
            : `Free users get ${remainingQueries} AI queries. Upgrade for unlimited access.`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Describe your issue or question</label>
            <Textarea
              placeholder="e.g., 'My login form isn't working properly, users can't authenticate and I'm getting 401 errors'"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="min-h-[80px]"
              disabled={!canQuery}
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700">Code context (optional)</label>
            <Textarea
              placeholder="Paste relevant code snippets or error messages here..."
              value={codeContext}
              onChange={(e) => setCodeContext(e.target.value)}
              className="min-h-[100px] font-mono text-sm"
              disabled={!canQuery}
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={handleAIQuery}
              disabled={!canQuery || !query.trim() || isQuerying}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isQuerying ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 mr-2" />
                  Query Knowledge Base
                </>
              )}
            </Button>

            {!isSubscriber && remainingQueries === 0 && (
              <Button variant="outline" className="border-blue-200 text-blue-600 bg-transparent">
                <ArrowRight className="h-4 w-4 mr-2" />
                Upgrade for Unlimited Queries
              </Button>
            )}
          </div>

          {aiSummary && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <div className="flex items-start gap-2">
                <Bot className="h-5 w-5 text-blue-600 mt-0.5 flex-shrink-0" />
                <div>
                  <h4 className="font-medium text-blue-900 mb-1">AI Analysis</h4>
                  <p className="text-sm text-blue-800">{aiSummary}</p>
                </div>
              </div>
            </div>
          )}

          {results.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-semibold text-slate-900">Search Results</h3>
              <div className="space-y-3">
                {results.map((result) => (
                  <Card key={result.id} className="border-slate-200 hover:shadow-md transition-shadow">
                    <CardContent className="pt-4">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-medium text-slate-900">{result.title}</h4>
                            <Badge variant="outline" className="text-xs">
                              {Math.round(result.relevanceScore * 100)}% match
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{result.summary}</p>
                          <div className="flex items-center gap-2 text-xs text-slate-500">
                            <span>{result.category}</span>
                            <span>•</span>
                            <span>{result.difficulty}</span>
                            <span>•</span>
                            <span>{result.tags.join(", ")}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 ml-4">
                          <Star className="h-4 w-4 text-yellow-400 fill-current" />
                          <span className="text-sm font-medium">{(4.2 + result.relevanceScore * 0.8).toFixed(1)}</span>
                        </div>
                      </div>

                      {result.codeExample && (
                        <div className="mb-3">
                          <div className="flex items-center gap-2 mb-2">
                            <Code2 className="h-4 w-4 text-slate-400" />
                            <span className="text-sm font-medium text-slate-700">Code Example</span>
                          </div>
                          <ScrollArea className="h-32 w-full">
                            <pre className="text-xs text-slate-700 whitespace-pre-wrap bg-slate-50 p-3 rounded border">
                              {result.codeExample}
                            </pre>
                          </ScrollArea>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                        <div className="flex gap-1">
                          {result.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <Button variant="outline" size="sm">
                          <BookOpen className="h-4 w-4 mr-2" />
                          View Full Solution
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
