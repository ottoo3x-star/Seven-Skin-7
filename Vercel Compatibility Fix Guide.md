# Vercel Compatibility Fix Guide

## Issues Identified

1. **Server listens on a port** - Vercel serverless functions don't support long-running servers
2. **Express app architecture** - Vercel requires serverless function exports, not server.listen()
3. **Build output structure** - Vercel expects specific output format
4. **Environment variables** - Need to be configured in Vercel dashboard
5. **Database connectivity** - MySQL connection needs to be accessible from Vercel
6. **Static file serving** - Vercel has specific requirements for static assets

---

## Solution: Convert to Vercel Serverless Functions

### Step 1: Create Vercel Configuration File

Create `vercel.json` in project root:

```json
{
  "buildCommand": "pnpm build",
  "outputDirectory": "dist/public",
  "framework": "vite",
  "env": {
    "DATABASE_URL": "@database_url",
    "JWT_SECRET": "@jwt_secret",
    "VITE_APP_ID": "@vite_app_id",
    "OAUTH_SERVER_URL": "@oauth_server_url",
    "OWNER_OPEN_ID": "@owner_open_id",
    "OWNER_NAME": "@owner_name",
    "BUILT_IN_FORGE_API_URL": "@built_in_forge_api_url",
    "BUILT_IN_FORGE_API_KEY": "@built_in_forge_api_key",
    "VITE_FRONTEND_FORGE_API_URL": "@vite_frontend_forge_api_url",
    "VITE_FRONTEND_FORGE_API_KEY": "@vite_frontend_forge_api_key",
    "VITE_OAUTH_PORTAL_URL": "@vite_oauth_portal_url",
    "VITE_ANALYTICS_ENDPOINT": "@vite_analytics_endpoint",
    "VITE_ANALYTICS_WEBSITE_ID": "@vite_analytics_website_id",
    "VITE_APP_TITLE": "@vite_app_title",
    "VITE_APP_LOGO": "@vite_app_logo"
  },
  "functions": {
    "api/**": {
      "runtime": "nodejs20.x",
      "maxDuration": 30
    }
  }
}
```

### Step 2: Create Vercel API Handler

Create `api/index.ts` (Vercel serverless function):

```typescript
// api/index.ts
import "dotenv/config";
import express from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "../server/_core/oauth";
import { appRouter } from "../server/routers";
import { createContext } from "../server/_core/context";

const app = express();

// Configure body parser
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));

// OAuth callback
registerOAuthRoutes(app);

// tRPC API
app.use(
  "/api/trpc",
  createExpressMiddleware({
    router: appRouter,
    createContext,
  })
);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok" });
});

export default app;
```

### Step 3: Update Build Script

Update `package.json` build script:

```json
{
  "scripts": {
    "build": "vite build && esbuild api/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist/api --external:express",
    "start": "NODE_ENV=production node dist/index.js"
  }
}
```

### Step 4: Create Vercel-Specific Server Entry

Create `server/_core/vercel.ts`:

```typescript
// server/_core/vercel.ts
import "dotenv/config";
import express, { Request, Response, NextFunction } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";

export function createVercelApp() {
  const app = express();

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // CORS headers for Vercel
  app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    if (req.method === "OPTIONS") {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // Health check endpoint
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({ status: "ok", timestamp: new Date().toISOString() });
  });

  // Catch-all for SPA routing (return index.html)
  app.get("*", (req: Request, res: Response) => {
    res.status(404).json({ error: "Not Found" });
  });

  return app;
}

export default createVercelApp();
```

### Step 5: Update Server Entry Point

Modify `server/_core/index.ts` to support both local and Vercel:

```typescript
// server/_core/index.ts
import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import { serveStatic, setupVite } from "./vite";

function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort: number = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Configure body parser with larger size limit for file uploads
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ limit: "50mb", extended: true }));

  // OAuth callback under /api/oauth/callback
  registerOAuthRoutes(app);

  // tRPC API
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // development mode uses Vite, production mode uses static files
  if (process.env.NODE_ENV === "development") {
    await setupVite(app, server);
  } else {
    serveStatic(app);
  }

  const preferredPort = parseInt(process.env.PORT || "3000");
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`Port ${preferredPort} is busy, using port ${port} instead`);
  }

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/`);
  });
}

// Only start server if not in Vercel environment
if (!process.env.VERCEL) {
  startServer().catch(console.error);
}

