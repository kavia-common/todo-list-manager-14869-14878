# Todo List Management Web Application — Project Specification

Source basis:
- Work item and container metadata provided in task
- web_frontend/README.md
- Current Next.js app structure and code in src/

If an external “project assets document” exists outside the repo, it was not found in the assets/ directory. This spec consolidates all available details into a single reference for ongoing development.

## 1. Product Overview

A minimalistic, light-themed, responsive web app to create, manage, and track todo lists.

Primary goals:
- Quick entry of new todos
- Efficient editing/completion workflows
- Clear filtering and search
- Local, offline-friendly persistence (current scope: localStorage)

Non-goals (current scope):
- Multi-user accounts, server sync, or collaboration
- Reminders/notifications
- Subtasks/attachments

## 2. Core Features (Current Scope)

- Add new todos
- Inline edit existing todos
- Toggle completion state
- Delete todos
- Filters: All / Active / Completed
- Search box in header to filter by text
- Clear completed action
- Responsive and accessible UI
- Local storage persistence
- Basic SEO metadata (manifest, robots, sitemap)
- Health and error pages

## 3. UI/UX and Layout

- Layout: Responsive single-page layout
  - Sidebar (left on desktop; stacked on mobile) contains:
    - Filters (All, Active, Completed)
    - Counts (remaining and total)
    - Clear completed button
  - Main content area:
    - New todo input + Add button
    - List of todos with inline editing, toggle, and delete
- Theme: Minimalistic, light
- Colors:
  - primary: #2563eb
  - secondary: #64748b
  - accent: #10b981
  - background: #ffffff
  - muted: #f8fafc
  - border: #e5e7eb
  - text: #0f172a
- Components:
  - SidebarFilters
  - TodoInput
  - TodoItem

## 4. Accessibility

- Inputs and buttons include appropriate labels:
  - Search: aria-label="Search todos"
  - New todo: aria-label="New todo"
  - Checkbox label describes toggle action state
  - Buttons (Edit, Delete, Add) have aria-labels
- Keyboard interactions:
  - Enter to add new todo
  - Enter to commit edit; Escape to cancel
- Color contrast aligned with a light theme palette
- Focus styles via input focus border and subtle ring

## 5. Data Model

Type: Todo
- id: string (UUID)
- text: string
- completed: boolean
- createdAt: number (epoch ms)

In-memory state: React useState in src/app/page.tsx

Persistence: localStorage (key: "todos:list:v1")
- Utils: src/utils/storage.ts
  - loadTodos(): robust parsing, shape validation, sorting by createdAt desc
  - persistTodos(todos): safe write with error capture

## 6. Filtering and Search

- Filters:
  - all: no status filtering
  - active: completed === false
  - completed: completed === true
- Search:
  - Case-insensitive substring match against todo.text
  - Applied after status filters

## 7. Routing and Pages (Next.js App Router)

- / (Home): main Todo app UI (client component)
- /health: simple “OK” page
- 404: src/app/not-found.tsx
- 500: src/app/500/page.tsx
- Error boundary: src/app/error.tsx
- Loading UI: src/app/loading.tsx
- SEO/Meta:
  - manifest: src/app/manifest.ts and manifest.webmanifest
  - robots: src/app/robots.ts
  - sitemap: src/app/sitemap.ts
- Route config: src/app/route-config.ts (edge runtime, no caching)

## 8. Tech Stack

- Framework: Next.js (App Router), TypeScript, React
- Styling: Tailwind CSS v4 + custom globals.css with CSS variables and utility classes
- State: Local React state
- Storage: localStorage
- Build: Static export (next.config.ts output: "export")

## 9. Component Specs

1) SidebarFilters
- Props:
  - activeFilter: "all" | "active" | "completed"
  - onChangeFilter: (f) => void
  - total: number
  - remaining: number
  - onClearCompleted: () => void
- Behavior:
  - Shows counts and three toggle buttons
  - Highlights the active filter
  - “Clear completed” triggers callback

2) TodoInput
- Props:
  - onAdd(text: string): void
- Behavior:
  - Accepts text for new todo
  - Adds on Enter or Add button click
  - Trims and prevents empty adds

3) TodoItem
- Props:
  - todo: Todo
  - onToggle(): void
  - onDelete(): void
  - onEdit(text: string): void
- Behavior:
  - Checkbox toggles completed
  - Click text or Edit button to switch to inline edit input
  - Enter to confirm, Escape to cancel, Blur commits
  - Delete removes item

## 10. State Transitions

- Add:
  - id: crypto.randomUUID()
  - completed: false
  - createdAt: Date.now()
  - Prepend to state
- Toggle:
  - Invert completed by id
- Edit:
  - Update text if non-empty and changed
- Delete:
  - Remove by id
- Clear Completed:
  - Remove todos where completed === true

All mutations trigger persistTodos via effect.

## 11. Performance Notes

- useMemo for filtered list and remaining count
- Local-only operations are O(n); acceptable for small lists
- Static export, edge runtime for fast delivery

## 12. Error Handling

- Storage read/write protected with try/catch
- Error boundary logs error to console and provides reset
- Defensive parsing in loadTodos

## 13. Environment and Config

- No environment variables required (per README)
- next.config.ts: output "export"
- Tailwind config with color extensions; globals.css maps variables

## 14. Testing and Quality (Future Enhancements)

- Suggested unit tests:
  - storage.loadTodos/persistTodos
  - component behaviors (add, edit, delete, toggle)
  - filter/search logic
- Suggested E2E tests covering main flows

## 15. Future Roadmap (Out of Scope Now)

- Backend API for multi-device sync
- Auth and user accounts
- Sorting options, due dates, priorities
- Editable tags/categories
- Dark mode toggle
- Import/export JSON
- PWA install + offline enhancements

## 16. Contribution Notes

- Maintain strict typing and consistent coding style
- Keep public interfaces documented with PUBLIC_INTERFACE markers and docstrings as in current code
- Avoid hard-coding configuration; if needed, surface through env variables with .env.example

--- 

This document is intended to be the single source of truth for the Todo List Manager Web Frontend until an external assets document is added to the repository. Update this doc when features or architecture change.
