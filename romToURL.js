const fs = require('fs');
const [node, program, rom] = process.argv;
console.log(String.fromCharCode(...[240,144,144,144,240,32,96,32,32,112,240,16,240,128,240,240,16,240,16,240,144,144,240,16,16,240,128,240,16,240,240,128,240,144,240,240,16,32,64,64,240,144,240,144,240,240,144,240,16,240,240,144,240,144,144,224,144,224,144,224,240,128,128,128,240,224,144,144,144,224,240,128,240,128,240,240,128,240,128,128]))

if (!rom) {
    console.log('usage: node romToURL.js romname.ch8');
} else {
    var contents = fs.readFileSync(rom);
    console.log('http://chip8.kirjava.xyz/?' + Buffer.from(contents).toString('base64'));
}
