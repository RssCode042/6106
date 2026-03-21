import express from 'express';
import { createServer } from 'http';
import { Server } from 'socket.io';
import Database from 'better-sqlite3';
import next from 'next';
import { parse } from 'url';

const dev = process.env.NODE_ENV !== 'production';
const nextApp = next({ dev });
const handle = nextApp.getRequestHandler();

const db = new Database('taxi.db');

// Initialize Database
db.exec(`
  CREATE TABLE IF NOT EXISTS drivers (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    phone TEXT,
    status TEXT DEFAULT 'offline',
    lat REAL,
    lng REAL,
    car_brand TEXT,
    car_type TEXT,
    work_number TEXT,
    license_plate TEXT,
    payment_methods TEXT,
    accepts_animals TEXT,
    languages TEXT,
    is_smoker INTEGER DEFAULT 0,
    is_approved INTEGER DEFAULT 0,
    last_update DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS orders (
    id TEXT PRIMARY KEY,
    customer_name TEXT,
    customer_phone TEXT,
    pickup_address TEXT NOT NULL,
    destination_address TEXT,
    details TEXT,
    status TEXT DEFAULT 'pending',
    driver_id TEXT,
    type TEXT DEFAULT 'client',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(driver_id) REFERENCES drivers(id)
  );

  CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    sender_id TEXT NOT NULL,
    receiver_id TEXT NOT NULL,
    content TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL
  );

  INSERT OR IGNORE INTO settings (key, value) VALUES ('base_fare', '2.50');
  INSERT OR IGNORE INTO settings (key, value) VALUES ('day_tariff', '1.20');
  INSERT OR IGNORE INTO settings (key, value) VALUES ('night_tariff', '1.50');
  INSERT OR IGNORE INTO settings (key, value) VALUES ('waiting_price', '0.30');
  INSERT OR IGNORE INTO settings (key, value) VALUES ('system_name', 'Такси Админ');
  INSERT OR IGNORE INTO settings (key, value) VALUES ('maintenance_mode', 'false');

  CREATE TABLE IF NOT EXISTS driver_history (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    driver_id TEXT NOT NULL,
    lat REAL NOT NULL,
    lng REAL NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY(driver_id) REFERENCES drivers(id)
  );
`);

// --- Migrations ---

// 1. Migration for drivers table to add missing columns
const driverColumns = db.prepare('PRAGMA table_info(drivers)').all() as any[];
const driverColumnNames = driverColumns.map(c => c.name);

const columnsToAdd = [
  { name: 'car_brand', type: 'TEXT' },
  { name: 'car_type', type: 'TEXT' },
  { name: 'work_number', type: 'TEXT' },
  { name: 'license_plate', type: 'TEXT' },
  { name: 'payment_methods', type: 'TEXT' },
  { name: 'accepts_animals', type: 'TEXT' },
  { name: 'languages', type: 'TEXT' },
  { name: 'is_smoker', type: 'INTEGER DEFAULT 0' },
  { name: 'is_approved', type: 'INTEGER DEFAULT 0' }
];

columnsToAdd.forEach(col => {
  if (!driverColumnNames.includes(col.name)) {
    try {
      db.exec(`ALTER TABLE drivers ADD COLUMN ${col.name} ${col.type}`);
    } catch (err) {
      console.warn(`Could not add column ${col.name} to drivers:`, err);
    }
  }
});

// 2. Migration for orders table to add missing columns
const orderColumns = db.prepare('PRAGMA table_info(orders)').all() as any[];
const orderColumnNames = orderColumns.map(c => c.name);

const orderColumnsToAdd = [
  { name: 'type', type: 'TEXT DEFAULT "client"' },
  { name: 'details', type: 'TEXT' }
];

orderColumnsToAdd.forEach(col => {
  if (!orderColumnNames.includes(col.name)) {
    try {
      db.exec(`ALTER TABLE orders ADD COLUMN ${col.name} ${col.type}`);
    } catch (err) {
      console.warn(`Could not add column ${col.name} to orders:`, err);
    }
  }
});

