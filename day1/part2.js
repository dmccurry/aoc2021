const fs = require('fs');

fs.readFile('./input', 'utf-8', (err, data) => {
  const lines = data.split('\n');
  let nIncrease = 0;

  for (let i=2; i<lines.length - 1; i++) {
    let window1 = parseInt(lines[i-2]) + parseInt(lines[i-1]) + parseInt(lines[i]);
    let window2 = parseInt(lines[i-1]) + parseInt(lines[i]) + parseInt(lines[i+1]);
    if (window2 > window1) nIncrease++;

  }

  console.log(`Solution is ${nIncrease}`);
})