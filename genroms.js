const fs = require('fs');
const files = fs.readdirSync('roms/');

files.forEach(file => {
    if (file.endsWith('.ch8')) {
        // console.log(
        //     '#### ['
        //     + file.replace(/\[/g,'«').replace(/\]/g,'»').replace(/\.ch8$/,'')
        //     + ']'
        //     + '(http://chip8.kirjava.xyz/?'
        //     + Buffer.from(fs.readFileSync('roms/' + file)).toString('base64')
        //     + ')'
        // );
        console.log(
            '<a href="index.html?'
            + Buffer.from(fs.readFileSync('roms/' + file)).toString('base64')
            + '">'
            + file
            + '</a><br />'
        );
    }
});
