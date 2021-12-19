const fs = require('fs');

const parseLine = (line) => {
  const ret = [];
  let l = line.split(',');

  for (let i=0; i<l.length; i++) {
    let m = l[i].split('[');
    for (let j=0; j<m.length; j++) {
      if (m[j] == '') ret.push('[');
      else ret.push(m[j]);
    }
  }
  let r = [];
  for (let i=0; i<ret.length; i++) {
    if (ret[i].indexOf(']') >= 0) {
      let m = ret[i].split(']');
      for (let j=0; j<m.length; j++) {
        if (m[j] == '') r.push(']')
        else r.push(m[j])
      }
    } else {
      r.push(ret[i])
    }
  }
  return r;
}

const isNum = (n) => {
  return !isNaN(n);
}

const canReduce = (current) => {
  // check for explode
  let depth = 0;
  for (let i=0; i<current.length; i++) {
    if (current[i] == '[') depth++;
    if (current[i] == ']') depth--;
    if (depth > 4 && i < current.length - 1 && isNum(current[i]) && isNum(current[i+1])) {
      return true;
    }
    if (isNum(current[i]) && parseInt(current[i]) > 9) {
      return true;
    }
  }

  return false;
}

const doReduce = (current) => {
  let n = doExplode(current);
  if (!n) {
    n = doSplit(current);
  }
  return n;
}

const doExplode = (current) => {
  // check for explode
  let depth = 0;
  for (let i=0; i<current.length; i++) {
    if (current[i] == '[') depth++;
    if (current[i] == ']') depth--;
    if (depth > 4 && i < current.length - 1 && isNum(current[i]) && isNum(current[i+1])) {  
      let left = parseInt(current[i]);
      let right = parseInt(current[i+1]);
      for (let k=i-1; k>0; k--) {
        if (isNum(current[k])) {
          let newK = parseInt(current[k]) + left;
          current[k] = '' + newK;
          break;
        }
      }
      for (let k=i+2; k<current.length; k++) {
        if (isNum(current[k])) {
          let newK = parseInt(current[k]) + right;
          current[k] = '' + newK;
          break;
        }
      }
      let newCurrent = current.slice(0, i-1).concat('0', current.slice(i+3));
      return newCurrent;
    }
  }
  return undefined;
}

const doSplit = (current) => {
  for (let i=0; i<current.length; i++) {
    if (isNum(current[i]) && parseInt(current[i]) > 9) {
      let n = parseInt(current[i]);
      let left = Math.floor(n / 2);
      let right = Math.ceil(n / 2);
      let newCurrent = current.slice(0, i).concat(['['], ['' + left], ['' + right], [']'], current.slice(i+1));
      return newCurrent;
    }
  }
  return undefined;
}

const getMagnitude = (current) => {
  let s = [];
  for (let i=0; i<current.length; i++) {
    if (current[i] == ']') {
      let r = s.pop();
      let l = s.pop();
      s.push(3*l + 2*r);
    } else if (isNum(current[i])) {
      s.push(parseInt(current[i]));
    }
  }
  return s.pop();
}

fs.readFile('./test', 'utf-8', (err, data) => {

  const lines = data.split('\n');
  let largestMag = 0;

  for (let i=0; i<lines.length; i++) {
    for (let j=0; j<lines.length; j++) {
      if (i != j) {
        let current = parseLine(lines[i]);
        let n = ['['];
        let l = parseLine(lines[j]);
        let newCurrent = n.concat(current, l, [']']);
        current = newCurrent;
        while (canReduce(current)) {
          current = doReduce(current);
        }
        let m = getMagnitude(current);
        if (m > largestMag) {
          largestMag = m;
        }
      }
    }
  }
  console.log(`Solution is ${largestMag}`);

});