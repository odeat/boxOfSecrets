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

let droppedBoxSounds = [];
let droppedBoxSoundIndex = 0;
let openingBoxSounds = [];
let openingBoxSoundIndex = 0;
let fiftyYearsOldSound;
let audioSecret2;

let imgClosedBox;
let imgOpenedBox;
let imgSecret1;
let fiftyYearsOldImg;
let atticImg;
let atticImg2;
let atticImg3;
let darkAttic;
let introImg;
let introSound;

let showSecret = false;
let currentSecretImg = null;

let bgMusic;

let darkAtticAlpha = 0;
let darkAtticTargetAlpha = 0;
let darkAtticFadeDuration = 3000; // milliseconds
let darkAtticFadeStartTime = null;

function preload() {
    droppedBoxSounds = [
        loadSound('sounds/droppedBoxSound.mp3'),
        loadSound('sounds/smashingBoxSound.mp3')
    ];
    openingBoxSounds = [
        loadSound('sounds/openingBoxSound.mp3'),
        loadSound('sounds/foldingOpenBoxSound.mp3'),
        loadSound('sounds/foldingOpenBoxSound2.mp3'),
        loadSound('sounds/foldingOpenBoxSound3.mp3'),
        loadSound('sounds/foldingOpenBoxSound4.mp3'),
        loadSound('sounds/foldingOpenBoxSound5.mp3')
    ];
    fiftyYearsOldSound = loadSound('sounds/50yearsOldSound.mp3');
    bgMusic = loadSound('sounds/Gigi Masin - Call me (But its very slowed).mp3');
    audioSecret2 = loadSound('sounds/slimfast.mp3');
    audioSecret3 = loadSound('sounds/desiree.mp3');
    audioSecret4 = loadSound('sounds/imMeantToBeAlone.mp3');
    audioSecret5 = loadSound('sounds/thankYouForCheating.mp3');
    audioSecret6 = loadSound('sounds/PTSD.mp3');
    audioSecret9 = loadSound('sounds/noOutletMalls.mp3');
    audioSecretErica = loadSound('sounds/erica.mp3');
    

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
    atticImg2 = loadImage('assets/atticImg.png');
    atticImg3 = loadImage('assets/atticImg3.png');
    darkAttic = loadImage('assets/darkenedAttic.png');
    introImg = loadImage('assets/intro.png');
    introSound = loadSound('sounds/intro.mp3');

    box1opened = loadImage('assets/box1opened.png');
    box1closed = loadImage('assets/box1closed.png');
    box2opened = loadImage('assets/box2opened.png');
    box2closed = loadImage('assets/box2closed.png');
    box3opened = loadImage('assets/box3opened.png');
    box3closed = loadImage('assets/box3closed.png');
    box4opened = loadImage('assets/box4opened.png');
    box4closed = loadImage('assets/box4closed.png');
    box5opened = loadImage('assets/box5opened.png');
    box5closed = loadImage('assets/box5closed.png');
    box6opened = loadImage('assets/box6opened.png');
    box6closed = loadImage('assets/box6closed.png');
    box7opened = loadImage('assets/box7opened.png');
    box7closed = loadImage('assets/box7closed.png');
    box8opened = loadImage('assets/box8opened.png');
    box8closed = loadImage('assets/box8closed.png');
    box9opened = loadImage('assets/box9opened.png');
    box9closed = loadImage('assets/box9closed.png');
    box10opened = loadImage('assets/box10opened.png');
    box10closed = loadImage('assets/box10closed.png');
    box11opened = loadImage('assets/box11opened.png');
    box11closed = loadImage('assets/box11closed.png');
    openMeBoxOPENED = loadImage('assets/openMeBoxOPENED.png');
    openMeBox = loadImage('assets/openMeBox.png');
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
    // Add the 12th box (openMeBox) at 2x size
    boxes.push(new MyBox(window.innerWidth / 2, window.innerHeight / 2, random(80, 160) * 2, random(80, 160) * 2));
   

    boxes[0].img = imgSecret1;
    boxes[0].openImg = box1opened
    boxes[0].closedImg = box1closed

    boxes[1].img = imgSecret2;
    boxes[1].sound = audioSecret2;
    boxes[1].openImg = box9opened;
    boxes[1].closedImg = box9closed;

    boxes[2].img = imgSecret3;
    boxes[2].sound = audioSecret3;
    boxes[2].openImg = box3opened
    boxes[2].closedImg = box3closed

    boxes[3].img = imgSecret4;
    boxes[3].sound = audioSecret4;
    boxes[3].openImg = box4opened
    boxes[3].closedImg = box4closed

    boxes[4].img = imgSecret5;
    boxes[4].sound = audioSecret5;
    boxes[4].openImg = box5opened
    boxes[4].closedImg = box5closed

    boxes[5].img = imgSecret6;
    boxes[5].sound = audioSecret6;
    boxes[5].openImg = box10opened;
    boxes[5].closedImg = box10closed;

    boxes[6].img = imgSecret7;
    boxes[6].sound = audioSecretErica;
    boxes[6].openImg = box6opened;
    boxes[6].closedImg = box6closed;

    boxes[7].img = imgSecret8;
    boxes[7].openImg = box8opened
    boxes[7].closedImg = box8closed

    boxes[8].img = imgSecret9;
    boxes[8].sound = audioSecret9;
    boxes[8].openImg = box2opened;
    boxes[8].closedImg = box2closed

    boxes[9].img = imgSecret10;
    boxes[9].openImg = box7opened;
    boxes[9].closedImg = box7closed

    boxes[10].img = fiftyYearsOldImg;
    boxes[10].sound = fiftyYearsOldSound
    boxes[10].openImg = box11opened
    boxes[10].closedImg = box11closed

    boxes[11].openImg = openMeBoxOPENED;
    boxes[11].closedImg = openMeBox;
    boxes[11].img = introImg;
    boxes[11].sound = introSound;

    // Add collision event listener
    Matter.Events.on(engine, 'collisionStart', function(event) {
        for (let pair of event.pairs) {
            let bodies = [pair.bodyA, pair.bodyB];

            // checks if box hit the left, right or ceiling border
            let borderBodies = [leftWall.body, rightWall.body, topWall.body];
            let border = bodies.find(b => borderBodies.includes(b));
            let box = boxes.find(box => bodies.includes(box.body));

            // plays sound if a box hits a border (not ground) and only once per collision
            if (box && border && droppedBoxSounds.length > 0) {
                if (!box._isTouchingBorder) {
                    let soundToPlay = droppedBoxSounds[droppedBoxSoundIndex % droppedBoxSounds.length];
                    if (soundToPlay && soundToPlay.isLoaded()) {
                        soundToPlay.play();
                    }
                    droppedBoxSoundIndex++;
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
        bgMusic.play();
    }
}

function draw() {
    background(51);
    imageMode(CORNER);

    // Fade logic for darkenedAttic
    if (showSecret && darkAttic) {
        if (darkAtticAlpha < 255) {
            if (darkAtticFadeStartTime === null) darkAtticFadeStartTime = millis();
            let elapsed = millis() - darkAtticFadeStartTime;
            darkAtticAlpha = constrain(map(elapsed, 0, darkAtticFadeDuration, 0, 255), 0, 255);
        }
    } else {
        if (darkAtticAlpha > 0) {
            if (darkAtticFadeStartTime === null) darkAtticFadeStartTime = millis();
            let elapsed = millis() - darkAtticFadeStartTime;
            darkAtticAlpha = constrain(map(elapsed, 0, darkAtticFadeDuration, 255, 0), 0, 255);
        } else {
            darkAtticAlpha = 0;
        }
    }
    // atticImg3 for background
    if (atticImg3) {
        image(atticImg3, 0, 0, width, height);
    }
    // Draw darkenedAttic with alpha
    if (darkAttic && darkAtticAlpha > 0) {
        push();
        tint(255, darkAtticAlpha);
        image(darkAttic, 0, 0, width, height);
        pop();
    }
    if ((showSecret && darkAtticAlpha >= 255) || (!showSecret && darkAtticAlpha <= 0)) {
        darkAtticFadeStartTime = null;
    }
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
    }
}

function mousePressed() {
    let boxClicked = false;
    // Only allow other boxes to open after openMeBox (boxes[11]) is opened
    let openMeBoxOpened = boxes[11] && boxes[11].opened;
    for (let i = 0; i < boxes.length; i++) {
        if (boxes[i].contains(mouseX, mouseY)) {
            // Only allow opening if openMeBox is opened or this is openMeBox
            if (!boxes[i].opened && (openMeBoxOpened || i === 11)) {
                boxes[i].opened = true;
                showSecret = true;
                currentSecretImg = boxes[i].img; // show the secret for this box
                let soundToPlay = openingBoxSounds[openingBoxSoundIndex % openingBoxSounds.length];
                if (soundToPlay && soundToPlay.isLoaded()) {
                    soundToPlay.play();
                }
                openingBoxSoundIndex++;
                // Delay the box's own sound by 2 seconds
                if (boxes[i].sound && boxes[i].sound.isLoaded()) {
                    setTimeout(() => {
                        boxes[i].sound.play();
                    }, 1700); // audio delay when box is opened 
                }
                // Halve the background music volume ONLY when secret is shown
                if (bgMusic && bgMusic.isLoaded()) {
                    bgMusic.setVolume(0.15);
                }
            }
            // Always allow dragging any box
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
            bgMusic.setVolume(0.3);
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