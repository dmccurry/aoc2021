const fs = require('fs');

const min = -50;
const max = 50;
const cubes = {};

const executeLine = (line) => {
  const [instruction, points] = line.split(' ');
  const [x, y, z] = points.split(',');
  const xMin = parseInt(x.replace('x=', '').split('..')[0]);
  const xMax = parseInt(x.replace('x=', '').split('..')[1]);
  const yMin = parseInt(y.replace('y=', '').split('..')[0]);
  const yMax = parseInt(y.replace('y=', '').split('..')[1]);
  const zMin = parseInt(z.replace('z=', '').split('..')[0]);
  const zMax = parseInt(z.replace('z=', '').split('..')[1]);

  if (xMin <= min && xMax <= min) {
    return 0;
  }
  if (yMin <=min && yMax <= min) {
    return 0;
  }
  if (zMin <=min && zMax <= min) {
    return 0;
  }
  if (xMin >= max && xMax >= max) {
    return 0;
  }
  if (yMin >= max && yMax >= max) {
    return 0;
  }
  if (zMin >= max && zMax >= max) {
    return 0;
  }
  let n = 0;
  for (let i=xMin; i<=xMax; i++) {
    for (let j=yMin; j<=yMax; j++) {
      for (let k=zMin; k<=zMax; k++) {
        if (i >= min && i <= max && j >= min && j<= max && k>= min && k<=max) {
          if (instruction === 'on') {
            if (!cubes[`${i},${j},${k}`] || cubes[`${i},${j},${k}`] === 0) {
              n++;
            }
            cubes[`${i},${j},${k}`] = 1;
          } else {
            if (cubes[`${i},${j},${k}`] && cubes[`${i},${j},${k}`] === 1) {
              n--;
              cubes[`${i},${j},${k}`] = 0;
            }
          }
        }
      }
    }
  }
  return n;
}

fs.readFile('./input', 'utf-8', (err, data) => {
  const lines = data.split('\n');
  let cubesOn = 0;
  for (let i=0; i<lines.length; i++) {
    cubesOn += executeLine(lines[i]);
  }
  console.log(`Solution is ${cubesOn}`);
})