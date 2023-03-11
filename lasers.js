class Laser {
  constructor(spos, sdir) {

    this.position = createVector(spos.x, spos.y);
    this.velocity = p5.Vector.fromAngle(sdir - PI / 2)
    this.angle = sdir
    this.velocity.mult(canvasSize / 50)
    this.r = canvasSize / 166
  }
  update() {
    this.position.add(this.velocity);
  }
  display() {
    push()
    strokeWeight(canvasSize / 250);
    stroke(255)
    noFill()
    translate(this.position.x, this.position.y)
    rotate(this.angle)
    line(0, 0, 0, canvasSize / 50)
    //circle(0, 0, this.r)
    pop()
  }
  hits(object) {
    let distance = dist(this.position.x, this.position.y, object.position.x, object.position.y)
    return distance < object.r
  }
  offscreen() {
    if (this.position.x > width || this.position.x < 0) {
      return true;
    }
    if (this.position.y > height || this.position.y < 0) {
      return true;
    }
    return false;
  }
}