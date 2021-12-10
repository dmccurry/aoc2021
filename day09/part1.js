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
  
  let total = 0;
  const startTime = performance.now();
  for(let i=0; i<grid.length; i++) {
    for (let j=0; j<grid[i].length; j++) {
      if (isLow(grid, i, j)) {
        total += grid[i][j] + 1;
      }
    }
  }
  // console.log(`Solution is ${total}`);
  const endTime = performance.now();
  console.log(`Part 1: Took ${endTime - startTime}ms`);
})