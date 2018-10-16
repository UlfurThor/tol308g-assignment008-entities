var g_paddles = [];
// Bounce off the paddles

// detects colision for all paddles
g_paddles.collidesWith = function (prevX, prevY, nextX, nextY, radius) {
    for (let i = 0; i < g_paddles.length; i++) {
        var hit = g_paddles[i].collidesWith(prevX, prevY, nextX, nextY, radius);
        if (hit != 0) {
            return hit;

        }
    }
    return 0;
};

// renders all paddles
g_paddles.render = function (ctx) {
    for (let i = 0; i < g_paddles.length; i++) {
        g_paddles[i].render(ctx);
    }
};
// updates all paddles
g_paddles.update = function (du) {
    for (let i = 0; i < g_paddles.length; i++) {
        g_paddles[i].update(du);
    }
};