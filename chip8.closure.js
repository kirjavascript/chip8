var d = ["\n"];
d.raw = ["\\n"];
var f = [""];
f.raw = f.slice();
function g(a) {
  var b = 0;
  return function() {
    return b < a.length ? {done:!1, value:a[b++]} : {done:!0};
  };
}
function h(a) {
  if (!(a instanceof Array)) {
    var b = "undefined" != typeof Symbol && Symbol.iterator && a[Symbol.iterator];
    a = b ? b.call(a) : {next:g(a)};
    for (var e = []; !(b = a.next()).done;) {
      e.push(b.value);
    }
    a = e;
  }
  return a;
}
rom = [].concat(h(atob(location.search.slice(1)))).map(function(a) {
  return a.charCodeAt(0);
});
font = [240, 144, 144, 144, 240, 32, 96, 32, 32, 112, 240, 16, 240, 128, 240, 240, 16, 240, 16, 240, 144, 144, 240, 16, 16, 240, 128, 240, 16, 240, 240, 128, 240, 144, 240, 240, 16, 32, 64, 64, 240, 144, 240, 144, 240, 240, 144, 240, 16, 240, 240, 144, 240, 144, 144, 224, 144, 224, 144, 224, 240, 128, 128, 128, 240, 224, 144, 144, 144, 224, 240, 128, 240, 128, 240, 240, 128, 240, 128, 128];
ram = [].concat(h(Array(4096))).fill(0);
V = [].concat(h(Array(16))).fill(0);
ST = DT = I = 0;
PC = 512;
SP = 0;
stack = [].concat(h(Array(16))).fill(0);
o = pause = 0;
gfx = [].concat(h(Array(2048))).fill(0);
keys = [].concat(h(Array(16))).fill(0);
ram.splice.apply(ram, [0, 0].concat(h(font)));
ram.splice.apply(ram, [512, 0].concat(h(rom)));
ram = ram.slice(0, 4096);
keymap = [].concat(h("1234qwerasdfzxcv"));
onkeyup = function(a) {
  index = keymap.indexOf(a.key);
  keys[index] = 0;
  pause && (V[x] = index, pause = 0);
};
onkeydown = function(a) {
  return keys[keymap.indexOf(a.key)] = 1;
};
~function k() {
  requestAnimationFrame(k);
  for (i = 0; 10 > i; i++) {
    a: {
      if (!pause) {
        switch(opcode = ram[PC] << 8 | ram[PC + 1], x = (opcode & 3840) >> 8, y = (opcode & 240) >> 4, z = opcode & 15, kk = opcode & 255, kkk = opcode & 4095, PC += 2, opcode & 61440) {
          case 0:
            224 == opcode ? gfx = [].concat(h(Array(2048))).fill(0) : 238 == opcode && (PC = stack[--SP]);
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
            i = V[15] = 0;
            for (py = V[y] % 32; i < z; i++, py = (py + 1) % 32) {
              for (j = 0, px = V[x] % 64; 8 > j; j++, px = (px + 1) % 64) {
                loc = px + 64 * py, gfx[loc] ^= ram[I + i] & 1 << 7 - j, !gfx[loc] && (V[15] = 1);
              }
            }
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
                pause = 1;
                break a;
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
            }break;
          default:
            throw Error("unimplemented opcode: 0x" + opcode.toString(16));
        }
      }
    }
  }
  c = function(b) {
    return b + b && [b.splice(0, 64).map(function(e) {
      return e ? "  " : "\u2588\u2588";
    }).join(f)].concat(h(c(b)));
  };
  document.body.innerHTML = "<pre>" + c([].concat(h(gfx))).join(d);
  DT && DT--;
}();
