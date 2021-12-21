let p1Pos = 10;
let p2Pos = 2;

let dice = 1;

let p1Score = 0;
let p2Score = 0;

while (p1Score < 1000 && p2Score < 1000) {
  let roll = dice + (dice+1) + (dice+2);
  
  p1Pos += roll;
  if (p1Pos > 10) {
    p1Pos = p1Pos % 10;
    if (p1Pos == 0) p1Pos = 10;
  }
  p1Score += p1Pos;
  // console.log(`Player 1 rolls ${dice}+${dice+1}+${dice+2} and moves to space ${p1Pos} for a total score of ${p1Score}`)
  dice = dice + 3;

  roll = dice + (dice+1) + (dice+2);
  
  if (p1Score < 1000) {
    p2Pos += roll;
    if (p2Pos > 10) {
      p2Pos = p2Pos % 10;
      if (p2Pos == 0) p2Pos = 10;
    }
    p2Score += p2Pos;
    // console.log(`Player 2 rolls ${dice}+${dice+1}+${dice+2} and moves to space ${p2Pos} for a total score of ${p2Score}`)
    dice = dice + 3;
  }
  
}
let final = p1Score;
if (p1Score > p2Score) {
  final = p2Score;
}
console.log(`Solution is ${final * (dice-1)}`);