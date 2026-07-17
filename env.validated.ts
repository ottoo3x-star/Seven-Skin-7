/**
 * Typed Environment Validation Module
 * 
 * Separates server-only variables from Vite client variables.
 * Validates all required environment variables at startup.
 * Never exposes secrets to the frontend.
 */

/**
 * Server-only environment variables (never expose to frontend)
 */
export const SERVER_ENV = {
  // Database
  DATABASE_URL: process.env.DATABASE_URL || "",

  // Authentication & OAuth
  JWT_SECRET: process.env.JWT_SECRET || "",
  OAUTH_SERVER_URL: process.env.OAUTH_SERVER_URL || "",
  OWNER_OPEN_ID: process.env.OWNER_OPEN_ID || "",
  OWNER_NAME: process.env.OWNER_NAME || "",

  // Manus APIs (server-side only)
  BUILT_IN_FORGE_API_URL: process.env.BUILT_IN_FORGE_API_URL || "",
  BUILT_IN_FORGE_API_KEY: process.env.BUILT_IN_FORGE_API_KEY || "",

  // Application
  NODE_ENV: process.env.NODE_ENV || "development",
  PORT: process.env.PORT || "3000",
  APP_URL: process.env.APP_URL || "", // Production domain for OAuth redirects
};

/**
 * Client-facing environment variables (safe to expose)
 * These are prefixed with VITE_ and injected into the frontend bundle
 */
export const CLIENT_ENV = {
  // OAuth Portal
  VITE_OAUTH_PORTAL_URL: process.env.VITE_OAUTH_PORTAL_URL || "",

  // Application ID
  VITE_APP_ID: process.env.VITE_APP_ID || "",

  // Manus APIs (frontend-safe)
  VITE_FRONTEND_FORGE_API_URL: process.env.VITE_FRONTEND_FORGE_API_URL || "",
  VITE_FRONTEND_FORGE_API_KEY: process.env.VITE_FRONTEND_FORGE_API_KEY || "",

  // Analytics
  VITE_ANALYTICS_ENDPOINT: process.env.VITE_ANALYTICS_ENDPOINT || "",
  VITE_ANALYTICS_WEBSITE_ID: process.env.VITE_ANALYTICS_WEBSITE_ID || "",

  // Branding
  VITE_APP_TITLE: process.env.VITE_APP_TITLE || "Luxe Soaps",
  VITE_APP_LOGO: process.env.VITE_APP_LOGO || "",
};

/**
 * Validate all required environment variables
 * Throws an error if any required variable is missing
 */
export function validateEnvironment(): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Server-only required variables
  const requiredServerVars: (keyof typeof SERVER_ENV)[] = [
    "DATABASE_URL",
    "JWT_SECRET",
    "OAUTH_SERVER_URL",
  ];

  for (const key of requiredServerVars) {
    if (!SERVER_ENV[key]) {
      errors.push(`Missing required server environment variable: ${key}`);
    }
  }

  // Client-required variables
  const requiredClientVars: (keyof typeof CLIENT_ENV)[] = [
    "VITE_APP_ID",
    "VITE_OAUTH_PORTAL_URL",
  ];

  for (const key of requiredClientVars) {
    if (!CLIENT_ENV[key]) {
      errors.push(`Missing required client environment variable: ${key}`);
    }
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

/**
 * Log environment configuration (without exposing secrets)
 */
export function logEnvironmentConfig(): void {
  console.log("[Environment] Configuration:");
  console.log(`  NODE_ENV: ${SERVER_ENV.NODE_ENV}`);
  console.log(`  PORT: ${SERVER_ENV.PORT}`);
  console.log(`  APP_URL: ${SERVER_ENV.APP_URL || "(not set - using default)"}`);
  console.log(`  Database: ${SERVER_ENV.DATABASE_URL ? "configured" : "NOT SET"}`);
  console.log(`  JWT Secret: ${SERVER_ENV.JWT_SECRET ? "configured" : "NOT SET"}`);
  console.log(`  OAuth Server: ${SERVER_ENV.OAUTH_SERVER_URL ? "configured" : "NOT SET"}`);
  console.log(`  App ID: ${process.env.VITE_APP_ID ? "configured" : "NOT SET"}`);
  console.log(`  Forge API: ${SERVER_ENV.BUILT_IN_FORGE_API_KEY ? "configured" : "NOT SET"}`);
}
