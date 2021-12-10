const fs = require('fs');
const { performance } = require('perf_hooks');

fs.readFile('./input', 'utf-8', (err, data) => {
  const lines = data.split('\n');
  const pairs = {
    '{': '}',
    '[': ']',
    '(': ')',
    '<': '>'
  }
  const points = {
    ')': 3,
    ']': 57,
    '}': 1197,
    '>': 25137
  };
  let total=0;
  const startTime = performance.now();
  for (let i=0; i<lines.length; i++) {
    let opening = [];

    const characters = lines[i].split('');
    for (let j=0; j<characters.length; j++) {
      let c = characters[j];
      if (Object.keys(pairs).indexOf(c) >= 0) {
        opening.push(c);
      } else if (opening.length) {
        // closing, should match last opening
        let m = opening.pop();
        if (pairs[m] != c) {
          total += points[c];
          break;
        }
      }
    }
  }
  console.log(`Solution is ${total}`)
  console.log(`Part 1: Took ${performance.now() - startTime}ms`)
})