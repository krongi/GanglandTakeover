import Phaser from "../lib/phaser.js"
import Game from "../scenes/Game.js"

export default class Tree extends Phaser.Physics.Arcade.Image {

    constructor(x, y, texture) {
    super(x, y, texture) 
    
    }

    destroyTree() {
        this.destroy()
    }

    createTrees(numberOfTrees) {
        for (let i = 0; i < numberOfTrees; i++)
        this.setActive()
        this.body.setSize(this.width * 0.6, this.height * 0.6)
        this.body.setCircle(this.width * 0.6)
        this.enableBody(true, x, y, true, true)
        this.setVisible()

    }
}