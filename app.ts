import "dotenv/config";
import express, { type Express, type Request, type Response, type NextFunction } from "express";
import { createExpressMiddleware } from "@trpc/server/adapters/express";
import { registerOAuthRoutes } from "./oauth";
import { appRouter } from "../routers";
import { createContext } from "./context";
import path from "path";
import fs from "fs";
import type { Server } from "http";
import { addSecurityHeaders } from "./security";
import { fileURLToPath } from "url";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Create and configure the Express application.
 * This factory is used by both development (with Vite) and production (static files).
 * 
 * Route registration order is critical:
 * 1. Body parsers
 * 2. OAuth routes
 * 3. tRPC API routes
 * 4. Health check
 * 5. Error handling
 * 6. Static files (production only)
 * 7. SPA fallback (last)
 */
export function createApp(isDevelopment: boolean = false): Express {
  const app = express();

  // ============================================================================
  // MIDDLEWARE: Security Headers
  // ============================================================================
  addSecurityHeaders(app);

  // ============================================================================
  // MIDDLEWARE: Body Parsers
  // ============================================================================
  // Use route-specific limits instead of global 50MB
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ limit: "10mb", extended: true }));

  // ============================================================================
  // ROUTES: Authentication & OAuth
  // ============================================================================
  registerOAuthRoutes(app);

  // ============================================================================
  // ROUTES: tRPC API
  // ============================================================================
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // ============================================================================
  // ROUTES: Health Check
  // ============================================================================
  app.get("/api/health", (req: Request, res: Response) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV || "development",
    });
  });

  // ============================================================================
  // MIDDLEWARE: Error Handling (centralized)
  // ============================================================================
  app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    console.error("[Error]", err);

    // Don't expose internal errors to client
    const statusCode = err.statusCode || 500;
    const message =
      process.env.NODE_ENV === "production"
        ? "Internal server error"
        : err.message;

    res.status(statusCode).json({
      error: message,
      timestamp: new Date().toISOString(),
    });
  });

  // ============================================================================
  // ROUTES: Static Files (Production Only)
  // ============================================================================
  if (!isDevelopment) {
    // Use process.cwd() for production to get the actual working directory
    // In production, the app runs from the project root, so dist/public is relative to cwd
    const distPath = path.resolve(process.cwd(), "dist", "public");

    if (!fs.existsSync(distPath)) {
      console.error(`[STARTUP ERROR] Frontend build not found at: ${distPath}`);
      console.error("Run 'pnpm build' to generate the frontend bundle.");
      process.exit(1);
    }

    // Serve static files with caching headers
    app.use(
      express.static(distPath, {
        maxAge: "1d",
        etag: false,
      })
    );
  }

  // ============================================================================
  // ROUTES: SPA Fallback (MUST BE LAST)
  // ============================================================================
  // Only serve index.html for browser requests, not API requests
  // In development, Vite middleware handles this; in production, we serve index.html
  if (!isDevelopment) {
    app.use((req: Request, res: Response) => {
      // If it's an API request that wasn't matched, return JSON 404
      if (req.path.startsWith("/api/")) {
        return res.status(404).json({
          error: "API endpoint not found",
          path: req.path,
          method: req.method,
        });
      }

      // For browser requests, serve index.html (SPA)
      const distPath = path.resolve(process.cwd(), "dist", "public");
      const indexPath = path.join(distPath, "index.html");

      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).json({ error: "Frontend not found" });
      }
    });
  }

  return app;
}
