let physics;
let boxes = [];

function setup() {
  createCanvas(800, 800);
  physics = new toxi.physics2d.VerletPhysics2D();
  physics.setWorldBounds(new toxi.geom.Rect(0, 0, width, height));
  physics.addBehavior(new toxi.physics2d.behaviors.GravityBehavior(new toxi.geom.Vec2D(0, 0.5)));

  // create some "objects"
  for (let i = 0; i < 10; i++) {
    boxes.push(new Box(random(width), random(height / 2)));
  }
}

function draw() {
  background(220);

// ---------- UPDATE SECTION ----------
  physics.update();


// ---------- RENDER SECTION ----------
  for (let box of boxes) {
    box.display();
  }
}


