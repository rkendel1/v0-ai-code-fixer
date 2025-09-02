-- Create user usage table
CREATE TABLE IF NOT EXISTS user_usage (
    user_id VARCHAR(255) PRIMARY KEY,
    plan VARCHAR(50) NOT NULL DEFAULT 'free',
    ai_fixes_used INTEGER NOT NULL DEFAULT 0,
    ai_fixes_limit INTEGER DEFAULT 5,
    human_fixes_this_month INTEGER NOT NULL DEFAULT 0,
    total_spent DECIMAL(10,2) NOT NULL DEFAULT 0.00,
    billing_cycle VARCHAR(50) NOT NULL DEFAULT 'monthly',
    next_billing_date DATE,
    payment_method JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create knowledge base entries table
CREATE TABLE IF NOT EXISTS knowledge_base_entries (
    id VARCHAR(255) PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    content TEXT NOT NULL,
    summary TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    tags TEXT[] NOT NULL DEFAULT '{}',
    tech_stack TEXT[] NOT NULL DEFAULT '{}',
    difficulty VARCHAR(50) NOT NULL DEFAULT 'Intermediate',
    code_example TEXT,
    embedding VECTOR(1536), -- For OpenAI embeddings
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_knowledge_base_content_search ON knowledge_base_entries USING GIN(to_tsvector('english', title || ' ' || content || ' ' || summary));
CREATE INDEX IF NOT EXISTS idx_knowledge_base_category ON knowledge_base_entries(category);
CREATE INDEX IF NOT EXISTS idx_knowledge_base_difficulty ON knowledge_base_entries(difficulty);
CREATE INDEX IF NOT EXISTS idx_user_usage_plan ON user_usage(plan);

-- Insert sample knowledge base entries
INSERT INTO knowledge_base_entries (id, title, content, summary, category, tags, tech_stack, difficulty, code_example) VALUES
('KB-001', 'JWT Authentication Implementation', 
'Complete guide to implementing JWT authentication in Next.js applications with proper token validation and refresh mechanisms.',
'Step-by-step JWT authentication setup with NextAuth.js including token validation, refresh, and secure storage.',
'Authentication', 
ARRAY['jwt', 'authentication', 'nextauth', 'security'],
ARRAY['Next.js', 'React', 'TypeScript'],
'Intermediate',
'import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

export const authOptions = {
  providers: [...],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
      }
      return token
    },
    async session({ session, token }) {
      session.user.id = token.id
      return session
    },
  },
}'
),

('KB-002', 'React State Management Bug Fixes',
'Common React state management issues and their solutions, including useState pitfalls and proper state updates.',
'Comprehensive guide to fixing React state bugs including asynchronous state updates and closure issues.',
'State Management',
ARRAY['react', 'state', 'hooks', 'debugging'],
ARRAY['React', 'JavaScript', 'TypeScript'],
'Beginner',
'// Wrong - state updates are asynchronous
const [count, setCount] = useState(0)
const handleClick = () => {
  setCount(count + 1)
  console.log(count) // Still shows old value
}

// Correct - use functional update
const handleClick = () => {
  setCount(prev => prev + 1)
}'
),

('KB-003', 'Next.js Routing Issues and Solutions',
'Troubleshooting dynamic routes, middleware issues, and navigation problems in Next.js applications.',
'Common Next.js routing problems including dynamic routes not working and middleware configuration issues.',
'Routing',
ARRAY['nextjs', 'routing', 'dynamic-routes', 'middleware'],
ARRAY['Next.js', 'React'],
'Intermediate',
'// Dynamic route: [slug].tsx
import { useRouter } from "next/router"

export default function Page() {
  const router = useRouter()
  const { slug } = router.query
  
  if (router.isFallback) {
    return <div>Loading...</div>
  }
  
  return <div>Page: {slug}</div>
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: "blocking"
  }
}'
),

('KB-004', 'API Error Handling Patterns',
'Best practices for handling errors in API routes with proper HTTP status codes and error messages.',
'Comprehensive error handling patterns for Next.js API routes including validation, logging, and user-friendly responses.',
'API Integration',
ARRAY['api', 'error-handling', 'validation', 'nextjs'],
ARRAY['Next.js', 'TypeScript', 'Node.js'],
'Advanced',
'import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    const result = schema.safeParse(body)
    if (!result.success) {
      return NextResponse.json(
        { error: "Validation failed", details: result.error.issues },
        { status: 400 }
      )
    }
    
    // Process valid data...
    
  } catch (error) {
    console.error("API Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}'
),

('KB-005', 'Database Connection Pool Configuration',
'Setting up connection pooling for PostgreSQL to prevent timeout errors and improve performance.',
'Complete guide to implementing database connection pooling with retry logic and proper error handling.',
'Database',
ARRAY['database', 'connection-pooling', 'postgresql', 'performance'],
ARRAY['PostgreSQL', 'Node.js', 'TypeScript'],
'Advanced',
'import { Pool } from "pg"

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
})

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
      if (attempt === maxRetries) throw error
      await new Promise(resolve => setTimeout(resolve, Math.pow(2, attempt) * 100))
    }
  }
}'
)

ON CONFLICT (id) DO NOTHING;