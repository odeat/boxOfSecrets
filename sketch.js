let physics;
let boxes = [];

let grabbedBox = null;
let grabOffset;


function preload() {
  boxImage = loadImage('assets/closedBox.png');
}

function setup() {
  createCanvas(800, 800);
  physics = new toxi.physics2d.VerletPhysics2D();
  physics.setWorldBounds(new toxi.geom.Rect(0, 0, width - 25, height - 25));
  physics.addBehavior(new toxi.physics2d.behaviors.GravityBehavior(new toxi.geom.Vec2D(0, 0.4))); // zwaartekracht element

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

function mousePressed() {
  for (let box of boxes) {
    if (box.contains(mouseX, mouseY)) {
      grabbedBox = box;
      grabOffset = createVector(mouseX - box.particle.x, mouseY - box.particle.y);
      grabbedBox.lock();
      break;
    }
  }
}

function mouseDragged() {
  if (grabbedBox) {
    grabbedBox.moveTo(mouseX - grabOffset.x, mouseY - grabOffset.y);
  }
}

function mouseReleased() {
  if (grabbedBox) {
    grabbedBox.unlock();
    grabbedBox = null;
  }
}


