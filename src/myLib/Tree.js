import Phaser from "../lib/phaser.js"
import Game from "../scenes/Game.js"

export default class Tree extends Phaser.Physics.Arcade.Image {

    constructor(x, y, texture) {
    super(x, y, texture) 
    this.touched = false
    // this.key = 'treeBody'
    // this.body = new Phaser.Physics.Arcade.StaticBody()
    // this.body.checkCollision = true
    // this.setDisplaySize(32, 32)
    // this.setVisible(true)
    this.setState('normal')
    

    }

    destroyTree() {
        this.destroy()
    }

    createTrees(numberOfTrees) {
        for (let i = 0; i < numberOfTrees; i++)
        this.setActive()
        this.enableBody(true, x, y, true, true)
        this.refreshBody()

    }
}