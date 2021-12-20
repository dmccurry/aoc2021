const fs = require('fs');

const algo = [];
let passes = 0;
const adjacent = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 0],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1]
];

const enhance = (image) => {
  const newImage = [];
  for (let i=-1; i<image.length+1; i++) {
    const newRow = [];
    for (let j=-1; j<image.length + 1; j++) {
      let pVal = [];
      adjacent.forEach(([a, b]) => {
        pVal.push(image[i + a]?.[j + b] ?? algo[0] & (passes) % 2)
      });
      let index = parseInt(pVal.join(''), 2);
      newRow.push(algo[index]);
    }
    newImage.push(newRow);
  }
  return newImage;
}

fs.readFile('./input', 'utf-8', (err, data) => {
  let [algorithm, imageIn] = data.split('\n\n');
  let a = algorithm.split('');
  for (let i=0; i<a.length; i++) {
    if (a[i] == '#') algo[i] = 1;
    else algo[i] = 0;
  }

  let imageLines = imageIn.split('\n');
  let image = [];

  for (let i=0; i<imageLines.length; i++) {
    let row = [];
    for (let j=0; j<imageLines[i].length; j++) {
      if (imageLines[i].charAt(j) == '#') {
        row[j] = 1;
      } else {
        row[j] = 0;
      }
    }
    image.push(row);
  }
  // now we enhance
  let nPasses = 2;
  while (passes < nPasses) {
    image = enhance(image);
    passes++;
  }
  console.log(image.flat().filter(a => a == 1).length);

});