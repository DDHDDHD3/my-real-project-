import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_emr3diS1DhcU@ep-lingering-art-ah6lo7cz-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

async function seed() {
    try {
        console.log('Connecting to Neon...');
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(50) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);
        console.log('Created users table.');

        await pool.query(`
             CREATE TABLE IF NOT EXISTS profile (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                role VARCHAR(100),
                email VARCHAR(100),
                phone VARCHAR(50),
                address VARCHAR(255),
                github VARCHAR(255),
                mission TEXT
            );
        `);
        console.log('Created profile table.');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS projects (
                id SERIAL PRIMARY KEY,
                title VARCHAR(100),
                description TEXT,
                image_url TEXT,
                link VARCHAR(255),
                link_text VARCHAR(50)
            );
        `);
        console.log('Created projects table.');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS skill_categories (
                id SERIAL PRIMARY KEY,
                title VARCHAR(100),
                description TEXT
            );
        `);
        console.log('Created skill_categories table.');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS skills (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100),
                icon TEXT,
                color VARCHAR(50),
                category_id INTEGER REFERENCES skill_categories(id) ON DELETE CASCADE
            );
        `);
        console.log('Created skills table.');

        await pool.query(`
            CREATE TABLE IF NOT EXISTS messages (
                id SERIAL PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(100) NOT NULL,
                message TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            );
        `);
        console.log('Created messages table.');

        // Seed Admin
        const userCount = await pool.query('SELECT COUNT(*) FROM users');
        if (parseInt(userCount.rows[0].count) === 0) {
            const hashedPassword = await bcrypt.hash('admin_secure_password', 10);
            await pool.query('INSERT INTO users (username, password) VALUES ($1, $2)', ['admin', hashedPassword]);
            console.log('Admin user seeded.');
        } else {
            console.log('Admin user already exists.');
        }

    } catch (err) {
        console.error('Error seeding database:', err);
    } finally {
        await pool.end();
    }
}

seed();
