/**
 * public/script.js
 *
 * Client logic for switching modes and submitting login requests.
 *
 * IMPORTANT:
 * - Vulnerable Mode demonstrates bad practice: hardcoded credentials in frontend.
 *   That logic happens here and we also show how detailed errors can leak info.
 * - Secure Mode avoids frontend auth decisions and relies on server-side checks.
 */

let currentMode = "vulnerable";

// Mode buttons
const btnVuln = document.getElementById("btnVuln");
const btnSecure = document.getElementById("btnSecure");

btnVuln.addEventListener("click", () => setMode("vulnerable"));
btnSecure.addEventListener("click", () => setMode("secure"));

function setMode(mode) {
  currentMode = mode;
  const isVuln = mode === "vulnerable";

  btnVuln.classList.toggle("active", isVuln);
  btnSecure.classList.toggle("active", !isVuln);
}

// UI elements
const loginForm = document.getElementById("loginForm");
const usernameEl = document.getElementById("username");
const passwordEl = document.getElementById("password");
const messageEl = document.getElementById("message");

// Helper to show messages
function setMessage({ ok, text }) {
  messageEl.className = `message ${ok ? "ok" : "err"}`;
  messageEl.textContent = text;
}

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = usernameEl.value.trim();
  const password = passwordEl.value;

  messageEl.textContent = "Working...";

  try {
    // ---------------------------
    // Vulnerable Mode (frontend hardcoded creds)
    // ---------------------------
    if (currentMode === "vulnerable") {
      /**
       * 🔴 Vulnerability (auth failures):
       * - Hardcoded credentials in frontend expose secrets.
       * - Allows weak passwords and client-side authorization decisions.
       *
       * The server also validates poorly and returns detailed errors.
       */
      const VULN_USERS_FRONTEND = {
        student: "student123",
        admin: "admin123",
      };

      // Determine outcome client-side (bad!); this is just for demonstration.
      const exists = Object.prototype.hasOwnProperty.call(VULN_USERS_FRONTEND, username);

      if (!exists) {
        // Detailed error that reveals user enumeration info
        setMessage({
          ok: false,
          text: `Vulnerable Mode: user '${username}' does not exist.`,
        });
        return;
      }

      if (VULN_USERS_FRONTEND[username] !== password) {
        setMessage({
          ok: false,
          text: "Vulnerable Mode: password is incorrect.",
        });
        return;
      }

      // If client-side says ok, we still call server so you can see the same weakness.
      const resp = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ mode: currentMode, username, password }),
      });

      const data = await resp.json();
      if (data.ok) {
        setMessage({ ok: true, text: `✅ Logged in as ${data.user.username} (Vulnerable Mode).` });
      } else {
        setMessage({ ok: false, text: data.message || "Login failed." });
      }
      return;
    }

    // ---------------------------
    // Secure Mode (server-side auth)
    // ---------------------------
    /**
     * ✅ In Secure Mode:
     * - No hardcoded credentials in frontend
     * - We send credentials to server for hashed verification
     * - Server returns generic error messages
     * - Server rate limits
     */
    const resp = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ mode: currentMode, username, password }),
    });

    const data = await resp.json();

    if (data.ok) {
      setMessage({ ok: true, text: `✅ Logged in as ${data.user.username} (Secure Mode).` });
    } else {
      // Generic server message
      setMessage({ ok: false, text: data.message || "Login failed." });
    }
  } catch (err) {
    setMessage({ ok: false, text: `Network/Server error: ${err.message}` });
  }
});