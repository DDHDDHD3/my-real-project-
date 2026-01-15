const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

const USER = process.env.ADMIN_USER || 'admin';
const PASS = process.env.ADMIN_PASSWORD || 'admin_secure_password';

(async () => {
  try {
    const existing = await pool.query('SELECT id FROM users WHERE username = $1', [USER]);
    if (existing.rows.length > 0) {
      console.log(`User '${USER}' already exists (id: ${existing.rows[0].id}).`);
      process.exit(0);
    }

    const hashed = await bcrypt.hash(PASS, 10);
    const res = await pool.query('INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id', [USER, hashed]);
    console.log(`Created user '${USER}' (id: ${res.rows[0].id}).`);
    process.exit(0);
  } catch (err) {
    console.error('Error creating admin user:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
