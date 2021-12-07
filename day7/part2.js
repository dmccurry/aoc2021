const fs = require('fs');

const getT = (a, b) => {
  let c = Math.abs(a - b);
  return (c * (c + 1)) / 2;
}

fs.readFile('./input', 'utf-8', (err, data) => {
  const starts = data.split(',');
  const crabs = starts.map(s => parseInt(s));
  crabs.sort((a, b) => a > b);
  
  let minDistance = 0;
  let targets = [];

  for (let i=0; i<crabs[crabs.length - 1]; i++) {
    if (!targets[i]) {
      let d = 0;
      for (let j=0; j<crabs.length; j++) {
        let c = (Math.abs(crabs[j] - i));
        d += ((c * (c+1)) / 2);
      }
      if (d < minDistance || minDistance === 0) {
        minDistance = d;
      }
      targets[i] = d;
    }
  }
  console.log(`Solution is ${minDistance}`)

});