class Box {
  constructor(x, y) {
    this.w = 50;
    this.h = 50;
    this.particle = new toxi.physics2d.VerletParticle2D(x, y);
    physics.addParticle(this.particle);
  }

  display() {
    fill(171,137,112); // brown color to represent a box xd
    // noStroke();
    rectMode(CENTER);
    rect(this.particle.x, this.particle.y, this.w, this.h);
  }

  contains(px, py) {
    return (
      px > this.particle.x - this.w / 2 &&
      px < this.particle.x + this.w / 2 &&
      py > this.particle.y - this.h / 2 &&
      py < this.particle.y + this.h / 2
    );
  }

  lock() {
    this.particle.lock();
  }

  unlock() {
    this.particle.unlock();
  }

  moveTo(x, y) {
    this.particle.set(x, y);
  }
}
