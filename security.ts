import { type Express, type Request, type Response, type NextFunction } from "express";
import { SERVER_ENV } from "./env.validated";

/**
 * Security Middleware
 * 
 * Adds security headers and request validation to protect the application.
 */

/**
 * Add security headers to all responses
 */
export function addSecurityHeaders(app: Express): void {
  app.use((req: Request, res: Response, next: NextFunction) => {
    // Prevent clickjacking
    res.setHeader("X-Frame-Options", "SAMEORIGIN");

    // Prevent MIME type sniffing
    res.setHeader("X-Content-Type-Options", "nosniff");

    // Enable XSS protection
    res.setHeader("X-XSS-Protection", "1; mode=block");

    // Referrer Policy
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");

    // Permissions Policy (formerly Feature Policy)
    res.setHeader("Permissions-Policy", "geolocation=(), microphone=(), camera=()");

    next();
  });
}

/**
 * Request size limiting
 * Use route-specific limits for file uploads
 */
export const REQUEST_SIZE_LIMITS = {
  json: "10mb",
  urlencoded: "10mb",
  fileUpload: "50mb", // For file upload routes only
};

/**
 * Rate limiting configuration
 * Implement per-route as needed
 */
export const RATE_LIMITS = {
  // Auth endpoints
  oauth: { windowMs: 15 * 60 * 1000, max: 10 }, // 10 requests per 15 minutes
  login: { windowMs: 15 * 60 * 1000, max: 5 }, // 5 attempts per 15 minutes

  // API endpoints
  api: { windowMs: 60 * 1000, max: 100 }, // 100 requests per minute

  // Checkout
  checkout: { windowMs: 60 * 1000, max: 10 }, // 10 checkouts per minute
};

/**
 * Check if origin is allowed for CORS
 */
function isOriginAllowed(origin: string | undefined): boolean {
  if (!origin) return true; // Allow requests without origin (same-site)

  // Development origins
  if (
    origin === "http://localhost:3000" ||
    origin === "http://localhost:5173" ||
    origin === "http://127.0.0.1:3000" ||
    origin === "http://127.0.0.1:5173"
  ) {
    return true;
  }

  // Production domain
  if (SERVER_ENV.APP_URL && origin === SERVER_ENV.APP_URL) {
    return true;
  }

  // Manus preview domains
  if (
    origin.endsWith(".manus.computer") ||
    origin.endsWith(".manuspre.computer") ||
    origin.endsWith(".manus-asia.computer")
  ) {
    return true;
  }

  return false;
}

/**
 * CORS configuration
 * Restrict to allowed origins only
 */
export function getCorsConfig() {
  return {
    origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
      if (isOriginAllowed(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    maxAge: 86400, // 24 hours
  };
}

/**
 * Input validation helpers
 */
export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 320;
}

export function validatePhoneNumber(phone: string): boolean {
  // Basic phone number validation (10-15 digits, spaces, hyphens, +)
  const phoneRegex = /^[\d\s\-+()]{10,15}$/;
  return phoneRegex.test(phone);
}

/**
 * Sanitize user input to prevent injection attacks
 */
export function sanitizeInput(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove angle brackets
    .slice(0, 1000); // Limit length
}

/**
 * Log security events
 */
export function logSecurityEvent(
  event: string,
  details: Record<string, unknown>
): void {
  console.log(`[Security] ${event}`, details);
}
