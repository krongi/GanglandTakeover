import Phaser from "../lib/phaser.js";
import Game from "../scenes/Game.js";
import { GanglandTakeover } from "../main.js";

export default class Drug extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, imageKey) {
        
        super(scene, x, y, imageKey = 'cokeBlock')
        var lastFired = 0
        var isDown = false
        var mouseX = 0
        var mouseY = 0
        this.incX = 0
        this.incY = 0
        this.lifeSpan = 0
        this.speed = Phaser.Math.GetSpeed(600, 1)        
        // this.scene.physics.add.existing(this, true)
        // this.setActive(true);
        // this.setVisible(true);
        // // this.enableBody(true, x, y);
        // this.setPosition(x, y);
        // this.body.isCircle = true;
        // this.body.setSize(this.width * 0.25, this.height * 0.25)
        // // this.x = this.parentContainer.x
        // // this.y = this.parentContainer.y
        // this.body.setCollideWorldBounds(true)
        // // this.body.setBoundsRectangle(new Phaser.Geom.Rectangle(this.parentContainer.getBounds() * 2.5))
        // this.quantity
        // this.measure
    }

    

    // dropDrug(xPos, yPos) {
        
    //         this.scene.physics.add.existing(this, true)
    //         this.setActive(true);
    //         this.setVisible(true);
    //         this.enableBody(true, xPos, yPos);
    //         this.setPosition(xPos, yPos);
    //         this.body.isCircle = true;
    //         this.body.setSize(this.width * 0.25, this.height * 0.25)
    //         // this.x = this.parentContainer.x
    //         // this.y = this.parentContainer.y
    //         this.body.setCollideWorldBounds(true)
    //         // this.body.setBoundsRectangle(new Phaser.Geom.Rectangle(this.parentContainer.getBounds() * 2.5))
        
    // }
    fire(playerPosition, pointerPosition) {
        this.setActive(true)
        this.setVisible(true)      
        this.enableBody(true, playerPosition.x, playerPosition.y)
        this.setPosition(playerPosition.x, playerPosition.y)
        let angle = Phaser.Math.Angle.Between(pointerPosition.x, pointerPosition.y, 600, 400)
        this.setRotation(angle)
        this.body.isCircle = true
        this.body.setSize(this.width * 0.25, this.height * 0.25)
        this.setDisplaySize(this.width * 0.25, this.height * 0.25)
        this.flipX = true
        this.incX = Math.cos(angle)
        this.incY = Math.sin(angle)
        this.lifeSpan = 1000
        this.setDepth(2)

    }
    update(time, delta) {
        this.body.radius = 10
        this.lifeSpan -= delta
        this.x -= this.incX * (this.speed * delta)
        this.body.x -= this.incX * (this.speed * delta)
        this.y -= this.incY * (this.speed * delta)
        this.body.y -= this.incY * (this.speed * delta)
        if (this.lifeSpan <= 0) {
            this.setActive(false)
            this.setVisible(false)
            this.destroy()
            
        }
            
    }

}