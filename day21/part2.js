const memo = (f, mem = new Map()) => (...args) =>
  (key => (mem.has(key) || mem.set(key, f(...args))) && mem.get(key))(JSON.stringify(args));
let p1Start = 10;
let p2Start = 2;

const dice = [1,2,3];
const p = memo((p1Pos, p1Score, p2Pos, p2Score) =>
  p2Score >= 21
    ? [0, 1]
    : dice.reduce(
        (wins, d1) =>
        dice.reduce(
            (wins, d2) =>
            dice.reduce(
                (wins, d3) =>
                (pos =>
                    p(p2Pos, p2Score, pos, p1Score + pos + 1)
                    .map((a, b) => a + wins[1 - b])
                    .reverse())((p1Pos + d1 + d2 + d3) % 10),
                wins
            ),
            wins
        ),
        [0, 0]
    )
);

console.log(p(p1Start - 1, 0, p2Start - 1, 0));
