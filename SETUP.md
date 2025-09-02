# Setup Guide for Real API Integrations

This guide will help you set up the real API integrations that replace the mock data in the v0-ai-code-fixer application.

## Required Environment Variables

Copy `.env.example` to `.env.local` and fill in the following values:

### Database Configuration
```bash
DATABASE_URL="postgresql://username:password@localhost:5432/v0_ai_code_fixer"
```

For production, use a managed PostgreSQL service like:
- [Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)
- [Supabase](https://supabase.com/)
- [PlanetScale](https://planetscale.com/)
- [Neon](https://neon.tech/)

### OpenAI API Configuration
```bash
OPENAI_API_KEY="your_openai_api_key_here"
```

Get your API key from [OpenAI Platform](https://platform.openai.com/api-keys)

### Authentication Configuration
```bash
NEXTAUTH_SECRET="your_nextauth_secret_here"
NEXTAUTH_URL="http://localhost:3000"

# GitHub OAuth (optional)
GITHUB_CLIENT_ID="your_github_client_id"
GITHUB_CLIENT_SECRET="your_github_client_secret"

# Google OAuth (optional)
GOOGLE_CLIENT_ID="your_google_client_id"
GOOGLE_CLIENT_SECRET="your_google_client_secret"
```

### Email Configuration (optional)
```bash
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT="587"
EMAIL_SERVER_USER="your_email@gmail.com"
EMAIL_SERVER_PASSWORD="your_email_password"
EMAIL_FROM="your_email@gmail.com"
```

### Stripe Configuration (for payments)
```bash
STRIPE_SECRET_KEY="sk_test_your_stripe_secret_key"
STRIPE_PUBLISHABLE_KEY="pk_test_your_stripe_publishable_key"
STRIPE_WEBHOOK_SECRET="whsec_your_webhook_secret"
```

## Database Setup

1. **Create the database** using your chosen PostgreSQL provider
2. **Run the schema migration**:
   ```bash
   # If using Vercel Postgres
   npx vercel env pull .env.local
   psql $DATABASE_URL < database/schema.sql
   
   # Or manually run the SQL commands in database/schema.sql
   ```

3. **Verify the setup** by checking that tables are created and sample data is inserted

## API Service Setup

### OpenAI Integration
- **Models used**: GPT-4 for code analysis, text-embedding-3-small for semantic search
- **Rate limits**: Be aware of OpenAI's rate limits for your tier
- **Costs**: Monitor usage as API calls incur costs

### Knowledge Base
- Uses PostgreSQL full-text search for basic searches
- Falls back to database queries if OpenAI embeddings fail
- Sample knowledge base entries are included in the schema

## Development Setup

1. **Install dependencies**:
   ```bash
   npm install --legacy-peer-deps
   ```

2. **Set up environment variables**:
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your actual values
   ```

3. **Set up the database**:
   ```bash
   # Run the schema SQL file against your database
   psql $DATABASE_URL < database/schema.sql
   ```

4. **Start development server**:
   ```bash
   npm run dev
   ```

5. **Test the integrations**:
   - Visit `/api/health` to check service status
   - Try the knowledge base search
   - Test AI code analysis features

## Production Deployment

### Environment Variables
Ensure all production environment variables are set in your deployment platform:

- **Vercel**: Use the Vercel dashboard or `vercel env add`
- **Netlify**: Use the Netlify dashboard environment variables section
- **Railway/Render**: Set environment variables in the service settings

### Database
- Use a production PostgreSQL database
- Run migrations via your deployment pipeline
- Set up database backups

### Monitoring
- Monitor API usage and costs
- Set up error tracking (Sentry, LogRocket, etc.)
- Monitor database performance
- Use the `/api/health` endpoint for health checks

## Features Implemented

### Real AI Code Analysis
- **Input**: Bug descriptions, code snippets, tech stack
- **Processing**: OpenAI GPT-4 analysis
- **Output**: Findings, suggested fixes, code changes
- **Fallback**: Graceful error handling when AI services are unavailable

### Knowledge Base Search
- **Hybrid search**: Combines database full-text search with semantic search
- **Vector search**: Uses OpenAI embeddings for semantic similarity
- **Fallback**: Database-only search if OpenAI is unavailable

### User Usage Tracking
- **Database storage**: PostgreSQL with user usage tables
- **Authentication**: Integrated with NextAuth.js
- **Plan management**: Free/Pro tier support with usage limits

### Payment Integration
- **Stripe integration**: Ready for payment processing
- **Usage tracking**: Automatic increment of AI fix usage
- **Billing cycles**: Monthly/yearly billing support

## Troubleshooting

### Common Issues

1. **Build fails with OpenAI errors**:
   - Ensure OpenAI client is only initialized when needed
   - Check that OPENAI_API_KEY is set

2. **Database connection errors**:
   - Verify DATABASE_URL format
   - Check database server accessibility
   - Ensure tables are created

3. **Authentication issues**:
   - Verify NEXTAUTH_SECRET is set
   - Check OAuth provider configurations
   - Ensure NEXTAUTH_URL matches your domain

### Health Check
Visit `/api/health` to see the status of all services:
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "services": {
    "database": { "status": "healthy" },
    "openai": { "status": "healthy" }
  }
}
```

## Cost Optimization

### OpenAI Usage
- **GPT-4 calls**: ~$0.03-0.06 per analysis
- **Embeddings**: ~$0.0001 per 1k tokens
- **Optimization**: Cache embeddings, implement rate limiting

### Database
- **Connection pooling**: Implemented to reduce connection overhead
- **Indexing**: Full-text search indexes for performance
- **Query optimization**: Efficient queries with proper limits

## Security Considerations

- API keys are server-side only
- User authentication required for all AI features
- Rate limiting implemented
- Input validation on all endpoints
- Error messages don't expose sensitive information