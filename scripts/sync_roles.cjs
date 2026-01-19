const { Pool } = require('pg');
const bcrypt = require('bcryptjs');

// Connection string for Neon (Production)
const NEON_URL = 'postgresql://neondb_owner:npg_emr3diS1DhcU@ep-lingering-art-ah6lo7cz-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';
// Connection string for Local Docker
const LOCAL_URL = 'postgres://postgres:postgres_secure_password@localhost:5433/portfolio_db';

async function setupRoles(url, name) {
    const pool = new Pool({ connectionString: url });
    console.log(`\n--- Setting up roles for ${name} ---`);

    try {
        // 1. Add role column if not exists
        await pool.query('ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(20) DEFAULT \'editor\'');
        console.log('✓ "role" column ensured.');

        const password = 'Portfolio_Admin_2026!';
        const hashedPassword = await bcrypt.hash(password, 10);

        // 2. Create/Update Admin (Role: admin)
        await pool.query(`
            INSERT INTO users (username, password, role) 
            VALUES ($1, $2, $3)
            ON CONFLICT (username) 
            DO UPDATE SET role = 'admin', password = $2
        `, ['admin', hashedPassword, 'admin']);
        console.log('✓ User "admin" set to role: admin');

        // 3. Create/Update Viewer (Role: viewer)
        const viewerPass = await bcrypt.hash('viewer123', 10);
        await pool.query(`
            INSERT INTO users (username, password, role) 
            VALUES ($1, $2, $3)
            ON CONFLICT (username) 
            DO UPDATE SET role = 'viewer', password = $2
        `, ['viewer', viewerPass, 'viewer']);
        console.log('✓ User "viewer" created/set to role: viewer (Pass: viewer123)');

    } catch (err) {
        console.error(`✗ Error on ${name}:`, err.message);
    } finally {
        await pool.end();
    }
}

async function run() {
    // Run Local
    await setupRoles(LOCAL_URL, 'Local Docker');
    // Run Production
    await setupRoles(NEON_URL, 'Neon Production');
    console.log('\nAll done! Roles and users are synchronized.');
}

run();
