import { sql } from '@vercel/postgres';

export interface UserUsage {
  userId: string;
  plan: 'free' | 'pro';
  aiFixesUsed: number;
  aiFixesLimit: number | null;
  humanFixesThisMonth: number;
  totalSpent: number;
  billingCycle: 'monthly' | 'yearly';
  nextBillingDate: string;
  paymentMethod?: {
    type: string;
    last4: string;
    brand: string;
  };
}

export interface KnowledgeBaseEntry {
  id: string;
  title: string;
  content: string;
  summary: string;
  category: string;
  tags: string[];
  techStack: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  codeExample?: string;
  embedding?: number[];
  createdAt: Date;
  updatedAt: Date;
}

export async function getUserUsage(userId: string): Promise<UserUsage | null> {
  try {
    const result = await sql`
      SELECT * FROM user_usage WHERE user_id = ${userId}
    `;
    
    if (result.rows.length === 0) {
      return null;
    }
    
    const row = result.rows[0];
    return {
      userId: row.user_id,
      plan: row.plan,
      aiFixesUsed: row.ai_fixes_used,
      aiFixesLimit: row.ai_fixes_limit,
      humanFixesThisMonth: row.human_fixes_this_month,
      totalSpent: row.total_spent,
      billingCycle: row.billing_cycle,
      nextBillingDate: row.next_billing_date,
      paymentMethod: row.payment_method ? JSON.parse(row.payment_method) : undefined,
    };
  } catch (error) {
    console.error('Error fetching user usage:', error);
    return null;
  }
}

export async function incrementAIFixUsage(userId: string): Promise<boolean> {
  try {
    await sql`
      UPDATE user_usage 
      SET ai_fixes_used = ai_fixes_used + 1,
          updated_at = NOW()
      WHERE user_id = ${userId}
    `;
    return true;
  } catch (error) {
    console.error('Error incrementing AI fix usage:', error);
    return false;
  }
}

export async function incrementHumanFixUsage(userId: string): Promise<boolean> {
  try {
    await sql`
      UPDATE user_usage 
      SET human_fixes_this_month = human_fixes_this_month + 1,
          updated_at = NOW()
      WHERE user_id = ${userId}
    `;
    return true;
  } catch (error) {
    console.error('Error incrementing human fix usage:', error);
    return false;
  }
}

export async function createDefaultUserUsage(userId: string): Promise<boolean> {
  try {
    await sql`
      INSERT INTO user_usage (
        user_id, plan, ai_fixes_used, ai_fixes_limit, 
        human_fixes_this_month, total_spent, billing_cycle, 
        next_billing_date, created_at, updated_at
      ) VALUES (
        ${userId}, 'free', 0, 5, 0, 0, 'monthly',
        DATE_TRUNC('month', NOW()) + INTERVAL '1 month',
        NOW(), NOW()
      )
      ON CONFLICT (user_id) DO NOTHING
    `;
    return true;
  } catch (error) {
    console.error('Error creating default user usage:', error);
    return false;
  }
}

export async function searchKnowledgeBase(
  query: string,
  limit: number = 10
): Promise<KnowledgeBaseEntry[]> {
  try {
    const result = await sql`
      SELECT * FROM knowledge_base_entries
      WHERE to_tsvector('english', title || ' ' || content || ' ' || summary) 
            @@ plainto_tsquery('english', ${query})
      ORDER BY ts_rank(
        to_tsvector('english', title || ' ' || content || ' ' || summary),
        plainto_tsquery('english', ${query})
      ) DESC
      LIMIT ${limit}
    `;
    
    return result.rows.map(row => ({
      id: row.id,
      title: row.title,
      content: row.content,
      summary: row.summary,
      category: row.category,
      tags: row.tags,
      techStack: row.tech_stack,
      difficulty: row.difficulty,
      codeExample: row.code_example,
      embedding: row.embedding,
      createdAt: new Date(row.created_at),
      updatedAt: new Date(row.updated_at),
    }));
  } catch (error) {
    console.error('Error searching knowledge base:', error);
    return [];
  }
}