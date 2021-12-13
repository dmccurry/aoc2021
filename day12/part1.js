const fs = require('fs');
const nodes = {};
const validPaths = [];

const getPath = (current, path) => {
  let updatedPath = [...path, current];
  if (current === 'end') {
    validPaths.push(updatedPath);
    return;
  }

  for (let i=0; i<nodes[current].length; i++) {
    if (updatedPath.indexOf(nodes[current][i]) < 0 || nodes[current][i].toUpperCase() == nodes[current][i]) {
      getPath(nodes[current][i], updatedPath);
    }
  }
}

fs.readFile('./input', 'utf-8', (err, data) => {
  const lines = data.split('\n');
  for (let i=0; i<lines.length; i++) {
    const [s, e] = lines[i].split('-');
    if (!nodes[s]) nodes[s] = [];
    if (!nodes[e]) nodes[e] = [];

    nodes[s].push(e);
    if (e !== 'end') {
      nodes[e].push(s);
    }
  }
  let p = [];
  getPath('start', p);
  console.log(`Solution is ${validPaths.length}`);
});