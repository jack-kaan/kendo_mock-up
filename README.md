# Kendo Mock-Up

## Project Structure
- `src/` – application source
  - `features/kendo/` – feature modules (entry page, components, screens)
  - `hooks/` – reusable React hooks (`useKendoDashboard`, `useGeminiPrompt`, `useKendoModals`)
  - `lib/` – shared helpers (`cn`)
  - `services/` – data/services layer (`kendoService`, `gemini`)
  - `types/` – shared TypeScript types
- `public/` assets served by Vite (see `index.html`)

## Scripts
- `pnpm dev` – start Vite dev server
- `pnpm build` – production build
- `pnpm preview` – preview production build
- `pnpm typecheck` – run TypeScript `tsc --noEmit`

## Path Aliases
- `@/*` resolves to files under `src/`
- Vite config and `tsconfig.json` declare the alias

## Environment Variables
- `VITE_GEMINI_API_KEY` – API key for Gemini integration (used by `services/gemini.ts`)

## Getting Started
1. Install deps: `pnpm install`
2. Configure `.env` (see `.env.example`)
3. Run locally: `pnpm dev`
