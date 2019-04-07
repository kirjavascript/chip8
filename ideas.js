// https://github.com/jed/140bytes/wiki/Byte-saving-techniques -->
// https://codegolf.stackexchange.com/questions/37624/tips-for-golfing-in-ecmascript-6-and-above -->
//
// (new TextEncoder).encode('abcd') (RIP edge)
//
// I=B=D=P=E=S=0; // could save 1char by moving where another zero is
// location.search -> location.hash

// Object.getOwnPropertyNames(window).map((p,i)=>window[String.fromCharCode(i+248)]=window[p])
// document.body.appendChild(document.createElement('pre')).textContent = Object.getOwnPropertyNames(window).map((p,i)=>JSON.stringify([p, String.fromCharCode(i+248)])).join`\n`
// onkeydown=onkeyup=e=>{i=J.indexOf(e.key);G[i]=+!!e.type[5];P&&(V[x]=i,P=0)};


// K=[240,144,144,144,240,32,96,32,32,112,240,16,240,128,240,240,16,240,16,240,144,144,240,16,16,240,128,240,16,240,240,128,240,144,240,240,16,32,64,64,240,144,240,144,240,240,144,240,16,240,240,144,240,144,144,224,144,224,144,224,240,128,128,128,240,224,144,144,144,224,240,128,240,128,240,240,128,240,128,128]
// K=[15,9,9,9,15,2,6,2,2,7,15,1,15,8,15,15,1,15,1,15,9,9,15,1,1,15,8,15,1,15,15,8,15,9,15,15,1,2,4,4,15,9,15,9,15,15,9,15,1,15,15,9,15,9,9,14,9,14,9,14,15,8,8,8,15,14,9,9,9,14,15,8,15,8,15,15,8,15,8,8,0].map(d=>d*16)
// K=[...'f999f26227f1f8ff1f1f99f11f8f1ff8f9ff1244f9f9ff9f1ff9f99e9e9ef888fe999ef8f8ff8f880'].map(d=>parseInt(d,16)*16)
// K=[];for(x of`ùòb'ñøÿñøùÿDùùÿùùøþøøÿ`)(x=x.charCodeAt(),K.push((x>>4)*16,x&~15))
    // console.log(K);

// console.log(K.map(d => (d/16).toString(16)).join``)
    // c=a=>a+a&&[a.splice(0,4),...c(a)];
    // as=c([...'f999f26227f1f8ff1f1f99f11f8f1ff8f9ff1244f9f9ff9f1ff9f99e9e9ef888fe999ef8f8ff8f880']).map(([a, b, c, d]) => String.fromCharCode(parseInt(a+b+c+d, 16)))
// document.write(as.join``)
// K=[];for(x of `蓮⟱἟駱ᾏῸ刺ቄ粒ﾟΌ咽麞ﺙ黸辈`)for(y of x.charCodeAt().toString(16).padStart(4,0))K.push(parseInt(y,16)*16)

// console.log(c(K).map(([...ch]) => {
    // var v = 0;
    // for (i=5;i>=0;i--) {
    //     v += (ch[6-i-1] << (i * 8))
    //     console.log(3-i-1, i * 8)
    // }
    // return v.toString(36)
    // ((ch[0] << 24) + (ch[1] << 16) + (ch[2] << 8) + ch[3]).toString(36)
// }).join`+`)

// console.log(K);
//
// K=[];for(g of'9dwuo+5nl7k+3r0v4+4en0w+9dtrk+9d7n4+nsls+5nl74+nslc+9d7n4+9dtrk+5nldc+mngg+2j7v4+9dwxc+9dwxc+nsog+5nlao+5ni4w+8rfts+9dtog+5149s+5n2c0+8ryps+9dtrk+9dtrk+50hz4'.split`+`)for(i=2;i>=0;)K.push((parseInt(g,36)>>i--*8)&255)

// // string compression
// document.write(K.map((a,i) => {
//     console.log(i);
//     return String.fromCharCode(a)
// }).join``)
//  l='ðð ` pðððððððððððððð @@ððððððððàààððààððððð'.length
// console.log(l);

// [...'ðð ` pðððððððððððððð @@ððððððððàààððààððððð'].map(d=>d.charCodeAt())

// 邐怠ჰ胰䁀郰郠郠肀邐肀 20
// 邐†胰ჰჰ胰⁀郰郰郠肀邐胰胰 27

// K=[];
// [...'邐†胰ჰჰ胰⁀郰郰郠肀邐胰胰'].map(d=>{
//     c=d.charCodeAt()
//     console.log(c>> 24, c >> 16, c >> 8, c);
//     for(i=24;i=>0;i-=8) --1>
//         console.log(c<<i)
//         K.push(c<<i)
// })

// K=[];
// for(n of'邐怠⁰ჰჰ邐ჰ胰ჰဠ䁀郰ჰ郠郠郠肀邐郠胰肀')(n=n.charCodeAt(),K.push(n>>8,n&255));

// document.write(JSON.stringify(K))
//