export default app;
```

### Step 6: Create Vercel API Route Handler

Create `api/[...].ts` (catch-all handler):

```typescript
// api/[...].ts
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createVercelApp } from "../server/_core/vercel";

const app = createVercelApp();

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}
```

### Step 7: Update package.json Scripts

```json
{
  "scripts": {
    "dev": "NODE_ENV=development tsx watch server/_core/index.ts",
    "build": "vite build && esbuild server/_core/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
    "start": "NODE_ENV=production node dist/index.js",
    "build:vercel": "vite build",
    "check": "tsc --noEmit",
    "format": "prettier --write .",
    "test": "vitest run",
    "db:push": "drizzle-kit generate && drizzle-kit migrate"
  }
}
```

### Step 8: Install Vercel Types

```bash
pnpm add -D @vercel/node
```

### Step 9: Configure Vercel Environment Variables

In Vercel dashboard, set these environment variables:

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
VITE_ANALYTICS_ENDPOINT=<analytics-url>
VITE_ANALYTICS_WEBSITE_ID=<analytics-id>
VITE_APP_TITLE=Luxe Soaps
VITE_APP_LOGO=<logo-url>
NODE_ENV=production
```

### Step 10: Deploy to Vercel

```bash
# Push to GitHub
git push user_github main

# Connect to Vercel and deploy
# Vercel will automatically detect vercel.json and deploy
```

---

## Key Changes for Vercel Compatibility

| Issue | Solution |
|-------|----------|
| Server.listen() | Use serverless functions with handlers |
| Port binding | Remove port binding in production |
| Long-running processes | Use Vercel's 30-second function timeout |
| Static files | Serve from `dist/public/` |
| API routes | Use `/api/*` pattern for serverless functions |
| Environment variables | Configure in Vercel dashboard |
| Database | Ensure MySQL is accessible from Vercel |
| Build output | Vite outputs to `dist/public/` |

---

## Testing Vercel Locally

Install Vercel CLI and test locally:

```bash
# Install Vercel CLI
npm i -g vercel

# Test locally
vercel dev

# This will run the app exactly as it would on Vercel
# Access at http://localhost:3000
```

---

## Troubleshooting Vercel Deployment

### Build Fails
- Check `vercel.json` syntax
- Ensure all environment variables are set
- Verify `pnpm` is installed in Vercel

### API Routes Not Working
- Check `/api/` routes are properly configured
- Verify environment variables are accessible
- Check database connection from Vercel

### Static Files Not Serving
- Ensure `dist/public/` contains built assets
- Check `outputDirectory` in `vercel.json`
- Verify Vite build completes successfully

### Database Connection Timeout
- Check MySQL is accessible from Vercel
- Verify `DATABASE_URL` is correct
- Ensure firewall allows Vercel IPs
- Consider using Vercel's PostgreSQL or MongoDB

---

## Alternative: Use Vercel's Node.js Runtime

If you want more control, create `api/server.js`:

```javascript
// api/server.js
import { createVercelApp } from "../server/_core/vercel.js";

export default createVercelApp();
```

Then in `vercel.json`:

```json
{
  "functions": {
    "api/server.js": {
      "runtime": "nodejs20.x"
    }
  }
}
```

---

## Recommended: Stay on Manus

**Manus provides:**
- Built-in hosting with no configuration
- Automatic HTTPS and CDN
- Custom domain support
- Database included
- Environment variables managed
- One-click deployment

**Vercel requires:**
- Manual environment configuration
- External database setup
- Build configuration
- Potential compatibility issues
- Additional costs for databases

**Recommendation:** Use Manus for production. It's simpler, faster, and more reliable for this project.

---

## Quick Checklist for Vercel Deployment

- [ ] Create `vercel.json` in project root
- [ ] Create `server/_core/vercel.ts` with app factory
- [ ] Create `api/[...].ts` catch-all handler
- [ ] Install `@vercel/node` types
- [ ] Update `package.json` build scripts
- [ ] Push to GitHub
- [ ] Connect GitHub repo to Vercel
- [ ] Set environment variables in Vercel dashboard
- [ ] Deploy and test
- [ ] Monitor logs in Vercel dashboard

---

**Note:** This guide assumes you want to deploy to Vercel. For production use, Manus is the recommended platform as it requires zero configuration and handles all infrastructure automatically.
