import Phaser from "../lib/phaser.js";
import Game from "../scenes/Game.js"


export default class Bullet extends Phaser.Physics.Arcade.Image {
    
    constructor(scene, x, y, imageKey) {
        super(scene, x, y, imageKey = 'laser1')
        var lastFired = 0
        var isDown = false
        var mouseX = 0
        var mouseY = 0
        this.imageKey = imageKey
        this.incX = 0
        this.incY = 0
        this.lifeSpan = 0
        this.speed = Phaser.Math.GetSpeed(400, 1)
        

    }
    

    fire(shooterPosition, targetPosition) {
        // this.setCircle(this.width)
        // this.getCenter(this.body.center)
        this.setActive(true).setVisible(true).setCircle(this.width / 2).getCenter(this.body.center)
        this.setVisible(true)      
        this.enableBody(true, shooterPosition.x, shooterPosition.y)
        this.setPosition(shooterPosition.x, shooterPosition.y)
        let angle = Phaser.Math.Angle.Between(targetPosition.x, targetPosition.y, shooterPosition.x, shooterPosition.y)

        this.setRotation(angle)
        this.body.setSize(this.width * 0.25, this.height * 0.25)
        
        
        this.flipX = true
        // this.flipY = true
        this.incX = Math.cos(angle)
        this.incY = Math.sin(angle)
        // this.incX = Math.sin(angle) * 0.5
        // this.incY = Math.cos(angle) * 0.5
        this.lifeSpan = 1000

    }

    update(time, delta) {
        this.body.radius = 10
        this.lifeSpan -= delta
        this.x -= this.incX * (this.speed * delta)
        this.body.x -= this.incX * (this.speed * delta)
        this.y -= this.incY * (this.speed * delta)
        this.body.y -= this.incY * (this.speed * delta)

        /* using below to fuck with size of bullets*/
        // this.displayHeight += Math.abs(this.incY) * 5.5
        // this.displayWidth += Math.abs(this.incX) * 5.5

        if (this.lifeSpan <= 0) {
            this.setActive(false)
            this.setVisible(false)
            this.destroy()
            
        }
            
    }
}