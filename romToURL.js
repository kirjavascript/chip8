const fs = require('fs');
const [node, program, rom] = process.argv;

if (!rom) {
    console.log('usage: node romToURL.js romname.ch8');
} else {
    var contents = fs.readFileSync(rom);
    console.log('http://chip8.kirjava.xyz/?' + Buffer.from(contents).toString('base64'));
}
