const { Pool } = require('pg');

const pool = new Pool({
    connectionString: 'postgres://postgres:postgres_secure_password@localhost:5433/portfolio_db'
});

async function checkLocalData() {
    try {
        console.log('Checking LOCAL Docker Database (localhost:5433)...');

        const projects = await pool.query('SELECT * FROM projects');
        console.log(`Projects (${projects.rowCount}):`);
        projects.rows.forEach(p => console.log(`- ${p.title} (ID: ${p.id})`));

        const messages = await pool.query('SELECT * FROM messages');
        console.log(`Messages (${messages.rowCount}):`);
        messages.rows.forEach(m => console.log(`- From: ${m.name} (ID: ${m.id})`));

        const skills = await pool.query('SELECT * FROM skills');
        console.log(`Skills count: ${skills.rowCount}`);

    } catch (err) {
        console.error('Error:', err.message);
    } finally {
        await pool.end();
    }
}

checkLocalData();
