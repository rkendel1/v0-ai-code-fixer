import { type NextRequest, NextResponse } from "next/server"
import { analyzeCodeWithAI } from "@/lib/openai"
import { searchKnowledgeBase } from "@/lib/database"
import { getUserIdFromRequest } from "@/lib/auth"
import { incrementAIFixUsage, getUserUsage } from "@/lib/database"

export async function POST(request: NextRequest) {
  try {
    const userId = await getUserIdFromRequest(request);
    
    if (!userId) {
      return NextResponse.json({ error: "Authentication required" }, { status: 401 });
    }

    // Check user usage limits
    const usage = await getUserUsage(userId);
    if (usage && usage.plan === 'free' && usage.aiFixesUsed >= (usage.aiFixesLimit || 5)) {
      return NextResponse.json({ 
        error: "AI fix limit reached. Please upgrade to pro plan.",
        upgradeRequired: true 
      }, { status: 403 });
    }

    const { 
      bugDescription, 
      codeSnippet, 
      techStack = [], 
      errorMessage, 
      repositoryUrl,
      useKnowledgeBase = true 
    } = await request.json();

    if (!bugDescription) {
      return NextResponse.json({ error: "Bug description is required" }, { status: 400 });
    }

    // Perform AI analysis
    const analysisResult = await analyzeCodeWithAI({
      bugDescription,
      codeSnippet,
      techStack,
      errorMessage,
      repositoryUrl,
    });

    // Search knowledge base for similar issues if requested
    let knowledgeBaseMatches = [];
    if (useKnowledgeBase) {
      try {
        const searchQuery = `${bugDescription} ${techStack.join(' ')} ${errorMessage || ''}`;
        const kbResults = await searchKnowledgeBase(searchQuery, 5);
        
        knowledgeBaseMatches = kbResults.map(result => ({
          id: result.id,
          title: result.title,
          similarity: 0.85, // Default similarity for knowledge base matches
          category: result.category,
          difficulty: result.difficulty,
        }));
      } catch (error) {
        console.error('Knowledge base search failed:', error);
        // Continue without knowledge base matches if search fails
      }
    }

    // Increment user's AI fix usage
    await incrementAIFixUsage(userId);

    const response = {
      id: `analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      status: "completed",
      progress: 100,
      confidence: analysisResult.confidence,
      findings: analysisResult.findings,
      suggestedFix: analysisResult.suggestedFix,
      codeChanges: analysisResult.codeChanges,
      estimatedTime: analysisResult.estimatedTime,
      knowledgeBaseMatches,
      techStack,
      completedAt: new Date().toISOString(),
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error("AI analysis error:", error);
    
    if (error instanceof Error && error.message.includes('OpenAI')) {
      return NextResponse.json({ 
        error: "AI service temporarily unavailable. Please try again later." 
      }, { status: 503 });
    }
    
    return NextResponse.json({ 
      error: "Analysis failed. Please try again." 
    }, { status: 500 });
  }
}