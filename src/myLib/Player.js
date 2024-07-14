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
        // this.rect = this.scene.add.rectangle(this.x, this.y, this.width * 3, this.height * 3, 150, 100)
        // this.scene.physics.add.existing(this.rect)
        // this.circle = this.scene.add.circle(this.x, this.y, this.width*1.5, 200, 140).setActive(true).setVisible(true)        
        // this.rect.addListener('inRange', function (this) {
        }

    getLocation() {
        // console.log(this.x, this.y)
        return [this.x, this.y]
    }

    grabResource(resourceGrabbed, amount) {
        this.incData(resourceGrabbed, amount)  
    }

    update() {
        // this.circle.setPosition(this.x, this.y)
        // this.scene.physics.collide(this.rect, this.scene.enemies)
        // this.rect.setPosition(this.x, this.y)
        
    }
}