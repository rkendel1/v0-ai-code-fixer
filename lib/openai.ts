import OpenAI from 'openai';

function getOpenAIClient() {
  if (!process.env.OPENAI_API_KEY) {
    throw new Error('OpenAI API key is required');
  }
  
  return new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });
}

export interface CodeAnalysisRequest {
  bugDescription: string;
  codeSnippet?: string;
  techStack: string[];
  errorMessage?: string;
  repositoryUrl?: string;
}

export interface CodeAnalysisResponse {
  findings: string[];
  suggestedFix: string;
  confidence: number;
  codeChanges: Array<{
    file: string;
    changes: string;
    type: 'add' | 'remove' | 'modify';
  }>;
  estimatedTime: number;
}

export async function analyzeCodeWithAI(request: CodeAnalysisRequest): Promise<CodeAnalysisResponse> {
  try {
    const openai = getOpenAIClient();
    const prompt = `
You are an expert software engineer analyzing a bug report. Please provide a detailed analysis and fix.

Bug Description: ${request.bugDescription}
Tech Stack: ${request.techStack.join(', ')}
${request.errorMessage ? `Error Message: ${request.errorMessage}` : ''}
${request.codeSnippet ? `Code Snippet:\n${request.codeSnippet}` : ''}

Please respond with a JSON object containing:
1. findings: Array of specific issues found (3-5 items)
2. suggestedFix: Detailed explanation of the recommended solution
3. confidence: Confidence score from 0.0 to 1.0
4. codeChanges: Array of specific code changes needed
5. estimatedTime: Estimated time to fix in minutes

Format your response as valid JSON only.
`;

    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "system",
          content: "You are a senior software engineer specialized in debugging and code analysis. Always respond with valid JSON."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.3,
      max_tokens: 2000,
    });

    const content = response.choices[0]?.message?.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    // Parse the JSON response
    const analysisResult = JSON.parse(content);
    
    // Validate and structure the response
    return {
      findings: analysisResult.findings || [],
      suggestedFix: analysisResult.suggestedFix || '',
      confidence: Math.min(Math.max(analysisResult.confidence || 0, 0), 1),
      codeChanges: analysisResult.codeChanges || [],
      estimatedTime: analysisResult.estimatedTime || 30,
    };
  } catch (error) {
    console.error('OpenAI analysis error:', error);
    throw new Error('Failed to analyze code with AI');
  }
}

export async function generateEmbedding(text: string): Promise<number[]> {
  try {
    const openai = getOpenAIClient();
    const response = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: text,
    });

    return response.data[0].embedding;
  } catch (error) {
    console.error('OpenAI embedding error:', error);
    throw new Error('Failed to generate embedding');
  }
}

export async function semanticSearch(query: string, documents: Array<{id: string, content: string}>): Promise<Array<{id: string, similarity: number}>> {
  try {
    // Generate embedding for the query
    const queryEmbedding = await generateEmbedding(query);
    
    // Generate embeddings for documents if not already embedded
    const documentEmbeddings = await Promise.all(
      documents.map(async (doc) => ({
        id: doc.id,
        embedding: await generateEmbedding(doc.content)
      }))
    );
    
    // Calculate cosine similarity
    const similarities = documentEmbeddings.map(doc => ({
      id: doc.id,
      similarity: cosineSimilarity(queryEmbedding, doc.embedding)
    }));
    
    // Sort by similarity (highest first)
    return similarities.sort((a, b) => b.similarity - a.similarity);
  } catch (error) {
    console.error('Semantic search error:', error);
    return [];
  }
}

function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vectors must have the same length');
  }
  
  let dotProduct = 0;
  let normA = 0;
  let normB = 0;
  
  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    normA += a[i] * a[i];
    normB += b[i] * b[i];
  }
  
  return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB));
}

export async function queryKnowledgeBaseWithAI(
  query: string,
  knowledgeBaseEntries: Array<{id: string, title: string, content: string, summary: string}>
): Promise<Array<{id: string, title: string, similarity: number}>> {
  try {
    // Combine title, content, and summary for better matching
    const searchableDocuments = knowledgeBaseEntries.map(entry => ({
      id: entry.id,
      content: `${entry.title} ${entry.summary} ${entry.content}`,
      title: entry.title
    }));
    
    const similarities = await semanticSearch(query, searchableDocuments);
    
    // Return only entries with good similarity scores (>0.7)
    return similarities
      .filter(result => result.similarity > 0.7)
      .map(result => {
        const entry = knowledgeBaseEntries.find(e => e.id === result.id);
        return {
          id: result.id,
          title: entry?.title || '',
          similarity: result.similarity
        };
      });
  } catch (error) {
    console.error('Knowledge base AI query error:', error);
    return [];
  }
}