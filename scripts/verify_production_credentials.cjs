const https = require('https');

const API_URL = 'https://portfolio-backend-mzf2.onrender.com/api/auth/login';

async function testLogin(username, password) {
    return new Promise((resolve) => {
        const data = JSON.stringify({ username, password });
        const url = new URL(API_URL);

        const options = {
            hostname: url.hostname,
            path: url.pathname,
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': data.length
            }
        };

        const req = https.request(options, (res) => {
            let body = '';
            res.on('data', (chunk) => body += chunk);
            res.on('end', () => {
                resolve({
                    status: res.statusCode,
                    body: body
                });
            });
        });

        req.on('error', (error) => {
            resolve({ error: error.message });
        });

        req.write(data);
        req.end();
    });
}

async function runTests() {
    console.log('--- Testing Production API ---');

    console.log('1. Testing admin / admin_secure_password...');
    const res1 = await testLogin('admin', 'admin_secure_password');
    console.log(`   Status: ${res1.status}, Body: ${res1.body}`);

    console.log('2. Testing admin / admin123...');
    const res2 = await testLogin('admin', 'admin123');
    console.log(`   Status: ${res2.status}, Body: ${res2.body}`);

    console.log('3. Testing Admin (capitalized) / admin123...');
    const res3 = await testLogin('Admin', 'admin123');
    console.log(`   Status: ${res3.status}, Body: ${res3.body}`);
}

runTests();
