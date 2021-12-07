const fs = require('fs');

fs.readFile('./input', 'utf-8', (err, data) => {
  const starts = data.split(',');
  const crabs = starts.map(s => parseInt(s));
  crabs.sort((a, b) => a > b);
  
  let minDistance = 999999;
  let targets = [];

  for (let i=0; i<crabs.length; i++) {
    if (!targets[crabs[i]]) {
      let d = 0;
      for (let j=0; j<crabs.length; j++) {
        d += Math.abs(crabs[i] - crabs[j]);
      }
      if (d < minDistance) {
        minDistance = d;
      }
      targets[crabs[i]] = d;
    }
  }
  console.log(`Solution is ${minDistance}`)

});