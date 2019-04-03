rom=[162,180,35,230,34,182,112,1,208,17,48,37,18,6,113,255,208,17,96,26,208,17,96,37,49,0,18,14,196,112,68,112,18,28,195,3,96,30,97,3,34,92,245,21,208,20,63,1,18,60,208,20,113,255,208,20,35,64,18,28,231,161,34,114,232,161,34,132,233,161,34,150,226,158,18,80,102,0,246,21,246,7,54,0,18,60,208,20,113,1,18,42,162,196,244,30,102,0,67,1,102,4,67,2,102,8,67,3,102,12,246,30,0,238,208,20,112,255,35,52,63,1,0,238,208,20,112,1,35,52,0,238,208,20,112,1,35,52,63,1,0,238,208,20,112,255,35,52,0,238,208,20,115,1,67,4,99,0,34,92,35,52,63,1,0,238,208,20,115,255,67,255,99,3,34,92,35,52,0,238,128,0,103,5,104,6,105,4,97,31,101,16,98,7,0,238,64,224,0,0,64,192,64,0,0,224,64,0,64,96,64,0,64,64,96,0,32,224,0,0,192,64,64,0,0,224,128,0,64,64,192,0,0,224,32,0,96,64,64,0,128,224,0,0,64,192,128,0,192,96,0,0,64,192,128,0,192,96,0,0,128,192,64,0,0,96,192,0,128,192,64,0,0,96,192,0,192,192,0,0,192,192,0,0,192,192,0,0,192,192,0,0,64,64,64,64,0,240,0,0,64,64,64,64,0,240,0,0,208,20,102,53,118,255,54,0,19,56,0,238,162,180,140,16,60,30,124,1,60,30,124,1,60,30,124,1,35,94,75,10,35,114,145,192,0,238,113,1,19,80,96,27,107,0,208,17,63,0,123,1,208,17,112,1,48,37,19,98,0,238,96,27,208,17,112,1,48,37,19,116,142,16,141,224,126,255,96,27,107,0,208,225,63,0,19,144,208,225,19,148,208,209,123,1,112,1,48,37,19,134,75,0,19,166,125,255,126,255,61,1,19,130,35,192,63,1,35,192,122,1,35,192,128,160,109,7,128,210,64,4,117,254,69,2,101,4,0,238,167,0,242,85,168,4,250,51,242,101,240,41,109,50,110,0,221,229,125,5,241,41,221,229,125,5,242,41,221,229,167,0,242,101,162,180,0,238,106,0,96,25,0,238,55,35]
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
        pause=0
    }
}
onkeyup=e=>keys[keymap.indexOf(e.key)]=0

function cycle() {
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

}

~function loop() {
    requestAnimationFrame(loop)
    for(i=0;i< 10;i++) cycle()
} ()
