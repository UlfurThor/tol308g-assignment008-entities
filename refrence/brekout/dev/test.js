// dev test
// -------------------------
// GAME-SPECIFIC DIAGNOSTICS
// -------------------------

var g_allowMixedActions = true;
var g_useExtras = true;
var g_useGravity = false;

// new diagonstic setings
var u_useMarker = false;
var u_useMouse = false;

function processDiagnostics() {

    // Handle these simple diagnostic options,
    // as defined by the KEY identifiers above.
    //
    // The first three are toggles; the last two are not.
    //
    // NB: The HALT and RESET behaviours should apply to
    // all three ships simulaneously.

    if (eatKey(KEY_EXTRAS)) {
        g_useExtras = !g_useExtras;
    }

    if (eatKey(KEY_GRAVITY)) {
        g_useGravity = !g_useGravity;
    }

    if (eatKey(KEY_MIXED)) {
        g_allowMixedActions = !g_allowMixedActions;
    }

    if (eatKey(KEY_HALT)) {
        g_ship.halt();
        g_extraShip1.halt();
        g_extraShip2.halt();
    }
    if (eatKey(KEY_RESET)) {
        g_ship.reset();
        g_extraShip1.reset();
        g_extraShip2.reset();
    }


    if (eatKey(KEY_TARGET)) {
        u_useMarker = !u_useMarker;
    }

    if (eatKey(KEY_MOUSE)) {
        u_useMouse = !u_useMouse;
    }


    processDiagnostics_message();
}

function processDiagnostics_message() {
    message_Update("mess_extra", "E: Extra ships   - " + g_useExtras);
    message_Update("mess_grav", "G: Gravity - " + g_useGravity);
    message_Update("mess_mixed", "M: Mixed inputs - " + g_allowMixedActions);
    message_Update("mess_target", "T: main ship markers - " + u_useMarker);
    message_Update("mess_Mouse", "I: ship at mouse - " + u_useMouse);
}

function message_Update(id, message) {
    document.getElementById(id).innerHTML = message;
}