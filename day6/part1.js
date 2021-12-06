const fs = require('fs');

const getSum = (a) => {
  let s = 0;

  for (let i=0; i<a.length; i++) {
    s+= a[i];
  }
  return s;
}

const fishes = [];

for (let i=0; i<9; i++) {
  fishes[i] = 0;
}

fs.readFile('./input', 'utf-8', (err, data) => {
  let s = data.split(',');
  for (let i=0; i<s.length; i++) {
    let f = parseInt(s[i]);
    fishes[f]++;
  }

  let nDays = 80;

  for (let i=0; i<nDays; i++) {
    let a = fishes[0];
    for (let j=1; j<fishes.length; j++) {
      fishes[j-1] = fishes[j];
    }
    fishes[8] = a;
    fishes[6] += a;
  }

  console.log(`Solution is ${getSum(fishes)}`);


});