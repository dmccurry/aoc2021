const fs = require('fs');
const { performance } = require('perf_hooks')
const pairs = {
  '{': '}',
  '[': ']',
  '(': ')',
  '<': '>'
}
const points = {
  ')': 1,
  ']': 2,
  '}': 3,
  '>': 4
};
const getBalance = (line) => {
  let opening = [];
  const characters = line.split('');
  for (let j=0; j<characters.length; j++) {
    let c = characters[j];
    if (Object.keys(pairs).indexOf(c) >= 0) {
      opening.push(c);
    } else if (opening.length) {
      opening.pop();
    }
  }
  return opening.map(m => pairs[m]).reverse();
}
const isCorrupted = (line) => {
  let opening = [];
  const characters = line.split('');
  for (let j=0; j<characters.length; j++) {
    let c = characters[j];
    if (Object.keys(pairs).indexOf(c) >= 0) {
      opening.push(c);
    } else if (opening.length) {
      // closing, should match last opening
      let m = opening.pop();
      if (pairs[m] != c) {
        return true;
      }
    }
  }
  return false;
}

fs.readFile('./input', 'utf-8', (err, data) => {
  const lines = data.split('\n');
  const scores = [];
  const startTime = performance.now();
  for (let i=0; i<lines.length; i++) {
    if (!isCorrupted(lines[i])) {
      let b = getBalance(lines[i]);
      let total = 0;
      for (let j=0; j<b.length; j++) {
        total = (total * 5) + points[b[j]];
      }
      scores.push(total);
    }
  }
  scores.sort((a, b) => a - b);
  console.log(`Solution is ${scores[Math.floor(scores.length / 2)]}`);
  console.log(`Part 2: Took ${performance.now() - startTime}ms`)
})