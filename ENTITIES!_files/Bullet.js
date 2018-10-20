// ======
// BULLET
// ======

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

/*
0        1         2         3         4         5         6         7         8
12345678901234567890123456789012345678901234567890123456789012345678901234567890
*/


// A generic contructor which accepts an arbitrary descriptor object
function Bullet(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

    this.life = this.lifeSpan;
}

// Initial, inheritable, default values
//
// (You might want these to assist with early testing,
//  even though they are unnecessary in the "real" code.)
//
Bullet.prototype.rotation = 0;
Bullet.prototype.cx = 200;
Bullet.prototype.cy = 200;
Bullet.prototype.velX = 1;
Bullet.prototype.velY = 1;
Bullet.prototype.gravEnabled = false;

// Convert times from seconds to "nominal" time units.
Bullet.prototype.lifeSpan = 3 * SECS_TO_NOMINALS;

Bullet.prototype.update = function (du) {
    // DONE--TODO-inprogress: Implement this
    this.applyVelocity(du);
    this.wrapPosition();
    this.life -= du;
    if (this.life < 0)
        this.KILL_ME_NOW = entityManager.KILL_ME_NOW;
    // NB: Remember to handle screen-wrapping... and "death"
};

Bullet.prototype.applyVelocity = function (du) {
    // updates the velocity of a bullet
    // borowed HEAVILY from the ship update method


    // bounce
    // kept bacause its funny
    // not curently enabled
    // s = s + v_ave * t
    var nextY = this.cy + this.velY * du;
    if (g_useGravity && this.gravEnabled) {

        var minY = g_sprites.ship.height / 2;
        var maxY = g_canvas.height - minY;

        // Ignore the bounce if the bullet is already in
        // the "border zone" (to avoid trapping them there)
        if (this.cy > maxY || this.cy < minY) {
            // do nothing
        } else if (nextY > maxY || nextY < minY) {
            this.velY = this.velY * -0.9;

        }
    }

    // s = s + v * t
    this.cx += du * this.velX;
    this.cy += du * this.velY;
}

Bullet.prototype.setPos = function (cx, cy) {
    this.cx = cx;
    this.cy = cy;
}

Bullet.prototype.getPos = function () {
    return {
        posX: this.cx,
        posY: this.cy
    };
}

Bullet.prototype.wrapPosition = function () {
    this.cx = util.wrapRange(this.cx, 0, g_canvas.width);
    this.cy = util.wrapRange(this.cy, 0, g_canvas.height);
};

Bullet.prototype.render = function (ctx) {

    // DONE--TODO: Modify this to implement a smooth "fade-out" during
    // the last third of the bullet's total "lifeSpan"

    // NB: You can make things fade by setting `ctx.globalAlpha` to
    // a value between 0 (totally transparent) and 1 (totally opaque).

    var fadeThresh = Bullet.prototype.lifeSpan / 3;
    // ..YOUR STUFF..
    if (this.life < fadeThresh) {
        var remaining = this.life / fadeThresh;
        ctx.globalAlpha = remaining;
    }

    // ..YOUR STUFF..
    g_sprites.bullet.drawWrappedCentredAt(
        ctx, this.cx, this.cy, this.rotation
    );
    ctx.globalAlpha = 1.0;


};