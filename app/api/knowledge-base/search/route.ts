import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const { query, type = "hybrid" } = await request.json()

    // Mock vector search results - in production, integrate with vector database
    const vectorResults = await performVectorSearch(query)
    const semanticResults = await performSemanticSearch(query)

    let results = []

    switch (type) {
      case "vector":
        results = vectorResults
        break
      case "semantic":
        results = semanticResults
        break
      case "hybrid":
      default:
        // Combine and rank results from both approaches
        results = combineSearchResults(vectorResults, semanticResults)
        break
    }

    return NextResponse.json({
      results,
      query,
      type,
      totalResults: results.length,
    })
  } catch (error) {
    console.error("Knowledge base search error:", error)
    return NextResponse.json({ error: "Search failed" }, { status: 500 })
  }
}

async function performVectorSearch(query: string) {
  // Mock vector search - integrate with Pinecone, Weaviate, or similar
  const mockResults = [
    {
      id: "1",
      title: "React State Management Bug",
      content: "Common issue with useState not updating immediately...",
      similarity: 0.95,
      techStack: ["React", "JavaScript"],
      category: "state-management",
    },
    {
      id: "2",
      title: "Next.js Routing Problem",
      content: "Dynamic routes not working properly in production...",
      similarity: 0.87,
      techStack: ["Next.js", "React"],
      category: "routing",
    },
  ]

  return mockResults.filter(
    (result) =>
      result.content.toLowerCase().includes(query.toLowerCase()) ||
      result.title.toLowerCase().includes(query.toLowerCase()),
  )
}

async function performSemanticSearch(query: string) {
  // Mock semantic search - integrate with OpenAI embeddings or similar
  const mockResults = [
    {
      id: "3",
      title: "Component Not Rendering",
      content: "When components fail to display, check these common causes...",
      relevanceScore: 0.92,
      techStack: ["React", "Vue.js"],
      category: "rendering",
    },
    {
      id: "4",
      title: "API Integration Issues",
      content: "Troubleshooting API calls and data fetching problems...",
      relevanceScore: 0.84,
      techStack: ["JavaScript", "Node.js"],
      category: "api",
    },
  ]

  return mockResults.filter((result) => semanticMatch(query, result.content) > 0.7)
}

function semanticMatch(query: string, content: string): number {
  // Simple semantic matching - in production use proper NLP
  const queryWords = query.toLowerCase().split(" ")
  const contentWords = content.toLowerCase().split(" ")
  const matches = queryWords.filter((word) => contentWords.includes(word))
  return matches.length / queryWords.length
}

function combineSearchResults(vectorResults: any[], semanticResults: any[]) {
  const combined = [...vectorResults, ...semanticResults]
  const unique = combined.filter((result, index, self) => index === self.findIndex((r) => r.id === result.id))

  // Sort by relevance score
  return unique.sort((a, b) => {
    const scoreA = a.similarity || a.relevanceScore || 0
    const scoreB = b.similarity || b.relevanceScore || 0
    return scoreB - scoreA
  })
}
