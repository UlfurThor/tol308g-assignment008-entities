
// Construct a "sprite" from the given `image`

function Sprite(image) {

    this.image = image;

    this.height = image.height;
    this.width = image.width;

}

// draws sprite at location
Sprite.prototype.drawCentredAt = function (ctx, cx, cy, rotation, scale) {

    // This is how to implement default parameters...
    if (rotation === undefined) rotation = 0;
    if (scale === undefined) scale = 1;


    ctx.translate(cx, cy);
    ctx.rotate(rotation);
    ctx.drawImage(this.image, -(this.width * scale) / 2, -(this.height * scale) / 2,
        this.width * scale,
        this.height * scale
    );
    ctx.rotate(-rotation);
    ctx.translate(-cx, -cy);

};

// =============
// PRELOAD STUFF
// =============

var g_shipSprite;

function preloadStuff_thenCall(completionCallback) {
    var g_shipImage = new Image();
    g_shipImage.src = "ship.png";

    g_shipImage.onload = function () {
        g_shipSprite = new Sprite(g_shipImage);
        completionCallback();
    };
}






