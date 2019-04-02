var fs = require('fs');
var contents = fs.readFileSync('pong.ch8');
console.log(JSON.stringify(Array.from(contents)));
