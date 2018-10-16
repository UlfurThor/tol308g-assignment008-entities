// ==========
// BALL STUFF
// ==========

// BALL STUFF
function Ball(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

    this.sprite = g_shipSprite;
    //this.sprite.height = this.radius * 2;
    //this.sprite.width = this.radius * 2;

    this.rot = 0;
}

Ball.prototype.update = function (du) {
    // Remember my previous position
    var prevX = this.cx;
    var prevY = this.cy;

    // Compute my provisional new position (barring collisions)
    var nextX = prevX + this.xVel * du;
    var nextY = prevY + this.yVel * du;

    var hit = g_paddles.collidesWith(prevX, prevY, nextX, nextY, this.radius);
    if (hit > 0)
        this.yVel *= -1;
    else if (hit < 0)
        this.xVel *= -1;


    var wallHit = g_wall.collidesWith(prevX, prevY, nextX, nextY, this.radius);
    if (wallHit > 0) {
        this.yVel *= -1;
        score += 10;
    } else if (wallHit < 0) {
        this.xVel *= -1;
        score += 10;
    }

    // Bounce off top and bottom edges
    if (nextY < 0 || // top edge
        nextY > g_canvas.height) { // bottom edge
        this.yVel *= -1;

        if (nextY < 0) {
            this.cy = 0;
        } else {
            this.cy = g_canvas.height;
            score--;
        }
    }

    if (nextX < 0 || // top edge
        nextX > g_canvas.width) { // bottom edge
        this.xVel *= -1;

        if (nextX < 0) {
            this.cx = 0;
        } else {
            this.cx = g_canvas.width;
        }

        
    }


    // Reset if we fall off the left or right edges
    // ...by more than some arbitrary `margin`
    //
    var margin = 4 * this.radius;
    if (nextX < -margin ||
        nextX > g_canvas.width + margin) {
        //this.reset();
        console.log("off");
    }

    // *Actually* update my position 
    // ...using whatever velocity I've ended up with
    //
    this.cx += this.xVel * du;
    this.cy += this.yVel * du;

    this.rot += du*0.25;
};

Ball.prototype.reset = function () {
    this.cx = 300;
    this.cy = 100;
    this.xVel = -5;
    this.yVel = 4;
};

Ball.prototype.render = function (ctx) {
    var oldFill = ctx.fillStyle;
    ctx.fillStyle = this.bgColor;
    g_shipSprite.drawCentredAt(ctx, this.cx, this.cy, this.rot);
    //fillCircle(ctx, this.cx, this.cy, this.radius);
    ctx.fillStyle = oldFill;
};