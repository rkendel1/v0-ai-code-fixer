"use client"

import { useState, useCallback } from "react"

export interface CodeAnalysisResult {
  id: string
  status: "analyzing" | "completed" | "failed"
  progress: number
  confidence: number
  findings: string[]
  suggestedFix: string
  codeChanges: Array<{
    file: string
    changes: string
    type: "add" | "remove" | "modify"
  }>
  estimatedTime?: number
  knowledgeBaseMatches?: Array<{
    id: string
    title: string
    similarity: number
  }>
}

export interface AICodeFixOptions {
  bugDescription: string
  techStack: string[]
  codeSnippet?: string
  repositoryUrl?: string
  errorMessage?: string
  useKnowledgeBase?: boolean
}

export function useAICodeFix() {
  const [analyses, setAnalyses] = useState<Map<string, CodeAnalysisResult>>(new Map())
  const [isLoading, setIsLoading] = useState(false)

  const startAnalysis = useCallback(async (options: AICodeFixOptions): Promise<string> => {
    const analysisId = `analysis-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // Initialize analysis state
    const initialAnalysis: CodeAnalysisResult = {
      id: analysisId,
      status: "analyzing",
      progress: 0,
      confidence: 0,
      findings: [],
      suggestedFix: "",
      codeChanges: [],
      estimatedTime: 5,
      knowledgeBaseMatches: [],
    }

    setAnalyses((prev) => new Map(prev.set(analysisId, initialAnalysis)))
    setIsLoading(true)

    try {
      // Simulate progressive updates for better UX
      const progressInterval = setInterval(() => {
        setAnalyses((prev) => {
          const current = prev.get(analysisId)
          if (!current || current.status !== "analyzing") {
            clearInterval(progressInterval)
            return prev
          }

          const newProgress = Math.min(current.progress + Math.random() * 15, 85)
          const updated = { ...current, progress: newProgress }

          // Add preliminary findings as progress increases
          if (newProgress > 30 && current.findings.length === 0) {
            updated.findings = ["Analyzing code structure...", "Checking for common patterns..."]
          }

          return new Map(prev.set(analysisId, updated))
        })
      }, 1000)

      // Make real API call to analyze code
      const response = await fetch('/api/ai/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(options),
      });

      clearInterval(progressInterval);

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Analysis failed');
      }

      const result = await response.json();

      // Update with real results
      setAnalyses((prev) => new Map(prev.set(analysisId, {
        ...result,
        id: analysisId, // Keep the original ID
        status: "completed" as const,
      })));
      
      setIsLoading(false);
    } catch (error) {
      console.error("AI analysis failed:", error)
      setAnalyses(
        (prev) =>
          new Map(
            prev.set(analysisId, {
              ...initialAnalysis,
              status: "failed",
              progress: 100,
            }),
          ),
      )
      setIsLoading(false)
    }

    return analysisId
  }, [])

  const getAnalysis = useCallback(
    (id: string): CodeAnalysisResult | undefined => {
      return analyses.get(id)
    },
    [analyses],
  )

  const cancelAnalysis = useCallback((id: string) => {
    setAnalyses((prev) => {
      const current = prev.get(id)
      if (current && current.status === "analyzing") {
        const updated = { ...current, status: "failed" as const }
        return new Map(prev.set(id, updated))
      }
      return prev
    })
  }, [])

  const applyFix = useCallback(
    async (analysisId: string, fileIndex?: number): Promise<boolean> => {
      const analysis = analyses.get(analysisId)
      if (!analysis || analysis.status !== "completed") {
        return false
      }

      try {
        // Simulate applying fixes
        console.log(`[v0] Applying fixes for analysis ${analysisId}`, { fileIndex })

        // In a real implementation, this would:
        // 1. Create a pull request or patch
        // 2. Apply code changes to the repository
        // 3. Run tests to verify the fix
        // 4. Update the knowledge base with successful fixes

        await new Promise((resolve) => setTimeout(resolve, 2000))
        return true
      } catch (error) {
        console.error("Failed to apply fix:", error)
        return false
      }
    },
    [analyses],
  )

  return {
    analyses: Array.from(analyses.values()),
    isLoading,
    startAnalysis,
    getAnalysis,
    cancelAnalysis,
    applyFix,
  }
}
