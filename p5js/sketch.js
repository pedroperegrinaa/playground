function setup() {
  createCanvas(windowWidth, windowHeight);
  var ballX = Math.floor(Math.random() * (windowWidth / 2 - windowWidth + 30));
  console.log("math: ", ballX);
}

// function startBallRandom() {
//   let ballX = Math.floor(Math.random() * (windowWidth / 2 - windowWidth + 30));
//   console.log("math: ", ballX);
//   return ballX;
// }

function draw(ballX) {
  background(000);
  player1();
  centerLine();

  ellipse(ballX, 100, 20, 20);

  ballX = ballX + 1;
  console.log(ballX);
}

function player1() {
  fill(255);
  rect(30, mouseY, 15, 60); //lines
}

function centerLine() {
  rect(
    windowWidth / 2,
    windowHeight / 2 - windowHeight / 2.5,
    5,
    windowHeight - 50
  );
}
