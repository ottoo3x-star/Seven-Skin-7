import "dotenv/config";
import { createServer } from "http";
import { createApp } from "./app";
import { setupVite } from "./vite";

/**
 * Development Server Entry Point
 * 
 * This server is used during development with Vite HMR enabled.
 * It sets up the Express app with Vite middleware for hot module replacement.
 */

async function startDevServer() {
  try {
    // Create Express app in development mode
    const app = createApp(true);

    // Create HTTP server
    const server = createServer(app);

    // Setup Vite middleware for HMR
    await setupVite(app, server);

    // Determine port
    const port = Number(process.env.PORT || 3000);
    const host = "0.0.0.0";

    // Start listening
    server.listen(port, host, () => {
      console.log(`[Dev Server] Started on http://localhost:${port}`);
      console.log(`[Dev Server] Vite HMR enabled`);
      console.log(`[Dev Server] Ready for development`);
    });

    // Handle graceful shutdown
    process.on("SIGTERM", () => {
      console.log("[Dev Server] SIGTERM received, shutting down...");
      server.close(() => {
        console.log("[Dev Server] Closed");
        process.exit(0);
      });
    });

    process.on("SIGINT", () => {
      console.log("[Dev Server] SIGINT received, shutting down...");
      server.close(() => {
        console.log("[Dev Server] Closed");
        process.exit(0);
      });
    });
  } catch (error) {
    console.error("[Dev Server Error]", error);
    process.exit(1);
  }
}

// Start dev server immediately
startDevServer();
