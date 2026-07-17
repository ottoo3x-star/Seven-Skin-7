import express, { type Express, type Request, type Response, type NextFunction } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

/**
 * Setup Vite development middleware for the Express app.
 * This is called by the development server to enable HMR and live reloading.
 * 
 * Note: The app factory (app.ts) handles route registration.
 * This function only adds Vite-specific middleware and SPA fallback for dev.
 */
export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  // Add Vite middleware for HMR and module resolution
  app.use(vite.middlewares);

  // SPA fallback for development (after API routes)
  app.use((req: Request, res: Response, next: NextFunction) => {
    // If it's an API request that wasn't matched, return JSON 404
    if (req.path.startsWith("/api/")) {
      return res.status(404).json({
        error: "API endpoint not found",
        path: req.path,
        method: req.method,
      });
    }

    // For browser requests, serve index.html with Vite transform
    const url = req.originalUrl;

    try {
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../..",
        "client",
        "index.html"
      );

      // Always reload the index.html file from disk in case it changes
      let template = fs.readFileSync(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );

      vite.transformIndexHtml(url, template).then((page) => {
        res.status(200).set({ "Content-Type": "text/html" }).end(page);
      });
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}
