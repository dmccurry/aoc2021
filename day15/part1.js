const fs = require('fs');
const { nextTick } = require('process');
const map = [];
const distances = [];
const visited = [];
const queue = [];

fs.readFile('./input', 'utf-8', (err, data) => {
  const lines = data.split('\n');
  for (let i=0; i<lines.length; i++) {
    const line = lines[i].split('');
    map[i] = [];
    distances[i] = [];
    visited[i] = [];
    for (let j=0; j<line.length; j++) {
      map[i][j] = parseInt(line[j]);
      distances[i][j] = Infinity;
      visited[i][j] = null;
      queue.push({ x: i, y: j});
    }
    
  }
  distances[0][0] = 0;
  while (queue.length) {
    
    let minQueueValue = Infinity;
    let minQueueI = -1;
    for (let i=0; i<queue.length; i++) {
      if (distances[queue[i].x][queue[i].y] < minQueueValue) {
        minQueueValue = distances[queue[i].x][queue[i].y]
        minQueueI = i;
      }
    }
    let p = queue.splice(minQueueI, 1)[0];

    let neighbors = [];
    if (p.x < map.length - 1) neighbors.push({x: p.x+1, y: p.y});
    if (p.y < map[0].length - 1) neighbors.push({x: p.x, y: p.y+1});
    if (p.x > 0) neighbors.push({x: p.x-1, y: p.y});
    if (p.y > 0) neighbors.push({x: p.x, y: p.y-1});
    let n;
    for (let i=0; i<neighbors.length; i++) {
      n = neighbors[i];
      let a = distances[p.x][p.y] + map[n.x][n.y];
      if (a < distances[n.x][n.y]) {
        distances[n.x][n.y] = a;
        visited[n.x][n.y] = p;
      }
    }

  }
  console.log(`Solution is ${distances[distances.length - 1][distances[0].length - 1]}`)

});