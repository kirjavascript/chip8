I=B=D=P=E=S=0;
F=[];
G=[];
H=512;
J=[...'x123qweasdzc4rfv'];
T=Array(4016).fill(0);
K=[...'f999f26227f1f8ff1f1f99f11f8f1ff8f9ff1244f9f9ff9f1ff9f99e9e9ef888fe999ef8f8ff8f880'].map(d=>parseInt(d,16)*16).concat(T);
V=T.slice(0,16);
M=T.slice(0,2048);
K.splice(H,0,...[...atob(location.search.slice(1))].map(d=>d.charCodeAt()));
onkeyup=e=>{i=J.indexOf(e.key);G[i]=0;P&&(V[x]=i,P=0)};
onkeydown=e=>G[J.indexOf(e.key)]=1;
setInterval(_=>{
    for(L=9;L--;)
        !P&&(
            O=K[H]<< 8|K[H+1],x=(O&3840)>>8,y=(O&240)>>4,z=O&15,R=O&255,Q=O&4095,H+=2,
            [
                _=>224==O?M=T.slice(0,2048):238==O&&(H=F[--E]),
                _=>H=Q,
                _=>(F[E]=H,E++,H=Q),
                _=>V[x]==R&&(H+=2),
                _=>V[x]^R&&(H+=2),
                _=>V[x]==V[y]&&(H+=2),
                _=>V[x]=R,
                _=>V[x]=(R+V[x])%256,
                _=>[
                    _=>V[x]=V[y],
                    _=>V[x]|=V[y],
                    _=>V[x]&=V[y],
                    _=>V[x]^=V[y],
                    _=>(V[x]+=V[y],V[15]=+(V[x]>255),V[x]%=256),
                    _=>(V[15]=+(V[x]>V[y]),V[x]-=V[y],0>V[x]&&(V[x]+=256)),
                    _=>(V[15]=V[x]&1,V[x]>>=1),
                    _=>(V[15]=+(V[y]>V[x]),V[x]=V[y]-V[x],0>V[x]&&(V[x]+=256)),
                    _=>3,_=>1,_=>3,_=>3,_=>7,_=>0,
                    _=>(V[15]=+(V[x]&128),V[x]*=2,V[x]%=256),
                ][z](),
                _=>V[x]^V[y]&&(H+=2),
                _=>I=Q,
                _=>H=Q+V[0],
                _=>V[x]=(new Date%255)&R,
                _=>{
                    V[15]=0;
                    K.slice(I,z+I).map((a,b)=>{
                        for(j=0;8>j;j++)(a&128)>0&&(x0=V[x]+j,y0=V[y]+b,loc=(0>x0?x0+64:x0%64)+64*(0>y0?y0+32:y0%32),M[loc]^=1,M[loc]||(V[15]=1)),a<<=1
                    })
                },
                _=>R==158?G[V[x]]&&(H+=2):G[V[x]]||(H+=2),
                _=>{
                    switch(R){
                        case 7:
                            V[x]=B;
                            break;
                        case 10:
                            P=1;
                            return;
                        case 21:
                            B=V[x];
                            break;
                        case 24:
                            D=V[x];
                            break;
                        case 30:
                            I+=V[x];
                            break;
                        case 41:
                            I=5*V[x];
                            break;
                        case 51:
                            K.splice(I,3,...[...(''+V[x]).padStart(3,0)].map(d=>+d));
                            break;
                        case 85:
                            for(i=0;i<=x;)K[I+i]=V[i++];
                            break;
                        case 101:
                            for(i=0;i<=x;)V[i]=K[I+i++]
                    }
                },
            ][(O&61440)/4096]()
        );
    c=a=>a+a&&[a.splice(0,64).map(d=>d?'░░':'██').join``,...c(a)];
    document.body.innerHTML='<pre>'+c([...M]).join`\n`;
    B&&B--;
    D?(D--,S||(A=new AudioContext,S=A.createOscillator(),S.connect(A.destination),S.start())):S&&(S.stop(),S=0)
},16)
