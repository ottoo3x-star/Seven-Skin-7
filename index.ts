import "dotenv/config";
import { createServer } from "http";
import { createApp } from "./app";
import { validateEnvironment, logEnvironmentConfig } from "./env.validated";
import { initializeDatabase } from "./database";

/**
 * Manus Production Server Entry Point
 * 
 * This server is designed for Manus hosting:
 * - Binds to 0.0.0.0 (all interfaces)
 * - Uses process.env.PORT (Manus sets this)
 * - No port scanning in production
 * - Clear startup validation
 * - Exits with error if required config is missing
 */

async function startServer() {
  // Validate required environment variables
  const validation = validateEnvironment();

  if (!validation.valid) {
    console.error("[STARTUP ERROR] Environment validation failed:");
    validation.errors.forEach((error) => {
      console.error(`  - ${error}`);
    });
    console.error("\nPlease set these variables in your Manus environment settings.");
    process.exit(1);
  }

  // Log configuration (without exposing secrets)
  logEnvironmentConfig();

  // Initialize database connection
  try {
    await initializeDatabase();
  } catch (dbError) {
    console.error("[STARTUP ERROR] Failed to initialize database:", dbError);
    process.exit(1);
  }

  try {
    // Create Express app
    const app = createApp();

    // Create HTTP server
    const server = createServer(app);

    // Determine port
    const port = Number(process.env.PORT || 3000);
    const host = "0.0.0.0";

    // Start listening
    server.listen(port, host, () => {
      console.log(`[Server] Started on http://0.0.0.0:${port}`);
      console.log(`[Server] Environment: ${process.env.NODE_ENV || "development"}`);
      console.log(`[Server] Ready to accept connections`);
    });

    // Handle graceful shutdown
    const shutdown = () => {
      console.log("[Server] Shutting down gracefully...");
      server.close(() => {
        console.log("[Server] Closed");
        process.exit(0);
      });
    };

    process.on("SIGTERM", shutdown);
    process.on("SIGINT", shutdown);
  } catch (error) {
    console.error("[STARTUP ERROR]", error);
    process.exit(1);
  }
}

// Start server immediately
startServer();
