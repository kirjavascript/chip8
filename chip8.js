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
//
// TODO: move counter to a=s=b=[]
// Object.getOwnPropertyNames(window).map((p,i)=>window[String.fromCharCode(i+248)]=window[p])
// document.body.appendChild(document.createElement('pre')).textContent = Object.getOwnPropertyNames(window).map((p,i)=>JSON.stringify([p, String.fromCharCode(i+248)])).join`\n`

K=[240,144,144,144,240,32,96,32,32,112,240,16,240,128,240,240,16,240,16,240,144,144,240,16,16,240,128,240,16,240,240,128,240,144,240,240,16,32,64,64,240,144,240,144,240,240,144,240,16,240,240,144,240,144,144,224,144,224,144,224,240,128,128,128,240,224,144,144,144,224,240,128,240,128,240,240,128,240,128,128].concat([...Array(4016)].fill(0))
V=K.slice(80,96)
M=K.slice(80,2128)
K.splice(512,0,...[...atob(location.search.slice(1))].map(d => d.charCodeAt(0)))
I=B=D=P=E=S=0
F=G=[]
H=512
J=[...'x123qweasdzc4rfv']
onkeyup=e=>{i=J.indexOf(e.key);G[i]=0;P&&(V[x]=i,P=0)}
onkeydown=e=>G[J.indexOf(e.key)]=1
L=_=>{
    requestAnimationFrame(L)
    for(i=0;i< 9;i++) {
        if (!P) {
            switch(opcode = K[H] << 8 | K[H + 1], x = (opcode & 3840) >> 8, y = (opcode & 240) >> 4, z = opcode & 15, kk = opcode & 255, kkk = opcode & 4095, H += 2, opcode & 61440) {
                case 0:
                    224 == opcode ? M = [...Array(2048)].fill(0) : 238 == opcode && (H = F[--E]);
                    break;
                case 4096:
                    H = kkk;
                    break;
                case 8192:
                    F[E] = H, E++, H = kkk;
                case 12288:
                    V[x] == kk && (H += 2);
                    break;
                case 16384:
                    V[x] != kk && (H += 2);
                    break;
                case 20480:
                    V[x] == V[y] && (H += 2);
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
                    V[x] != V[y] && (H += 2);
                    break;
                case 40960:
                    I = kkk;
                    break;
                case 45056:
                    H = kkk + V[0];
                    break;
                case 49152:
                    V[x] = (0 | 255 * Math.random()) & kk;
                    break;
                case 53248:
                    V[15] = 0;
                    K.slice(I, z + I).map((a, b) => {
                        for (j = 0; 8 > j; j++) {
                            0 < (a & 128) && (x0 = V[x] + j, y0 = V[y] + b, loc = (0 > x0 ? x0 + 64 : x0 % 64) + 64 * (0 > y0 ? y0 + 32 : y0 % 32), M[loc] ^= 1, M[loc] || (V[15] = 1)), a <<= 1;
                        }
                    });
                    break;
                case 57344:
                    switch(kk) {
                        case 158:
                            G[V[x]] && (H += 2);
                            break;
                        case 161:
                            G[V[x]] || (H += 2);
                    }break;
                case 61440:
                    switch(kk) {
                        case 7:
                            V[x] = B;
                            break;
                        case 10:
                            P = 1;
                            return;
                        case 21:
                            B = V[x];
                            break;
                        case 24:
                            D = V[x];
                            break;
                        case 30:
                            I += V[x];
                            break;
                        case 41:
                            I = 5 * V[x];
                            break;
                        case 51:
                            K[I] = parseInt(V[x] / 100);
                            K[I + 1] = parseInt(V[x] % 100 / 10);
                            K[I + 2] = V[x] % 10;
                            break;
                        case 85:
                            for (i = 0; i <= x; i++) {
                                K[I + i] = V[i];
                            }
                            break;
                        case 101:
                            for (i = 0; i <= x; i++) {
                                V[i] = K[I + i];
                            }
                    }
            }
        }
    }
    c=a=>a+a&&[a.splice(0,64).map(d=>d?'░░':'██').join``,...c(a)]
    document.body.innerHTML='<pre>'+c([...M]).join`\n`
    B&&B--
    D?(D--,S||(A=new AudioContext,S=A.createOscillator(),S.connect(A.destination),S.start())):S&&(S.stop(),S=0)
};L()
