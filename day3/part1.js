const fs = require('fs');


fs.readFile('./input', 'utf-8', (err, data) => {
  const lines = data.split('\n');
  const nChars = lines[0].length;
  
  const numZero = [];
  const numOnes = [];



  for (let i=0; i<nChars; i++) {
    let nOnes = 0;
    let nZero = 0;
    for (let j=0; j<lines.length; j++) {
      if (lines[j].charAt(i) == '1') {
        nOnes++;
      } else {
        nZero++;
      }
    }
    numZero[i] = nZero;
    numOnes[i] = nOnes;
  }

  let g = '';
  let e = '';

  for (let i=0; i<numZero.length; i++) {
    if (numZero[i] > numOnes[i]) {
      g += '0';
      e += '1';
    } else {
      e += '0';
      g += '1';
    }
  }

  console.log(`Solution is ${parseInt(g, 2) * parseInt(e, 2)}`);
});