# Luxe Soaps E-commerce - Project Structure Tree

```
luxe-soaps-ecom/
│
├── 📁 client/                                    # Frontend React Application
│   ├── 📁 public/                               # Static Assets (served at root)
│   │   ├── favicon.ico                          # Website icon
│   │   ├── robots.txt                           # SEO robots configuration
│   │   ├── manifest.json                        # PWA manifest
│   │   └── 📁 __manus__/
│   │       └── version.json                     # Version tracking
│   │
│   ├── 📁 src/                                  # Source Code
│   │   ├── App.tsx                              # Main router & layout wrapper
│   │   ├── main.tsx                             # React entry point with providers
│   │   ├── index.css                            # Global Tailwind styles & CSS variables
│   │   ├── index.html                           # HTML template
│   │   │
│   │   ├── 📁 pages/                            # Page Components (route-level)
│   │   │   ├── Home.tsx                         # Landing page with featured products
│   │   │   ├── Shop.tsx                         # Product catalog/grid
│   │   │   ├── ProductDetail.tsx                # Individual product details
│   │   │   ├── NotFound.tsx                     # 404 error page
│   │   │   ├── Home.test.tsx                    # Home page tests (14 tests)
│   │   │   ├── Shop.test.tsx                    # Shop page tests (9 tests)
│   │   │   └── ProductDetail.test.tsx           # Product detail tests (5 tests)
│   │   │
│   │   ├── 📁 components/                       # Reusable UI Components
│   │   │   ├── DashboardLayout.tsx              # Sidebar dashboard layout
│   │   │   ├── DashboardLayoutSkeleton.tsx      # Loading skeleton
│   │   │   ├── AIChatBox.tsx                    # AI chat interface
│   │   │   ├── Map.tsx                          # Google Maps integration
│   │   │   ├── ErrorBoundary.tsx                # Error handling wrapper
│   │   │   ├── ManusDialog.tsx                  # Modal dialog
│   │   │   │
│   │   │   └── 📁 ui/                           # shadcn/ui Components (50+)
│   │   │       ├── button.tsx                   # Button component
│   │   │       ├── card.tsx                     # Card component
│   │   │       ├── dialog.tsx                   # Modal dialog
│   │   │       ├── input.tsx                    # Text input
│   │   │       ├── form.tsx                     # Form wrapper
│   │   │       ├── select.tsx                   # Dropdown select
│   │   │       ├── checkbox.tsx                 # Checkbox
│   │   │       ├── radio-group.tsx              # Radio buttons
│   │   │       ├── tabs.tsx                     # Tab navigation
│   │   │       ├── alert-dialog.tsx             # Alert modal
│   │   │       ├── badge.tsx                    # Badge label
│   │   │       ├── breadcrumb.tsx               # Breadcrumb navigation
│   │   │       ├── carousel.tsx                 # Image carousel
│   │   │       ├── chart.tsx                    # Chart components
│   │   │       ├── command.tsx                  # Command palette
│   │   │       ├── context-menu.tsx             # Right-click menu
│   │   │       ├── dropdown-menu.tsx            # Dropdown menu
│   │   │       ├── hover-card.tsx               # Hover tooltip
│   │   │       ├── label.tsx                    # Form label
│   │   │       ├── menubar.tsx                  # Menu bar
│   │   │       ├── pagination.tsx               # Pagination
│   │   │       ├── popover.tsx                  # Popover tooltip
│   │   │       ├── progress.tsx                 # Progress bar
│   │   │       ├── scroll-area.tsx              # Scrollable area
│   │   │       ├── separator.tsx                # Divider line
│   │   │       ├── sheet.tsx                    # Slide-out panel
│   │   │       ├── sidebar.tsx                  # Sidebar navigation
│   │   │       ├── skeleton.tsx                 # Loading skeleton
│   │   │       ├── slider.tsx                   # Range slider
│   │   │       ├── sonner.tsx                   # Toast notifications
│   │   │       ├── spinner.tsx                  # Loading spinner
│   │   │       ├── switch.tsx                   # Toggle switch
│   │   │       ├── table.tsx                    # Data table
│   │   │       ├── textarea.tsx                 # Multi-line input
│   │   │       ├── toggle-group.tsx             # Toggle group
│   │   │       ├── tooltip.tsx                  # Tooltip
│   │   │       └── [other UI components]
│   │   │
│   │   ├── 📁 contexts/                         # React Context Providers
│   │   │   └── ThemeContext.tsx                 # Light/dark theme management
│   │   │
│   │   ├── 📁 hooks/                            # Custom React Hooks
│   │   │   └── [custom hooks]
│   │   │
│   │   ├── 📁 lib/                              # Utility Functions & Helpers
│   │   │   ├── trpc.ts                          # tRPC client configuration
│   │   │   └── [other utilities]
│   │   │
│   │   └── 📁 _core/                            # Framework-level Code (do not edit)
│   │       └── 📁 hooks/
│   │           └── useAuth.ts                   # Authentication state hook
│   │
│   └── index.html                               # HTML entry point template
│
├── 📁 server/                                   # Backend Express Application
│   ├── routers.ts                               # Main tRPC router with all procedures
│   ├── db.ts                                    # Database query helpers
│   ├── storage.ts                               # S3 file storage helpers
│   ├── auth.logout.test.ts                      # Authentication tests (1 test)
│   │
│   └── 📁 _core/                                # Framework-level Code (do not edit)
│       ├── index.ts                             # Express server entry point
│       ├── context.ts                           # tRPC context builder (user injection)
│       ├── trpc.ts                              # tRPC server configuration
│       ├── cookies.ts                           # Session cookie management
│       ├── auth.ts                              # OAuth flow handling
│       ├── env.ts                               # Environment variables
│       ├── llm.ts                               # LLM integration helpers
│       ├── imageGeneration.ts                   # Image generation API
│       ├── voiceTranscription.ts                # Speech-to-text API
│       ├── notification.ts                      # Owner notification system
│       ├── map.ts                               # Google Maps API helpers
│       └── systemRouter.ts                      # System-level procedures
│
├── 📁 drizzle/                                  # Database Schema & Migrations
│   ├── schema.ts                                # Table definitions
│   │   ├── users                                # User accounts
│   │   ├── products                             # Soap products
│   │   ├── cartItems                            # Shopping cart
│   │   ├── orders                               # Customer orders
│   │   └── orderItems                           # Order line items
│   ├── 📁 migrations/                           # Generated SQL migration files
│   └── drizzle.config.ts                        # Drizzle configuration
│
├── 📁 shared/                                   # Shared Code (Client & Server)
│   ├── const.ts                                 # Shared constants
│   └── types.ts                                 # Shared TypeScript types
│
├── 📁 storage/                                  # S3 Storage Helpers
│   └── index.ts                                 # File upload/download utilities
│
├── 📁 .manus-logs/                              # Development Logs (auto-generated)
│   ├── devserver.log                            # Server startup & errors
│   ├── browserConsole.log                       # Client console logs
│   ├── networkRequests.log                      # HTTP requests
│   └── sessionReplay.log                        # User interactions
│
├── 📁 dist/                                     # Production Build Output (generated)
│   ├── 📁 public/                               # Built frontend assets
│   │   ├── index.html                           # Compiled HTML
│   │   ├── assets/                              # JS/CSS bundles
│   │   └── [other static files]
│   └── index.js                                 # Built server bundle (esbuild)
│
├── 📁 node_modules/                             # Dependencies (generated)
│   └── [npm packages]
│
├── 📄 package.json                              # Dependencies & scripts
├── 📄 pnpm-lock.yaml                            # Dependency lock file
├── 📄 tsconfig.json                             # TypeScript configuration
├── 📄 vite.config.ts                            # Vite build configuration
├── 📄 tailwind.config.ts                        # Tailwind CSS configuration
├── 📄 drizzle.config.ts                         # Drizzle ORM configuration
├── 📄 vitest.config.ts                          # Vitest test configuration
├── 📄 .gitignore                                # Git ignore rules
├── 📄 .prettierrc                               # Prettier formatting rules
├── 📄 todo.md                                   # Project task tracking
├── 📄 TECHNICAL_DOCUMENTATION.md                # This documentation
├── 📄 PROJECT_STRUCTURE.md                      # Project structure tree
└── 📄 README.md                                 # Project README
```

