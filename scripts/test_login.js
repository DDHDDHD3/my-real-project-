import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_emr3diS1DhcU@ep-lingering-art-ah6lo7cz-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

async function testLogin() {
    try {
        console.log('Connecting to Neon...');
        // 1. Fetch User
        const result = await pool.query("SELECT * FROM users WHERE username = 'admin'");

        if (result.rows.length === 0) {
            console.log('ERROR: User "admin" not found in DB.');
            return;
        }

        const user = result.rows[0];
        console.log('User found:', user.username);
        console.log('Stored Hash:', user.password);

        // 2. Compare Password
        const passwordAttempt = 'admin_secure_password';
        const isMatch = await bcrypt.compare(passwordAttempt, user.password);

        if (isMatch) {
            console.log('SUCCESS: Password matches! Credentials are correct in DB.');
        } else {
            console.log('FAILURE: Password mismatch.');

            // Debug: try hashing it again to see difference
            const newHash = await bcrypt.hash(passwordAttempt, 10);
            console.log('Expected Hash (generated now):', newHash);
        }

    } catch (err) {
        console.error('Test failed:', err);
    } finally {
        await pool.end();
    }
}

testLogin();
