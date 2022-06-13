import { loadavg } from "os";
import Phaser from "../lib/phaser.js";
import Game from "../scenes/Game.js";

Phaser.Scene.load.image()
export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene='scene', x, y, key) {
        this.setPosition(200, 400)
        this.data.set({life: 100, magic: 100, gold: 200})
        this.setScale(0.3, 0.3)
        this.body.setCollideWorldBounds(true)
        
    }


}