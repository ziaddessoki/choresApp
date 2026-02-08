# Repository Guidelines

## Project Structure & Module Organization

This is a Vite + React + TypeScript project.

- `src/main.tsx` bootstraps the app.
- `src/app/` contains app-level shell, providers, and theme setup.
- `src/features/` holds domain features (`calendar`, `chores`, `members`).
- `src/pages/` defines top-level route/page components.
- `src/layout/` contains shared layout UI (header/nav).
- `src/state/` includes shared state hooks (`useChoreState.ts`).
- `src/tests/` contains Vitest + Testing Library suites.
- `public/` stores static assets; `dist/` is build output.

## Build, Test, and Development Commands

Use npm scripts from `package.json`:

- `npm run dev`: start local Vite dev server.
- `npm run build`: type-check with `tsc -b` and produce production bundle.
- `npm run preview`: serve the built app locally from `dist/`.
- `npm run lint`: run ESLint across the repo.
- `npm run test`: run Vitest test suites.

## Coding Style & Naming Conventions

- Language: TypeScript (`.ts`/`.tsx`) with React function components.
- Indentation: 2 spaces; prefer single quotes to match existing files.
- Components and pages: `PascalCase` file names (for example, `CalendarPage.tsx`).
- Hooks/utilities: `camelCase` (for example, `useChoreState.ts`, `date.ts`).
- Keep feature-specific UI and logic inside `src/features/<feature>/`.
- Run `npm run lint` before opening a PR.

## Testing Guidelines

- Framework: Vitest (`jsdom` environment) with Testing Library and `@testing-library/jest-dom`.
- Place tests in `src/tests/` and use `*.test.tsx` naming.
- Add or update tests for behavior changes in pages, state hooks, and feature components.
- Coverage threshold is 80%; ensure meaningful scenario coverage for changed code.

## Commit & Pull Request Guidelines

- Commit style in history is short, imperative, and descriptive (for example, `Add README`).
- Keep commits focused on one logical change.
- PRs should include:
  - What changed and why.
  - Linked issue/ticket when available.
  - Screenshots or short recordings for UI updates.
  - Notes on test/lint status (`npm run test`, `npm run lint`).
