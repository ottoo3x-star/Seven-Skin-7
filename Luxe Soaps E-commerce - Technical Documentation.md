# Luxe Soaps E-commerce - Technical Documentation

**Project Name:** Luxe Soaps E-commerce  
**Version:** 1.0.0  
**Last Updated:** April 2026  
**Repository:** GitHub (connected via `user_github` remote)

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Project Structure](#project-structure)
3. [Technology Stack](#technology-stack)
4. [Frontend Architecture](#frontend-architecture)
5. [Backend Architecture](#backend-architecture)
6. [Database Schema](#database-schema)
7. [API Routes & tRPC Procedures](#api-routes--trpc-procedures)
8. [Payment Integration (Stripe)](#payment-integration-stripe)
9. [Cart System Logic](#cart-system-logic)
10. [Environment Variables](#environment-variables)
11. [Build & Deployment](#build--deployment)
12. [Development Workflow](#development-workflow)
13. [Testing](#testing)

---

## Project Overview

**Luxe Soaps E-commerce** is a full-stack web application built with React 19, Express 4, and tRPC 11. The application showcases handcrafted luxury soap products with a modern, feminine aesthetic featuring soft pink, cream, and beige color palettes.

### Key Features

- **Product Showcase:** Display 3 featured products (2 individual soaps + 1 bundle pack)
- **Responsive Design:** Mobile-first design with Tailwind CSS 4
- **Authentication:** Manus OAuth integration for user management
- **Product Details:** Detailed product pages with ingredients, benefits, and skin type information
- **Stripe Integration:** Direct Stripe checkout links for each product
- **Database:** MySQL/TiDB backend with Drizzle ORM
- **Real-time Updates:** Hot Module Replacement (HMR) during development

---

## Project Structure

```
luxe-soaps-ecom/
├── client/                          # Frontend React application
│   ├── public/                      # Static assets (favicon, robots.txt, manifest.json)
│   │   ├── favicon.ico
│   │   ├── robots.txt
│   │   └── __manus__/version.json
│   ├── src/
│   │   ├── App.tsx                  # Main router and layout wrapper
│   │   ├── main.tsx                 # React entry point with providers
│   │   ├── index.css                # Global Tailwind styles and CSS variables
│   │   ├── pages/                   # Page-level components
│   │   │   ├── Home.tsx             # Landing page with featured products
│   │   │   ├── Shop.tsx             # Product grid/catalog page
│   │   │   ├── ProductDetail.tsx    # Individual product detail page
│   │   │   ├── NotFound.tsx         # 404 error page
│   │   │   ├── Home.test.tsx        # Home page tests
│   │   │   ├── Shop.test.tsx        # Shop page tests
│   │   │   └── ProductDetail.test.tsx # Product detail tests
│   │   ├── components/              # Reusable UI components
│   │   │   ├── DashboardLayout.tsx  # Dashboard sidebar layout
│   │   │   ├── DashboardLayoutSkeleton.tsx
│   │   │   ├── AIChatBox.tsx        # AI chat interface
│   │   │   ├── Map.tsx              # Google Maps integration
│   │   │   ├── ErrorBoundary.tsx    # Error handling wrapper
│   │   │   ├── ManusDialog.tsx      # Modal dialog component
│   │   │   └── ui/                  # shadcn/ui components
│   │   │       ├── button.tsx
│   │   │       ├── card.tsx
│   │   │       ├── dialog.tsx
│   │   │       ├── input.tsx
│   │   │       ├── form.tsx
│   │   │       └── [50+ other UI components]
│   │   ├── contexts/                # React context providers
│   │   │   └── ThemeContext.tsx     # Light/dark theme management
│   │   ├── hooks/                   # Custom React hooks
│   │   │   └── useAuth.ts           # Authentication state hook
│   │   ├── lib/                     # Utility functions
│   │   │   └── trpc.ts              # tRPC client configuration
│   │   └── _core/                   # Internal framework code
│   │       └── hooks/useAuth.ts
│   └── index.html                   # HTML entry point
│
├── server/                          # Backend Express application
│   ├── routers.ts                   # Main tRPC router with all procedures
│   ├── db.ts                        # Database query helpers
│   ├── auth.logout.test.ts          # Auth tests
│   ├── storage.ts                   # S3 file storage helpers
│   ├── _core/                       # Framework-level code (do not edit)
│   │   ├── index.ts                 # Express server entry point
│   │   ├── context.ts               # tRPC context builder (user injection)
│   │   ├── trpc.ts                  # tRPC server configuration
│   │   ├── cookies.ts               # Session cookie management
│   │   ├── auth.ts                  # OAuth flow handling
│   │   ├── env.ts                   # Environment variables
│   │   ├── llm.ts                   # LLM integration helpers
│   │   ├── imageGeneration.ts       # Image generation API
│   │   ├── voiceTranscription.ts    # Speech-to-text API
│   │   ├── notification.ts          # Owner notification system
│   │   ├── map.ts                   # Google Maps API helpers
│   │   └── systemRouter.ts          # System-level procedures
│   └── [other server utilities]
│
├── drizzle/                         # Database schema & migrations
│   ├── schema.ts                    # Table definitions (users, products, orders, etc.)
│   ├── migrations/                  # Generated SQL migration files
│   └── drizzle.config.ts            # Drizzle configuration
│
├── shared/                          # Shared code between client & server
│   ├── const.ts                     # Shared constants
│   └── types.ts                     # Shared TypeScript types
│
├── storage/                         # S3 storage helpers
│   └── index.ts                     # File upload/download utilities
│
├── .manus-logs/                     # Development logs (auto-generated)
│   ├── devserver.log                # Server startup logs
│   ├── browserConsole.log           # Client console logs
│   ├── networkRequests.log          # HTTP request logs
│   └── sessionReplay.log            # User interaction logs
│
├── dist/                            # Production build output (generated)
│   ├── public/                      # Built frontend assets
│   └── index.js                     # Built server bundle
│
├── package.json                     # Dependencies and scripts
├── vite.config.ts                   # Vite build configuration
├── tsconfig.json                    # TypeScript configuration
├── tailwind.config.ts               # Tailwind CSS configuration
├── drizzle.config.ts                # Drizzle ORM configuration
├── vitest.config.ts                 # Vitest test configuration
├── todo.md                          # Project task tracking
└── TECHNICAL_DOCUMENTATION.md       # This file
```

---

## Technology Stack

### Frontend

| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 19.2.1 | UI framework |
| TypeScript | 5.9.3 | Type safety |
| Tailwind CSS | 4.1.14 | Utility-first styling |
| Vite | 7.1.7 | Build tool & dev server |
| wouter | 3.3.5 | Client-side routing |
| tRPC Client | 11.6.0 | Type-safe API client |
| React Query | 5.90.2 | Server state management |
| React Hook Form | 7.64.0 | Form state management |
| Zod | 4.1.12 | Schema validation |
| shadcn/ui | Latest | Pre-built UI components |
| Framer Motion | 12.23.22 | Animation library |
| Lucide React | 0.453.0 | Icon library |

### Backend

| Technology | Version | Purpose |
|-----------|---------|---------|
| Express | 4.21.2 | Web framework |
| tRPC Server | 11.6.0 | Type-safe RPC framework |
| Drizzle ORM | 0.44.5 | Database ORM |
| MySQL2 | 3.15.0 | MySQL driver |
| Jose | 6.1.0 | JWT token handling |
| Zod | 4.1.12 | Schema validation |
| SuperJSON | 1.13.3 | Date/complex type serialization |

### Database

| Technology | Purpose |
|-----------|---------|
| MySQL / TiDB | Relational database |
| Drizzle Kit | Schema migrations |

### Testing

| Technology | Version | Purpose |
|-----------|---------|---------|
| Vitest | 2.1.4 | Unit test framework |
| React Testing Library | 16.3.2 | Component testing |
| jsdom | 24.1.3 | DOM simulation |

### DevOps & Build

| Technology | Version | Purpose |
|-----------|---------|---------|
| pnpm | 10.15.1 | Package manager |
| esbuild | 0.25.0 | Server bundler |
| Prettier | 3.6.2 | Code formatter |
| tsx | 4.19.1 | TypeScript executor |

---

## Frontend Architecture

### Routing Structure

The application uses **wouter** for client-side routing with the following routes:

```typescript
// client/src/App.tsx
<Route path="/" component={Home} />           // Landing page
<Route path="/shop" component={Shop} />       // Product catalog
<Route path="/product/:id" component={ProductDetail} /> // Product details
<Route path="/404" component={NotFound} />    // Error page
```

### Component Hierarchy

```
App
├── ThemeProvider (light theme)
│   ├── TooltipProvider
│   │   ├── Router
│   │   │   ├── Home
│   │   │   │   ├── Navigation Header
│   │   │   │   ├── Hero Section
│   │   │   │   ├── Featured Products Grid (3 items)
│   │   │   │   ├── Testimonials
│   │   │   │   ├── Newsletter Signup
│   │   │   │   └── Footer
│   │   │   ├── Shop
│   │   │   │   ├── Product Grid (3 items)
│   │   │   │   └── Product Cards
│   │   │   └── ProductDetail
│   │   │       ├── Product Images
│   │   │       ├── Product Info
│   │   │       └── Related Products
│   │   └── Toaster (notifications)
│   └── ErrorBoundary
```

### State Management

- **Authentication:** `useAuth()` hook from `client/src/_core/hooks/useAuth.ts`
- **Server State:** React Query via tRPC (`trpc.*.useQuery()`, `trpc.*.useMutation()`)
- **Theme State:** `ThemeContext` for light/dark mode
- **Form State:** React Hook Form for controlled forms

### Styling Approach

- **Global Styles:** `client/src/index.css` with CSS custom properties
- **Component Styles:** Tailwind utility classes + shadcn/ui variants
- **Design Tokens:** Defined in `:root` CSS variables
  - Primary color: `#7C3AED` (purple)
  - Accent color: `#D4AF37` (gold)
  - Background: `#FFF8F5` (soft pink/cream)
  - Text: `#000000` (black)

### Featured Products Display

**Home.tsx** displays 3 products in a responsive grid:

```typescript
const products = [
  { id: 1, name: "Turmeric & Honey Glow Bar Soap", price: "$10.99", ... },
  { id: 3, name: "Pink Serenity Glow Bar Soap", price: "$10.99", ... },
  { id: 4, name: "Turmeric & Pink Honey Glow Bar Bundle Pack", price: "$21", ... }
];

// Grid layout: md:grid-cols-3 (3 columns on medium+ screens)
// Bundle product (id: 4) includes:
// - Gold "BEST VALUE" badge
// - Gold ring border (ring-2 ring-[#D4AF37])
```

---

## Backend Architecture

### Server Entry Point

```typescript
// server/_core/index.ts
- Initializes Express application
- Registers tRPC middleware at /api/trpc
- Handles OAuth callback at /api/oauth/callback
- Serves static frontend assets
- Listens on PORT 3000 (or process.env.PORT)
```

### tRPC Router Structure

```typescript
// server/routers.ts
appRouter = {
  system: systemRouter,           // System-level operations
  auth: {
    me: publicProcedure.query(),  // Get current user
    logout: publicProcedure.mutation() // Clear session
  }
  // TODO: Add feature routers (products, cart, orders, etc.)
}
```

### Context Builder

```typescript
// server/_core/context.ts
- Extracts session cookie
- Decodes JWT token
- Queries user from database
- Injects ctx.user into procedures
- Available as ctx.user in all procedures
```

### Authentication Flow

1. User clicks "Login" → redirected to Manus OAuth portal
2. OAuth callback at `/api/oauth/callback`
3. Server receives authorization code
4. Server exchanges code for user info
5. Server creates/updates user in database
6. Server sets session cookie with JWT
7. Frontend reads `ctx.user` via `trpc.auth.me.useQuery()`

---

## Database Schema

### Tables

#### `users` Table

Stores user account information from Manus OAuth.

```typescript
export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});
```

#### `products` Table

Stores soap product information.

```typescript
export const products = mysqlTable("products", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  image: text("image"),
  category: varchar("category", { length: 100 }),
  scent: varchar("scent", { length: 100 }),
  ingredients: text("ingredients"),
  stock: int("stock").default(0),
  featured: boolean("featured").default(false),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
```

#### `cartItems` Table

Stores user shopping cart items.

```typescript
export const cartItems = mysqlTable("cartItems", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  productId: int("productId").notNull(),
  quantity: int("quantity").default(1),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});
```

#### `orders` Table

Stores completed orders.

```typescript
export const orders = mysqlTable("orders", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  totalPrice: decimal("totalPrice", { precision: 10, scale: 2 }).notNull(),
  status: varchar("status", { length: 50 }).default("pending"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});
```

#### `orderItems` Table

Stores individual items within each order.

```typescript
export const orderItems = mysqlTable("orderItems", {
  id: int("id").autoincrement().primaryKey(),
  orderId: int("orderId").notNull(),
  productId: int("productId").notNull(),
  quantity: int("quantity").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
});
```

### Database Relationships

```
users (1) ──→ (many) cartItems
users (1) ──→ (many) orders
orders (1) ──→ (many) orderItems
products (1) ──→ (many) cartItems
products (1) ──→ (many) orderItems
```

---

## API Routes & tRPC Procedures

### tRPC Procedures

tRPC provides **type-safe** RPC calls from frontend to backend. All procedures are defined in `server/routers.ts`.

#### Authentication Procedures

```typescript
// Get current user
trpc.auth.me.useQuery()
// Returns: User | null

// Logout
trpc.auth.logout.useMutation()
// Usage: await logout.mutateAsync()
```

#### System Procedures

```typescript
// Notify project owner
trpc.system.notifyOwner.useMutation({
  title: string,
  content: string
})
// Returns: { success: boolean }
```

### HTTP Routes (Express)

| Method | Route | Purpose |
|--------|-------|---------|
| POST | `/api/trpc/*` | tRPC RPC calls |
| GET | `/api/oauth/callback` | OAuth callback handler |
| GET | `/*` | Serve frontend (SPA fallback) |

### Adding New Procedures

Example: Add a product listing procedure

```typescript
// server/routers.ts
import { publicProcedure, router } from "./_core/trpc";

export const appRouter = router({
  auth: { /* ... */ },
  products: router({
    list: publicProcedure.query(async ({ ctx }) => {
      return await db.getProducts();
    }),
    getById: publicProcedure
      .input(z.object({ id: z.number() }))
      .query(async ({ input }) => {
        return await db.getProductById(input.id);
      }),
  }),
});
```

Frontend usage:

```typescript
// client/src/pages/Shop.tsx
const { data: products } = trpc.products.list.useQuery();
const { data: product } = trpc.products.getById.useQuery({ id: 1 });
```

---

## Payment Integration (Stripe)

### Current Implementation

The application uses **Stripe Checkout Links** for direct payment processing. No backend payment logic is currently implemented—products redirect directly to Stripe.

### Product Stripe Links

| Product | Stripe Link |
|---------|------------|
| Turmeric & Honey Glow Bar Soap | `https://buy.stripe.com/28E4gy4R3gco1IF9eO0Fi02` |
| Pink Serenity Bar Soap | `https://buy.stripe.com/3cI00i2IV1hucnjbmW0Fi01` |
| Bundle Pack | `https://buy.stripe.com/bJe7sK6Zb2ly72Z9eO0Fi0a` |

### Implementation in Frontend

```typescript
// client/src/pages/Home.tsx & Shop.tsx
<a
  href={product.id === 1 ? "https://buy.stripe.com/28E4gy4R3gco1IF9eO0Fi02" 
       : product.id === 3 ? "https://buy.stripe.com/3cI00i2IV1hucnjbmW0Fi01" 
       : "https://buy.stripe.com/bJe7sK6Zb2ly72Z9eO0Fi0a"}
  target="_blank"
  rel="noopener noreferrer"
>
  <Button className="rounded-full text-white text-sm px-4">
    Buy Now
  </Button>
</a>
```

### Future: Backend Payment Processing

To implement backend payment handling:

1. **Add Stripe webhook endpoint** at `/api/webhooks/stripe`
2. **Create order on checkout session completion**
3. **Update order status** when payment succeeds
4. **Send confirmation email** via notification system
5. **Track payment history** in database

---

## Cart System Logic

### Current State

The cart system is **database-ready** but not yet implemented in the frontend. Tables exist (`cartItems`, `orders`, `orderItems`), but no UI or procedures are active.

### Database Structure

```typescript
// Add to cart
INSERT INTO cartItems (userId, productId, quantity)
VALUES (1, 1, 2);

// Get user cart
SELECT ci.*, p.name, p.price
FROM cartItems ci
JOIN products p ON ci.productId = p.id
WHERE ci.userId = 1;

// Create order from cart
INSERT INTO orders (userId, totalPrice, status)
VALUES (1, 41.98, 'pending');

INSERT INTO orderItems (orderId, productId, quantity, price)
SELECT ?, productId, quantity, (SELECT price FROM products WHERE id = productId)
FROM cartItems WHERE userId = 1;

// Clear cart
DELETE FROM cartItems WHERE userId = 1;
```

### Future Implementation

1. **Add cart procedures** in `server/routers.ts`:
   ```typescript
   cart: router({
     add: protectedProcedure.input(z.object({ productId: z.number(), quantity: z.number() }))
       .mutation(({ ctx, input }) => db.addToCart(ctx.user.id, input)),
     list: protectedProcedure.query(({ ctx }) => db.getCart(ctx.user.id)),
     remove: protectedProcedure.input(z.object({ cartItemId: z.number() }))
       .mutation(({ input }) => db.removeFromCart(input.cartItemId)),
   })
   ```

2. **Add cart UI** in `client/src/pages/Cart.tsx`
3. **Add checkout flow** linking to Stripe
4. **Track order history** in user dashboard

---

## Environment Variables

### Required Environment Variables

These variables are automatically injected by the Manus platform:

| Variable | Source | Purpose |
|----------|--------|---------|
| `DATABASE_URL` | System | MySQL connection string |
| `JWT_SECRET` | System | Session cookie signing secret |
| `VITE_APP_ID` | System | Manus OAuth application ID |
| `OAUTH_SERVER_URL` | System | Manus OAuth backend URL |
| `OWNER_OPEN_ID` | System | Project owner's Manus ID |
| `OWNER_NAME` | System | Project owner's name |
| `BUILT_IN_FORGE_API_URL` | System | Manus API Hub base URL |
| `BUILT_IN_FORGE_API_KEY` | System | Manus API authentication token |
| `VITE_FRONTEND_FORGE_API_URL` | System | Frontend-accessible API URL |
| `VITE_FRONTEND_FORGE_API_KEY` | System | Frontend API token |
| `VITE_OAUTH_PORTAL_URL` | System | Manus login portal URL |
| `VITE_ANALYTICS_ENDPOINT` | System | Analytics collection endpoint |
| `VITE_ANALYTICS_WEBSITE_ID` | System | Analytics website ID |
| `VITE_APP_TITLE` | System | Website title (customizable) |
| `VITE_APP_LOGO` | System | Website logo URL (customizable) |

### Development Environment

Create a `.env.local` file (not committed) for local development:

```bash
# .env.local (development only)
DATABASE_URL=mysql://user:password@localhost:3306/luxe_soaps
JWT_SECRET=your-secret-key-here
NODE_ENV=development
```

### Production Environment

All production environment variables are managed by the Manus platform. No manual `.env` file needed.

---

## Build & Deployment

### Local Development

```bash
# Install dependencies
pnpm install

# Start development server (hot reload enabled)
pnpm dev
# Server runs at http://localhost:3000

# Run tests
pnpm test

# Format code
pnpm format

# Type check
pnpm check
```

### Production Build

```bash
# Build frontend and server
pnpm build

# Output:
# - dist/public/     (Vite frontend build)
# - dist/index.js    (esbuild server bundle)

# Start production server
pnpm start
# Server runs at http://localhost:3000
```

### Build Process

1. **Frontend Build (Vite)**
   - Compiles React + TypeScript
   - Bundles with Tailwind CSS
   - Outputs to `dist/public/`
   - Optimizes for production

2. **Server Build (esbuild)**
   - Bundles Express + tRPC server
   - Resolves external dependencies
   - Outputs to `dist/index.js`
   - ESM format for Node.js

### Deployment to Manus

The application is automatically deployed to Manus when you click the **Publish** button in the Management UI:

1. **Create checkpoint** via `webdev_save_checkpoint`
2. **Click Publish** in Management UI
3. **Manus builds and deploys** automatically
4. **Live at** `https://luxesoaps-dz7phgwq.manus.space`

### Deployment to Vercel (External)

⚠️ **Warning:** Vercel deployment may have compatibility issues. Manus provides built-in hosting with custom domain support.

To deploy to Vercel:

1. **Push to GitHub**
   ```bash
   git push user_github main
   ```

2. **Connect Vercel to GitHub repository**

3. **Configure build settings in Vercel:**
   - **Build Command:** `pnpm build`
   - **Output Directory:** `dist/public`
   - **Install Command:** `pnpm install`

4. **Set environment variables in Vercel:**
   ```
   DATABASE_URL=<your-mysql-url>
   JWT_SECRET=<your-secret>
   VITE_APP_ID=<manus-app-id>
   OAUTH_SERVER_URL=<manus-oauth-url>
   OWNER_OPEN_ID=<owner-id>
   OWNER_NAME=<owner-name>
   BUILT_IN_FORGE_API_URL=<forge-url>
   BUILT_IN_FORGE_API_KEY=<forge-key>
   VITE_FRONTEND_FORGE_API_URL=<forge-url>
   VITE_FRONTEND_FORGE_API_KEY=<forge-key>
   VITE_OAUTH_PORTAL_URL=<portal-url>
   NODE_ENV=production
   ```

5. **Deploy:** Vercel automatically deploys on push to `main`

### Deployment Considerations

- **Database:** Ensure MySQL/TiDB is accessible from Vercel
- **CORS:** Configure CORS headers for cross-origin requests
- **Timeouts:** Vercel serverless functions have 10-60s timeout limits
- **File Storage:** Use S3 (via Manus helpers) instead of local filesystem
- **Build Size:** Keep dependencies minimal to stay under Vercel limits

---

## Development Workflow

### Adding a New Feature

1. **Update database schema** (if needed)
   ```typescript
   // drizzle/schema.ts
   export const newTable = mysqlTable("newTable", { /* ... */ });
   ```

2. **Generate migration**
   ```bash
   pnpm drizzle-kit generate
   ```

3. **Apply migration** (via Manus UI or `webdev_execute_sql`)

4. **Add database helpers** in `server/db.ts`

5. **Create tRPC procedures** in `server/routers.ts`

6. **Write tests** in `server/*.test.ts` or `client/src/pages/*.test.tsx`

7. **Build frontend UI** in `client/src/pages/` or `client/src/components/`

8. **Run tests**
   ```bash
   pnpm test
   ```

9. **Save checkpoint**
   ```bash
   webdev_save_checkpoint
   ```

### Code Organization

- **Keep routers under ~150 lines** → split into `server/routers/<feature>.ts`
- **Reuse shadcn/ui components** → avoid rebuilding common UI patterns
- **Store images in S3** → use `manus-upload-file --webdev` for CDN URLs
- **Use Tailwind utilities** → avoid custom CSS when possible
- **Test critical flows** → write vitest tests before shipping

### Debugging

**Check logs:**
```bash
# Browser console logs
tail -f .manus-logs/browserConsole.log

# Server logs
tail -f .manus-logs/devserver.log

# Network requests
tail -f .manus-logs/networkRequests.log
```

**Type checking:**
```bash
pnpm check
```

**Format code:**
```bash
pnpm format
```

---

## Testing

### Test Files

| File | Tests |
|------|-------|
| `server/auth.logout.test.ts` | Authentication (1 test) |
| `client/src/pages/Home.test.tsx` | Home page (14 tests) |
| `client/src/pages/Shop.test.tsx` | Shop page (9 tests) |
| `client/src/pages/ProductDetail.test.tsx` | Product detail (5 tests) |

### Running Tests

```bash
# Run all tests
pnpm test

# Run specific test file
pnpm test Home.test.tsx

# Run with UI
pnpm test --ui

# Watch mode
pnpm test --watch
```

### Test Examples

**Home Page Tests:**
```typescript
it("renders exactly 3 products with View Product buttons", () => {
  render(<Home />);
  expect(screen.getAllByText(/Turmeric/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Pink Serenity/i).length).toBeGreaterThan(0);
  expect(screen.getAllByText(/Bundle Pack/i).length).toBeGreaterThan(0);
  const viewButtons = screen.getAllByText(/View Product/i);
  expect(viewButtons.length).toBe(3);
});
```

### Writing New Tests

```typescript
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import MyComponent from "./MyComponent";

describe("MyComponent", () => {
  it("renders correctly", () => {
    render(<MyComponent />);
    expect(screen.getByText(/expected text/i)).toBeInTheDocument();
  });
});
```

---

## Additional Resources

### Official Documentation

- **React:** https://react.dev
- **Tailwind CSS:** https://tailwindcss.com
- **tRPC:** https://trpc.io
- **Drizzle ORM:** https://orm.drizzle.team
- **Vite:** https://vitejs.dev
- **Express:** https://expressjs.com

### Manus Platform

- **Manus Help:** https://help.manus.im
- **OAuth Flow:** See `server/_core/oauth.ts`
- **API Hub:** Built-in LLM, storage, notifications, etc.

### Project Contacts

- **GitHub:** Connected via `user_github` remote
- **Domain:** `luxesoaps-dz7phgwq.manus.space`
- **Last Checkpoint:** `330e8d66`

---

## Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
```

**Database connection error:**
- Verify `DATABASE_URL` is correct
- Check MySQL/TiDB is running
- Ensure network access is allowed

**OAuth callback fails:**
- Verify `VITE_APP_ID` and `OAUTH_SERVER_URL` are set
- Check redirect URL matches OAuth configuration
- Clear browser cookies and retry

**Build fails:**
```bash
# Clear cache and rebuild
rm -rf dist node_modules
pnpm install
pnpm build
```

**Tests fail:**
```bash
# Run with verbose output
pnpm test --reporter=verbose

# Check for stale cache
rm -rf node_modules/.vitest
pnpm test
```

---

**Document Version:** 1.0  
**Last Updated:** April 2026  
**Maintained By:** Luxe Soaps E-commerce Team
