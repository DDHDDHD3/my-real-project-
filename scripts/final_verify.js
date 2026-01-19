import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;
const connectionString = 'postgresql://neondb_owner:npg_emr3diS1DhcU@ep-lingering-art-ah6lo7cz-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const pool = new Pool({ connectionString });

async function finalCheck() {
    try {
        console.log('--- Final Database Check ---');
        const result = await pool.query('SELECT username, password FROM users WHERE username ILIKE $1', ['admin']);

        if (result.rows.length === 0) {
            console.log('ERROR: User "admin" NOT found!');
            return;
        }

        const user = result.rows[0];
        console.log(`User found: ${user.username}`);

        const testPassword = 'admin123';
        const isMatch = await bcrypt.compare(testPassword, user.password);

        if (isMatch) {
            console.log(`SUCCESS: Password "${testPassword}" correctly matches the hash in DB.`);
        } else {
            console.log(`FAILURE: Password "${testPassword}" does NOT match the hash in DB.`);
            console.log(`Actual hash: ${user.password}`);
        }

    } catch (err) {
        console.error('Check failed:', err);
    } finally {
        await pool.end();
    }
}

finalCheck();
