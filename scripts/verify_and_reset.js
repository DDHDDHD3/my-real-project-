import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;
const connectionString = 'postgresql://neondb_owner:npg_emr3diS1DhcU@ep-lingering-art-ah6lo7cz-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const pool = new Pool({ connectionString });

async function verifyAndReset() {
    try {
        const password = 'admin123';
        console.log(`1. Hashing password "${password}"...`);
        const hash = await bcrypt.hash(password, 10);
        console.log('   Hash generated:', hash);

        console.log('2. Verifying hash locally...');
        const isMatch = await bcrypt.compare(password, hash);
        console.log('   Local verification:', isMatch ? 'SUCCESS' : 'FAILURE');

        if (!isMatch) throw new Error('Local hash verification failed!');

        console.log('3. Updating database...');
        await pool.query('UPDATE users SET password = $1 WHERE username = $2', [hash, 'admin']);
        console.log('   Database updated for user "admin".');

        // Verify it was actually saved
        const result = await pool.query('SELECT password FROM users WHERE username = $2', ['admin']);
        if (result.rows.length > 0) {
            const savedHash = result.rows[0].password;
            const isSavedMatch = await bcrypt.compare(password, savedHash);
            console.log('4. Verification from DB:', isSavedMatch ? 'SUCCESS' : 'FAILURE');
        } else {
            console.log('   ERROR: User admin not found during verification.');
        }

    } catch (err) {
        console.error('Error:', err);
    } finally {
        await pool.end();
    }
}

verifyAndReset();
