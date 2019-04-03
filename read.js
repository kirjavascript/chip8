var fs = require('fs');
var contents = fs.readFileSync('tetris.ch8');
console.log(JSON.stringify(Array.from(contents)));
