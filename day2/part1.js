const fs = require('fs');

fs.readFile('./input', 'utf-8', (err, data) => {
  const lines = data.split('\n');

  let d = 0;
  let h = 0;

  for (let i=0; i<lines.length; i++) {
    let line = lines[i];
    const lineParts = line.split(' ');
    if (lineParts[0] === 'forward') {
      h += parseInt(lineParts[1]);
    }

    if (lineParts[0] === 'down') {
      d += parseInt(lineParts[1]);
    }

    if (lineParts[0] === 'up') {
      d -= parseInt(lineParts[1]);
    }
  }

  console.log(`Solution is ${d * h}`);
})