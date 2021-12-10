const fs = require('fs');
const { performance } = require('perf_hooks');

const isLow = (grid, x, y) => {
  const p = grid[x][y];

  if (x > 0 && grid[x-1][y] <= p) {
    return false;
  } 
  if (x < grid.length - 1 && grid[x+1][y] <= p) {
    return false;
  }
  if (y > 0 && grid[x][y-1] <= p) {
    return false;
  }
  if (y < grid[x].length - 1 && grid[x][y+1] <= p) {
    return false;
  }
  
  return true;
}

const getBasinSize = (grid, i, j, pointsInBasin) => {
  
  if (grid[i][j] == 9) return;
  for (let k=0; k<pointsInBasin.length; k++) {
    if (pointsInBasin[k].x == i && pointsInBasin[k].y == j) return;
  }
  pointsInBasin.push({x: i, y: j});

  if (i > 0) getBasinSize(grid, i-1, j, pointsInBasin);
  if (j > 0) getBasinSize(grid, i, j-1, pointsInBasin);
  if (i < grid.length - 1) getBasinSize(grid, i+1, j, pointsInBasin);
  if (j < grid[i].length - 1) getBasinSize(grid, i, j+1, pointsInBasin);
}

fs.readFile('./input', 'utf-8', (err, data) => {
  const lines = data.split('\n');
  const grid = [];
  for(let i=0; i<lines.length; i++) {
    grid[i] = [];
    let line = lines[i].split('');
    for (let j=0; j<line.length; j++) {
      grid[i][j] = parseInt(line[j]);
    }
  }
  const startTime = performance.now();
  const allBasinSizes = [];
  for(let i=0; i<grid.length; i++) {
    for (let j=0; j<grid[i].length; j++) {
      if (isLow(grid, i, j)) {
        let pointsInBasin = [];
        getBasinSize(grid, i, j, pointsInBasin);
        allBasinSizes.push(pointsInBasin.length);
      }
    }
  }

  allBasinSizes.sort((a, b) => b-a);
  // console.log(`Solution is ${allBasinSizes[0] * allBasinSizes[1] * allBasinSizes[2]}`);
  const endTime = performance.now();
  console.log(`Part 2: Took ${endTime - startTime}ms`);
})