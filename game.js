//import Level_select from './level_select.js';
// import Start from './start.js';
// import Intro from './intro.js';
// import Title from './title.js';
// import Level_select from './level_select.js';
//import Player from './Player.js';

// tame the javashrek
'use strict';

// global variables
let cursors;
let currentScene = 0;
const SCALE = 0.5;
const tileSize = 35;
///////////////
/////////stats//////////////
let lives = 3;
let score = 0;
let fireballcount = 30;
let boom = false;
/////////house spawn///////////////
let cheesehouse = true;
let cheesehouse2 = true;
let cheesehouse3 = true;
let bluehouse = true;
let bluehouse2 = true;
let bluehouse3 = true;
let earthhouse = true;
let earthhouse2 = true;
let earthhouse3 = true;

/////////respawn flash//////////////
let firstcheesevisit = true;
let firstsquarevisit = true;
let firstearthvisit = true;
//this.lives.globalVar = 3;

// main game object
let config = {
    type: Phaser.WEBGL,
    scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 1920,
    height: 1080
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            },
            bounds: {
                x: 0,
                y: 0,
                width: 1920,
                height: 1080
              }
        }
    },
    scene: [Start, Intro, Title, Level_select, Cheese, Bluecheese, Earth, Gameover]
    
};

let game = new Phaser.Game(config);


