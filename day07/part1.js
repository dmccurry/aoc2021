const fs = require('fs');

fs.readFile('./input', 'utf-8', (err, data) => {
  const starts = data.split(',');
  const crabs = starts.map(s => parseInt(s));
  crabs.sort((a, b) => a - b);
  
  let median = crabs[crabs.length / 2] + crabs[crabs.length / 2 - 1];
  median = median / 2;

  console.log(median)
  let minDistance = 999999;
  let targets = [];

  let targetPos = 0;

  for (let i=0; i<crabs.length; i++) {
    if (!targets[crabs[i]]) {
      let d = 0;
      for (let j=0; j<crabs.length; j++) {
        d += Math.abs(crabs[i] - crabs[j]);
      }
      if (d < minDistance) {
        minDistance = d;
        targetPos = crabs[i];
      }
      targets[crabs[i]] = d;
      
    }
  }

  console.log(`They all moved to ${targetPos}`)
  console.log(`Solution is ${minDistance}`)

});