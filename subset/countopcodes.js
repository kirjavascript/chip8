
const fs = require('fs');
const files = fs.readdirSync('roms/');

files.forEach(file => {
    if (file.endsWith('.ch8')) {
        c=a=>a+a&&[a.splice(0,2),...c(a)];
        opcodes = {};
        c(Array.from(fs.readFileSync('roms/' + file)))
            .forEach(([b1,b2]) => {
                byte = (b1 << 8) +  b2
                byte = byte & 0xF0FF
                    byte = byte.toString(16).padStart(4,0)
                if (byte[0] == 'f') {
                        if (opcodes[byte]) {
                            opcodes[byte] +=1
                        } else {
                            opcodes[byte] = 1;
                        }
                }
            });
        console.log(file)
console.log(opcodes);
    }
});
