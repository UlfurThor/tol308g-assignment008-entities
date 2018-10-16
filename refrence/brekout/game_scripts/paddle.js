// A generic constructor which accepts an arbitrary descriptor object
function Paddle(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

    this.cy = g_canvas.height - this.bottomOffset;
}

// Add these properties to the prototype, where they will server as
// shared defaults, in the absence of an instance-specific overrides.

Paddle.prototype.halfWidth = 100;
Paddle.prototype.halfHeight = 10;

Paddle.prototype.update = function (du) {
    if (g_keys[GO_UP[this.id]]) {
        g_canvas.height -= 5 * du;
        if (g_canvas.height < CANVAS_HEIGHT_MIN) {
            g_canvas.height = CANVAS_HEIGHT_MIN;
        }
        this.cy = g_canvas.height - this.bottomOffset;
        //this.cy -= 5 * du;
    } else if (g_keys[GO_DOWN[this.id]]) {
        g_canvas.height += 5 * du;
        if (g_canvas.height > CANVAS_HEIGHT_MAX) {
            g_canvas.height = CANVAS_HEIGHT_MAX;
        }
        this.cy = g_canvas.height - this.bottomOffset;
        //this.cy += 5 * du;
    }

    if (g_keys[GO_LEFT[this.id]]) {
        g_canvas.width -= 5 * du;
        if (g_canvas.width < CANVAS_WIDTH_MIN) {
            g_canvas.width = CANVAS_WIDTH_MIN;
        }
        this.cx = g_canvas.width / 2;
        //this.cx -= 5 * du;
    } else if (g_keys[GO_RIGHT[this.id]]) {
        g_canvas.width += 5 * du;
        if (g_canvas.width > CANVAS_WIDTH_MAX) {
            g_canvas.width = CANVAS_WIDTH_MAX;
        }
        this.cx = g_canvas.width / 2;
        //this.cx += 5 * du;
    }
};

Paddle.prototype.render = function (ctx) {
    // (cx, cy) is the centre; must offset it for drawing
    //ctx.strokeRect(this.cx - this.halfWidth,
    ctx.fillRect(this.cx - this.halfWidth,
        this.cy - this.halfHeight,
        this.halfWidth * 2,
        this.halfHeight * 2);
};


// cheks not only for colision, but the direction of said colision
Paddle.prototype.collidesWith = function (
    prevX, prevY,
    nextX, nextY,
    r) {
    var cy = this.cy;
    var cx = this.cx;


    if ((nextY - r < cy + this.halfHeight && prevY - r >= cy + this.halfHeight)) {
        // Check Y coords
        if (nextX + r >= cx - this.halfWidth &&
            nextX - r <= cx + this.halfWidth) {
            // It's a hit!
            console.log("bottom");
            return 1;
        }
    } else if ((nextY + r > cy - this.halfHeight && prevY + r <= cy - this.halfHeight)) {
        if (nextX + r >= cx - this.halfWidth &&
            nextX - r <= cx + this.halfWidth) {
            // It's a hit!
            console.log("top");
            return 2;
        }
    } else if ((nextX - r < cx + this.halfWidth && prevX - r >= cy + this.halfWidth)) {
        // Check X coords
        if (nextY + r >= cy - this.halfHeight &&
            nextY - r <= cy + this.halfHeight) {
            // It's a hit!
            console.log("right");
            return -1;
        }
    } else if ((nextX + r > cx - this.halfWidth && prevX + r <= cy - this.halfWidth)) {
        if (nextY + r >= cy - this.halfHeight &&
            nextY - r <= cy + this.halfHeight) {
            // It's a hit!
            console.log("left");
            return -2;
        }
    }

    // It's a miss!
    return 0;
};