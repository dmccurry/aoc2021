const fs = require('fs');

const getDots = (paper) => {
  let n = 0;
  for (let i=0; i<paper.length; i++) {
    for (let j=0; j<paper[i].length; j++) {
      if (paper[i][j] == '#') n++;
    }
  }
  return n;
}
const printPaper = (paper) => {
  let n = '';
  for (let i=0; i<paper.length; i++) {
    for (let j=0; j<paper[i].length; j++) {
      n += paper[i][j]
    }
    n += '\n';
  }
  console.log(n);
}

const foldPaper = (dir, where, dots) => {
  [x, y] = dir === 'x' ? [1, 0]: [0, 1];
  return dots.map(dot => {
    if (dot[y] < where) {
      return dot
    }
    return dir === 'y' ? [dot[x], Math.abs(dot[y] - where * 2)] : [Math.abs(dot[y] - where * 2), dot[x]]
  });
}

const getUnique = (input) => {
  let output = new Set;
  for (let item of input) {
    output.add(`${item[0]}-${item[1]}`);
  }
  return [...output]
}

fs.readFile('./input', 'utf-8', (err, data) => {
  const [lines, folds] = data.split('\n\n');
  const points = lines.split('\n');
  let dots = points.map(point => point.split(',').map(Number));
  
  let foldList = folds.split('\n');

  for (let i=0; i<foldList.length && i<1; i++) {
    let fold = foldList[i];
    let foldCoordinates = fold.replace('fold along ', '');
    let [dir, c] = foldCoordinates.split('=');
    let where = parseInt(c);
    dots = foldPaper(dir, where, dots);
    console.log(`Solution is ${getUnique(dots).length}`);
  }
  
});