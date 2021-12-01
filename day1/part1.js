const fs = require('fs');

fs.readFile('./input', 'utf-8', (err, data) => {
  const lines = data.split('\n');
  let nIncrease = 0;

  for (let i=1; i<lines.length; i++) {
    if (parseInt(lines[i-1]) < parseInt(lines[i])) nIncrease++;
  }

  console.log(`Solution is ${nIncrease}`);
})