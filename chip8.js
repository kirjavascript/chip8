// CHIP-8 emulator in XXX bytes
// regpack for packing
// add to main kirjava.xyz page when golf'd
// steal more things from http://ix.io/1Fgq
// TODO: step to fix bugs
// TODO: chip8.js
// newlines instead of ;
//
// (new TextEncoder).encode('abcd') (RIP edge)
//
// TODO: change map with for of
rom=[...atob(location.search.slice(1))].map(d => d.charCodeAt(0))

font=[240,144,144,144,240,32,96,32,32,112,240,16,240,128,240,240,16,240,16,240,144,144,240,16,16,240,128,240,16,240,240,128,240,144,240,240,16,32,64,64,240,144,240,144,240,240,144,240,16,240,240,144,240,144,144,224,144,224,144,224,240,128,128,128,240,224,144,144,144,224,240,128,240,128,240,240,128,240,128,128]

ram=[...Array(4096)].fill(0)
V=ram.slice(0,16)
gfx=ram.slice(0,2048)
I=DT=ST=pause=SP=o=0
stack=[]
keys=[]
PC=512

// load font

ram.splice(0, 0, ...font);

// load program into memory

ram.splice(0x200, 0, ...rom);

// truncate memory (probably not needed)

ram = ram.slice(0, 4096)

// handle input

keymap=[...'x123qweasdzc4rfv']
onkeyup=e=>{
    index=keymap.indexOf(e.key)
    keys[index]=0
    if (pause) {
        V[x] = index
        pause=0
    }
}
onkeydown=e=>keys[keymap.indexOf(e.key)]=1

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
            ram.slice(I, z + I).map((sprite, i) => {
                for (j = 0; j < 8; j++) {
                    if ((sprite & 0x80) > 0) {
                        x0 = V[x] + j
                        y0 = V[y] + i

                        loc = (x0 < 0 ? x0 + 64 : x0 % 64) + ((y0 < 0 ? y0 + 32 : y0 % 32) * 64)

                        gfx[loc] ^= 1;

                        if (!gfx[loc]) {
                            V[0xF] = 1
                        }
                    }
                    sprite <<= 1;
                }
            })
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


}

~function loop() {
    requestAnimationFrame(loop)
    for(i=0;i< 9;i++) cycle()

    // &block;
    c=a=>a+a&&[a.splice(0,64).map(d=>d?'░░':'██').join``,...c(a)]
    document.body.innerHTML='<pre>'+c([...gfx]).join`\n`

    // handle timers

    if (DT) DT--
    if (ST) {
        ST--
        if (!o) {
            ac = new AudioContext()
            o = ac.createOscillator()
            o.connect(ac.destination)
            o.start()
        }
    } else {
        if (o) o.stop(),o=0
    }
} ()

// TODO: move counter to a=s=b=[]
// Object.getOwnPropertyNames(window).map((p,i)=>window[String.fromCharCode(i+248)]=window[p])
// document.body.appendChild(document.createElement('pre')).textContent = Object.getOwnPropertyNames(window).map((p,i)=>JSON.stringify([p, String.fromCharCode(i+248)])).join`\n`
