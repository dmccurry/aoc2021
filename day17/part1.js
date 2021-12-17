const fs = require('fs');

const isValidPath = (vx, vy, target) => {
  let x = 0, y = 0;
  const result = {
    points: [],
    maxY: -1
  }

  while (1) {
    let px = x + vx;
    let py = y + vy;
    result.points.push([px, py]);
    if (py > result.maxY) result.maxY = py;
    
    if (px >= target.xMin && px <=target.xMax && py >=target.yMin && py <= target.yMax) {
      return result;
    }
    
    if (x < target.xMin && px > target.xMax) {
      return false; // jumped the trench
    }
    if (py < target.yMin) {
      return false;
    }
    x = px;
    y = py;
    vy--;
    if (vx > 0) vx--;
  }
}


fs.readFile('./input', 'utf-8', (err, data) => {
  const [text, coords] = data.split(': ');
  const [fullX, fullY] = coords.split(', ');
  const xVals = fullX.split('=')[1];
  const yVals = fullY.split('=')[1];
  const xMin = parseInt(xVals.split('..')[0]);
  const xMax = parseInt(xVals.split('..')[1]);
  const yMin = parseInt(yVals.split('..')[0]);
  const yMax = parseInt(yVals.split('..')[1]);

  const target = {
    xMin,
    xMax,
    yMin,
    yMax
  };

  let maxY = -1;
  let maxV = [];
  let result;

  for (let y = -Math.abs(yMin); y < Math.abs(yMin); y++) {
    for (let x=1; x < xMax * xMax; x++) {
      result = isValidPath(x, y, target);
      if (result) {
        if (result.maxY > maxY) {
          maxY = result.maxY;
          maxV = [x, y];
        }
      }
    }
  }
  console.log(`Solution is ${maxY}`)
}); 