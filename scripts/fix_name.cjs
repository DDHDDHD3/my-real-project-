const { Pool } = require('pg');

const localUrl = 'postgres://postgres:postgres_secure_password@localhost:5433/portfolio_db';
const prodUrl = 'postgresql://neondb_owner:npg_emr3diS1DhcU@ep-lingering-art-ah6lo7cz-pooler.c-3.us-east-1.aws.neon.tech/neondb?sslmode=require';

async function fixName() {
    const localPool = new Pool({ connectionString: localUrl });
    const prodPool = new Pool({ connectionString: prodUrl });

    const correctName = 'ABDULLAHI MUSE ISSE';

    try {
        console.log('Fixing name in Local Docker...');
        await localPool.query('UPDATE profile SET name = $1', [correctName]);
        console.log('✓ Local name fixed.');

        console.log('Fixing name in Production (Neon)...');
        await prodPool.query('UPDATE profile SET name = $1', [correctName]);
        console.log('✓ Production name fixed.');

    } catch (err) {
        console.error('Error fixing name:', err.message);
    } finally {
        await localPool.end();
        await prodPool.end();
        console.log('\nProcess finished.');
    }
}

fixName();
