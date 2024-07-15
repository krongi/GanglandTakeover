import phaser from "../lib/phaser.js";
import Game from "../scenes/Game.js";


export default class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture) {
        super(scene, x, y, texture = 'redSoldier')
        this.setPosition(x, y)
        this.name = "Super Karate Monkey Death Car"
        this.setData({health: 100, magic: 100, gold: 200, wood: 0, stone: 0})
        this.setDisplaySize(this.width * 0.5, this.height * 0.5)
        this.setActive(true)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.setMass(2);
        this.setImmovable(false);
        this.body.setCircle(this.width * 0.5)
        this.setInteractive();
        this.setVisible(true)
        this.setCollideWorldBounds(true)
        this.isAlive = true
        }

    getLocation() {
        return [this.x, this.y]
    }

    grabResource(resourceGrabbed, amount) {
        this.incData(resourceGrabbed, amount)  
    }

    healthDown(dropMax, dropMin = 0 ) {
        this.incData('health', -Phaser.Math.Between(dropMin, dropMax))
        let currentHealth = this.getData('health')
        this.scene.events.emit('gotHit', this.getData('health'))
        if (currentHealth <= 0) {
            this.isAlive = false
           this.setVelocity(0,0)
        }
    }

    update() {
        // this.circle.setPosition(this.x, this.y)
        // this.scene.physics.collide(this.rect, this.scene.enemies)
        // this.rect.setPosition(this.x, this.y)
        
    }
}