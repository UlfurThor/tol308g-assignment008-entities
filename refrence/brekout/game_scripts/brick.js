var cc = 0;

function Brick(descr) {
    for (var property in descr) {
        this[property] = descr[property];
    }

    console.log("brick made " + cc);
    cc++;
    this.fill = randGradient(g_ctx, 0, this.cy - this.height, CANVAS_WIDTH_MAX, this.cy + this.height);
}
Brick.prototype.colision = function (dir) {
    this.colDir = dir;
    this.particles = [];
    var r = Math.floor(Math.random() * 20);
    r += 10;
    var xvel = 0;
    var yvel = 0;

    switch (dir) {
        case 1:
            yvel = -1;
            break;
        case 2:
            yvel = 1;
            break;
        case -1:
            xvel = -1;
            break;
        case -2:
            xvel = 1;
            break;

        default:
            break;
    }
    for (let i = 0; i < r; i++) {
        if (yvel != 0) {
            xvel = Math.random() * 4 - 2;
            yvel = 0.5 * yvel + Math.random() * yvel;
        } else {
            yvel = Math.random() * 4 - 2;
            xvel = 0.5 * xvel + Math.random() * xvel;
        }
        var randlife = Math.random() * 50 + 50;
        this.particles[i] = (new Particle(xvel, yvel, randlife));

    }
}

Brick.prototype.render = function (ctx, cx, cy) {
    if (!this.exists) {
        var oldStyle = ctx.fillStyle;
        ctx.fillStyle = this.fill;

        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].render(ctx, cx, cy);
        }
        ctx.fillStyle = oldStyle;
    }
}

Brick.prototype.update = function (du) {
    if (!this.exists) {
        for (let i = this.particles.length - 1; i >= 0; i--) {

            this.particles[i].update(du);
            if (this.particles[i].randlife <= 0) {
                this.particles.splice(i, 1);

            }
        }

    }
}

function Particle(xvel, yvel, randlife) {
    this.xvel = xvel;
    this.yvel = yvel;

    this.xpos = 0;
    this.ypos = 0;

    this.randlife = randlife;
}

Particle.prototype.render = function (ctx, cx, cy) {
    //console.log(cx);
    fillCircle(ctx, cx + this.xpos, cy + this.ypos, this.randlife / 10);
}

Particle.prototype.update = function (du) {
    this.randlife -= du;
    if (this.randlife < 0)
        this.randlife = 0;
    this.xpos += this.xvel * du;
    this.ypos += this.yvel * du;
}