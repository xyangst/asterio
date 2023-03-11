

//sounds
let pew;
let bang;

//global variables
let canvasSize = 0
let asteroids;
let lasers;
let lives;
let Timer;
let sound = false
let score;
//highscore from localStorage
let highscore = localStorage.getItem("highscore") || 0;

function setup() {

  textFont('Courier New');
  canvasSize = min(windowWidth, windowHeight);
  createCanvas(canvasSize, canvasSize);

  //start the Game
  restartGame(3, 0)
  console.log(canvasSize)

}
function windowResized() {
  canvasSize = min(windowWidth, windowHeight);
  // resize the canvas whenever the window size changes
  resizeCanvas(canvasSize, canvasSize);

}

//set Sounds
function preload() {
  pew = loadSound("fire.wav")
  bang = loadSound("bangLarge.wav")
}
function draw() {

  Timer += deltaTime;
  //ui drawing (in IIFE because why not)

  (function () {
    //Your code goes here
    push()
    strokeWeight(0.5)
    background(0);
    stroke(0);
    fill(255);


    for (let i = 0; i < lives; i++) {
      heart(i * canvasSize / 20 + canvasSize / 16, canvasSize / 16, canvasSize / 32)

    }
    textAlign(LEFT, TOP)
    textSize(canvasSize / 25)
    text(score, canvasSize / 25, canvasSize / 125)
    textAlign(RIGHT, TOP)
    text(highscore, width - canvasSize / 25, canvasSize / 125)
    //text(round(frameRate()),10,50)
    textSize(canvasSize / 37)
    textAlign(CENTER, BASELINE)
    text("[LEFT/RIGHTARROW]Turn[UPARROW]Accelerate[SPACE]Shoot[M]Mute", width / 2, height - canvasSize / 125);

    if (lives < 1) {
      textSize(canvasSize / 20)
      textAlign(CENTER, CENTER);
      if (Timer % 3000 > 1500) {

        text("PRESS R TO RESTART", width / 2, height / 2)
      } else {
        text("GAME OVER", width / 2, height / 2)
      }


    }
    pop()

  })()
  //game
  if (lives > 0) {
    //make sure there are always 10 asteroids
    if (asteroids.length < 10) {
      asteroids.push(new Asteroid())
    }
    //collision checks
    for (let i = 0; i < asteroids.length; i++) {
      if (ship.hits(asteroids[i])) {
        restartGame(lives - 1, score)
        break;
      }
      asteroids[i].display()
      asteroids[i].update()
    }
    for (let i = 0; i < lasers.length; i++) {

      lasers[i].display()
      lasers[i].update()
      if (lasers[i].offscreen()) {
        lasers.splice(i, 1);
      } else {
        for (let j = asteroids.length - 1; j >= 0; j--) {
          if (lasers[i].hits(asteroids[j])) {
            if (sound) bang.play()

            score += floor(asteroids[j].r / canvasSize * 50) * 10
            lasers.splice(i, 1)
            if (asteroids[j].r > canvasSize / 35) {
              let newAsteroids = asteroids[j].breakup();
              asteroids = asteroids.concat(newAsteroids);
            }
            asteroids.splice(j, 1)
            break;
          }


        }
      }
    }

    // Update position
    ship.update();
    // Wrape edges
    ship.wrapEdges();
    // Draw ship
    ship.display();

     
    if (keyIsDown(LEFT_ARROW)) {
      ship.turn(-0.06);
    } else if (keyIsDown(RIGHT_ARROW)) {
      ship.turn(0.06);
    }
    if (keyIsDown(UP_ARROW)) {
      ship.thrust();
    }

  }
}

function keyPressed() {

  if (keyIsDown(32)) {
    if (sound) pew.play()
    lasers.push(new Laser(ship.position, ship.rotation))
    ship.shoot = true
  }
  if (keyIsDown(82)) {
    restartGame()
  }
  if (keyIsDown(77)) {
    sound = !sound

  }
}

function restartGame(h = 3, s = 0) {
  Timer = 0;
  ship = new Spaceship();

  if (highscore < score) {
    highscore = score
    localStorage.setItem('highscore', highscore);

  }
  score = s
  lasers = []
  asteroids = []
  lives = h;
}


function heart(x, y, size) {
  push()
  stroke(255)
  strokeWeight(canvasSize / 500)
  noFill()
  beginShape();
  vertex(x, y);
  bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 3, x, y + size);
  bezierVertex(x + size, y + size / 3, x + size / 2, y - size / 2, x, y);
  endShape(CLOSE);
  pop()
}
