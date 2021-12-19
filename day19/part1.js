const fs = require('fs');

class Point {
  constructor(x, y, z) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
  equals(p) {
    return p.x == this.x && p.y == this.y && p.z == this.z;
  }
  toString() {
    return `[${this.x},${this.y},${this.z}]`;
  }
}

class Scanner {
  constructor(position, points) {
    this.position = position;
    this.points = points;
    this.rotations = [];
    this.getRotations();
  }

  getRotations() {
    for (let i=0; i<24; i++) {
      this.rotations[i] = [];
      for (let j=0; j<this.points.length; j++) {
        switch (i) {
          case 0:
            this.rotations[i].push(new Point(this.points[j].x, this.points[j].y, this.points[j].z));
            break;
          case 1:
            this.rotations[i].push(new Point(this.points[j].x, -this.points[j].z, this.points[j].y));
            break;
          case 2:
            this.rotations[i].push(new Point(this.points[j].x, -this.points[j].y, -this.points[j].z));
            break;
          case 3:
            this.rotations[i].push(new Point(this.points[j].x, this.points[j].z, -this.points[j].y));
            break;
          case 4:
            this.rotations[i].push(new Point(-this.points[j].x, this.points[j].y, -this.points[j].z));
            break;
          case 5:   
            this.rotations[i].push(new Point(-this.points[j].x, -this.points[j].y, this.points[j].z));
            break;
          case 6:
            this.rotations[i].push(new Point(-this.points[j].x, this.points[j].z, this.points[j].y));
            break;
          case 7:
            this.rotations[i].push(new Point(-this.points[j].x, -this.points[j].z, -this.points[j].y));
            break;
          case 8:
            this.rotations[i].push(new Point(this.points[j].y, -this.points[j].x, this.points[j].z));
            break;
          case 9:
            this.rotations[i].push(new Point(this.points[j].y, this.points[j].z, this.points[j].x));
            break;
          case 10:
            this.rotations[i].push(new Point(this.points[j].y, this.points[j].x, -this.points[j].z));
            break;
          case 11:
            this.rotations[i].push(new Point(this.points[j].y, -this.points[j].z, -this.points[j].x));
            break;
          case 12:
            this.rotations[i].push(new Point(-this.points[j].y, this.points[j].x, this.points[j].z));
            break;
          case 13:
            this.rotations[i].push(new Point(-this.points[j].y, -this.points[j].z, this.points[j].x));
            break;
          case 14:
            this.rotations[i].push(new Point(-this.points[j].y, -this.points[j].x, -this.points[j].z));
            break;
          case 15:
            this.rotations[i].push(new Point(-this.points[j].y, this.points[j].z, -this.points[j].x));
            break;
          case 16:
            this.rotations[i].push(new Point(this.points[j].z, this.points[j].y, -this.points[j].x));
            break;
          case 17:
            this.rotations[i].push(new Point(this.points[j].z, this.points[j].x, this.points[j].y));
            break;
          case 18:
            this.rotations[i].push(new Point(this.points[j].z, -this.points[j].y, this.points[j].x));
            break;
          case 19:
            this.rotations[i].push(new Point(this.points[j].z, -this.points[j].x, -this.points[j].y));
            break;
          case 20:
            this.rotations[i].push(new Point(-this.points[j].z, this.points[j].y, this.points[j].x));
            break;
          case 21:
            this.rotations[i].push(new Point(-this.points[j].z, -this.points[j].x, this.points[j].y));
            break;
          case 22:
            this.rotations[i].push(new Point(-this.points[j].z, -this.points[j].y, -this.points[j].x));
            break;
          case 23:
            this.rotations[i].push(new Point(-this.points[j].z, this.points[j].x, -this.points[j].y));
            break;
        }
      }
    }
  }

  pointsMatch(left, right) {
    // we need to see if applying the offset for each point will result in 12 matches happening.
    // find the offsets first
    let offsetMap = {};
    for (let i=0; i<left.length; i++) {
      for (let j=0; j<right.length; j++) {
        let offsetX = left[i].x - right[j].x;
        let offsetY = left[i].y - right[j].y;
        let offsetZ = left[i].z - right[j].z;
        let offsetString = `${offsetX},${offsetY},${offsetZ}`;
        if (!offsetMap[offsetString]) {
          offsetMap[offsetString] = 0;
        } 
        offsetMap[offsetString]++;

        if (offsetMap[offsetString] >= 12) {
          return {
            x: offsetX,
            y: offsetY,
            z: offsetZ
          };
        }
      }
    }
    return false;
  }

  doesMatch(scanner) {
    let scannerPoints = scanner.points;
    for(let i=0; i<this.rotations.length; i++) {
      let b = this.pointsMatch(scannerPoints, this.rotations[i]);
      if (b) {

        this.position = new Point(b.x + scanner.position.x, b.y + scanner.position.y, b.z + scanner.position.z);
        this.points = this.rotations[i];
        return true;
      }
    }
    return false;
  }
}
let scanners = [];
fs.readFile('./input', 'utf-8', (err, data) => {
  let blocks = data.split('\n\n');
  for (let i=0; i<blocks.length; i++) {
    let lines = blocks[i].split('\n');
    let points = [];
    for (let j=1; j<lines.length; j++) {
      let [x, y, z] = lines[j].split(',');
      let p = new Point(parseInt(x), parseInt(y), parseInt(z));
      points.push(p);
    }
    let o = undefined;
    if (i==0) o = new Point(0, 0, 0);
    scanners.push(new Scanner(o, points));
  }
  let found = [];
  found.push(scanners.shift());

  while(scanners.length) {
    for (let i=0; i<scanners.length; i++) {
      for(let j=0; j<found.length; j++) {
        if (scanners[i] && scanners[i].doesMatch(found[j])) {
          found.push(scanners[i]);
          scanners.splice(i, 1);
        }
      }
    }
  }
  let b = [];
  for (let i=0; i<found.length; i++) {
    for (let j=0; j<found[i].points.length; j++) {
      let p = found[i].points[j];
      let o = found[i].position;
      let a = `${o.x+p.x},${o.y+p.y},${o.z+p.z}`;
      b[a] = 1;
    }
  }
  console.log(`Solution is ${Object.keys(b).length}`)
  
});