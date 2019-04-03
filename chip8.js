rom=[106,2,107,12,108,63,109,12,162,234,218,182,220,214,110,0,34,212,102,3,104,2,96,96,240,21,240,7,48,0,18,26,199,23,119,8,105,255,162,240,214,113,162,234,218,182,220,214,96,1,224,161,123,254,96,4,224,161,123,2,96,31,139,2,218,182,141,112,192,10,125,254,64,0,125,2,96,0,96,31,141,2,220,214,162,240,214,113,134,132,135,148,96,63,134,2,97,31,135,18,70,2,18,120,70,63,18,130,71,31,105,255,71,0,105,1,214,113,18,42,104,2,99,1,128,112,128,181,18,138,104,254,99,10,128,112,128,213,63,1,18,162,97,2,128,21,63,1,18,186,128,21,63,1,18,200,128,21,63,1,18,194,96,32,240,24,34,212,142,52,34,212,102,62,51,1,102,3,104,254,51,1,104,2,18,22,121,255,73,254,105,255,18,200,121,1,73,2,105,1,96,4,240,24,118,1,70,64,118,254,18,108,162,242,254,51,242,101,241,41,100,20,101,0,212,85,116,21,242,41,212,85,0,238,128,128,128,128,128,128,128,0,0,0,0,0]
// console.log(btoa(String.fromCharCode(...rom)))
// console.log([...atob(location.search.slice(1))].map(d => d.charCodeAt(0)))
// romToURL.js
//
// closure -> beautify  for ideas
// regpack for packing
// set UTF-8 in kirjava.xyz
//
// (new TextEncoder).encode('abcd') (RIP edge)

font=[ // TODO: String.fromCharCode(...
0xF0,0x90,0x90,0x90,0xF0,
0x20,0x60,0x20,0x20,0x70,
0xF0,0x10,0xF0,0x80,0xF0,
0xF0,0x10,0xF0,0x10,0xF0,
0x90,0x90,0xF0,0x10,0x10,
0xF0,0x80,0xF0,0x10,0xF0,
0xF0,0x80,0xF0,0x90,0xF0,
0xF0,0x10,0x20,0x40,0x40,
0xF0,0x90,0xF0,0x90,0xF0,
0xF0,0x90,0xF0,0x10,0xF0,
0xF0,0x90,0xF0,0x90,0x90,
0xE0,0x90,0xE0,0x90,0xE0,
0xF0,0x80,0x80,0x80,0xF0,
0xE0,0x90,0x90,0x90,0xE0,
0xF0,0x80,0xF0,0x80,0xF0,
0xF0,0x80,0xF0,0x80,0x80
]

// memory

// TODO: slice from RAM to create other arrays

ram=[...Array(4096)].fill(0)
V=[...Array(16)].fill(0) // 8 bit
I=0 // 12bit used
DT=0 // delay timer
ST=0 // sound timer
PC=0x200 // 16 bit
SP=0 // 8 bit
stack=[...Array(16)].fill(0) // 16 bit
pause=0

o=0 // sound
gfx=[...Array(64*32)].fill(0) // graphics
keys=[...Array(16)].fill(0) // input

// load font

ram.splice(0, 0, ...font);

// load program into memory

ram.splice(0x200, 0, ...rom);

// truncate memory (probably not needed)

ram = ram.slice(0, 4096)

// handle input

keymap=[...'1234qwerasdfzxcv']
onkeydown=e=>{
    index=keymap.indexOf(e.key)
    keys[index]=1
    if (pause) {
        V[x] = index
    }
}
onkeyup=e=>keys[keymap.indexOf(e.key)]=0

