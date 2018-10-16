// GENERIC RENDERING

var g_doClear = true;
var g_doBox = false;
var g_undoBox = false;
var g_doFlipFlop = false;
var g_doRender = true;

var g_frameCounter = 1;



function render(ctx) {


    // Process various option toggles
    //
    if (eatKey(TOGGLE_CLEAR)) g_doClear = !g_doClear;
    if (eatKey(TOGGLE_BOX)) g_doBox = !g_doBox;
    if (eatKey(TOGGLE_UNDO_BOX)) g_undoBox = !g_undoBox;
    if (eatKey(TOGGLE_FLIPFLOP)) g_doFlipFlop = !g_doFlipFlop;
    if (eatKey(TOGGLE_RENDER)) g_doRender = !g_doRender;

    // I've pulled the clear out of `renderSimulation()` and into
    // here, so that it becomes part of our "diagnostic" wrappers
    //
    if (g_doClear) {
        clearCanvas(ctx);
        fillBox(ctx, 0, 0, CANVAS_WIDTH_MAX, CANVAS_HEIGHT_MAX, g_bgColor);
    }
    // The main purpose of the box is to demonstrate that it is
    // always deleted by the subsequent "undo" before you get to
    // see it...
    //
    // i.e. double-buffering prevents flicker!
    //
    if (g_doBox) fillBox(ctx, 200, 200, 50, 50, "red");


    // The core rendering of the actual game / simulation
    //
    if (g_doRender) renderSimulation(ctx);


    // This flip-flip mechanism illustrates the pattern of alternation
    // between frames, which provides a crude illustration of whether
    // we are running "in sync" with the display refresh rate.
    //
    // e.g. in pathological cases, we might only see the "even" frames.
    //
    if (g_doFlipFlop) {
        var boxX = 250,
            boxY = g_isUpdateOdd ? 100 : 200;

        // Draw flip-flop box
        fillBox(ctx, boxX, boxY, 50, 50, "green");

        // Display the current frame-counter in the box...
        ctx.fillText(g_frameCounter % 1000, boxX + 10, boxY + 20);
        // ..and its odd/even status too
        var text = g_frameCounter % 2 ? "odd" : "even";
        ctx.fillText(text, boxX + 10, boxY + 40);
    }

    // Optional erasure of diagnostic "box",
    // to illustrate flicker-proof double-buffering
    //
    if (g_undoBox) ctx.clearRect(200, 200, 50, 50);

    ++g_frameCounter;
}

// creates a random gradient
function randGradient(ctx, x1, y1, x2, y2) {



    var colors = ['red', 'orange', 'yellow', 'lime', 'green', 'teal', 'blue', 'purple'];

    //chose a number between 0 and 7
    var rand1 = Math.floor(Math.random() * colors.length);
    var rand2 = Math.floor(Math.random() * colors.length);
    var rand3 = Math.floor(Math.random() * colors.length);
    var rand4 = Math.floor(Math.random() * colors.length);


    while (rand1 === rand2) {
        rand2 = Math.floor(Math.random() * colors.length);
    }
    while (rand2 === rand3) {
        rand3 = Math.floor(Math.random() * colors.length);
    }
    while (rand3 === rand4) {
        rand4 = Math.floor(Math.random() * colors.length);
    }


    fillColor = ctx.createLinearGradient(x1, y1, x2, y2);
    fillColor.addColorStop(0, colors[rand1]); //starting corner
    fillColor.addColorStop(0.33, colors[rand2]); //ending Corner
    fillColor.addColorStop(0.67, colors[rand3]); //ending Corner
    fillColor.addColorStop(1, colors[rand4]); //ending Corner
    return fillColor;



}