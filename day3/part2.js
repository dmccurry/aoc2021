const fs = require('fs');


fs.readFile('./input', 'utf-8', (err, data) => {
  const lines = data.split('\n');
  const nChars = lines[0].length;
  
  let c = [...lines];
  let o = [...lines];

  for (let i = 0; i < nChars; i++) {
    let nOneC = 0;
    let nZeroC = 0;
    let nOneO = 0;
    let nZeroO = 0;

    if (o.length > 1) {
      for (let j=0; j<o.length; j++) {
        if (o[j].charAt(i) == '1') {
          nOneO++;
        } else {
          nZeroO++;
        }
      }
      let newO = [];
      newChar = '1';
      if (nZeroO > nOneO) {
        newChar = '0';
      }
  
      for (let j=0; j<o.length; j++) {
        if (o[j].charAt(i) == newChar) {
          newO.push(o[j]);
        }
      }
      o = newO;
    }

    if (c.length > 1) {
      for (let j=0; j<c.length; j++) {
        if (c[j].charAt(i) == '1') {
          nOneC++;
        } else {
          nZeroC++;
        }
      }
      let newC = [];
      newChar = '0';
      if (nOneC < nZeroC) {
        newChar = '1';
      }
  
      for (let j=0; j<c.length; j++) {
        if (c[j].charAt(i) == newChar) {
          newC.push(c[j]);
        }
      }
      c = newC;
    }
  }
  
  console.log(`Solution is ${parseInt(c[0], 2) * parseInt(o[0], 2)}`)
});