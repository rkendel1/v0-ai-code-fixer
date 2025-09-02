# VibeFix - AI Code Fixing Platform

VibeFix is a Next.js 15.2.4 web application built with the App Router pattern, React 19, TypeScript, and Tailwind CSS. It provides an AI-powered platform for non-developers to get their buggy AI-generated applications fixed by AI analysis or expert developers.

**Always reference these instructions first and fallback to search or bash commands only when you encounter unexpected information that does not match the info here.**

## Working Effectively

### Initial Setup and Dependencies
- **CRITICAL**: Install Node.js 20.19.4+ and npm 10.8.2+
- **REQUIRED**: Install pnpm globally first: `npm install -g pnpm`
- **DO NOT use npm install** - it fails due to React 19 peer dependency conflicts with @remix-run/react
- Install dependencies: `pnpm install` (takes ~15 seconds, downloads ~316 packages)
- **WARNING**: You may see pnpm warnings about ignored build scripts - this is normal

### Build and Development
- **Development server**: `pnpm run dev` 
  - Starts on port 32100 (http://localhost:32100)
  - NEVER CANCEL: Takes ~1.4 seconds to start. Set timeout to 30+ seconds.
  - Access homepage at http://localhost:32100 to verify functionality
- **Production build**: `pnpm run build`
  - NEVER CANCEL: Takes ~20 seconds to complete. Set timeout to 60+ minutes.
  - May show warnings about STRIPE_SECRET_KEY not found (non-blocking)
  - Ignores TypeScript errors and ESLint warnings during build (see next.config.mjs)
- **Production server**: `pnpm run start`
  - Starts on port 3000 by default
  - Takes ~0.3 seconds to start after build completes
  - Requires successful build first

### Linting
- **First-time setup**: `pnpm run lint`
  - NEVER CANCEL: Takes ~10 minutes for initial ESLint configuration. Set timeout to 15+ minutes.
  - Will prompt for ESLint configuration - select "Strict (recommended)"
  - Creates .eslintrc.json automatically
- **Subsequent runs**: `pnpm run lint`
  - Takes ~3 seconds
  - Currently has known issues (unescaped quotes, unused variables) - these are non-blocking
  - Always run before committing to catch issues early

## Validation

### Manual Testing Requirements
- **ALWAYS** start the development server and verify these key workflows:
  1. **Homepage**: Navigate to http://localhost:32100 - should show VibeFix landing page
  2. **Authentication flow**: Click "Submit Your Bug" or "Sign In" - redirects to /auth/signin
  3. **Knowledge Base**: Navigate to /knowledge-base - displays solution catalog with search/filtering
  4. **Solution Details**: Click any "View Solution" - shows detailed code examples and documentation
  
### Core User Scenarios to Test
- **Bug Submission Flow**: Submit Bug → Authentication → Bug Details Form
- **Knowledge Base Browsing**: Browse Solutions → Filter by category/tech → View detailed solution
- **Authentication**: Sign In → GitHub/Google/Email options (requires auth setup)

### Build Verification Steps
- Run `pnpm run build` and verify successful completion
- Start production server with `pnpm run start`
- Test key pages load without 500 errors
- Check browser console for critical JavaScript errors

## Environment and Configuration

### Required Environment Variables
- `STRIPE_SECRET_KEY` - Optional, missing shows warnings but doesn't break functionality
- NextAuth configuration required for authentication features
- No database required for basic functionality (uses mock data)

### Key Configuration Files
- `next.config.mjs`: Disables TypeScript and ESLint errors during build
- `components.json`: shadcn/ui configuration with "new-york" style
- `tsconfig.json`: Standard Next.js TypeScript configuration
- `.eslintrc.json`: Auto-generated ESLint configuration (strict)

## Common Tasks

### Repository Structure
```
├── app/                    # Next.js App Router pages
│   ├── admin/             # Admin dashboard pages
│   ├── api/               # API routes (auth, billing, search)
│   ├── auth/signin/       # Authentication pages  
│   ├── bugs/              # Bug tracking pages
│   ├── developer/         # Developer dashboard
│   ├── knowledge-base/    # Solution catalog
│   ├── submit-bug/        # Bug submission form
│   ├── usage/             # Usage tracking
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Homepage
├── components/            # Reusable React components
│   ├── ui/               # shadcn/ui base components
│   ├── ai-analysis-widget.tsx
│   ├── navigation.tsx
│   └── *.tsx             # Custom components
├── hooks/                # Custom React hooks
│   └── use-ai-code-fix.ts
├── lib/                  # Utility functions
│   └── utils.ts          # Tailwind class merging utility
├── public/               # Static assets
└── styles/               # Global CSS files
```

### Technology Stack
- **Framework**: Next.js 15.2.4 with App Router
- **UI Library**: React 19
- **Styling**: Tailwind CSS with shadcn/ui components  
- **Authentication**: NextAuth.js
- **Payment**: Stripe integration
- **Icons**: Lucide React
- **Forms**: React Hook Form + Zod validation
- **Package Manager**: pnpm (REQUIRED)

### Development Patterns
- All pages use Next.js App Router conventions (files in `app/`)
- UI components follow shadcn/ui patterns - **DO NOT modify `components/ui` directly**
- Custom components extend shadcn/ui and belong in `components/`
- All styling uses Tailwind CSS utility classes
- Icons exclusively from lucide-react library
- Authentication flows use NextAuth.js

### Common Issues and Solutions
- **npm install fails**: Use `pnpm install` instead
- **Build errors**: Check for missing dependencies or TypeScript issues
- **Icon import errors**: Verify icon exists in lucide-react (e.g., use Chrome instead of Google)
- **Authentication errors**: NextAuth requires proper environment setup
- **STRIPE_SECRET_KEY warnings**: Non-blocking, add env var to eliminate

### File Locations for Common Changes
- **Navigation**: `components/navigation.tsx`
- **Homepage content**: `app/page.tsx`
- **Authentication**: `app/auth/signin/page.tsx` and `app/api/auth/[...nextauth]/route.ts`
- **Knowledge base**: `app/knowledge-base/page.tsx` and `app/knowledge-base/[id]/page.tsx`
- **Bug submission**: `app/submit-bug/page.tsx`
- **Global styles**: `app/globals.css`
- **Component configuration**: `components.json`

### Performance Notes
- Development server hot reload: ~0.5-2 seconds
- Production build optimization: Automatic code splitting and optimization
- No testing framework currently configured
- Uses Next.js built-in optimizations for images and fonts

## Critical Reminders

- **NEVER use npm install** - always use pnpm
- **NEVER CANCEL builds or long-running commands** - wait for completion
- **ALWAYS test manually** after making changes - run the dev server and test key workflows
- **ALWAYS run linting** before committing changes
- **Set appropriate timeouts** for all build and development commands
- **Use TypeScript strictly** - the codebase is fully typed
- **Follow existing patterns** - extend rather than modify core components