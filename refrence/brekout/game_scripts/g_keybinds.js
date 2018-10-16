// ==========
// KEYBINDS
// ==========
// stores keybinds (as well as some helper functions) for easy changing 

// returns a character froom keycode
function charFromCode(c) {
    return String.fromCharCode(c);
}
// gets kecode from caracter
function keyCode(keyChar) {
    //console.log(keyChar);
    return keyChar.charCodeAt(0);
}

// quit key
const KEY_QUIT = keyCode('Q');
// Mainloop-level debug-rendering
var TOGGLE_TIMER_SHOW = keyCode('T');

// render keybinds
const TOGGLE_CLEAR = keyCode('C');
const TOGGLE_BOX = keyCode('B');
const TOGGLE_UNDO_BOX = keyCode('U');
const TOGGLE_FLIPFLOP = keyCode('F');
const TOGGLE_RENDER = keyCode('R');

// Togglable Pause Mode
const KEY_PAUSE = keyCode('P');
const KEY_STEP = keyCode('O');

// PADDLE 1 keybinds

const KEY_W = keyCode('W');
const KEY_S = keyCode('S');
const KEY_A = keyCode('A');
const KEY_D = keyCode('D');

// PADDLE 2 keybinds

const KEY_I = keyCode('I');
const KEY_K = keyCode('K');
const KEY_J = keyCode('J');
const KEY_L = keyCode('L');

const KEY_UP = 38; //up arrow
const KEY_DOWN = 40; //down arrow
const KEY_LEFT = 37;
const KEY_RIGHT = 39;
//console.log(charFromCode(KEY_K));

const GO_UP = [];
GO_UP[0] = KEY_W;
GO_UP[1] = KEY_I;
GO_UP[2] = KEY_UP;

const GO_DOWN = [];
GO_DOWN[0] = KEY_S;
GO_DOWN[1] = KEY_K;
GO_DOWN[2] = KEY_DOWN;

const GO_LEFT = [];
GO_LEFT[0] = KEY_A;
GO_LEFT[1] = KEY_J;
GO_LEFT[2] = KEY_LEFT;

const GO_RIGHT = [];
GO_RIGHT[0] = KEY_D;
GO_RIGHT[1] = KEY_L;
GO_RIGHT[2] = KEY_RIGHT;