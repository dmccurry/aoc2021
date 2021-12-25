const fs = require('fs');

const printGrid = (grid) => {
  let o = '';
  for (let i=0; i<grid.length; i++) {
    for (let j=0; j<grid[i].length; j++) {
      o += grid[i][j];
    }
    o += '\n';
  }
  console.log(o);
}

fs.readFile('./input', 'utf-8', (err, data) => {
  let lines = data.split('\n');
  let grid = [];
  for (let i=0; i<lines.length; i++) {
    let line = lines[i];
    grid[i] = [];
    for (let j=0; j<line.length; j++) {
      grid[i][j] = line[j];
    }
  }
  
  let moved = true;
  let steps = 0;

  while (moved) {
    // move all right
    let newGrid = [];
    moved = false;
    for (let i=0; i<grid.length; i++) {
      newGrid[i] = [];
      for (let j=0; j<grid[i].length; j++) {
        let target = j+1;
        if (j+1 == grid[i].length) target = 0;
        if (grid[i][j] == '>' && grid[i][target] == '.' && newGrid[i][j] != '>') {
          newGrid[i][target] = '>';
          newGrid[i][j] = '.';
          moved = true;
        }
      }
    }
    for (let i=0; i<grid.length; i++) {
      for (let j=0; j<grid[i].length; j++) {
        if (!newGrid[i][j]) newGrid[i][j] = grid[i][j];
      }
    }
    grid = newGrid;
    newGrid = [];
    for (let i=0; i<grid.length; i++) {
      newGrid[i] = [];
    }
    for (let i=0; i<grid.length; i++) {
      for (let j=0; j<grid[i].length; j++) {
        let target = i+1;
        if (target == grid.length) target = 0;
        if (grid[i][j] == 'v' && grid[target][j] == '.' && newGrid[target][j] != '>' && newGrid[target][j] != 'vs') {
          newGrid[target][j] = 'v';
          newGrid[i][j] = '.';
          moved = true;
        }
      }
    }


    for (let i=0; i<grid.length; i++) {
      for (let j=0; j<grid[i].length; j++) {
        if (!newGrid[i][j]) newGrid[i][j] = grid[i][j];
      }
    }
    grid = newGrid;
    steps++;
  }

  console.log(steps);
});