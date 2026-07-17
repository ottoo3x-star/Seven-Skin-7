import { drizzle } from "drizzle-orm/mysql2";
import type { MySql2Database } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";
import { SERVER_ENV } from "./env.validated";

/**
 * Production-safe database connection
 * 
 * Uses Drizzle ORM with mysql2 for efficient connection handling.
 * Validates connection at startup and provides clear error messages.
 */

let _db: MySql2Database | null = null;

/**
 * Initialize database connection
 * Called once at server startup
 */
export async function initializeDatabase(): Promise<MySql2Database> {
  if (_db) {
    return _db;
  }

  if (!SERVER_ENV.DATABASE_URL) {
    throw new Error("DATABASE_URL environment variable is not set");
  }

  try {
    // Create Drizzle instance directly with DATABASE_URL
    // Drizzle handles connection pooling internally
    _db = drizzle(SERVER_ENV.DATABASE_URL);

    // Test the connection by running a simple query
    try {
      const result = await _db.execute("SELECT 1 as test");
      console.log("[Database] Connection test successful");
    } catch (testError) {
      console.error("[Database] Connection test failed:", testError);
      throw testError;
    }

    console.log("[Database] Initialized successfully");
    return _db;
  } catch (error) {
    console.error("[Database] Failed to initialize:", error);
    throw new Error(
      `Database initialization failed: ${error instanceof Error ? error.message : String(error)}`
    );
  }
}

/**
 * Get the database instance
 * Must call initializeDatabase() first
 */
export function getDatabase(): MySql2Database {
  if (!_db) {
    throw new Error("Database not initialized. Call initializeDatabase() first.");
  }
  return _db;
}

/**
 * Check if database is initialized
 */
export function isDatabaseInitialized(): boolean {
  return _db !== null;
}
