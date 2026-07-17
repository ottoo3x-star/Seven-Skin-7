#!/bin/bash

# ============================================================================
# Luxe Soaps E-commerce - Vercel Compatibility Fix Script
# ============================================================================
# This script converts the project to be Vercel-compatible
# Run this script from the project root directory
# ============================================================================

set -e

echo "🚀 Starting Vercel Compatibility Fix..."
echo ""

# Step 1: Create vercel.json
echo "📝 Step 1: Creating vercel.json..."
cat > vercel.json << 'EOF'
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
EOF
echo "✅ vercel.json created"
echo ""

# Step 2: Create server/_core/vercel.ts
echo "📝 Step 2: Creating server/_core/vercel.ts..."
cat > server/_core/vercel.ts << 'EOF'
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

  // Catch-all for SPA routing (return 404)
  app.get("*", (req: Request, res: Response) => {
    res.status(404).json({ error: "Not Found" });
  });

  return app;
}

export default createVercelApp();
EOF
echo "✅ server/_core/vercel.ts created"
echo ""

# Step 3: Create api/[...].ts
echo "📝 Step 3: Creating api/[...].ts..."
mkdir -p api
cat > api/[...].ts << 'EOF'
import type { VercelRequest, VercelResponse } from "@vercel/node";
import { createVercelApp } from "../server/_core/vercel";

const app = createVercelApp();

export default function handler(req: VercelRequest, res: VercelResponse) {
  return app(req, res);
}
EOF
echo "✅ api/[...].ts created"
echo ""

# Step 4: Install @vercel/node types
echo "📝 Step 4: Installing @vercel/node..."
pnpm add -D @vercel/node
echo "✅ @vercel/node installed"
echo ""

# Step 5: Update server/_core/index.ts to support Vercel
echo "📝 Step 5: Updating server/_core/index.ts..."
cat > server/_core/index.ts << 'EOF'
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
EOF
echo "✅ server/_core/index.ts updated"
echo ""

# Step 6: Create .vercelignore
echo "📝 Step 6: Creating .vercelignore..."
cat > .vercelignore << 'EOF'
node_modules
.git
.manus-logs
dist
.env.local
*.test.ts
*.test.tsx
vitest.config.ts
vite.config.ts
tsconfig.json
drizzle.config.ts
EOF
echo "✅ .vercelignore created"
echo ""

# Step 7: Create deployment guide
echo "📝 Step 7: Creating VERCEL_DEPLOYMENT_GUIDE.md..."
cat > VERCEL_DEPLOYMENT_GUIDE.md << 'EOF'
# Vercel Deployment Guide

## Prerequisites

- GitHub account with repository connected
- Vercel account (free tier available)
- MySQL/TiDB database accessible from Vercel

## Deployment Steps

### 1. Push to GitHub

```bash
git add .
git commit -m "Add Vercel compatibility"
git push user_github main
```

### 2. Connect to Vercel

1. Go to https://vercel.com
2. Click "New Project"
3. Import your GitHub repository
4. Vercel will auto-detect `vercel.json`

### 3. Set Environment Variables

In Vercel Project Settings → Environment Variables, add:

```
DATABASE_URL=<your-mysql-url>
JWT_SECRET=<your-secret-key>
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

### 4. Deploy

Click "Deploy" - Vercel will automatically build and deploy

### 5. Test

- Visit your Vercel URL
- Check `/api/health` endpoint
- Test OAuth login flow
- Verify database connectivity

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Verify all environment variables are set
- Ensure `pnpm` is available

### API Routes Not Working
- Check `/api/` routes are properly configured
- Verify database connection string
- Check function timeout (30 seconds)

### Database Connection Error
- Verify `DATABASE_URL` is correct
- Ensure MySQL is accessible from Vercel
- Check firewall allows Vercel IPs
- Test connection locally first

## Monitoring

- View logs: Vercel Dashboard → Deployments → Logs
- Monitor performance: Vercel Dashboard → Analytics
- Check errors: Vercel Dashboard → Monitoring

## Rollback

To rollback to previous version:
1. Go to Vercel Dashboard → Deployments
2. Click "Redeploy" on previous deployment
3. Or push a fix to GitHub and redeploy

EOF
echo "✅ VERCEL_DEPLOYMENT_GUIDE.md created"
echo ""

# Step 8: Summary
echo "✅ Vercel Compatibility Fix Complete!"
echo ""
echo "📋 Summary of Changes:"
echo "  ✓ Created vercel.json configuration"
echo "  ✓ Created server/_core/vercel.ts app factory"
echo "  ✓ Created api/[...].ts catch-all handler"
echo "  ✓ Updated server/_core/index.ts for Vercel support"
echo "  ✓ Created .vercelignore"
echo "  ✓ Installed @vercel/node types"
echo "  ✓ Created VERCEL_DEPLOYMENT_GUIDE.md"
echo ""
echo "🚀 Next Steps:"
echo "  1. Test locally: pnpm dev"
echo "  2. Build: pnpm build"
echo "  3. Push to GitHub: git push user_github main"
echo "  4. Connect to Vercel: https://vercel.com"
echo "  5. Set environment variables in Vercel dashboard"
echo "  6. Deploy!"
echo ""
echo "📚 Documentation:"
echo "  - See VERCEL_DEPLOYMENT_GUIDE.md for detailed instructions"
echo "  - See VERCEL_COMPATIBILITY_FIX.md for technical details"
echo ""
