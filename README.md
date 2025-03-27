# Dream Travels

A modern travel application built with Next.js, Drizzle ORM, and TypeScript.

## Prerequisites

- [Bun](https://bun.sh/) - JavaScript runtime & package manager
- Node.js (for some development tools)

## Getting Started

1. Clone the repository
2. Install dependencies:

```bash
bun install
```

3. Set up your environment variables:

```bash
cp .env.example .env
```

Fill in the required environment variables in your `.env` file.

4. Run the development server:

```bash
bun run dev
```

The application will be available at `http://localhost:3000`.

## Database Management

This project uses Drizzle ORM with SQLite (via libSQL). Here are the available database commands:

- Generate database migrations:

```bash
bun run db:generate
```

- Apply database migrations:

```bash
bun run db:migrate
```

- Open Drizzle Studio to manage your database:

```bash
bun run db:studio
```

- Seed the database with initial data:

```bash
bun run db:seed
```

## Testing

This project uses Playwright for end-to-end testing. Here are the available test commands:

- Run all tests:

```bash
bun run test
```

- Run tests with UI mode (recommended for development):

```bash
bun run test:ui
```

- Run tests in debug mode:

```bash
bun run test:debug
```

## Tech Stack

- **Framework**: Next.js 15
- **Runtime**: Bun
- **Database**: SQLite with Drizzle ORM
- **Styling**: Tailwind CSS
- **Testing**: Playwright for E2E tests
- **State Management**: Zustand
- **Form Handling**: React Hook Form with Zod validation
- **UI Components**: Radix UI
- **Animations**: Motion

## Development

- `bun run dev` - Start the development server with Turbopack
- `bun run build` - Build the application for production
- `bun run start` - Start the production server
- `bun run lint` - Run ESLint
