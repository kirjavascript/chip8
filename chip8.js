rom=[106,2,107,12,108,63,109,12,162,234,218,182,220,214,110,0,34,212,102,3,104,2,96,96,240,21,240,7,48,0,18,26,199,23,119,8,105,255,162,240,214,113,162,234,218,182,220,214,96,1,224,161,123,254,96,4,224,161,123,2,96,31,139,2,218,182,141,112,192,10,125,254,64,0,125,2,96,0,96,31,141,2,220,214,162,240,214,113,134,132,135,148,96,63,134,2,97,31,135,18,70,2,18,120,70,63,18,130,71,31,105,255,71,0,105,1,214,113,18,42,104,2,99,1,128,112,128,181,18,138,104,254,99,10,128,112,128,213,63,1,18,162,97,2,128,21,63,1,18,186,128,21,63,1,18,200,128,21,63,1,18,194,96,32,240,24,34,212,142,52,34,212,102,62,51,1,102,3,104,254,51,1,104,2,18,22,121,255,73,254,105,255,18,200,121,1,73,2,105,1,96,4,240,24,118,1,70,64,118,254,18,108,162,242,254,51,242,101,241,41,100,20,101,0,212,85,116,21,242,41,212,85,0,238,128,128,128,128,128,128,128,0,0,0,0,0]

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

// TODO: location.search.slice(1) for ROM / convertToURL.js

p = document.querySelector('pre');

// memory

ram=[...Array(4096)].fill(0)
V=[...Array(16)].fill(0) // 8 bit
I=0 // 12bit used
DT=0 // delay timer
ST=0 // sound timer
PC=0x200 // 16 bit
SP=0 // 8 bit
stack=[...Array(16)].fill(0) // 16 bit

o=0 // sound
gfx=[...Array(64*32)].fill(0) // graphics
keys=[...Array(16)].fill(0) // input

// load font

ram.splice(0, 0, ...font);

// load program into memory

ram.splice(0x200, 0, ...rom);

// truncate memory (probably not needed)

ram = ram.slice(0, 4096)

~function loop() {
    requestAnimationFrame(loop)

    // get opcode (2 bytes)
    opcode = ram[PC] << 8 | ram[PC + 1]
    x = (opcode & 0x0F00) >> 8
    y = (opcode & 0x00F0) >> 4
    z = opcode & 0x000F
    kk = opcode && 0x00FF
    kkk = opcode && 0x0FFF

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
                    V[x] >>= 1; // TODO: divide by 2?
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
                    V[x] <<= 1; // TODO: multiply by 2?
                    V[x] %= 256;
                    break;
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
        default:
            throw new Error(`unimplemented opcode: 0x${opcode.toString(16)}`)
    }

    // copy gfx to page TODO: chunk: aem1k/world trick

    p.innerText = gfx.map(d=>d?' ':'█').join``

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
