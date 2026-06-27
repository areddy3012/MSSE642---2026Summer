// public/app.js
// Client-side logic for login, basic navigation, and admin data view.
// - Sunny Day: normal user can see their info and, if admin, the admin button.
// - Rainy Day: an attacker manually typing /admin/users should observe server behavior
//            (vulnerable mode returns data; secure mode returns 403).

let currentUser = null;

const loginForm = document.getElementById('loginForm');
const loginStatus = document.getElementById('loginStatus');
const dashboard = document.getElementById('dashboard');
const userInfo = document.getElementById('userInfo');
const btnViewUsers = document.getElementById('btnViewUsers');
const contentArea = document.getElementById('contentArea');
const logoutBtn = document.getElementById('logoutBtn');
const modePill = document.getElementById('modeLabel');

// Fetch mode from server (via the server log, but we also reflect in UI)
function initModeUI() {
  // We can infer mode via a simple trick: try to fetch /admin/users with a harmless request
  // For simplicity, show mode text based on URL (dev-friendly)
  // In a real app, the server could expose a /mode endpoint.
}
async function setModeUI(mode) {
  modePill.textContent = mode;
  // No-op; handled by server logs as well
}

async function showDashboard(user) {
  currentUser = user;
  userInfo.textContent = `${user.username} (${user.role})`;
  dashboard.classList.remove('hidden');
  // Admin-only UI: show the admin button only to admin users
  if (user.role === 'admin') {
    btnViewUsers.style.display = 'inline-block';
  } else {
    btnViewUsers.style.display = 'none';
  }
  contentArea.innerHTML = `<p>Welcome back, ${user.username}. Use the admin data view only if you have admin rights.</p>`;
}

async function loginSubmit(e) {
  e.preventDefault();
  const username = document.getElementById('username').value.trim();
  const password = document.getElementById('password').value;

  try {
    const res = await fetch('/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      const data = await res.json();
      loginStatus.textContent = `Logged in as ${data.username} (${data.role})`;
      await showDashboard({ username: data.username, role: data.role });
    } else {
      const err = await res.json().catch(() => null);
      loginStatus.textContent = 'Login failed';
      console.warn('Login failed', err);
    }
  } catch (err) {
    loginStatus.textContent = 'Login error';
    console.error(err);
  }
}

async function fetchAdminUsers() {
  contentArea.innerHTML = '<p>Loading admin user list...</p>';
  try {
    const res = await fetch('/admin/users');
    if (res.ok) {
      const data = await res.json();
      renderUsers(data.users);
    } else {
      const errText = await res.text();
      contentArea.innerHTML = `<p class="error">Access denied: ${errText || 'Forbidden'}</p>`;
    }
  } catch (err) {
    contentArea.innerHTML = `<p class="error">Error loading data</p>`;
  }
}

function renderUsers(users) {
  if (!users || users.length === 0) {
    contentArea.innerHTML = '<p>No users found.</p>';
    return;
  }
  const list = users.map(u => `<li>${u.username} - ${u.role}</li>`).join('');
  contentArea.innerHTML = `
    <h3>All Users</h3>
    <ul>${list}</ul>
  `;
}

function wireUp() {
  loginForm.addEventListener('submit', loginSubmit);

  // Admin action: view all users (admin-only in UI; backend may differ by mode)
  btnViewUsers.addEventListener('click', fetchAdminUsers);

  // Logout
  logoutBtn.addEventListener('click', async () => {
    try {
      await fetch('/logout', { method: 'POST' });
    } catch (_) {}
    currentUser = null;
    dashboard.classList.add('hidden');
    loginStatus.textContent = 'Logged out';
    // Clear UI
    document.getElementById('username').value = '';
    document.getElementById('password').value = '';
  });

  // Try to detect initial login state from server
  // If you're already logged in (e.g., persisted session), attempt to fetch me
  (async function tryInit() {
    try {
      const res = await fetch('/me');
      if (res.ok) {
        const data = await res.json();
        if (data.loggedIn) {
          // Auto-fill basic info
          await showDashboard({ username: data.user.username, role: data.user.role });
          loginStatus.textContent = `Welcome back, ${data.user.username} (${data.user.role})`;
        } else {
          loginStatus.textContent = 'Please log in';
        }
      }
    } catch (_) {
      // ignore
    }
  })();
}

document.addEventListener('DOMContentLoaded', () => {
  // Update UI to reflect mode (readable text)
  // This info is primarily provided by server logs; keep UI minimal here
  setModeUI(location.pathname.includes('secure') ? 'secure' : 'vulnerable');
  wireUp();
  initModeUI();
});