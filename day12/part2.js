const fs = require('fs');
const nodes = {};
const validPaths = [];

const isValid = (n, p) => {
  if (n.toUpperCase() == n) return true;
  if (p.indexOf(n) < 0) return true;
  if (n == 'start' || n == 'end') return false;
  let a = [...p];
  a = a.filter(i => i.toUpperCase() != i);
  a = a.filter((i, j) => a.indexOf(i) != j);
  return a.length === 0;
}

const getPath = (current, path) => {
  let updatedPath = [...path, current];
  if (current === 'end') {
    validPaths.push(updatedPath);
    return;
  }

  for (let i=0; i<nodes[current].length; i++) {
    if (isValid(nodes[current][i], updatedPath)) {
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