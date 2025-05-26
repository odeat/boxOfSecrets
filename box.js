class Box {
  constructor(x, y) {
    this.particle = new toxi.physics2d.VerletParticle2D(x, y);
    physics.addParticle(this.particle);
    this.locked = false;
  }

  display() {
    fill(100);
    noStroke();
    ellipse(this.particle.x, this.particle.y, 20, 20);
  }
}