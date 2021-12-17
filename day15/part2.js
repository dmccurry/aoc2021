const fs = require('fs');
let map = [];
const distances = [];
const visited = [];
const queue = [];

const getMapVal = (x, y) => {
  let v = map[x % map.length][y % map[0].length] + Math.floor(x / map.length) + Math.floor(y / map[0].length);
  return (v - 1) % 9 +1;
}

fs.readFile('./input', 'utf-8', (err, data) => {
  const lines = data.split('\n');
  for (let i=0; i<lines.length; i++) {
    const line = lines[i].split('');
    map[i] = [];
    for (let j=0; j<line.length; j++) {
      map[i][j] = parseInt(line[j]);
    } 
  }
  for (let i=0; i<map.length * 5; i++) {
    distances[i] = [];
    visited[i] = [];
    for (let j=0; j<map[0].length * 5; j++) {
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

    if (queue.length % 1000 == 0) console.log(queue.length);

    let neighbors = [];
    if (p.x < map.length * 5 - 1) neighbors.push({x: p.x+1, y: p.y});
    if (p.y < map[0].length * 5 - 1) neighbors.push({x: p.x, y: p.y+1});
    if (p.x > 0) neighbors.push({x: p.x-1, y: p.y});
    if (p.y > 0) neighbors.push({x: p.x, y: p.y-1});
    let n;
    for (let i=0; i<neighbors.length; i++) {
      n = neighbors[i];
      let a = distances[p.x][p.y] + getMapVal(n.x, n.y);
      if (a < distances[n.x][n.y]) {
        distances[n.x][n.y] = a;
        visited[n.x][n.y] = p;
      }
    }

  }
  console.log(`Solution is ${distances[distances.length - 1][distances[0].length - 1]}`)

});