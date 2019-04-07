I=B=D=P=E=S=0;
F=[];
G=[];
H=512;
W=H*8;
J=[...'x123qweasdzc4rfv'];
T=Array(4016).fill(0);
K=[...'f999f26227f1f8ff1f1f99f11f8f1ff8f9ff1244f9f9ff9f1ff9f99e9e9ef888fe999ef8f8ff8f880'].map(d=>parseInt(d,16)*16).concat(T);
V=T.slice(0,16);
M=T.slice(0,W/2);
K.splice(H,0,...[...atob(location.search.slice(1))].map(d=>d.charCodeAt()));
onkeyup=e=>{i=J.indexOf(e.key);G[i]=0;P&&(V[x]=i,P=0)};
onkeydown=e=>G[J.indexOf(e.key)]=1;
setInterval(_=>{
    for(L=9;L--;)
        if(!P){
            switch(O=K[H]<< 8|K[H+1],x=(O&3840)>>8,y=(O&240)>>4,z=O&15,R=O&255,Q=O&W-1,H+=2,O&W*15){
                case 0:
                    224==O?M=T.slice(0,W/2):238==O&&(H=F[--E]);
                    break;
                case W:
                    H=Q;
                    break;
                case W*2:
                    F[E]=H,E++,H=Q;
                case W*3:
                    V[x]==R&&(H+=2);
                    break;
                case W*4:
                    V[x]^R&&(H+=2);
                    break;
                case W*5:
                    V[x]==V[y]&&(H+=2);
                    break;
                case W*6:
                    V[x]=R;
                    break;
                case W*7:
                    V[x]=(R+V[x])%256;
                    break;
                case W*8:
                    switch(z) {
                        case 0:
                            V[x]=V[y];
                            break;
                        case 1:
                            V[x]|=V[y];
                            break;
                        case 2:
                            V[x]&=V[y];
                            break;
                        case 3:
                            V[x]^=V[y];
                            break;
                        case 4:
                            V[x]+=V[y];
                            V[15]=+(V[x]>255);
                            V[x]%=256;
                            break;
                        case 5:
                            V[15]=+(V[x]>V[y]);
                            V[x]-=V[y];
                            0>V[x]&&(V[x]+=256);
                            break;
                        case 6:
                            V[15]=V[x]&1;
                            V[x]>>=1;
                            break;
                        case 7:
                            V[15]=+(V[y]>V[x]);
                            V[x]=V[y]-V[x];
                            0>V[x]&&(V[x]+=256);
                            break;
                        case 14:
                            V[15]=+(V[x]&128),V[x]*=2,V[x]%=256
                    }break;
                case W*9:
                    V[x]^V[y]&&(H+=2);
                    break;
                case W*10:
                    I=Q;
                    break;
                case W*11:
                    H=Q+V[0];
                    break;
                case W*12:
                    V[x]=(new Date%255)&R;
                    break;
                case W*13:
                    V[15]=0;
                    K.slice(I,z+I).map((a,b)=>{
                        for(j=0;8>j;j++)(a&128)>0&&(x0=V[x]+j,y0=V[y]+b,loc=(0>x0?x0+64:x0%64)+64*(0>y0?y0+32:y0%32),M[loc]^=1,M[loc]||(V[15]=1)),a<<=1
                    });
                    break;
                case W*14:
                    switch(R){
                        case 158:
                            G[V[x]]&&(H+=2);
                            break;
                        case 161:
                            G[V[x]]||(H+=2)
                    }break;
                case W*15:
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
            }
        }
    c=a=>a+a&&[a.splice(0,64).map(d=>d?'░░':'██').join``,...c(a)];
    document.body.innerHTML='<pre>'+c([...M]).join`\n`;
    B&&B--;
    D?(D--,S||(A=new AudioContext,S=A.createOscillator(),S.connect(A.destination),S.start())):S&&(S.stop(),S=0)
},16)