~function loop() {
    requestAnimationFrame(loop)
    if (pause) return; // TODO

    // get opcode (2 bytes)
    opcode = ram[PC] << 8 | ram[PC + 1]
    x = (opcode & 0x0F00) >> 8 // TODO: divide
    y = (opcode & 0x00F0) >> 4
    z = opcode & 0x000F
    kk = opcode & 0x00FF
    kkk = opcode & 0x0FFF

    // inc program counter
    PC += 2

    switch (opcode & 0xF000) {
        case 0:
            if (opcode == 0x00E0) { // CLS
                gfx = [...Array(64*32)].fill(0)
            } else if (opcode == 0x00EE) { // RET
                PC = stack[--SP]
            }
            break;
        case 0x1000: // JUMP
            PC = kkk
            break;
        case 0x2000: // CALL
            stack[SP] = PC
            SP++
            PC = kkk
        case 0x3000:
            if (V[x] == kk) {
                PC += 2
            }
            break;
        case 0x4000:
            if (V[x] != kk) {
                PC += 2
            }
            break;
        case 0x5000:
            if (V[x] == V[y]) {
                PC += 2
            }
            break;
        case 0x6000:
            V[x] = kk;
            break;
        case 0x7000:
            V[x] = (kk + V[x]) % 256
            break;
        case 0x8000:
            switch (z) {
                case 0x0000:
                    V[x] = V[y];
                    break;
                case 0x0001:
                    V[x] |= V[y];
                    break;
                case 0x0002:
                    V[x] &= V[y];
                    break;
                case 0x0003:
                    V[x] ^= V[y];
                    break;
                case 0x0004:
                    V[x] += V[y];
                    V[0xF] = +(V[x] > 255);
                    V[x] %= 256;
                    break;
                case 0x0005:
                    V[0xF] = +(V[x] > V[y]);
                    V[x] -= V[y];
                    if (V[x] < 0) {
                        V[x] += 256;
                    }
                    break;
                case 0x0006:
                    V[0xF] = V[x] & 0x1;
                    V[x] >>= 1;
                    break;
                case 0x0007:
                    V[0xF] = +(V[y] > V[x]);
                    V[x] = V[y] - V[x];
                    if (V[x] < 0) {
                        V[x] += 256;
                    }
                    break;
                case 0x000E:
                    V[0xF] = +(V[x] & 0x80);
                    V[x] *= 2;
                    V[x] %= 256;
            }
            break;
        case 0x9000:
            if (V[x] != V[y]) {
                PC += 2
            }
            break;
        case 0xA000: // ADDR
            I = kkk
            break;
        case 0xB000:
            PC = kkk + V[0];
            break;
        case 0xC000:
            V[x] = (0|Math.random() * 0xFF) & kk
            break;
        case 0xD000:
            V[0xF] = 0;

            for (i = 0; i < z; i++) {
                sprite = ram[I + i];
                for (j = 0; j < 8; j++) {
                    // TODO: optimize
                    if ((sprite & 0x80) > 0) {
                        x0 = V[x] + j
                        y0 = V[y] + i

                        if (x0 < 0) {
                            x0 += 64;
                        } else {
                            x0 %= 64
                        }

                        if (y0 < 0) {
                            y0 += 32;
                        } else {
                            y0 %= 32
                        }

                        loc = x0 + (y0 * 64);

                        gfx[loc] ^= 1;

                        if (!gfx[loc]) {
                            V[0xF] = 1
                        }
                    }
                    sprite <<= 1;
                }
            }

            break;
        case 0xE000:
            switch (kk) {
                case 0x009E:
                    if (keys[V[x]]) {
                        PC += 2;
                    }
                    break;
                case 0x00A1:
                    if (!keys[V[x]]) {
                        PC += 2;
                    }
            }
            break;
        case 0xF000:
            switch (kk) {
                case 0x0007:
                    V[x] = DT;
                    break;
                case 0x000A:
                    pause=1
                    return;
                case 0x0015:
                    DT = V[x]
                    break;
                case 0x0018:
                    ST = V[x]
                    break;
                case 0x001E:
                    I += V[x]
                    break;
                case 0x0029:
                    I = V[x] * 5
                    break;
                case 0x0033:
                    ram[I] = parseInt(V[x] / 100)
                    ram[I+1] = parseInt(V[x] % 100 / 10)
                    ram[I+ 2] = V[x] % 10
                    break;
                case 0x0055:
                    for (i = 0; i <= x; i++) {
                        ram[I+ i] = V[i];
                    }
                    break;
                case 0x0065:
                    for (i = 0; i <= x; i++) {
                        V[i] = ram[I + i];
                    }
                    break;

            }

            break;
        default:
            throw new Error(`unimplemented opcode: 0x${opcode.toString(16)}`)
    }

    // TODO: change map with for of
    c=a=>a+a&&[a.splice(0,64).map(d=>d?' ':'&block;').join``,...c(a)]
    document.body.innerHTML='<pre>'+c([...gfx]).join`\n`

    // handle timers

    if (DT) DT--
    if (ST) {
        ST--
        if (!o) {
            ac = new AudioContext()
            o = ac.createOscillator()
            // o.type = "sine"
            o.connect(ac.destination)
            o.start()
        }
    } else {
        if (o) o.stop(),o=0
    }

} ()
