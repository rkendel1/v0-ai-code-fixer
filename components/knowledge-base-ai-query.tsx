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
    setResults([])
    setAiSummary("")

    try {
      // Make real API call to knowledge base search
      const response = await fetch('/api/knowledge-base/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `${query} ${codeContext}`.trim(),
          type: 'hybrid', // Use hybrid search for best results
        }),
      });

      if (!response.ok) {
        throw new Error('Search failed');
      }

      const searchData = await response.json();
      
      // Transform API results to match component interface
      const transformedResults: QueryResult[] = searchData.results.map((result: any) => ({
        id: result.id,
        title: result.title,
        summary: result.content || result.summary || '',
        relevanceScore: result.similarity || result.relevanceScore || 0.7,
        category: result.category || 'General',
        codeExample: result.codeExample || '',
        tags: result.tags || result.techStack || [],
        difficulty: result.difficulty || 'Intermediate',
      }));

      setResults(transformedResults);
      
      // Generate AI summary based on real results
      if (transformedResults.length > 0) {
        const topScore = Math.round((transformedResults[0]?.relevanceScore || 0) * 100);
        const categories = [...new Set(transformedResults.map(r => r.category))].slice(0, 3);
        
        setAiSummary(
          `Found ${transformedResults.length} relevant solutions for "${query}". The top match has a ${topScore}% relevance score. Results cover ${categories.join(', ')} and related topics from our knowledge base.`
        );
      } else {
        setAiSummary(
          `No exact matches found for "${query}". Try using different keywords or check our general documentation for similar topics.`
        );
      }
    } catch (error) {
      console.error('Knowledge base search error:', error);
      setAiSummary(
        `Sorry, there was an error searching the knowledge base. Please try again or contact support if the issue persists.`
      );
    } finally {
      setIsQuerying(false);
    }
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
