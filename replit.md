# Professional Electronics Engineer Portfolio

## Overview

This is a professional portfolio and consultancy website for a licensed Professional Engineer specializing in electronics engineering. The application showcases engineering services, projects, and provides contact functionality for potential clients. Built as a full-stack application with a React frontend and Express backend, it features a modern dark theme design with professional UI components and responsive layouts.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety and component-based architecture
- **Routing**: Wouter for lightweight client-side routing
- **UI Components**: Radix UI primitives with shadcn/ui component library for consistent, accessible design
- **Styling**: Tailwind CSS with custom CSS variables for theming and dark mode support
- **State Management**: TanStack Query (React Query) for server state management and caching
- **Form Handling**: React Hook Form with Zod validation for type-safe form processing
- **Animation**: Framer Motion for smooth animations and transitions
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript for full-stack type safety
- **API Design**: RESTful API endpoints for projects, users, and contact submissions
- **Storage Strategy**: In-memory storage with interface abstraction for future database migration
- **Session Management**: Express sessions with PostgreSQL session store (connect-pg-simple)
- **Development**: Hot module replacement and middleware logging for development experience

### Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect for type-safe database operations
- **Database**: PostgreSQL configured for production with Neon Database integration
- **Schema**: Shared TypeScript schemas between frontend and backend using Drizzle Zod
- **Migrations**: Drizzle Kit for database schema management and migrations
- **Validation**: Zod schemas for runtime type validation and API request/response validation

### Authentication & Security
- **Session-Based Authentication**: Express sessions with secure cookie configuration
- **Password Security**: Planned implementation for user authentication
- **CORS**: Configured for secure cross-origin requests
- **Input Validation**: Comprehensive validation using Zod schemas on both client and server

## External Dependencies

### Database Services
- **Neon Database**: PostgreSQL hosting service for production database
- **connect-pg-simple**: PostgreSQL session store for Express sessions

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit development environment
- **ESBuild**: Fast JavaScript bundler for server-side code compilation
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer

### UI Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible UI primitives
- **Lucide React**: Icon library for consistent iconography
- **Embla Carousel**: Carousel component for project galleries
- **CMDK**: Command palette component for enhanced user interaction

### Utility Libraries
- **class-variance-authority**: Type-safe variant API for component styling
- **clsx**: Utility for constructing className strings conditionally
- **date-fns**: Date utility library for formatting and manipulation
- **nanoid**: Secure URL-friendly unique string ID generator

### Form & Validation
- **@hookform/resolvers**: React Hook Form integration with validation libraries
- **Zod**: TypeScript-first schema validation library
- **drizzle-zod**: Integration between Drizzle ORM and Zod for schema validation