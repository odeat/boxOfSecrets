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

let droppedBoxSound;
let openingBoxSound;
let fiftyYearsOldSound;

let imgClosedBox;
let imgOpenedBox;
let imgSecret1;
let fiftyYearsOldImg;
let atticImg;

let showSecret = false;
let currentSecretImg = null;

let bgMusic;

function preload() {
    droppedBoxSound = loadSound('sounds/droppedBoxSound.mp3');
    openingBoxSound = loadSound('sounds/openingBoxSound.mp3');
    fiftyYearsOldSound = loadSound('sounds/50yearsOldSound.mp3');
    bgMusic = loadSound('sounds/Gigi Masin - Call me (But its very slowed).mp3');
    
    imgClosedBox = loadImage('assets/closedBox.png');
    imgOpenedBox = loadImage('assets/openedBox.png');

    imgSecret1 = loadImage('assets/secret1.png');
    imgSecret2 = loadImage('assets/secret2.png');
    imgSecret3 = loadImage('assets/secret3.png');  
    imgSecret4 = loadImage('assets/secret4.png');
    imgSecret5 = loadImage('assets/secret5.png');
    imgSecret6 = loadImage('assets/secret6.png');
    imgSecret7 = loadImage('assets/secret7.png');
    imgSecret8 = loadImage('assets/secret8.png');
    imgSecret9 = loadImage('assets/secret9.png');
    imgSecret10 = loadImage('assets/secret10.png');
    fiftyYearsOldImg = loadImage('assets/fiftyYearsOldImg.png');
    // atticImg = loadImage('assets/atticImg.jpg');
}

function setup() {
    createCanvas(window.innerWidth, window.innerHeight);

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
    	
    for (let i = 0; i < 11; i++) {
        boxes.push(new MyBox(window.innerWidth / 2, window.innerHeight / 2, random(80, 160), random(80, 160)));
    }
    boxes[0].img = imgSecret1;
    boxes[1].img = imgSecret2;
    boxes[2].img = imgSecret3;
    boxes[3].img = imgSecret4;
    boxes[4].img = imgSecret5;
    boxes[5].img = imgSecret6;
    boxes[6].img = imgSecret7;
    boxes[7].img = imgSecret8;
    boxes[8].img = imgSecret9;
    boxes[9].img = imgSecret10;
    boxes[10].sound = fiftyYearsOldSound
    boxes[10].img = fiftyYearsOldImg;


    // Add collision event listener
    Matter.Events.on(engine, 'collisionStart', function(event) {
        for (let pair of event.pairs) {
            let bodies = [pair.bodyA, pair.bodyB];

            // checks if box hit the left, right or ceiling border
            let borderBodies = [leftWall.body, rightWall.body, topWall.body];
            let border = bodies.find(b => borderBodies.includes(b));
            let box = boxes.find(box => bodies.includes(box.body));

            // plays sound if a box hits a border (not ground) and only once per collision
            if (box && border && droppedBoxSound && droppedBoxSound.isLoaded()) {
                if (!box._isTouchingBorder) {
                    droppedBoxSound.play();
                    box._isTouchingBorder = true;
                }
            }
        }
    });

    // adds collision end event listener to reset the touching state
    Matter.Events.on(engine, 'collisionEnd', function(event) {
        for (let pair of event.pairs) {
            let bodies = [pair.bodyA, pair.bodyB];
            let borderBodies = [leftWall.body, rightWall.body, topWall.body];
            let box = boxes.find(box => bodies.includes(box.body));
            let border = bodies.find(b => borderBodies.includes(b));
            if (box && border) {
                box._isTouchingBorder = false;
            }
        }
    });

    // background music on loop
    if (bgMusic && bgMusic.isLoaded()) {
        bgMusic.setVolume(0.3);
        bgMusic.loop();
    }
}

function draw() {
    background(51);
    imageMode(CENTER);
    // image(atticImg, width / 2, height / 2, atticImg.width * 2.2, atticImg.height * 2.2);
    Engine.update(engine);

    for (let i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }
    ground.show();
    leftWall.show();
    rightWall.show();
    topWall.show();

    // Show the secret image in the center if needed
    if (showSecret && currentSecretImg) {
        let imgW = currentSecretImg.width;
        let imgH = currentSecretImg.height;
        imageMode(CENTER);
        image(currentSecretImg, width / 2, height / 2, imgW / 2, imgH / 2);
        // image(currentSecretImg, width / 2, height / 2, imgW * 1.2, imgH * 1.2);
        //image(currentSecretImg, width / 2, height / 2, imgW / 1.5, imgH / 1.5);
    }
}

function mousePressed() {
    let boxClicked = false;
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].contains(mouseX, mouseY)) {
            // Open the box if not already opened
            if (!boxes[i].opened) {
                boxes[i].opened = true;
                showSecret = true;
                currentSecretImg = boxes[i].img; // Show the secret for this box
                if (openingBoxSound && openingBoxSound.isLoaded()) {
                    openingBoxSound.play();
                }
                if (boxes[i].sound && boxes[i].sound.isLoaded()) {
                    boxes[i].sound.play();
                }
                // Halve the background music volume ONLY when secret is shown
                if (bgMusic && bgMusic.isLoaded()) {
                    bgMusic.setVolume(0.15);
                }
            }
            selectedBox = boxes[i];
            mouseConstraint = Matter.Constraint.create({
                pointA: { x: mouseX, y: mouseY },
                bodyB: selectedBox.body,
                stiffness: 0.2,
                damping: 0.1
            });
            Composite.add(world, mouseConstraint);
            boxClicked = true;
            break;
        }
    }
    if (!boxClicked) {
        // Stop any box audio if open and user clicks outside
        for (let i = 0; i < boxes.length; i++) {
            if (boxes[i].sound && boxes[i].sound.isPlaying && boxes[i].sound.isPlaying()) {
                boxes[i].sound.stop();
            }
        }
        showSecret = false;
        currentSecretImg = null;
        // Restore background music volume when secret is hidden
        if (bgMusic && bgMusic.isLoaded()) {
            bgMusic.setVolume(0.4);
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