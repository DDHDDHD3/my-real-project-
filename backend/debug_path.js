const path = require('path');
const fs = require('fs');

console.log('__dirname:', __dirname);
const publicPath = path.join(__dirname, '../dist');
console.log('Public Path:', publicPath);
console.log('Public Path Exists:', fs.existsSync(publicPath));

const indexPath = path.join(__dirname, '../dist/index.html');
console.log('Index Path:', indexPath);
console.log('Index Path Exists:', fs.existsSync(indexPath));

try {
    const stats = fs.statSync(indexPath);
    console.log('Index File Stats:', stats);
} catch (error) {
    console.error('Error stating index file:', error);
}
