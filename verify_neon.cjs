const pg = require('pg');
const { Pool } = pg;

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_emr3diS1DhcU@ep-lingering-art-ah6lo7cz-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

async function checkDb() {
    try {
        console.log('Connecting to Neon...');
        const client = await pool.connect();
        console.log('Connected!');

        const res = await client.query("SELECT * FROM users WHERE username = 'admin'");
        console.log('Admin user found:', res.rows.length > 0);

        client.release();
    } catch (err) {
        console.error('Connection failed:', err);
    } finally {
        await pool.end();
    }
}

checkDb();
