class MyBox {
    constructor(x, y, w, h) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        let options = {
            friction: 0.3,
            restitution: 0.6
        }
        this.body = Bodies.rectangle(this.x, this.y, this.w, this.h, options);
        
        Composite.add(world, this.body);
        this.opened = false;
    }

    show() {
        let pos = this.body.position;
        let angle = this.body.angle;
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        imageMode(CENTER);
        if (this.opened) {
            image(imgOpenedBox, 0, 0, this.w, this.h);
        } else {
            image(imgClosedBox, 0, 0, this.w, this.h);
        }
        pop();
   }

    contains(x, y) {
        // Transform mouse coordinates into the box's local space
        let pos = this.body.position;
        let angle = this.body.angle;
        // Translate point to box center
        let dx = x - pos.x;
        let dy = y - pos.y;
        // Rotate point in opposite direction of box
        let localX = dx * Math.cos(-angle) - dy * Math.sin(-angle);
        let localY = dx * Math.sin(-angle) + dy * Math.cos(-angle);
        // Check if point is inside box bounds
        return (
            localX > -this.w / 2 &&
            localX < this.w / 2 &&
            localY > -this.h / 2 &&
            localY < this.h / 2
        );
    }
}