nextApp.prepare().then(() => {
  const app = express();
  const httpServer = createServer(app);
  const io = new Server(httpServer);

  app.use(express.json());

  app.get('/api/addresses/search', (req, res) => {
    const { q } = req.query;
    if (!q || typeof q !== 'string') return res.json([]);
    
    // Mock Bulgarian addresses for demonstration
    const mockAddresses = [
      'бул. Витоша 1, София',
      'ул. Граф Игнатиев 10, София',
      'бул. Цар Освободител 15, София',
      'ул. Иван Вазов 5, Пловдив',
      'бул. Шести Септември 20, Пловдив',
      'ул. Богориди 3, Бургас',
      'бул. Княз Борис I 50, Варна',
      'ул. Александровска 12, Русе',
      'ул. Търговска 8, Перник',
      'бул. България 100, София',
      'ул. Пиротска 22, София',
      'бул. Сливница 150, София',
      'ул. Оборище 33, София',
      'бул. Черни връх 45, София',
      'ул. Г. С. Раковски 108, София',
      'бул. Мария Луиза 2, София',
      'ул. Алабин 16, София',
      'бул. Васил Левски 40, София',
      'ул. Шипка 6, София',
      'бул. Янко Сакъзов 1, София',
      'ул. Кракра 11, София',
      'бул. Прага 18, София',
      'ул. Солунска 24, София',
      'бул. Христо Ботев 50, София',
      'ул. Позитано 8, София',
      'бул. Македония 1, София',
      'ул. Княз Борис I 120, София',
      'бул. Дондуков 1, София',
      'ул. Московска 3, София',
      'бул. Цар Борис III 10, София',
    ];

    const results = mockAddresses.filter(addr => 
      addr.toLowerCase().includes(q.toLowerCase())
    );
    
    res.json(results);
  });

  app.get('/api/docs', (req, res) => {
    res.json({
      name: 'Taxi Admin API',
      version: '1.0.0',
      endpoints: [
        { path: '/api/drivers', method: 'GET', description: 'Get all drivers' },
        { path: '/api/orders', method: 'GET', description: 'Get all orders' },
        { path: '/api/settings', method: 'GET/POST', description: 'Manage system settings' },
        { path: '/api/system/info', method: 'GET', description: 'Get system health and stats' },
        { path: '/api/addresses/search?q=...', method: 'GET', description: 'Search for Bulgarian addresses' },
      ],
      server: {
        node: process.version,
        platform: process.platform,
        uptime: process.uptime()
      }
    });
  });

  // API Routes
  app.get('/api/settings', (req, res) => {
    const settings = db.prepare('SELECT * FROM settings').all();
    const settingsMap = settings.reduce((acc: any, curr: any) => {
      acc[curr.key] = curr.value;
      return acc;
    }, {});
    res.json(settingsMap);
  });

  app.post('/api/settings', (req, res) => {
    const { settings } = req.body;
    const updateStmt = db.prepare('INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)');
    
    const transaction = db.transaction((settingsObj) => {
      for (const [key, value] of Object.entries(settingsObj)) {
        updateStmt.run(key, String(value));
      }
    });

    transaction(settings);
    res.json({ success: true });
  });

  app.get('/api/system/info', (req, res) => {
    const stats = {
      drivers: (db.prepare('SELECT COUNT(*) as count FROM drivers').get() as any).count,
      approvedDrivers: (db.prepare('SELECT COUNT(*) as count FROM drivers WHERE is_approved = 1').get() as any).count,
      pendingDrivers: (db.prepare('SELECT COUNT(*) as count FROM drivers WHERE is_approved = 0').get() as any).count,
      orders: (db.prepare('SELECT COUNT(*) as count FROM orders').get() as any).count,
      completedOrders: (db.prepare("SELECT COUNT(*) as count FROM orders WHERE status = 'completed'").get() as any).count,
      messages: (db.prepare('SELECT COUNT(*) as count FROM messages').get() as any).count,
    };

    res.json({
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      nodeVersion: process.version,
      platform: process.platform,
      dbPath: 'taxi.db',
      socketConnections: io.engine.clientsCount,
      stats
    });
  });

  app.post('/api/system/restart', (req, res) => {
    res.json({ success: true, message: 'System restart initiated...' });
    setTimeout(() => {
      process.exit(0);
    }, 1000);
  });

  app.post('/api/system/backup', (req, res) => {
    try {
      const backupPath = `taxi_backup_${Date.now()}.db`;
      db.backup(backupPath)
        .then(() => {
          res.json({ success: true, message: `Backup created: ${backupPath}` });
        })
        .catch((err) => {
          res.status(500).json({ success: false, error: err.message });
        });
    } catch (err: any) {
      res.status(500).json({ success: false, error: err.message });
    }
  });

  app.get('/api/system/analysis', (req, res) => {
    const tableInfo = {
      drivers: db.prepare('PRAGMA table_info(drivers)').all(),
      orders: db.prepare('PRAGMA table_info(orders)').all(),
      settings: db.prepare('PRAGMA table_info(settings)').all(),
    };
    
    const dbSize = (db.prepare('PRAGMA page_count').get() as any)['page_count'] * (db.prepare('PRAGMA page_size').get() as any)['page_size'];

    res.json({
      tableInfo,
      dbSize,
      integrity: (db.prepare('PRAGMA integrity_check').get() as any)['integrity_check']
    });
  });

  app.get('/api/drivers/:id/history', (req, res) => {
    const { id } = req.params;
    const history = db.prepare('SELECT lat, lng, timestamp FROM driver_history WHERE driver_id = ? ORDER BY timestamp ASC').all(id);
    res.json(history);
  });

  app.get('/api/drivers', (req, res) => {
    const drivers = db.prepare('SELECT * FROM drivers').all();
    res.json(drivers);
  });

  app.patch('/api/drivers/:id/approve', (req, res) => {
    const { id } = req.params;
    const { is_approved } = req.body;
    db.prepare('UPDATE drivers SET is_approved = ? WHERE id = ?').run(is_approved ? 1 : 0, id);
    const updatedDriver = db.prepare('SELECT * FROM drivers WHERE id = ?').get(id);
    io.emit('driver:status_changed', updatedDriver);
    res.json(updatedDriver);
  });

  app.delete('/api/drivers/:id', (req, res) => {
    const { id } = req.params;
    db.prepare('DELETE FROM drivers WHERE id = ?').run(id);
    db.prepare('DELETE FROM driver_history WHERE driver_id = ?').run(id);
    io.emit('driver:deleted', id);
    res.json({ success: true });
  });

  app.get('/api/orders', (req, res) => {
    const orders = db.prepare('SELECT * FROM orders ORDER BY created_at DESC').all();
    res.json(orders);
  });

  app.post('/api/orders', (req, res) => {
    const { id, customer_name, customer_phone, pickup_address, destination_address, details, type } = req.body;
    const stmt = db.prepare('INSERT INTO orders (id, customer_name, customer_phone, pickup_address, destination_address, details, type) VALUES (?, ?, ?, ?, ?, ?, ?)');
    stmt.run(id, customer_name || null, customer_phone || null, pickup_address, destination_address || null, details || null, type || 'client');
    
    const newOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
    io.emit('order:new', newOrder);
    res.status(201).json(newOrder);
  });

  app.patch('/api/orders/:id', (req, res) => {
    const { id } = req.params;
    const { status, driver_id } = req.body;
    
    const stmt = db.prepare('UPDATE orders SET status = ?, driver_id = ? WHERE id = ?');
    stmt.run(status, driver_id || null, id);
    
    const updatedOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
    io.emit('order:status_changed', updatedOrder);
    res.json(updatedOrder);
  });

  app.get('/api/messages/:userId', (req, res) => {
    const { userId } = req.params;
    const messages = db.prepare('SELECT * FROM messages WHERE sender_id = ? OR receiver_id = ? ORDER BY timestamp ASC').all(userId, userId);
    res.json(messages);
  });

  app.post('/api/messages', (req, res) => {
    const { sender_id, receiver_id, content } = req.body;
    const stmt = db.prepare('INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)');
    const result = stmt.run(sender_id, receiver_id, content);
    const newMessage = db.prepare('SELECT * FROM messages WHERE id = ?').get(result.lastInsertRowid);
    io.emit(`message:${receiver_id}`, newMessage);
    res.status(201).json(newMessage);
  });

  // Socket.io Logic
  io.on('connection', (socket) => {
    socket.on('message:send', (data) => {
      const { sender_id, receiver_id, content } = data;
      const stmt = db.prepare('INSERT INTO messages (sender_id, receiver_id, content) VALUES (?, ?, ?)');
      const result = stmt.run(sender_id, receiver_id, content);
      const newMessage = db.prepare('SELECT * FROM messages WHERE id = ?').get(result.lastInsertRowid);
      io.emit(`message:${receiver_id}`, newMessage);
      io.emit(`message:${sender_id}`, newMessage); // Echo back to sender
    });

    socket.on('driver:update_location', (data) => {
      const { 
        id, lat, lng, status, 
        car_brand, car_type, work_number, license_plate, 
        payment_methods, accepts_animals, languages, is_smoker 
      } = data;
      const existing = db.prepare('SELECT * FROM drivers WHERE id = ?').get(id);
      if (existing) {
        db.prepare(`
          UPDATE drivers SET 
            lat = ?, lng = ?, status = ?, 
            car_brand = COALESCE(?, car_brand), 
            car_type = COALESCE(?, car_type), 
            work_number = COALESCE(?, work_number), 
            license_plate = COALESCE(?, license_plate), 
            payment_methods = COALESCE(?, payment_methods), 
            accepts_animals = COALESCE(?, accepts_animals), 
            languages = COALESCE(?, languages), 
            is_smoker = COALESCE(?, is_smoker),
            last_update = CURRENT_TIMESTAMP 
          WHERE id = ?
        `).run(
          lat, lng, status, 
          car_brand, car_type, work_number, license_plate, 
          payment_methods, accepts_animals, languages, is_smoker, 
          id
        );

        // Store in history
        db.prepare('INSERT INTO driver_history (driver_id, lat, lng) VALUES (?, ?, ?)').run(id, lat, lng);
        
        // Limit history to last 50 points per driver
        db.prepare(`
          DELETE FROM driver_history 
          WHERE id IN (
            SELECT id FROM driver_history 
            WHERE driver_id = ? 
            ORDER BY timestamp DESC 
            LIMIT -1 OFFSET 50
          )
        `).run(id);
      } else {
        db.prepare(`
          INSERT INTO drivers (
            id, name, phone, status, lat, lng, 
            car_brand, car_type, work_number, license_plate, 
            payment_methods, accepts_animals, languages, is_smoker
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `).run(
          id, data.name || 'Unknown Driver', data.phone || '', status, lat, lng, 
          car_brand, car_type, work_number, license_plate, 
          payment_methods, accepts_animals, languages, is_smoker
        );
      }
      io.emit('driver:location_changed', { id, lat, lng, status });
    });

    socket.on('order:update_status', (data) => {
      const { id, status, driver_id } = data;
      db.prepare('UPDATE orders SET status = ?, driver_id = ? WHERE id = ?').run(status, driver_id || null, id);
      const updatedOrder = db.prepare('SELECT * FROM orders WHERE id = ?').get(id);
      io.emit('order:status_changed', updatedOrder);
    });
  });

  // Next.js handler
  app.all(/.*/, (req, res) => {
    const parsedUrl = parse(req.url!, true);
    handle(req, res, parsedUrl);
  });

  const PORT = 3000;
  httpServer.listen(PORT, () => {
    console.log(`> Ready on http://localhost:${PORT}`);
  });
});
