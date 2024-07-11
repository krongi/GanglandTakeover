import Phaser from "../lib/phaser.js"
import Game from "../scenes/Game.js"

export default class Mountain extends Phaser.Physics.Arcade.Image {

    constructor(scene, x, y, imageKey) {
        super(scene, x, y, imageKey = 'mountain')
        this.setPosition(x, y)
        this.setData({stone: 25})
        this.setDisplaySize(this.width * 0.5, this.height * 0.5)
        this.setActive(true)
        this.key = 'mountain'
        this.name = 'mountain' + x.toString()

    }
    
    add() {
        console.log("add")
        this.setPushable(true)
        this.body.setCircle(5)
    }
    
}