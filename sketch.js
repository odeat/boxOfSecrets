// Coding Train / Daniel Shiffman
// 15.7 Matter.js tutorial Basic Implemenation

// Youtube: https://www.youtube.com/watch?v=urR596FsU68

// Note that the syntax in the sketch has been updated. Refer to NOC Chapter 6

// let Engine = Matter.Engine,
//     World = Matter.World,
//     Bodies = Matter.Bodies;
    
const { Engine, World, Bodies, Composite } = Matter;

let engine;
let world;
let boxes = [];
let ground;
let mouseConstraint = null;
let selectedBox = null;
let leftWall, rightWall, topWall;

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);
    // create an engine
    engine = Engine.create();
    world = engine.world;

    // Ground
    ground = new Boundary(window.innerWidth / 2, height + 20, width, 100);
    // Borders
    leftWall = new Boundary(-50, height / 2, 100, height);
    rightWall = new Boundary(width + 50, height / 2, 100, height);
    topWall = new Boundary(width / 2, -50, width, 100);
    Composite.add(world, ground);
    Composite.add(world, leftWall);
    Composite.add(world, rightWall);
    Composite.add(world, topWall);

    boxes.push(new MyBox(window.innerWidth / 2, window.innerHeight / 2, random(10, 40), random(10,40)));
    boxes.push(new MyBox(window.innerWidth / 2, window.innerHeight / 2, random(10, 40), random(10,40)));
    boxes.push(new MyBox(window.innerWidth / 2, window.innerHeight / 2, random(10, 40), random(10,40)));
    boxes.push(new MyBox(window.innerWidth / 2, window.innerHeight / 2, random(10, 40), random(10,40)));
    boxes.push(new MyBox(window.innerWidth / 2, window.innerHeight / 2, random(10, 40), random(10,40)));
    boxes.push(new MyBox(window.innerWidth / 2, window.innerHeight / 2, random(10, 40), random(10,40)));
}


function draw() {
    background(51);
    Engine.update(engine);
    for (let i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }
    ground.show();
    leftWall.show();
    rightWall.show();
    topWall.show();
}

function mousePressed() {
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].contains(mouseX, mouseY)) {
            selectedBox = boxes[i];
            mouseConstraint = Matter.Constraint.create({
                pointA: { x: mouseX, y: mouseY },
                bodyB: selectedBox.body,
                stiffness: 0.2,
                damping: 0.1
            });
            Composite.add(world, mouseConstraint);
            break;
        }
    }
}

function mouseDragged() {
    if (mouseConstraint) {
        mouseConstraint.pointA.x = mouseX;
        mouseConstraint.pointA.y = mouseY;
    }
}

function mouseReleased() {
    if (mouseConstraint) {
        Composite.remove(world, mouseConstraint);
        mouseConstraint = null;
        selectedBox = null;
    }
}