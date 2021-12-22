const fs = require('fs');
fs.readFile('./input', 'utf-8', (err, data) => {
  const lines = data.split('\n');
  let stack = [];
  for (let i=0; i<lines.length; i++) {
    let [state, points] = lines[i].split(' ');
    let [xp, yp, zp] = points.split(',');
    let x1 = parseInt(xp.replace('x=', '').split('..')[0]);
    let x2 = parseInt(xp.replace('x=', '').split('..')[1]);
    let y1 = parseInt(yp.replace('y=', '').split('..')[0]);
    let y2 = parseInt(yp.replace('y=', '').split('..')[1]);
    let z1 = parseInt(zp.replace('z=', '').split('..')[0]);
    let z2 = parseInt(zp.replace('z=', '').split('..')[1]);

    let cube = [state === 'on' ? 1:-1, x1, x2, y1, y2, z1, z2];
    let l = stack.length;
    for (let j=0; j<l; j++) {
      let ax = Math.max(cube[1], stack[j][1]);
      let bx = Math.min(cube[2], stack[j][2]);
      let ay = Math.max(cube[3], stack[j][3]);
      let by = Math.min(cube[4], stack[j][4]);
      let az = Math.max(cube[5], stack[j][5]);
      let bz = Math.min(cube[6], stack[j][6]);

      if (ax <= bx && ay <= by && az <= bz) {
        let newCube = [-stack[j][0], ax, bx, ay, by, az, bz];
        stack.push(newCube);
      }
    }
    if (cube[0] === 1) {
      stack.push(cube);
    }
  }
  let v = 0;
  for (let i=0; i<stack.length; i++) {
    v += (stack[i][0]) * (stack[i][2] + 1 - stack[i][1]) * (stack[i][4] + 1 - stack[i][3]) * (stack[i][6] + 1 - stack[i][5]);
  }
  console.log(v);
})