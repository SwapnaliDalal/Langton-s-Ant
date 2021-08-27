let ant; //declare ant variable
let grid; //declare var for background grid

const rate = 2 //set framerate
const columns = 10; //set number of columns/rows in grid
const rows = columns
let size; //side of unit square in grid


function setup() { 
  createCanvas(400, 400);
  frameRate(rate);
  
  size = width / columns;
  
  grid = makeGrid(columns,rows);

  //randonmly initialize ant
  const xi=int(random(1,columns-1))
  const yi=int(random(1,rows-1))
	ant = new Ant(xi,yi);

} 

function draw() { 
  background(255);
  
  const x = ant.position.x;
  const y = ant.position.y;

  //stop ant when it reaches the border of grid
  if (y < 1 || x > columns-2 || y > rows-2 || x < 1) {
    ant.stop();
  }

  //draw grid
  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      if (grid[i][j] == 1) {
        fill(0);
      } else {
        fill(255);
      }
      stroke(0);
      rect(i*size, j*size, size-1, size-1);
    }
  }
  
  //draw ant
  fill(255, 0, 0);
  circle((x+0.5)*size, (y+0.5)*size, size);
  
  //move ant according to rules
  if (grid[x][y] > 0) {
    ant.turnLeft();
  } else {
    ant.turnRight();
  }
  
  grid[x][y] = grid[x][y] > 0 ? 0 : 1;
  ant.moveForward();
}

//define movements of the ant
class Ant {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.direction = 0;
    //dir=0;moveUp
    //dir=1;moveRight
    //dir=2;moveDown
    //dir=3;moveLeft
  }
  
  turnLeft() {
    this.direction--;
    if (this.direction < 0) {
      this.direction = 3;
    }
  }
  
  turnRight() {
    this.direction++;
    if (this.direction > 3) {
			this.direction = 0;    
    }
  }
  
  moveForward() {
    if (this.direction === 0) {
      this.position.add(0, -1);
    } else if (this.direction === 1) {
      this.position.add(1, 0);
    } else if (this.direction === 2) {
      this.position.add(0, 1);
    } else if (this.direction === 3) {
      this.position.add(-1, 0);
    }
  }
  
  stop() {
    noLoop();
  }
}

//function to make a 2d array for background grid
function makeGrid(columns,rows){
  newgrid = [];
  for (let i = 0; i < columns; i++) {
    newgrid.push([]);
    for (let j = 0; j < rows; j++) {
      newgrid[i].push(0);
    }
  }
  return newgrid
}


