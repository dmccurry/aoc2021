const fs = require('fs');

const getT = (a, b) => {
  let c = Math.abs(a - b);
  return (c * (c + 1)) / 2;
}

fs.readFile('./input', 'utf-8', (err, data) => {
  const starts = data.split(',');
  let crabs = starts.map(s => parseInt(s));
  crabs.sort((a, b) => a - b);
  
  let total = crabs.reduce((a, b) => a + b, 0);
  console.log(Math.ceil(total / crabs.length));
  console.log(Math.floor(total / crabs.length));
  
  let minDistance = 0;
  let targets = [];

  let finalPoint = 0;

  for (let i=crabs[0]; i<crabs[crabs.length - 1]; i++) {
    if (!targets[i]) {
      let d = 0;
      for (let j=0; j<crabs.length; j++) {
        let c = (Math.abs(crabs[j] - i));
        d += ((c * (c+1)) / 2);
      }
      if (d < minDistance || minDistance === 0) {
        minDistance = d;
        finalPoint = i;
      }
      targets[i] = d;
    }
  }
  console.log(`Solution is ${minDistance}`)
  console.log(`They all moved to ${finalPoint}`);

  console.log(`Your bounds were ${crabs[0]} and ${crabs[crabs.length - 1]}`)

  const sum = crabs.reduce((a, b) => a + b, 0);
  console.log(Math.floor((sum - crabs.length) / (crabs.length - 1)));

});