// server.js
// Minimal Node.js/Express backend demonstrating vulnerable vs. secure admin access.
// Run: `node server.js` for vulnerable mode (default) or `node server.js --secure` for secure mode.

const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();

// Determine mode: secure (--secure) vs. vulnerable (default)
const secureMode = process.argv.includes('--secure');
const modeLabel = secureMode ? 'secure' : 'vulnerable';
console.log(`Server starting in ${modeLabel} mode.`);

// In-memory users (simple example for demonstration)
const allUsers = [
  { id: 1, username: 'alice', role: 'user' },
  { id: 2, username: 'bob', role: 'admin' }
];

// Raw user credential store (for login). In real apps, use a DB with hashed passwords.
const credentials = [
  { username: 'alice', password: 'password', role: 'user' },
  { username: 'bob', password: 'admin', role: 'admin' }
];

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  session({
    secret: 'vuln-demo-secret',
    resave: false,
    saveUninitialized: true
  })
);

// Serve static frontend
app.use(express.static(path.join(__dirname, 'public')));

// Helpers
function findUserByUsername(username) {
  return credentials.find((u) => u.username === username);
}

// Login endpoint
// - POST /login with { username, password }
// - On success: stores req.session.user = { username, role }
// - On failure: 401
app.post('/login', (req, res) => {
  const { username, password } = req.body;
  const user = findUserByUsername(username);
  if (user && user.password === password) {
    // Persist minimal identity in session
    req.session.user = { username: user.username, role: user.role };
    res.json({ success: true, username: user.username, role: user.role });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

// Logout endpoint
app.post('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ success: false });
    res.json({ success: true });
  });
});

// Current user info
app.get('/me', (req, res) => {
  if (req.session.user) {
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    res.json({ loggedIn: false });
  }
});

// Admin data endpoint
// - Vulnerable mode: does not enforce access control (admin data served to anyone)
// - Secure mode: enforces that the requester is an admin (403 if not)
app.get('/admin/users', (req, res) => {
  if (secureMode) {
    // Secure mode: enforce admin role
    const sess = req.session.user;
    if (sess && sess.role === 'admin') {
      return res.json({ users: allUsers });
    } else {
      return res.status(403).json({ error: 'Forbidden: Admin access required' });
    }
  } else {
    // Vulnerable mode: no enforcement
    return res.json({ users: allUsers });
  }
});

// Optional root redirect to index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT} in ${modeLabel} mode`);
});