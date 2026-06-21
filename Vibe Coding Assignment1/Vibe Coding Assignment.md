**Vibe Coding Assignment 1 — Broken Access Control Demo**
**Student: Anusha Reddy
Course: MSSE 642 — Software Assurance
Professor: Randall Granier
Semester: 2026 Summer**

🧩 Overview
This project demonstrates Broken Access Control, one of the OWASP Top 10 vulnerabilities.
You built a small Node.js/Express application that runs in two modes:
- Vulnerable mode → node server.js
- No access control checks
- Normal users can access admin‑only data
- Secure mode → node server.js --secure
-- Proper role‑based authorization
- Normal users are blocked from admin endpoints
The purpose of this assignment is to show how missing backend authorization leads to unauthorized data exposure — even if the UI hides admin buttons.

Project Structure
Vibe Coding Assignment1/
│
├── server.js
├── package.json
├── package-lock.json
├── node_modules/
│
└── public/
    ├── index.html
    ├── app.js
    └── styles.css
Credentials Used for Testing
Role           Username           Password
User           alice              password
Admin          bob                admin
These credentials are defined in the backend for demonstration purposes

How to Run the Application
1. Install dependencies
npm init -y
npm install express express-session
2. Run in Vulnerable Mode
node server.js
- No access control
- Any logged‑in user can access /admin/users

3. Run in Secure Mode
node server.js --secure

- Enforces admin role
- Normal users receive 403 Forbidden

Sunny Day Scenario (Expected Behavior)
✔️ User logs in normally
- Login as alice
- User dashboard loads
- Admin buttons are hidden in the UI
📸 Screenshot:

screenshots/Screenshot_25-5-2026_2212_localhost.jpeg

✔️ Admin logs in
- Login as bob
- Admin can access /admin/users successfully
📸 Screenshot:
screenshots/Screenshot_25-5-2026_221132_localhost.jpeg


 Rainy Day Scenario (Broken Access Control)
❌ Vulnerable Mode
- Run:
node server.js
- Login as alice
- Manually navigate to:
http://localhost:3000/admin/users
- alice can see admin data → This is the vulnerability.
📸 Screenshot Placeholder:
screenshots/Vibe coding assignment 2.png


Secure Mode (Fix Applied)
✔️ Normal user blocked
- Run:
node server.js --secure
- Login as alice
- Navigate to /admin/users
- User receives 403 Forbidden
📸 Screenshot:
screenshots/secure mode.png

✔️ Admin still allowed
- Login as bob
- /admin/users returns admin data normally
📸 Screenshot
screenshots/Screenshot_25-5-2026_221151_localhost.jpeg

🧠 What I Learned
- UI‑based restrictions are not real security
- Backend must enforce role‑based authorization
- Broken Access Control is one of the most common real‑world vulnerabilities
- Adding a simple role check (if (role !== 'admin') return 403) prevents data leaks
- Testing both vulnerable and secure modes shows the importance of backend validation

🛠️ Tools Used
- Claude Code (for generating backend + frontend code)
- Microsoft Copilot (for debugging, folder setup, and documentation)
- Node.js + Express
- Browser developer tools



 







