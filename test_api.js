import https from 'https';

const payload = JSON.stringify({
    username: 'admin',
    password: 'admin123'
});

const options = {
    hostname: 'portfolio-backend-mzf2.onrender.com',
    port: 443,
    path: '/api/auth/login',
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': payload.length
    }
};

console.log('Testing login via API...');
const req = https.request(options, (res) => {
    let data = '';
    console.log('Status Code:', res.statusCode);

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Response:', data);
        try {
            const json = JSON.parse(data);
            if (res.statusCode === 200 && json.token) {
                console.log('SUCCESS: API Login works!');
            } else {
                console.log('FAILURE: API Login failed.');
            }
        } catch (e) {
            console.log('Error parsing JSON:', e.message);
        }
    });
});

req.on('error', (error) => {
    console.error('Network Error:', error.message);
});

req.write(payload);
req.end();
