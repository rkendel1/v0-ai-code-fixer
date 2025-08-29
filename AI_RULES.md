# AI Development Rules for Vibe Fix

This document outlines the core technologies and best practices for developing the Vibe Fix application. Adhering to these rules ensures consistency, maintainability, and optimal performance.

## Tech Stack Overview

*   **Next.js (App Router)**: The foundational React framework for building the application, leveraging file-system based routing, server components, and API routes.
*   **React**: The core JavaScript library for constructing dynamic and interactive user interfaces.
*   **TypeScript**: Employed throughout the codebase for strong typing, enhancing code quality, readability, and reducing runtime errors.
*   **Tailwind CSS**: The exclusive utility-first CSS framework for all styling, ensuring responsive and consistent design across the application.
*   **Shadcn/ui**: A collection of accessible and customizable UI components built on Radix UI and styled with Tailwind CSS.
*   **NextAuth.js**: The designated library for handling all authentication flows, including user sign-in and session management.
*   **Lucide-react**: Provides a comprehensive set of customizable SVG icons for visual elements.
*   **React Hook Form & Zod**: Used together for efficient form management, robust validation, and clear error handling.
*   **Stripe**: Integrated for secure payment processing, primarily through Next.js API routes for server-side transactions.
*   **Vercel Analytics**: Utilized for monitoring application performance and user engagement.

## Library Usage Guidelines

*   **Framework**: All new pages and routing should follow **Next.js App Router** conventions (e.g., files in `app/`).
*   **UI Components**: Prioritize **shadcn/ui** components for all user interface elements.
    *   **Do NOT modify files within `components/ui` directly.**
    *   If a shadcn/ui component requires custom styling or functionality beyond its standard props, create a new component that wraps or extends it, placing it in `components/`.
*   **Styling**: All visual styling must be implemented using **Tailwind CSS** utility classes. Avoid custom CSS files or inline styles unless absolutely necessary for unique, complex scenarios.
*   **Icons**: Use icons exclusively from the **lucide-react** library.
*   **Forms**: For any form creation and validation, use **React Hook Form** for state management and **Zod** for schema-based validation.
*   **Authentication**: All authentication-related features (login, logout, session management) must be built using **NextAuth.js**.
*   **Payments**: Integrate **Stripe** for all payment processing functionalities, ensuring all sensitive operations are handled securely via Next.js API routes.
*   **File Structure**:
    *   Pages should be located in the `app/` directory.
    *   Reusable components should be placed in the `components/` directory.
    *   Custom React hooks should reside in the `hooks/` directory.
    *   API routes should be defined within `app/api/`.
    *   General utility functions should be in `lib/` or `utils/`.