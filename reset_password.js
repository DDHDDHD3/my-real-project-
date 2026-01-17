import pg from 'pg';
import bcrypt from 'bcryptjs';

const { Pool } = pg;

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_emr3diS1DhcU@ep-lingering-art-ah6lo7cz-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

async function resetPassword() {
    try {
        console.log('Connecting to Neon to reset password...');
        const newPassword = 'admin123';
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        const result = await pool.query(
            'UPDATE users SET password = $1 WHERE username = $2 RETURNING *',
            [hashedPassword, 'admin']
        );

        if (result.rowCount > 0) {
            console.log('SUCCESS: Admin password reset to "admin123"');
        } else {
            console.log('FAILURE: User "admin" not found. Attempting to insert...');
            await pool.query(
                'INSERT INTO users (username, password) VALUES ($1, $2)',
                ['admin', hashedPassword]
            );
            console.log('SUCCESS: Admin user created with password "admin123"');
        }
    } catch (err) {
        console.error('Error resetting password:', err);
    } finally {
        await pool.end();
    }
}

resetPassword();
