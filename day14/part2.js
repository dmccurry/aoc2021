const fs = require('fs');

fs.readFile('./input', 'utf-8', (err, data) => {
  const [template, rulesInput] = data.split('\n\n');
  const rules = {};

  for (let i=0; i<rulesInput.split('\n').length; i++) {
    let rule = rulesInput.split('\n')[i];
    let [left, right] = rule.split(' -> ');
    rules[left] = right;
  }

  let step = 0;
  let nSteps = 40;

  let pairs = {};
  let freqs = {};
  let polymer = template;
  for (let i=0; i<polymer.length - 1; i++) {
    let p = polymer.charAt(i) + polymer.charAt(i+1);
    if (pairs[p]) pairs[p]++;
    else pairs[p] = 1;

    if (freqs[polymer.charAt(i)]) freqs[polymer.charAt(i)]++;
    else freqs[polymer.charAt(i)] = 1;

    if (i == polymer.length - 2) {
      if (freqs[polymer.charAt(i+1)]) freqs[polymer.charAt(i+1)]++;
    else freqs[polymer.charAt(i+1)] = 1;
    }
  }
  while (step < nSteps) {
    let newPairs = {};
    for (let i=0; i<Object.keys(pairs).length; i++) {
      let pair = Object.keys(pairs)[i];
      let rule = rules[pair];
      let c = pairs[pair];
      let newPair = pair.charAt(0) + rule;
      if (newPairs[newPair]) newPairs[newPair] += c;
      else newPairs[newPair] = c;
      newPair = rule + pair.charAt(1);
      if (newPairs[newPair]) newPairs[newPair] += c;
      else newPairs[newPair] = c;

      if (freqs[rule]) freqs[rule]+=c;
      else freqs[rule] = c;
    }
    pairs = newPairs;
    step++;
  }
  
  let vals = Object.values(freqs).sort((a, b) => a - b);
  console.log(`Solution is ${vals[vals.length - 1] - vals[0]}`)
});