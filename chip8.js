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

ram=[240,144,144,144,240,32,96,32,32,112,240,16,240,128,240,240,16,240,16,240,144,144,240,16,16,240,128,240,16,240,240,128,240,144,240,240,16,32,64,64,240,144,240,144,240,240,144,240,16,240,240,144,240,144,144,224,144,224,144,224,240,128,128,128,240,224,144,144,144,224,240,128,240,128,240,240,128,240,128,128].concat([...Array(4016)].fill(0))
V=ram.slice(80,96)
gfx=ram.slice(80,2128)
I=DT=ST=P=SP=S=0
stack=[]
keys=[]
PC=512
ram.splice(0x200, 0, ...rom)
keymap=[...'x123qweasdzc4rfv']
onkeyup=e=>{
    index=keymap.indexOf(e.key)
    keys[index]=0
    if (P) {
        V[x] = index
        P=0
    }
}
onkeydown=e=>keys[keymap.indexOf(e.key)]=1
function cycle() {
    if (!P) {
        switch(opcode = ram[PC] << 8 | ram[PC + 1], x = (opcode & 3840) >> 8, y = (opcode & 240) >> 4, z = opcode & 15, kk = opcode & 255, kkk = opcode & 4095, PC += 2, opcode & 61440) {
            case 0:
                224 == opcode ? gfx = [...Array(2048)].fill(0) : 238 == opcode && (PC = stack[--SP]);
                break;
            case 4096:
                PC = kkk;
                break;
            case 8192:
                stack[SP] = PC, SP++, PC = kkk;
            case 12288:
                V[x] == kk && (PC += 2);
                break;
            case 16384:
                V[x] != kk && (PC += 2);
                break;
            case 20480:
                V[x] == V[y] && (PC += 2);
                break;
            case 24576:
                V[x] = kk;
                break;
            case 28672:
                V[x] = (kk + V[x]) % 256;
                break;
            case 32768:
                switch(z) {
                    case 0:
                        V[x] = V[y];
                        break;
                    case 1:
                        V[x] |= V[y];
                        break;
                    case 2:
                        V[x] &= V[y];
                        break;
                    case 3:
                        V[x] ^= V[y];
                        break;
                    case 4:
                        V[x] += V[y];
                        V[15] = +(255 < V[x]);
                        V[x] %= 256;
                        break;
                    case 5:
                        V[15] = +(V[x] > V[y]);
                        V[x] -= V[y];
                        0 > V[x] && (V[x] += 256);
                        break;
                    case 6:
                        V[15] = V[x] & 1;
                        V[x] >>= 1;
                        break;
                    case 7:
                        V[15] = +(V[y] > V[x]);
                        V[x] = V[y] - V[x];
                        0 > V[x] && (V[x] += 256);
                        break;
                    case 14:
                        V[15] = +(V[x] & 128), V[x] *= 2, V[x] %= 256;
                }break;
            case 36864:
                V[x] != V[y] && (PC += 2);
                break;
            case 40960:
                I = kkk;
                break;
            case 45056:
                PC = kkk + V[0];
                break;
            case 49152:
                V[x] = (0 | 255 * Math.random()) & kk;
                break;
            case 53248:
                V[15] = 0;
                ram.slice(I, z + I).map((a, b) => {
                    for (j = 0; 8 > j; j++) {
                        0 < (a & 128) && (x0 = V[x] + j, y0 = V[y] + b, loc = (0 > x0 ? x0 + 64 : x0 % 64) + 64 * (0 > y0 ? y0 + 32 : y0 % 32), gfx[loc] ^= 1, gfx[loc] || (V[15] = 1)), a <<= 1;
                    }
                });
                break;
            case 57344:
                switch(kk) {
                    case 158:
                        keys[V[x]] && (PC += 2);
                        break;
                    case 161:
                        keys[V[x]] || (PC += 2);
                }break;
            case 61440:
                switch(kk) {
                    case 7:
                        V[x] = DT;
                        break;
                    case 10:
                        P = 1;
                        return;
                    case 21:
                        DT = V[x];
                        break;
                    case 24:
                        ST = V[x];
                        break;
                    case 30:
                        I += V[x];
                        break;
                    case 41:
                        I = 5 * V[x];
                        break;
                    case 51:
                        ram[I] = parseInt(V[x] / 100);
                        ram[I + 1] = parseInt(V[x] % 100 / 10);
                        ram[I + 2] = V[x] % 10;
                        break;
                    case 85:
                        for (i = 0; i <= x; i++) {
                            ram[I + i] = V[i];
                        }
                        break;
                    case 101:
                        for (i = 0; i <= x; i++) {
                            V[i] = ram[I + i];
                        }
                }
        }
    }
}

~function loop() {
    requestAnimationFrame(loop)
    for(i=0;i< 9;i++) cycle()

    // &block;
    c=a=>a+a&&[a.splice(0,64).map(d=>d?'░░':'██').join``,...c(a)]
    document.body.innerHTML='<pre>'+c([...gfx]).join`\n`

    // handle timers

    DT && DT--;
    ST ? (ST--, S || (ac = new AudioContext, S = ac.createOscillator(), S.connect(ac.destination), S.start())) : S && (S.stop(), S = 0);
} ()

// TODO: move counter to a=s=b=[]
// Object.getOwnPropertyNames(window).map((p,i)=>window[String.fromCharCode(i+248)]=window[p])
// document.body.appendChild(document.createElement('pre')).textContent = Object.getOwnPropertyNames(window).map((p,i)=>JSON.stringify([p, String.fromCharCode(i+248)])).join`\n`
