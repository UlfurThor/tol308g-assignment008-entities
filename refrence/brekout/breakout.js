// "Crappy PONG" -- step by step
//
// Step 13: Simplify
/*

Supporting timer-events (via setInterval) *and* frame-events (via requestAnimationFrame)
adds significant complexity to the the code.

I can simplify things a little by focusing on the latter case only (which is the
superior mechanism of the two), so let's try doing that...

The "MAINLOOP" code, inside g_main, is much simplified as a result.

*/

"use strict";

/* jshint browser: true, devel: true, globalstrict: true */

var g_canvas = document.getElementById("myCanvas");
var g_ctx = g_canvas.getContext("2d");

var score = 0;


var g_bgColor = randGradient(g_ctx, 0, 0, CANVAS_WIDTH_MAX, CANVAS_HEIGHT_MAX);

/*
0        1         2         3         4         5         6         7         8         9
123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
*/

// ============
// Genarate game objects
// ============

// creates paddle
g_paddles[0] = new Paddle({
    cx: 200,
    cy: 200,
    id: 0,
    bottomOffset: 50
});

//creates wall
g_wall = new Wall({
    rows: 5,
    columns: 10,

    top: 50,
    bottom: 150,
    // margin between briks
    bMarSide: 2,
    bMargTB: 2
});

//creates ball
var g_ball = new Ball({
    cx: 50,
    cy: 200,
    radius: 10,

    xVel: 5,
    yVel: 4,

    bgColor: randGradient(g_ctx, 0, 0, CANVAS_WIDTH_MAX, CANVAS_HEIGHT_MAX)
});

// =============
// GATHER INPUTS
// =============

function gatherInputs() {
    // Nothing to do here!
    // The event handlers do everything we need for now.
}

// =================
// UPDATE SIMULATION
// =================

// GAME-SPECIFIC UPDATE LOGIC

function updateSimulation(du) {

    g_ball.update(du);
    g_paddles.update(du);
    g_wall.update(du);

}


// =================
// RENDER SIMULATION
// =================

// GAME-SPECIFIC RENDERING

function renderSimulation(ctx) {

    g_ball.render(ctx);
    g_paddles.render(ctx);
    g_wall.render(ctx);
}


// Kick it off
function init() {
    g_main.init();
}

preloadStuff_thenCall(init);