const fs = require('fs');
const { exit } = require('process');

const hex2bin = {
  '0': '0000',
  '1': '0001',
  '2': '0010',
  '3': '0011',
  '4': '0100',
  '5': '0101',
  '6': '0110',
  '7': '0111',
  '8': '1000',
  '9': '1001',
  'A': '1010',
  'B': '1011',
  'C': '1100',
  'D': '1101',
  'E': '1110',
  'F': '1111'
};
let binArray;
const binSlice = (l) => {
  let s = binArray.slice(0, l);
  binArray = binArray.slice(l);
  return s;
}

const getResult = (s, type) => {
  if (type == 0) {
    return s.reduce((sum, x) => sum + x);
  }
  if (type == 1) {
    return s.reduce((sum, x) => sum * x);
  }
  if (type == 2) {
    return Math.min(...s);
  }
  if (type == 3) {
    return Math.max(...s);
  }
  if (type == 5) {
    return s[0] > s[1] ? 1 : 0;
  }
  if (type == 6) {
    return s[0] < s[1] ? 1 : 0;
  }
  if (type == 7) {
    return s[0] === s[1] ? 1 : 0;
  }
}

let versions = 0;

const parsePacket = () => {
  let version = parseInt(binSlice(3).join(''), 2);
  versions += version;
  let type = parseInt(binSlice(3).join(''), 2);
  if (type == 4) { // literal value
    let typeNumber = '';
    let next = binSlice(5);
    while (next[0] != '0') {
      typeNumber += next.slice(1).join('');
      next = binSlice(5);
    }
    typeNumber += next.slice(1).join('');
    return parseInt(typeNumber, 2);
  } else { // operator
    let s = [];
    let c = binSlice(1).join('');
    if (c == '0') {
      let length = parseInt(binSlice(15).join(''), 2);
      while (length > 0) {
        const sum = binArray.length;
        s.push(parsePacket());
        length = length - (sum - binArray.length);
      }
    } else {
      let nSubpackets = parseInt(binSlice(11).join(''), 2);
      let processed = 0;
      while (processed < nSubpackets) {
        s.push(parsePacket());
        processed++;
      }
    }
    return getResult(s, type);
  }
}

fs.readFile('./input', 'utf-8', (err, data) => {
  const hex = data.split('');
  let bin = '';
  for (let i=0; i<hex.length; i++) {
    bin += hex2bin[hex[i]];
  }
  binArray = bin.split('');
  

  console.log(`Solution is ${parsePacket()}`)
});