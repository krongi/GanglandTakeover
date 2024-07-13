import Phaser from "../lib/phaser.js";
import Game from "../scenes/Game.js";
import Player from "./Player.js";
import Bullet from "./Bullet.js";



export default class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture = 'blueSoldier')
        this.target
        this.setPosition(x, y)
        this.gameType = "Enemy"
        this.setData({health: 40, magic: 100, gold: 200, wood: 0, stone: 0})
        this.setDisplaySize(this.width * 0.5, this.height * 0.5)
        this.setActive(true)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setMass(2);
        this.setImmovable(false);
        this.body.setCircle(this.width * 0.5)
        this.setInteractive();
        this.setVisible(true);
        this.setCollideWorldBounds(true);
        this.incX = 0
        this.incY = 0
        this.lifeSpan = 0
        this.resources
        this.speed = Phaser.Math.GetSpeed(50, 1);
        this.stopped       
    }

    augmentResource(resource, amount) {
        this.data.inc(resource, amount)
    }

    checkShootingDistance(target) {
        if (target.x - this.x  < Math.abs(50) && target.y - this.y < Math.abs(50)) {
            this.stopAdvance()
            this.stopped = true
        }
        else{
            this.advance(target)
            this.stopped = false
        }
        return this.stopped
    }

    advance(target) {
        this.scene.physics.moveToObject(this, target, 100)
    }

    stopAdvance() {
        this.setVelocity(0, 0)
    }

    // kill() {
    //     this.data.
    // }
    
    update(time, delta) {
        
        // this.advance(target)
        this.lifeSpan += delta
        this.x -= this.incX * (this.speed * delta)
        this.body.x -= this.incX * (this.speed * delta)
        this.y -= this.incY * (this.speed * delta)
        this.body.y -= this.incY * (this.speed * delta)
        
    }
}