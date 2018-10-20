/*

entityManager.js

A module which handles arbitrary entity-management for "Asteroids"


We create this module as a single global object, and initialise it
with suitable 'data' and 'methods'.

"Private" properties are denoted by an underscore prefix convention.

*/


"use strict";


// Tell jslint not to complain about my use of underscore prefixes (nomen),
// my flattening of some indentation (white), or my use of incr/decr ops 
// (plusplus).
//
/*jslint nomen: true, white: true, plusplus: true*/


var entityManager = {

    // "PRIVATE" DATA

    _rocks: [],
    _bullets: [],
    _ships: [],

    _bShowRocks: false,

    // "PRIVATE" METHODS

    _generateRocks: function () {

        var NUM_ROCKS = 4;

        // DONE--TODO: Make `NUM_ROCKS` Rocks!
        for (let i = 0; i < NUM_ROCKS; i++) {
            var r = new Rock();
            this._rocks.push(r);

        }
    },

    _findNearestShip: function (posX, posY) {

        // DONE--TODO: Implement this

        // NB: Use this technique to let you return "multiple values"
        //     from a function. It's pretty useful!
        //
        var closestShip;
        var closestIndex;
        var dist = Number.MAX_VALUE;
        var wX = g_canvas.width; // xWrap
        var wY = g_canvas.height; // yWrap
        //console.log("---------");
        //console.log("posX- " + posX);
        //console.log("posY- " + posY);
        for (let i = 0; i < this._ships.length; i++) {
            var sX = this._ships[i].cx; //x2
            var sY = this._ships[i].cy; //y2

            var d = util.wrappedDistSq(
                posX, posY,
                sX, sY,
                wX, wY
            );

            d = Math.sqrt(d);

            //console.log("d- " + d);
            //console.log("dist- " + dist);
            if (d <= dist) {
                dist = d;
                //console.log("d- " + d);
                closestShip = this._ships[i];
                closestIndex = i;
            }

        }
        //console.log(closestIndex);
        return {
            theShip: closestShip, // the object itself
            theIndex: closestIndex // the array index where it lives
        };
    },

    _forEachOf: function (aCategory, fn) {
        for (var i = 0; i < aCategory.length; ++i) {
            fn.call(aCategory[i]);
        }
    },

    // PUBLIC METHODS

    // A special return value, used by other objects,
    // to request the blessed release of death!
    //
    KILL_ME_NOW: -1,

    // Some things must be deferred until after initial construction
    // i.e. thing which need `this` to be defined.
    //
    deferredSetup: function () {
        this._categories = [this._rocks, this._bullets, this._ships];
    },

    init: function () {
        this._generateRocks();

        // I could have made some ships here too, but decided not to.
        //this._generateShip();
    },

    fireBullet: function (cx, cy, velX, velY, rotation) {


        // DONE--TODO-inprogres: Implement this
        var bullet = new Bullet();
        bullet.cx = cx;
        bullet.cy = cy;
        bullet.velX = velX;
        bullet.velY = velY;

        bullet.rotation = rotation;

        this._bullets.push(bullet);

    },

    generateShip: function (descr) {
        // DONE--TODO-inprogres: Implement this
        var ship = new Ship(descr);
        this._ships.push(ship);
    },

    killNearestShip: function (xPos, yPos) {
        // DONE--TODO: Implement this
        var ship = this._findNearestShip(xPos, yPos);
        if (typeof ship.theShip != 'undefined') {

            ship.theShip.KILL_ME_NOW = this.KILL_ME_NOW;
        }
        // NB: Don't forget the "edge cases"
    },

    yoinkNearestShip: function (xPos, yPos) {
        //-----grab and move to mouse pos
        // DONE--TODO: Implement this
        var ship = this._findNearestShip(xPos, yPos);
        if (typeof ship.theShip != 'undefined') {
            //if (ship.theShip === null) {
            //return;
            //}
            ship.theShip.cx = xPos;
            ship.theShip.cy = yPos;
        }
        // NB: Don't forget the "edge cases"
    },

    resetShips: function () {
        this._forEachOf(this._ships, Ship.prototype.reset);
    },

    haltShips: function () {
        this._forEachOf(this._ships, Ship.prototype.halt);
    },

    toggleRocks: function () {
        this._bShowRocks = !this._bShowRocks;
    },

    update: function (du) {

        // DONE--TODO-inprogress: Implement this
        // NB: Remember to handle the "KILL_ME_NOW" return value!
        //     and to properly update the array in that case.

        for (let j = 0; j < this._categories.length; j++) {
            for (let i = this._categories[j].length - 1; i >= 0; i--) {
                this._categories[j][i].update(du);

                if (this._categories[j][i].KILL_ME_NOW === this.KILL_ME_NOW) {
                    this._categories[j].splice(i, 1);
                }
            }

        }

    },

    render: function (ctx) {

        // DONE--TODO-inprogress: Implement this

        // NB: Remember to implement the ._bShowRocks toggle!
        // (Either here, or if you prefer, in the Rock objects)
        // ----added in the rock object

        for (let j = 0; j < this._categories.length; j++) {
            for (let i = this._categories[j].length - 1; i >= 0; i--) {
                this._categories[j][i].render(ctx);
            }

        }

    }

}

// Some deferred setup which needs the object to have been created first
entityManager.deferredSetup();

entityManager.init();