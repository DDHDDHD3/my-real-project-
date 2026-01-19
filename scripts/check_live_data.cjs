const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgresql://neondb_owner:npg_emr3diS1DhcU@ep-lingering-art-ah6lo7cz-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require'
});

async function checkData() {
    try {
        const projects = await pool.query('SELECT * FROM projects');
        console.log(`Projects (${projects.rowCount}):`);
        projects.rows.forEach(p => console.log(`- ${p.title}`));

        const messages = await pool.query('SELECT * FROM messages');
        console.log(`Messages (${messages.rowCount}):`);
        messages.rows.forEach(m => console.log(`- From: ${m.name} (${m.email})`));

        const skills = await pool.query('SELECT * FROM skills');
        console.log(`Skills (${skills.rowCount})`);
    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await pool.end();
    }
}

checkData();
