/**
 * server.js
 * Demonstrates OWASP A07:2025 – Authentication Failures
 *
 * Two modes:
 *  - Vulnerable Mode (client-side auth; hardcoded creds; detailed errors; no rate limiting)
 *  - Secure Mode (server-side auth; bcrypt hashing; generic errors; rate limiting; stronger rules)
 *
 * NOTE: This is educational code. Do not use this approach in production.
 */

const express = require("express");
const path = require("path");
const bcrypt = require("bcryptjs");

const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// ---------------------------
// In-memory "database" setup
// ---------------------------
/**
 * In-memory users (no DB as requested).
 * For Secure Mode we store hashed passwords.
 */
const USERS = [
  {
    username: "student",
    // password: "S3cure!Passw0rd" (hashed below at startup)
    // NOTE: We will replace this with a real hash at runtime.
    passwordHash: null,
  },
  {
    username: "admin",
    // password: "Stronger!1234"
    passwordHash: null,
  },
];

// Hash passwords on startup
async function initUsers() {
  for (const u of USERS) {
    if (u.username === "student") {
      u.passwordHash = await bcrypt.hash("S3cure!Passw0rd", 10);
    } else if (u.username === "admin") {
      u.passwordHash = await bcrypt.hash("Stronger!1234", 10);
    }
  }
}
initUsers().catch((err) => {
  console.error("Failed to init user hashes:", err);
  process.exit(1);
});

// ---------------------------
// Simple rate limiting
// ---------------------------
/**
 * Educational, intentionally simple per-IP rate limiter.
 * Used only in Secure Mode.
 */
const LOGIN_ATTEMPTS = new Map(); // key: `${ip}:${username}` -> { count, firstAt }
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX_ATTEMPTS = 5;

function rateLimitCheck({ ip, username }) {
  const key = `${ip}:${username}`;
  const now = Date.now();

  if (!LOGIN_ATTEMPTS.has(key)) {
    LOGIN_ATTEMPTS.set(key, { count: 1, firstAt: now });
    return { allowed: true };
  }

  const entry = LOGIN_ATTEMPTS.get(key);
  const age = now - entry.firstAt;

  if (age > RATE_LIMIT_WINDOW_MS) {
    // Reset window
    LOGIN_ATTEMPTS.set(key, { count: 1, firstAt: now });
    return { allowed: true };
  }

  // Same window
  if (entry.count >= RATE_LIMIT_MAX_ATTEMPTS) {
    return { allowed: false, retryAfterMs: RATE_LIMIT_WINDOW_MS - age };
  }

  entry.count += 1;
  return { allowed: true };
}

// ---------------------------
// Password rules (Secure Mode)
// ---------------------------
/**
 * Stronger password policy for demonstration.
 * (In a real system you'd also validate on registration/change.)
 */
function passwordMeetsRules(password) {
  // Example rules:
  // - at least 12 characters
  // - contains uppercase
  // - contains lowercase
  // - contains number
  // - contains special character
  if (typeof password !== "string") return false;

  const rules = [
    password.length >= 12,
    /[A-Z]/.test(password),
    /[a-z]/.test(password),
    /[0-9]/.test(password),
    /[^A-Za-z0-9]/.test(password),
  ];

  return rules.every(Boolean);
}

// ---------------------------
// Mode toggle
// ---------------------------
/**
 * Client sends { mode, username, password }.
 * - Vulnerable Mode: demonstrates auth failures (client-side style credentials + detailed errors)
 * - Secure Mode: demonstrates proper server-side auth + bcrypt + generic errors + rate limiting
 */
app.post("/api/login", async (req, res) => {
  const mode = req.body?.mode; // "vulnerable" | "secure"
  const username = String(req.body?.username ?? "");
  const password = String(req.body?.password ?? "");

  // Basic response structure
  const baseError = (code, message) => ({ ok: false, code, message });

  // ---------------------------
  // Vulnerable Mode (intentionally bad)
  // ---------------------------
  if (mode === "vulnerable") {
    /**
     * 🔴 Vulnerability: Authentication Failures (A07:2025)
     * Demonstration issues:
     *  - Hardcoded credentials are exposed to the frontend (handled client-side in this demo)
     *  - No hashing / weak password acceptance (insecure comparison)
     *  - Detailed error messages that reveal what failed
     *  - No rate limiting
     *
     * For realism, we still validate on server here, but with equally poor practices:
     *  - Accepts weak password
     *  - Uses plain-text comparison
     *  - Returns detailed errors
     */

    // Hardcoded plain-text "credentials" (DO NOT DO THIS)
    const VULN_USERS = {
      student: "student123", // weak password example
      admin: "admin123", // weak password example
    };

    // Detailed error messages (information disclosure)
    if (!Object.prototype.hasOwnProperty.call(VULN_USERS, username)) {
      return res.json(
        baseError("UNKNOWN_USER", `Login failed: user '${username}' does not exist.`)
      );
    }

    // No rate limiting: unlimited guesses allowed

    if (VULN_USERS[username] !== password) {
      return res.json(
        baseError("BAD_PASSWORD", "Login failed: password is incorrect.")
      );
    }

    // "Authenticated" success
    return res.json({ ok: true, user: { username } });
  }

  // ---------------------------
  // Secure Mode (intentionally good)
  // ---------------------------
  if (mode === "secure") {
    /**
     * ✅ Fixes for Authentication Failures:
     *  - Server-side auth
     *  - Password hashing with bcryptjs
     *  - Generic error messages (prevents user enumeration)
     *  - Rate limiting
     *  - Stronger password rules
     */

    // Rate limiting per IP + username
    const ip =
      (req.headers["x-forwarded-for"] || "").split(",")[0].trim() ||
      req.socket.remoteAddress ||
      "unknown";

    const limit = rateLimitCheck({ ip, username });
    if (!limit.allowed) {
      // Still generic; avoids telling attacker what's "valid"
      return res.status(429).json(
        baseError("RATE_LIMIT", "Too many login attempts. Please try again later.")
      );
    }

    const user = USERS.find((u) => u.username === username);

    // Generic message regardless of user existence / password correctness
    const genericAuthError = () =>
      baseError("AUTH_FAILED", "Invalid username or password.");

    // Enforce stronger password rules (demo purpose)
    // In a real system, you’d enforce this on registration/password-change,
    // not strictly during login. Here we demonstrate the control.
    if (!passwordMeetsRules(password)) {
      return res.json(genericAuthError());
    }

    // If user doesn't exist, avoid timing differences where possible.
    if (!user) {
      // Add bcrypt timing resistance by running a dummy compare
      await bcrypt.compare(password, await bcrypt.hash("dummyPassword!123", 10)).catch(
        () => {}
      );
      return res.json(genericAuthError());
    }

    // Hash-based comparison
    const match = await bcrypt.compare(password, user.passwordHash);
    if (!match) {
      return res.json(genericAuthError());
    }

    return res.json({ ok: true, user: { username } });
  }

  return res.status(400).json(baseError("BAD_REQUEST", "Invalid login mode."));
});

// ---------------------------
// Start server
// ---------------------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Auth demo running on http://localhost:${PORT}`);
  console.log(`Endpoints: POST /api/login (mode: vulnerable|secure)`);
});