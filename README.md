# React TypeScript Starter

A small Vite + React + TypeScript foundation. Enough tooling to ship with confidence, and nothing else.

Add a folder or a library when the application needs it — not because a template listed it.

## What's included

| Layer           | Choice                               |
| --------------- | ------------------------------------ |
| UI              | React 19                             |
| Language        | TypeScript                           |
| Bundler         | Vite                                 |
| Routing         | React Router                         |
| Styles          | SCSS                                 |
| Tests           | Vitest, React Testing Library, jsdom |
| Quality         | ESLint, Prettier, `tsc`              |
| Package manager | Yarn                                 |
| CI              | GitHub Actions on `main`             |

Node.js 22+ is required. The repo includes an `.nvmrc` for the recommended version:

```bash
nvm use
```

## Getting started

```bash
yarn install
yarn dev
```

Vite prints the local URL. Use `yarn preview` after a build to serve `dist/` locally.

Copy `.env.example` to `.env` when you need environment variables. Vite only exposes names prefixed with `VITE_`.

## Scripts

| Command             | What it does                                              |
| ------------------- | --------------------------------------------------------- |
| `yarn dev`          | Start the Vite dev server                                 |
| `yarn build`        | Type-check, then write a production build to `dist/`      |
| `yarn preview`      | Serve the production build locally                        |
| `yarn typecheck`    | Type-check the app and Vite config via project references |
| `yarn lint`         | Run ESLint                                                |
| `yarn test`         | Run the test suite once                                   |
| `yarn test:watch`   | Run tests in watch mode                                   |
| `yarn format`       | Format the repo with Prettier                             |
| `yarn format:check` | Check formatting without writing files                    |

CI runs typecheck, lint, format, tests, and build on every pull request to `main`.

A Husky pre-commit hook runs lint-staged: ESLint and Prettier on staged files only. Typecheck, tests, and the production build stay in CI.

## Project structure

What exists today:

```text
src/
├── pages/           # Route-level screens
│   ├── Home.tsx
│   └── NotFound.tsx
├── styles/          # Global SCSS entry and partials
│   ├── main.scss
│   ├── _reset.scss
│   ├── _variables.scss
│   └── _mixins.scss
├── test/            # Shared test setup only
│   └── setup.ts
├── App.tsx          # Root layout (renders <Outlet />)
├── router.tsx       # Route table
└── main.tsx         # Bootstrap
```

Routes live in `src/router.tsx`. Pages are screens. `App` is the shell around them.

### How the tree should grow

Do not create empty folders up front. Add a directory the first time you have a second file that belongs there.

```text
src/
├── assets/          # Images, fonts, and other files imported by Vite
├── components/      # Shared UI used by more than one page or feature
│   └── layout/      # App chrome: header, sidebar, page frame
├── features/        # A domain that has outgrown a single page file
│   └── billing/
│       ├── api.ts
│       ├── BillingPage.tsx
│       ├── useInvoices.ts
│       └── InvoiceTable.tsx
├── hooks/           # Shared React hooks (used in two or more places)
├── lib/             # Thin wrappers around third-party clients
├── pages/           # Route screens, or thin wrappers that render a feature
├── styles/
├── test/
├── types/           # Shared TypeScript types (only when they are actually shared)
├── utils/           # Pure helpers with no React dependency
├── App.tsx
├── router.tsx
└── main.tsx
```

Rules of thumb:

- **Colocate first.** A hook or helper used by one page stays next to that page, or inside that feature.
- **Promote when shared.** Move something to `components/`, `hooks/`, or `utils/` the moment a second caller needs it — not before.
- **`pages/` stay thin.** A page owns the route. When a screen grows (API, hooks, table, form), move the work into `features/<name>/` and keep the page as the entry.
- **`utils/` is for pure functions.** No React, no I/O side effects. Browser or API clients go in `lib/`.
- **`types/` is a last resort.** Prefer exporting types from the module that owns the data.
- **Tests sit next to the code.** `src/test/` is setup only. `InvoiceTable.test.tsx` lives beside `InvoiceTable.tsx`.

A feature folder is justified when a domain has several related files. A single `Home.tsx` does not need `features/home/`.

## Philosophy

This starter is a foundation, not a framework.

**Solve the problem you have.** Empty folders, unused abstractions, and speculative libraries are inventory. They look organized and they slow the next change.

**Organize around usage, then around domains.** File-type folders (`components`, `hooks`, `utils`) are a good default while the app is small. When a vertical slice has enough files to navigate as a unit, give it a `features/` directory. Don't start there.

**Prefer the platform.** React, TypeScript, and the browser cover more than they used to. Reach for a library when the cost of not having it is obvious — duplicated fetch logic, untyped API payloads, forms that fight you.

Libraries that have already earned a place:

- **React Router** — the app has more than one screen.

**Keep the public surface small.** Export from a file because a caller needs it. Barrel `index.ts` files are optional and often hide circular imports.

**Quality gates stay cheap.** Typecheck, lint, test, and build should remain fast enough to run on every PR. Don't add a tool that the team will start skipping.

## Styling

Global styles enter through `src/styles/main.scss`.

- `_reset.scss` — browser defaults
- `_variables.scss` — tokens (color, space, type)
- `_mixins.scss` — repeated SCSS helpers

Add a page- or component-level `.scss` file when global styles stop being the simplest option. Prefer variables and mixins over a third styling library until theming or variants become a real constraint.

## Testing

- **Vitest** runs the suite
- **React Testing Library** queries the UI the way a user would
- **jest-dom** provides DOM matchers
- **jsdom** supplies a browser-like environment

```tsx
expect(screen.getByRole('heading', { name: 'Home' })).toBeInTheDocument();
```

Test behavior, not implementation. Query by role and name. Avoid snapshotting markup you don't intend to lock.

## Production

```bash
yarn build
```

Output goes to `dist/`. That directory is gitignored — generate it in CI or the deploy pipeline.

## License

[MIT](LICENSE) — Copyright (c) 2026 Roopal Jasnani.
