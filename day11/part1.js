const fs = require('fs');

const octo = [];

const isFlashed = (x, y, flashed) => {
  for (let i=0; i<flashed.length; i++) {
    if (flashed[i].x == x && flashed[i].y == y) return true;
  }
  return false;
}

const doStep = () => {
  // increase all by 1
  for (let i=0; i<octo.length; i++) {
    octo[i] = octo[i].map(a => a+1);
  }
  const flashed = [];
  let hasFlashes = true;

  while (hasFlashes) {
    hasFlashes = false;
    for (let i=0; i<octo.length; i++) {
      for (let j=0; j<octo.length; j++) {
        if (octo[i][j] > 9 && !isFlashed(i, j, flashed)) {
          hasFlashes = true;
          flashed.push({x: i, y: j});
          if (i > 0 && j > 0) {
            octo[i-1][j-1]++;
          }
          if (i < octo.length - 1 && j < octo[i].length - 1) {
            octo[i+1][j+1]++;
          }
          if (i > 0 && j < octo[i].length - 1) {
            octo[i-1][j+1]++;
          }
          if (i < octo.length - 1 && j > 0) {
            octo[i+1][j-1]++;
          }
          if (i > 0) {
            octo[i-1][j]++;
          }
          if (j > 0) {
            octo[i][j-1]++;
          }
          if (i < octo.length - 1) {
            octo[i+1][j]++;
          }
          if (j < octo[i].length - 1) {
            octo[i][j+1]++;
          }
        }
      }
    }
  }
  for (let i=0; i<flashed.length; i++) {
    octo[flashed[i].x][flashed[i].y] = 0;
  }
  return flashed.length;
}

fs.readFile('./input', 'utf-8', (err, data) => {
  const lines = data.split('\n');
  for (let i=0; i<lines.length; i++) {
    octo[i] = lines[i].split('').map(a => parseInt(a));
  }
  const nSteps = 100;
  let flashes = 0;

  for (let i=0; i<nSteps; i++) {
    flashes += doStep();
  }
  console.log(`Solution is ${flashes}`)
});