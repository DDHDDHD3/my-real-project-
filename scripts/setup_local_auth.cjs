const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

// Use local Docker DB connection
const pool = new Pool({
    connectionString: 'postgres://postgres:postgres_secure_password@localhost:5433/portfolio_db'
});

async function setupLocal() {
    try {
        console.log('Connecting to Local Docker Postgres (localhost:5433)...');
        const password = 'Portfolio_Admin_2026!';
        const hashedPassword = await bcrypt.hash(password, 10);

        // Ensure table exists (though server should handle it)
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);

        const res = await pool.query('UPDATE users SET password = $1 WHERE username = $2 RETURNING *', [hashedPassword, 'admin']);
        if (res.rowCount === 0) {
            await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['admin', hashedPassword]);
            console.log('Local Admin user created.');
        } else {
            console.log('Local Admin password updated.');
        }
        console.log('Success! Use "admin" / "Portfolio_Admin_2026!" for local login.');
    } catch (err) {
        console.error('Error:', err.message);
        console.log('Tip: Make sure your Docker containers are running (docker-compose up -d)');
    } finally {
        await pool.end();
    }
}

setupLocal();
