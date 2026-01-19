const https = require('https');

const login = (username, password) => {
    return new Promise((resolve) => {
        const body = JSON.stringify({ username, password });
        console.log(`Attempting login for: ${username} with password: ${password}`);

        const options = {
            hostname: 'portfolio-backend-mzf2.onrender.com',
            path: '/api/auth/login',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': body.length
            }
        };

        const req = https.request(options, (res) => {
            let resBody = '';
            res.on('data', d => resBody += d);
            res.on('end', () => {
                console.log(`Response Status: ${res.statusCode}`);
                console.log(`Response Body: ${resBody}`);
                resolve(res.statusCode === 200);
            });
        });

        req.on('error', e => {
            console.error(`Request Error: ${e.message}`);
            resolve(false);
        });

        req.write(body);
        req.end();
    });
};

async function run() {
    await login('admin', 'admin123');
    await login('admin', 'admin_secure_password');
}

run();
