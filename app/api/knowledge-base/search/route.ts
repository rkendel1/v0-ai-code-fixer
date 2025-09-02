import { type NextRequest, NextResponse } from "next/server"
import { searchKnowledgeBase } from "@/lib/database"
import { semanticSearch, generateEmbedding } from "@/lib/openai"

export async function POST(request: NextRequest) {
  try {
    const { query, type = "hybrid" } = await request.json()

    if (!query || typeof query !== 'string') {
      return NextResponse.json({ error: "Query is required" }, { status: 400 });
    }

    let results = []

    switch (type) {
      case "vector":
        results = await performVectorSearch(query)
        break
      case "semantic":
        results = await performSemanticSearch(query)
        break
      case "hybrid":
      default:
        // Combine and rank results from both approaches
        const vectorResults = await performVectorSearch(query)
        const semanticResults = await performSemanticSearch(query)
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
  try {
    // Get all knowledge base entries for semantic search
    const knowledgeBaseEntries = await searchKnowledgeBase(query, 50);
    
    if (knowledgeBaseEntries.length === 0) {
      return [];
    }

    // Prepare documents for semantic search
    const documents = knowledgeBaseEntries.map(entry => ({
      id: entry.id,
      content: `${entry.title} ${entry.summary} ${entry.content}`,
      title: entry.title,
      summary: entry.summary,
      category: entry.category,
      techStack: entry.techStack,
    }));

    // Perform semantic search using OpenAI embeddings
    const similarities = await semanticSearch(query, documents);
    
    return similarities
      .filter(result => result.similarity > 0.7)
      .map(result => {
        const entry = knowledgeBaseEntries.find(e => e.id === result.id);
        return {
          id: result.id,
          title: entry?.title || '',
          content: entry?.summary || '',
          similarity: result.similarity,
          techStack: entry?.techStack || [],
          category: entry?.category || '',
        };
      });
  } catch (error) {
    console.error('Vector search error:', error);
    // Fallback to database text search if OpenAI fails
    const entries = await searchKnowledgeBase(query, 10);
    return entries.map(entry => ({
      id: entry.id,
      title: entry.title,
      content: entry.summary,
      similarity: 0.8, // Default similarity for fallback
      techStack: entry.techStack,
      category: entry.category,
    }));
  }
}

async function performSemanticSearch(query: string) {
  try {
    // Use database full-text search as the primary method
    const entries = await searchKnowledgeBase(query, 20);
    
    return entries.map(entry => ({
      id: entry.id,
      title: entry.title,
      content: entry.summary,
      relevanceScore: calculateRelevanceScore(query, entry.title, entry.content, entry.summary),
      techStack: entry.techStack,
      category: entry.category,
    }));
  } catch (error) {
    console.error('Semantic search error:', error);
    return [];
  }
}

function calculateRelevanceScore(query: string, title: string, content: string, summary: string): number {
  const queryWords = query.toLowerCase().split(/\s+/);
  const allText = `${title} ${content} ${summary}`.toLowerCase();
  
  let matches = 0;
  let totalWords = queryWords.length;
  
  queryWords.forEach(word => {
    if (allText.includes(word)) {
      matches++;
    }
  });
  
  // Boost score if query words appear in title
  const titleBoost = queryWords.some(word => title.toLowerCase().includes(word)) ? 0.2 : 0;
  
  return Math.min((matches / totalWords) + titleBoost, 1.0);
}

function combineSearchResults(vectorResults: any[], semanticResults: any[]) {
  const combined = [...vectorResults, ...semanticResults]
  const unique = combined.filter((result, index, self) => 
    index === self.findIndex((r) => r.id === result.id)
  )

  // Sort by relevance score (combining similarity and relevanceScore)
  return unique.sort((a, b) => {
    const scoreA = a.similarity || a.relevanceScore || 0
    const scoreB = b.similarity || b.relevanceScore || 0
    return scoreB - scoreA
  }).slice(0, 10) // Limit to top 10 results
}
