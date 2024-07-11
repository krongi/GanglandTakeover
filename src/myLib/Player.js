import Phaser from "../lib/phaser.js";
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
        
    }

    grabResource(resource, amount) {
        this.resource = this.data.get(resource)
        this.resource += amount
        this.data.set(resource, this.resource)
        console.log(this.data.get(resource))        
    }
    grabStone(amount) {
        this.stone += amount        
    }
}