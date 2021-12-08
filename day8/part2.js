const fs = require('fs');

const getSegmentMapping = (input) => {
  const segments = input.split(' ');

  let one, four, seven, eight;
  let map = []; // a, b, c, d, e, f
  let fives = [];
  let sixes = [];
  let used = [];

  // extract the known ones
  for (let i=0; i<segments.length; i++) {
    // 0 has 6
    if (segments[i].length == 2) one = segments[i];
    // 2 has 5
    // 3 has 5
    if (segments[i].length == 4) four = segments[i];
    // 5 has 5
    // 6 has 6
    if (segments[i].length == 3) seven = segments[i];
    if (segments[i].length == 7) eight = segments[i];

    if (segments[i].length == 5) fives.push(segments[i]);
    if (segments[i].length == 6) sixes.push(segments[i]);
    // 9 has 6
  }

  // a is the segment in 7 but not 1
  for (let i=0; i<seven.length; i++) {
    if (one.indexOf(seven.charAt(i)) < 0) {
      map[0] = seven.charAt(i);
      used.push(seven.charAt(i));
    }
  }

  // b is in 4 and 8 and all the 6 segments and not in 1
  for (let i=0; i<four.length; i++) {
    if (one.indexOf(four.charAt(i)) < 0) {
      // not in one, so either the middle or the left
      let inAllSixes = true;
      for (let j=0; j<sixes.length; j++) {
        if (sixes[j].indexOf(four.charAt(i)) < 0) {
          inAllSixes = false;
        }
      }
      if (inAllSixes) {
        map[1] = four.charAt(i);
        used.push(four.charAt(i));
      }
    }
  }

  // d is the segment in four that isn't the one we just did, and isn't in 1
  for (let i=0; i<four.length; i++) {
    if (one.indexOf(four.charAt(i)) < 0 && used.indexOf(four.charAt(i)) < 0) {
      map[3] = four.charAt(i);
      used.push(four.charAt(i));
    }
  }

  // all the sixes have a, b, f, and g
  // so not map[0], map[1], or in one
  let s = sixes[0]
  for (let i=0; i<s.length; i++) {
    if (used.indexOf(s.charAt(i)) < 0 && one.indexOf(s.charAt(i)) < 0) {
      let inAllSixes = true;
      for (let j=1; j<sixes.length; j++) {
        if (sixes[j].indexOf(s.charAt(i)) < 0) {
          inAllSixes = false;
        }
      }
      if (inAllSixes) {
        map[6] = s.charAt(i);
        used.push(s.charAt(i));
      } 
    }
  } 

  // so now f is the one that is in all sixes but not map[0] map[1] or map[6]
  for (let i=0; i<s.length; i++) {
    if (used.indexOf(s.charAt(i)) < 0) {
      let inAllSixes = true;
      for (let j=1; j<sixes.length; j++) {
        if (sixes[j].indexOf(s.charAt(i)) < 0) {
          inAllSixes = false;
        }
      }
      if (inAllSixes) {
        map[5] = s.charAt(i);
        used.push(s.charAt(i));
      }
    }
  } 

  // c is the one in one that is not map[5]
  for (let i=0; i<one.length; i++) {
    if (one.charAt(i) != map[5]) {
      map[2] = one.charAt(i);
      used.push(one.charAt(i))
    }
  }

  // e is the one that's left
  for (let i=0; i<eight.length; i++) {
    let c = eight.charAt(i);

    if (used.indexOf(c) < 0) {
      map[4] = c;
      used.push(c);
    }
  }
  

  return map;
}

const getValue = (map, num) => {
  if (num.length == 2) return '1';
  if (num.length == 4) return '4';
  if (num.length == 3) return '7';
  if (num.length == 7) return '8';

  if (num.length == 5) {
    // 5, 2, or 3
    // ugh ordering sucks
    let five = (map[0] + map[1] + map[3] + map[5] + map[6]).split('').sort().join();
    let two = (map[0] + map[2] + map[3] + map[4] + map[6]).split('').sort().join();
    let three = (map[0] + map[2] + map[3] + map[5] + map[6]).split('').sort().join();
    
    let sNum = num.split('').sort().join();
    if (sNum == five) return '5';
    if (sNum == two) return '2';
    if (sNum == three) return '3';

    console.log('ERROR ON THIS');
  }
  if (num.length == 6) {
    // 0, 6 or 9
    let zero = (map[0] + map[1] + map[2] + map[4] + map[5] + map[6]).split('').sort().join();
    let six = (map[0] + map[1] + map[3] + map[4] + map[5] + map[6]).split('').sort().join();
    let nine = (map[0] + map[1] + map[2] + map[3] + map[5] + map[6]).split('').sort().join();
    let sNum = num.split('').sort().join();
    if (sNum == zero) return '0';
    if (sNum == six) return '6';
    if (sNum == nine) return '9';
    console.log('ERRORERRORERROR');
  }
}



fs.readFile('./input', 'utf-8', (err, data) => {
  const lines = data.split('\n');

  let runningTotal = 0;

  for (let i=0; i<lines.length; i++) {
    const [input, output] = lines[i].split(' | ');

    let map = getSegmentMapping(input);
    let nums = output.split(' ');
    let finalNum = '';
    for (let j=0; j<nums.length; j++) {
      finalNum += getValue(map, nums[j])
    }
    runningTotal += parseInt(finalNum);
  }

  console.log(`Solution is ${runningTotal}`)
});