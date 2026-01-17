import pg from 'pg';

const { Pool } = pg;

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_emr3diS1DhcU@ep-lingering-art-ah6lo7cz-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

async function checkUsers() {
    try {
        console.log('Fetching users from Neon...');
        const result = await pool.query('SELECT username FROM users');
        console.log('Total Users:', result.rowCount);
        result.rows.forEach(user => {
            console.log(`- ${user.username}`);
        });
    } catch (err) {
        console.error('Error checking users:', err);
    } finally {
        await pool.end();
    }
}

checkUsers();
