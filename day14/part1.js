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
  let polymer = template; 
  let nSteps = 10;

  while (step < nSteps) {
    let newPolymer = '';
    for (let i=0; i<polymer.length - 1; i++) {
      let pair = polymer.charAt(i) + polymer.charAt(i+1);
      newPolymer += (i == 0) ? polymer.charAt(i) : ''
      newPolymer += rules[pair] + polymer.charAt(i+1);
    }
    polymer = newPolymer;
    step++;
  }
  
  let freqs = {};
  let polymerParts = polymer.split('');
  for (let i=0; i<polymerParts.length; i++) {
    let l = polymerParts[i];
    if (freqs[l]) freqs[l]++;
    else freqs[l] = 1;
  }
  let vals = Object.values(freqs).sort((a, b) => a - b);
  console.log(`Solution is ${vals[vals.length - 1] - vals[0]}`)
});