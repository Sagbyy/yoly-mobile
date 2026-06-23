# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install          # Install dependencies
pnpm start            # Start Expo dev server
pnpm ios              # Run on iOS simulator
pnpm android          # Run on Android emulator
pnpm lint             # Lint with ESLint
pnpm test             # Run Jest in watch mode
jest path/to/test.ts  # Run a single test file
```

## Architecture

This project follows **Feature-Sliced Design (FSD)**. The `src/` directory has four layers, each with a strict import direction (lower layers cannot import from higher ones):

```
src/
  app/        ← Expo Router file-based routes (thin wrappers only)
  pages/      ← Assembled page components, composed from features
  features/   ← Self-contained feature modules (model + ui + api)
  entities/   ← Shared app-level providers
  shared/     ← Framework-agnostic utilities, API client, UI primitives
```

**Route files** in `src/app/` delegate rendering entirely to `src/pages/`. They hold no logic.

**Feature modules** under `src/features/` are structured as:
```
features/auth/login/
  model/        ← Zustand store + Zod schemas
  types/        ← TypeScript types
  index.ts      ← Barrel export
```

**Auth guard** lives in `src/app/_layout.tsx`: it calls `useAuthStore().init()` once (subscribes to Firebase `onAuthStateChanged`), then redirects between `(auth)` and `(app)` route groups based on `user` state.

**Registration flow** is a multi-step Stack under `src/app/(auth)/register/`. The `_layout.tsx` renders an animated progress bar derived from the current segment. Step state (firstName, lastName, email, phone) is held in `useRegisterStore` (Zustand) and reset when the layout unmounts.

## Key Conventions

**Language** — The app ships in **French**. All user-facing text (labels, titles, buttons, placeholders, alerts, tab bar, error messages) MUST be written in French. Code identifiers stay in English. When generating any UI, default to French copy.

**Comments** — Do NOT add comments by default. Write self-explanatory code (clear names over comments). Add a comment ONLY when it explains a non-obvious *why* the code cannot convey: a workaround, a security constraint, a subtle ordering/bug guard, or a real gotcha (e.g. coordinate order `[lng, lat]`). Never write decorative/section-header comments (`// ─── X ───`, `{/* Header */}`), comments that restate what the code does, or "placeholder" notes. Keep any kept comment to one short line.

**State management**
- Zustand for client/UI state (`useAuthStore`, `useRegisterStore`)
- TanStack Query for server state (`src/shared/lib/query-client.ts`)

**Styling** — NativeWind (Tailwind v3 for React Native). Custom design tokens defined in `tailwind.config.js`:
- Colors: `ink` (near-black), `accent` (blue), `health.*` (semantic health states)
- Font sizes: `display`, `title`, `h1`, `h2`, `body`, `caption`, `micro`
- Fonts: `font-geist-regular`, `font-geist-medium`, `font-geist-semibold`, `font-geist-bold`

**UI component layers** (most specific wins):
1. `shared/ui/primitives/` — raw `Button`, `Text`, `Progress` wrappers
2. `shared/ui/yoly/` — branded components (`YolyButton`, `YInput`, `YEyeToggle`, `YLogo`, `YPhoneInput`) built on primitives
3. `shared/ui/typography/` — semantic text components (`Display`, `Title`, `H1`, `H2`, `Body`, `Caption`, `Micro`)

**Nothing outside components belongs in UI files** — Zod schemas, types, constants, helpers must live in `features/<name>/model/` and be imported into components. A `ui/` file contains only the React component.

**Forms** — react-hook-form + `zodResolver`. Schemas live in `features/<name>/model/schemas.ts`.

**Keyboard handling** — use `KeyboardAwareScrollView` + `KeyboardStickyView` from `react-native-keyboard-controller` for forms (not the Expo/RN built-ins).

**Path aliases**
- `@/*` → `src/*`
- `~/*` → repo root

## Environment Variables

Required in `.env` (all prefixed `EXPO_PUBLIC_`):

```
EXPO_PUBLIC_API_URL
EXPO_PUBLIC_FIREBASE_API_KEY
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN
EXPO_PUBLIC_FIREBASE_PROJECT_ID
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID
EXPO_PUBLIC_FIREBASE_APP_ID
EXPO_PUBLIC_FIREBASE_MEASUREMENT_ID
```
