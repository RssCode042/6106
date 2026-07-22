import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
import path from 'path';
import { fileURLToPath } from 'url';
import { getDb } from './database.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = 'super-secret-key-entaxi-6106'; // In production, use environment variables

app.use(express.json());
app.use(cookieParser());

// In dev mode, allow CORS from Vite. In production, they run on same domain.
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'dist')));

// Middleware to verify JWT token
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.status(403).json({ error: 'Invalid token' });
    req.user = user;
    next();
  });
};

// --- API ROUTES ---

// Login Endpoint
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'Rumen2603') {
    const token = jwt.sign({ username }, JWT_SECRET, { expiresIn: '24h' });
    res.cookie('token', token, { 
      httpOnly: true, 
      secure: process.env.NODE_ENV === 'production',
      maxAge: 24 * 60 * 60 * 1000 
    });
    return res.json({ success: true });
  }
  return res.status(401).json({ error: 'Invalid credentials' });
});

// Logout Endpoint
app.post('/api/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ success: true });
});

// Check Auth Endpoint
app.get('/api/check-auth', authenticateToken, (req, res) => {
  res.json({ loggedIn: true, user: req.user });
});

// Settings API (Public read, Protected write)
app.get('/api/settings', async (req, res) => {
  try {
    const db = await getDb();
    const rows = await db.all('SELECT * FROM settings');
    const settings = rows.reduce((acc, row) => ({ ...acc, [row.key]: row.value }), {});
    res.json(settings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/settings', authenticateToken, async (req, res) => {
  try {
    const db = await getDb();
    for (const [key, value] of Object.entries(req.body)) {
      await db.run('UPDATE settings SET value = ? WHERE key = ?', [value, key]);
    }
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Stats API
app.post('/api/stats', async (req, res) => {
  try {
    const { type, source } = req.body;
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    const db = await getDb();
    await db.run('INSERT INTO statistics (type, source, ip_address) VALUES (?, ?, ?)', [type, source || null, ip]);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Stats Dashboard (Protected)
app.get('/api/admin/stats', authenticateToken, async (req, res) => {
  try {
    const db = await getDb();
    const totalVisits = await db.get(`SELECT COUNT(*) as count FROM statistics WHERE type = 'visit'`);
    const totalClicks = await db.get(`SELECT COUNT(*) as count FROM statistics WHERE type = 'click'`);
    
    // Group by source for clicks
    const clicksBySource = await db.all(`
      SELECT source, COUNT(*) as count 
      FROM statistics 
      WHERE type = 'click' 
      GROUP BY source 
      ORDER BY count DESC
    `);

    // Visits over time (last 7 days grouped by date)
    const visitsByDate = await db.all(`
      SELECT date(created_at) as date, COUNT(*) as count
      FROM statistics
      WHERE type = 'visit' AND created_at >= date('now', '-7 days')
      GROUP BY date(created_at)
      ORDER BY date ASC
    `);

    res.json({
      visits: totalVisits.count,
      clicks: totalClicks.count,
      clicksBySource,
      visitsByDate
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


// Catch-all handler for React Router
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
