const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

(async () => {
  try {
    const res = await pool.query('SELECT id, username FROM users ORDER BY id ASC');
    if (!res.rows || res.rows.length === 0) {
      console.log('No users found in the `users` table.');
      process.exit(0);
    }

    console.log('Users:');
    res.rows.forEach(row => console.log(`${row.id}\t${row.username}`));
    process.exit(0);
  } catch (err) {
    console.error('Error querying users:', err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
})();
