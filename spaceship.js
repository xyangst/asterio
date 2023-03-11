
class Spaceship {


  constructor() {
    // All of our regular motion stuff
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.shoot = false

    // Arbitrary damping to slow down ship
    this.damping = 0.995;
    this.topspeed = canvasSize / 100;
    // Variable for rotation!
    this.rotation = random(0, TWO_PI)
    // Size
    this.r = canvasSize / 16;
    // Are we thrusting (to color boosters)
    this.thrusting = false;
  }
  // Standard Euler integration
  update() {
    this.velocity.add(this.acceleration);
    this.velocity.mult(this.damping);
    this.velocity.limit(this.topspeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

  }
  hits(object) {
    let d = dist(this.position.x, this.position.y, object.position.x, object.position.y)
    let hits = d < this.r / 2 + object.r
    return hits
  }



  turn(a) {
    this.rotation += a;
  }

  thrust() {
    // offset angle
    let angle = this.rotation - PI / 2;
    let f = p5.Vector.fromAngle(angle);
    f.mult(canvasSize / 5000);
    this.acceleration.add(f);

    f.mult(-2);

    this.thrusting = true;
  }

  wrapEdges() {
    let buffer = this.r;
    if (this.position.x > width + buffer) this.position.x = -buffer;
    else if (this.position.x < -buffer) this.position.x = width + buffer;
    if (this.position.y > height + buffer) this.position.y = -buffer;
    else if (this.position.y < -buffer) this.position.y = height + buffer;
  }


  // Draw the ship
  display() {
    push();
    stroke(255);
    strokeWeight(canvasSize / 500);
    fill(0)
    translate(this.position.x, this.position.y);
    rotate(this.rotation);
    // fire
    if (this.thrusting) {
      drawHeart(0, this.r / 2, canvasSize / 25);
      drawHeart(0, this.r / 2, canvasSize / 42)
    }
    // rockets

    rectMode(CENTER);
    rotate(startDistance)
    rotate(-distanceinBetween / 2)
    rect(-this.r / 4, this.r / 2.5, this.r / 3, this.r / 2);
    rotate(distanceinBetween)
    rect(this.r / 4, this.r / 2.5, this.r / 3, this.r / 2);
    rotate(-startDistance)
    rotate(-distanceinBetween / 2)
    rect(0, this.r / 2.5, this.r / 2, this.r / 1.75);

    //front gun
    fill(0)
    if (this.shoot) fill(255);
    rect(0, -this.r / 2, this.r / 2, this.r / 2)
    fill(0)
    circle(0, 0, this.r)
    pop();
    this.thrusting = false;
    this.shoot = false;
  }
}
let startDistance = Math.PI / 2 * 0
let distanceinBetween = -Math.PI / 6
