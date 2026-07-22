import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DATA_DIR = path.join(__dirname, 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR);
}

const DB_PATH = path.join(DATA_DIR, 'database.sqlite');

export async function getDb() {
  const db = await open({
    filename: DB_PATH,
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS statistics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,          -- 'visit' or 'click'
      source TEXT,                 -- referrer or button_id
      ip_address TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );
  `);

  // Initialize default settings if empty
  const count = await db.get(`SELECT COUNT(*) as count FROM settings`);
  if (count.count === 0) {
    const defaultSettings = {
      app_store_url: 'https://apple.com/app-store/',
      google_play_url: 'https://play.google.com/store/',
      facebook_url: 'https://facebook.com/',
      instagram_url: 'https://instagram.com/',
      tiktok_url: 'https://tiktok.com/',
      youtube_url: 'https://youtube.com/'
    };
    
    for (const [key, value] of Object.entries(defaultSettings)) {
      await db.run('INSERT INTO settings (key, value) VALUES (?, ?)', [key, value]);
    }
  }

  return db;
}
