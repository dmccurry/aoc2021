const { dir } = require('console');
const fs = require('fs');
const grid = [];
const printGrid = () => {
  let out = '';
  for (let i=0; i<grid.length; i++) {
    for (let j=0; j<grid[i].length; j++) {
      out += grid[i][j];
    }
    out += '\n';
  }

  console.log(out);
}
fs.readFile('./input', 'utf-8', (err, data) => {
  const lines = data.split('\n');
  let min = 0, max = 0;

  for (let i=0; i<lines.length; i++) {
    const points = lines[i].split(' -> ');
    const start = points[0], end = points[1];
    const [startX, startY] = start.split(',');
    const [endX, endY] = end.split(',');
    
    if (parseInt(startX) > max) max = parseInt(startX);
    if (parseInt(startY) > max) max = parseInt(startY);
    if (parseInt(endX) > max) max = parseInt(endX);
    if (parseInt(endY) > max) max = parseInt(endY);
  }

  // grid time!
  for (let i=0; i<max+1; i++) {
    grid[i] = [];
    for (let j=0; j<max+1; j++) {
      grid[i][j] = '.'
    }
  }

  for (let i=0; i<lines.length; i++) {
    const points = lines[i].split(' -> ');
    const start = points[0], end = points[1];
    const [startXs, startYs] = start.split(',');
    const [endXs, endYs] = end.split(',');
    const startX = parseInt(startXs);
    const startY = parseInt(startYs);
    const endX = parseInt(endXs);
    const endY = parseInt(endYs);
    if (startY === endY) { 
      // horizontal line
      let dir = 1;
      if (startX > endX) {
        dir = -1;
      }
      let j=startX;
      while (j != endX + dir) {
        if (grid[startY][j] == '.') {
          grid[startY][j] = 1;
        } else {
          grid[startY][j]++;
        }
        j += dir;
      }
    }

    else if (startX === endX) { 
      // vertical line
      let dir = 1;
      if (startY > endY) {
        dir = -1;
      }
      let j=startY;
      while (j != endY + dir) {
        if (grid[j][startX] == '.') {
          grid[j][startX] = 1;
        } else {
          grid[j][startX]++;
        }
        j += dir;
      }
    }

  }

  let score = 0;
  for (let i=0; i<grid.length; i++) {
    for (let j=0; j<grid[i].length; j++) {
      if (grid[i][j] != '.' && grid[i][j] > 1) {
        score++;
      }
    }
  }
  console.log(`Solution is ${score}`);
});