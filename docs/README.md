# DSAForge Blueprint & Architecture

DSAForge is an interactive platform for mastering Data Structures and Algorithms through visualization, guided learning, quizzes, and live coding playgrounds.

## Monorepo Architecture

- `/frontend`: Vite + React + TypeScript + Tailwind CSS (Slate-950 dark developer theme).
- `/backend`: Node.js + Express API server with Mongoose schemas.
- `/database`: Database seeding and migration scripts containing 8 core DSA chapters.
- `/docs`: Technical documentation and specifications.

## Quick Start

1. Install dependencies across monorepo:
   ```bash
   npm run install:all
   ```

2. Seed the database (optional if MongoDB is running):
   ```bash
   npm run seed
   ```

3. Start development environment:
   ```bash
   npm run dev
   ```
