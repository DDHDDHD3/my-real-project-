const { Pool } = require('./backend/node_modules/pg');
const bcrypt = require('./backend/node_modules/bcryptjs');

const pool = new Pool({
    connectionString: 'postgres://postgres:postgres_secure_password@localhost:5433/portfolio_db'
});

(async () => {
    try {
        console.log('Connecting to database...');
        const result = await pool.query('SELECT * FROM users');
        console.log('Current users:', result.rows.map(u => ({ id: u.id, username: u.username })));

        if (result.rows.length === 0) {
            console.log('No users found. Creating admin...');
            const hashed = await bcrypt.hash('admin_secure_password', 10);
            await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['admin', hashed]);
            console.log('Admin created.');
        } else {
            console.log('Resetting admin password to "admin_secure_password"...');
            const hashed = await bcrypt.hash('admin_secure_password', 10);
            // Assuming the admin user is the one with username 'admin' or the first one
            const userToUpdate = result.rows.find(u => u.username === 'admin') || result.rows[0];

            await pool.query('UPDATE users SET password = $1 WHERE id = $2', [hashed, userToUpdate.id]);
            console.log(`Password reset for user '${userToUpdate.username}'.`);
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
})();
