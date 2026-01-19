import https from 'https';

const options = {
    hostname: 'portfolio-backend-mzf2.onrender.com',
    port: 443,
    path: '/health',
    method: 'GET'
};

console.log('Testing health endpoint...');
const req = https.request(options, (res) => {
    let data = '';
    console.log('Status Code:', res.statusCode);

    res.on('data', (chunk) => {
        data += chunk;
    });

    res.on('end', () => {
        console.log('Response:', data);
    });
});

req.on('error', (error) => {
    console.error('Network Error:', error.message);
});

req.end();
