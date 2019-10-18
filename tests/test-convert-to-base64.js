const fs = require('fs');

console.log(fs.readFileSync('./test3.jpg').toString('base64'));
