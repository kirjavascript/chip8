J=[...'x123qweasdzc4rfv'];
Q=[...Array(4016)].fill(0);
K=[240,144,144,144,240,32,96,32,32,112,240,16,240,128,240,240,16,240,16,240,144,144,240,16,16,240,128,240,16,240,240,128,240,144,240,240,16,32,64,64,240,144,240,144,240,240,144,240,16,240,240,144,240,144,144,224,144,224,144,224,240,128,128,128,240,224,144,144,144,224,240,128,240,128,240,240,128,240,128,128].concat(Q);
V=Q.slice(0,16);
M=Q.slice(0,2048);
K.splice(512,0,...[...atob(location.search.slice(1))].map(d=>d.charCodeAt(0)));
I=B=D=P=E=S=0;
F=G=[];
H=512;
onkeyup=e=>{i=J.indexOf(e.key);G[i]=0;P&&(V[x]=i,P=0)};
onkeydown=e=>G[J.indexOf(e.key)]=1;
L=_=>{setTimeout(L,16);
    for(i=0;9>i;i++){
        if(!P){
            switch(O=K[H]<< 8|K[H+1],x=(O&3840)>>8,y=(O&240)>>4,z=O&15,R=O&255,Q=O&4095,H+=2,O&61440){
                case 0:
                    224==O?M=Q.slice(0):238==O&&(H=F[--E]);
                    break;
                case 4096:
                    H=Q;
                    break;
                case 8192:
                    F[E]=H,E++,H=Q;
                case 12288:
                    V[x]==R&&(H+=2);
                    break;
                case 16384:
                    V[x]!=R&&(H+=2);
                    break;
                case 20480:
                    V[x]==V[y]&&(H+=2);
                    break;
                case 24576:
                    V[x]=R;
                    break;
                case 28672:
                    V[x]=(R+V[x])%256;
                    break;
                case 32768:
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
                            V[15]=+(255 < V[x]);
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
                            V[15]=+(V[x]&128),V[x]*=2,V[x]%=256;
                    }break;
                case 36864:
                    V[x]!=V[y]&&(H+=2);
                    break;
                case 40960:
                    I=Q;
                    break;
                case 45056:
                    H=Q+V[0];
                    break;
                case 49152:
                    V[x]=(0|255*Math.random())&R;
                    break;
                case 53248:
                    V[15]=0;
                    K.slice(I,z+I).map((a,b)=>{
                        for(j=0;8>j;j++) {
                            0< (a&128)&&(x0=V[x]+j,y0=V[y]+b,loc=(0>x0?x0+64:x0%64)+64*(0>y0?y0+32:y0%32),M[loc]^=1,M[loc]||(V[15]=1)),a<<=1;
                        }
                    });
                    break;
                case 57344:
                    switch(R){
                        case 158:
                            G[V[x]]&&(H+=2);
                            break;
                        case 161:
                            G[V[x]]||(H+=2);
                    }break;
                case 61440:
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
                            K.splice(I,3,...(''+V[x]).padStart(3,0).split``.map(d=>+d));
                            break;
                        case 85:
                            for(i=0;i<=x;i++){
                                K[I+i]=V[i]
                            }
                            break;
                        case 101:
                            for(i=0;i<=x;i++){
                                V[i]=K[I+i]
                            }
                    }
            }
        }
    }
    c=a=>a+a&&[a.splice(0,64).map(d=>d?'░░':'██').join``,...c(a)];
    document.body.innerHTML='<pre>'+c([...M]).join`\n`;
    B&&B--;
    D?(D--,S||(A=new AudioContext,S=A.createOscillator(),S.connect(A.destination),S.start())):S&&(S.stop(),S=0)
};L()
