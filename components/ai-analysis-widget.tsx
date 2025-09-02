"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Bot, CheckCircle, AlertTriangle, Code2, FileText, Download, Play, Pause } from "lucide-react"
import { useAICodeFix } from "@/hooks/use-ai-code-fix"

interface AIAnalysisWidgetProps {
  bugId: string
  status: "analyzing" | "completed" | "failed"
  progress?: number
  confidence?: number
  findings?: string[]
  suggestedFix?: string
  codeChanges?: Array<{
    file: string
    changes: string
    type: "add" | "remove" | "modify"
  }>
}

export function AIAnalysisWidget({
  bugId,
  status,
  progress = 0,
  confidence = 0,
  findings = [],
  suggestedFix = "",
  codeChanges = [],
}: AIAnalysisWidgetProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(status === "analyzing")
  const { startAnalysis, getAnalysis, applyFix } = useAICodeFix()

  const handleStartAnalysis = async () => {
    try {
      const analysisId = await startAnalysis({
        bugDescription: `Bug ID: ${bugId}`,
        techStack: ["React", "Next.js", "TypeScript"],
        useKnowledgeBase: true,
      })

      console.log(`[v0] Started AI analysis: ${analysisId}`)
    } catch (error) {
      console.error('Failed to start analysis:', error)
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-blue-600" />
          AI Analysis - {bugId}
          {status === "analyzing" && (
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 border-t-transparent ml-2"></div>
          )}
        </CardTitle>
        <CardDescription>
          {status === "analyzing" && "AI is analyzing your code and identifying potential fixes"}
          {status === "completed" && "Analysis complete! Review the suggested fixes below"}
          {status === "failed" && "AI analysis couldn't resolve this issue automatically"}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="progress" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="findings">Findings</TabsTrigger>
            <TabsTrigger value="fixes">Suggested Fixes</TabsTrigger>
          </TabsList>

          <TabsContent value="progress" className="space-y-4">
            {status === "analyzing" && (
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-slate-700">Analysis Progress</span>
                    <span className="text-sm text-slate-600">{progress}%</span>
                  </div>
                  <Progress value={progress} className="h-2" />
                </div>

                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsAnalyzing(!isAnalyzing)}>
                    {isAnalyzing ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
                    {isAnalyzing ? "Pause" : "Resume"}
                  </Button>
                  <span className="text-sm text-slate-600">
                    Estimated time remaining: {Math.max(1, Math.ceil((100 - progress) / 20))} minutes
                  </span>
                </div>
              </div>
            )}

            {status === "completed" && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-green-50 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-900">Analysis Complete!</p>
                    <p className="text-sm text-green-700">
                      Found {findings.length} issues with {confidence}% confidence
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <div className="text-2xl font-bold text-slate-900">{findings.length}</div>
                    <div className="text-sm text-slate-600">Issues Found</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-blue-600">{confidence}%</div>
                    <div className="text-sm text-slate-600">Confidence</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-green-600">{codeChanges.length}</div>
                    <div className="text-sm text-slate-600">Files to Fix</div>
                  </div>
                </div>
              </div>
            )}

            {status === "failed" && (
              <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium text-red-900">Analysis Failed</p>
                  <p className="text-sm text-red-700">This issue requires human developer review</p>
                </div>
              </div>
            )}
          </TabsContent>

          <TabsContent value="findings" className="space-y-4">
            <div className="space-y-3">
              {findings.map((finding, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border border-slate-200 rounded-lg">
                  <CheckCircle className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm text-slate-900">{finding}</p>
                  </div>
                </div>
              ))}
            </div>

            {findings.length === 0 && status === "analyzing" && (
              <div className="text-center py-8 text-slate-500">
                <Bot className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>AI is still analyzing your code...</p>
              </div>
            )}
          </TabsContent>

          <TabsContent value="fixes" className="space-y-4">
            {status === "completed" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-slate-900">Suggested Code Changes</h4>
                  <Button size="sm" className="bg-green-600 hover:bg-green-700" onClick={() => applyFix(bugId)}>
                    <Download className="h-4 w-4 mr-2" />
                    Apply All Fixes
                  </Button>
                </div>

                <div className="space-y-3">
                  {codeChanges.map((change, index) => (
                    <Card key={index} className="border-slate-200">
                      <CardHeader className="pb-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <Code2 className="h-4 w-4 text-blue-600" />
                            <span className="font-medium text-sm">{change.file}</span>
                          </div>
                          <Badge
                            variant="outline"
                            className={
                              change.type === "add"
                                ? "bg-green-50 text-green-700"
                                : change.type === "remove"
                                  ? "bg-red-50 text-red-700"
                                  : "bg-blue-50 text-blue-700"
                            }
                          >
                            {change.type.toUpperCase()}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ScrollArea className="h-32 w-full">
                          <pre className="text-xs text-slate-700 whitespace-pre-wrap bg-slate-50 p-3 rounded">
                            {change.changes}
                          </pre>
                        </ScrollArea>
                        <div className="flex gap-2 mt-3">
                          <Button variant="outline" size="sm">
                            <FileText className="h-3 w-3 mr-1" />
                            View Full File
                          </Button>
                          <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                            Apply This Fix
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {status === "failed" && (
              <div className="text-center py-8">
                <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-red-500" />
                <p className="text-slate-600 mb-4">No automatic fixes available for this issue</p>
                <div className="flex gap-2 justify-center">
                  <Button variant="outline" onClick={handleStartAnalysis}>
                    <Bot className="h-4 w-4 mr-2" />
                    Retry with Knowledge Base
                  </Button>
                  <Button className="bg-blue-600 hover:bg-blue-700">Request Human Developer Review ($49)</Button>
                </div>
              </div>
            )}

            {status === "analyzing" && (
              <div className="text-center py-8 text-slate-500">
                <Bot className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>Generating fixes based on analysis...</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  )
}
