class Asteroid {
  constructor(pos, r) {
    if (r) {
      this.r = r * 0.5;
    } else {
      this.r = random(canvasSize / 33, canvasSize / 10);
    }
    if (pos) {
      this.position = pos.copy();
    } else {
      let edge = floor(random(4));
      let x = 0;
      let y = 0;
      if (edge === 0) {
        x = -this.r;
        y = random(height);
      } else if (edge === 1) {
        x = width + this.r;
        y = random(height);
      } else if (edge === 2) {
        x = random(width);
        y = -this.r;
      } else {
        x = random(width);
        y = height + this.r;
      }
      this.position = createVector(x, y)
    }


    this.total = floor(random(5, 15));
    this.offsets = [];
    this.velocity = p5.Vector.random2D();
    this.velocity.mult(random(canvasSize / 500, canvasSize / 350))
    for (let i = 0; i < this.total; i++) {
      this.offsets[i] = random(-this.r * 0.5, this.r * 0.5);
    }
  }
  display() {
    push();
    noFill();
    stroke(255);
    strokeWeight(canvasSize / 500);
    translate(this.position.x, this.position.y);
    beginShape();
    for (let i = 0; i < this.total; i++) {
      let angle = map(i, 0, this.total, 0, TWO_PI);
      let r = this.r - this.offsets[i];
      let x = cos(angle) * r;
      let y = sin(angle) * r;
      vertex(x, y);
    }
    endShape(CLOSE);
    pop();
  };

  wrapEdges() {
    let buffer = this.r;
    if (this.position.x > width + buffer)
      this.position.x = -buffer;
    else if (this.position.x < -buffer)
      this.position.x = width + buffer;
    if (this.position.y > height + buffer)
      this.position.y = -buffer;
    else if (this.position.y < -buffer)
      this.position.y = height + buffer;
  };

  update() {
    this.wrapEdges();
    this.position.add(this.velocity);
    this.wrapEdges();
  };
  breakup() {
    var newA = [];
    newA[0] = new Asteroid(this.position, this.r);
    newA[1] = new Asteroid(this.position, this.r);
    return newA;
  }
}