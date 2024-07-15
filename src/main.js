import Phaser from "./lib/phaser.js";
import Game from "./scenes/Game.js";

const gameConfig = ({
    name: 'Regular Game',
    type: Phaser.AUTO,
    title: "Regular Game",
    width: 1200,
    height: 800,
    parent: "game",
    // zoom: 0.5,
    scene: [Game],
    banner: "Just a regular ol' game",
    physics: {
        default: 'arcade',
        arcade: {
            width: 1600,
            height: 1600,
            // gravity: {
            //     y: 200
            // },
            // debug: true
        }
        
    }})
const STATE_DEAD = 1
const STATE_ALIVE =0

const NORTH_FACE = Phaser.Math.Between(-135, -46)
const EAST_FACE = Phaser.Math.Between(-45, 44)
const SOUTH_FACE = Phaser.Math.Between(45, 134)
const WEST_FACE = Phaser.Math.Between(135, 180) && Phaser.Math.Between(-180, -136)


export const GanglandTakeover = new Phaser.Game(gameConfig)