---

## Key Directories Explained

### `/client/src/pages/`
**Purpose:** Page-level components that correspond to routes.

- **Home.tsx** - Landing page with hero section, featured 3-product grid, testimonials, newsletter signup
- **Shop.tsx** - Product catalog displaying all products in a grid
- **ProductDetail.tsx** - Individual product page with full details, ingredients, benefits
- **NotFound.tsx** - 404 error page for invalid routes

### `/client/src/components/`
**Purpose:** Reusable UI components used across multiple pages.

- **DashboardLayout.tsx** - Sidebar layout for admin/dashboard pages
- **AIChatBox.tsx** - AI chat interface component
- **Map.tsx** - Google Maps integration
- **ui/** - shadcn/ui pre-built components (50+ components)

### `/server/`
**Purpose:** Backend Express server and tRPC procedures.

- **routers.ts** - All tRPC procedures (API endpoints)
- **db.ts** - Database query helpers
- **storage.ts** - S3 file storage helpers
- **_core/** - Framework infrastructure (OAuth, context, environment)

### `/drizzle/`
**Purpose:** Database schema and migrations.

- **schema.ts** - Table definitions for users, products, orders, cart
- **migrations/** - Generated SQL files for schema changes
- **drizzle.config.ts** - ORM configuration

### `/shared/`
**Purpose:** Code shared between frontend and backend.

- **const.ts** - Constants used in both client and server
- **types.ts** - TypeScript types shared across the app

### `/.manus-logs/`
**Purpose:** Development debugging logs (auto-generated during dev).

- **devserver.log** - Server startup, Vite HMR, Express warnings
- **browserConsole.log** - Client-side console.log/warn/error
- **networkRequests.log** - HTTP requests (fetch/XHR)
- **sessionReplay.log** - User interaction events

---

## File Naming Conventions

| Pattern | Purpose | Example |
|---------|---------|---------|
| `*.tsx` | React components | `Home.tsx`, `Button.tsx` |
| `*.ts` | TypeScript utilities | `trpc.ts`, `env.ts` |
| `*.test.ts(x)` | Test files | `Home.test.tsx` |
| `*.config.ts` | Configuration files | `vite.config.ts` |
| `index.ts(x)` | Module entry point | `storage/index.ts` |
| `_core/` | Framework code (do not edit) | `server/_core/` |

---

## Build Output Structure

After running `pnpm build`, the `dist/` directory contains:

```
dist/
├── public/                          # Vite frontend build
│   ├── index.html                   # Main HTML file
│   ├── assets/
│   │   ├── index-[hash].js          # Main app bundle
│   │   ├── index-[hash].css         # Tailwind CSS bundle
│   │   └── [other chunks]
│   └── [static files]
│
└── index.js                         # esbuild server bundle
    └── Contains: Express + tRPC + all dependencies
```

---

## Development vs Production

### Development (`pnpm dev`)
- Hot Module Replacement (HMR) enabled
- Source maps for debugging
- Logs written to `.manus-logs/`
- Unminified code

### Production (`pnpm build && pnpm start`)
- Minified and optimized bundles
- No source maps
- No debug logs
- Optimized for performance

---

## Important Notes

1. **Do NOT edit `_core/` directories** - These are framework-level code managed by the platform
2. **Store images in S3** - Use `manus-upload-file --webdev` for CDN URLs
3. **Use Tailwind utilities** - Avoid custom CSS when possible
4. **Reuse shadcn/ui components** - Don't rebuild common UI patterns
5. **Keep routers under 150 lines** - Split into feature-based files when growing
6. **Write tests for critical flows** - Use Vitest for unit tests

---

**Last Updated:** April 2026  
**Version:** 1.0
