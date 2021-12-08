const fs = require('fs');

fs.readFile('./input', 'utf-8', (err, data) => {
  const lines = data.split('\n');
  let numDigits = 0;
  for(let i=0; i<lines.length; i++) {
    let [input, output] = lines[i].split(' | ');

    let outputParts = output.split(' ');
    for (let j=0; j<outputParts.length; j++) {
      if (outputParts[j].length == 2) numDigits++; // 1
      if (outputParts[j].length == 4) numDigits++; // 4
      if (outputParts[j].length == 3) numDigits++; // 7
      if (outputParts[j].length == 7) numDigits++; // 8
    }
  }

  console.log(`Solution is ${numDigits}`)
});