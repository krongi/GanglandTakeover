import Phaser from "../lib/phaser.js";
import Game from "../scenes/Game.js";

export default class Drug extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, textureKey) {
        
        super(scene, x, y, textureKey)
        this.wholeValue
        this.streetValue
        this.quantity
        this.measure
    
    }

    cocaine() {
        this.wholeValue = 30000
        this.streetValue = 80 * 1000
        this.measure = 'grams'
    }

    weed() {
        this.wholeValue = 2500
        this.streetValue =  200 * 16
        this.measure = 'grams'
    }

    xtc() {
        this.wholeValue = 1200
        this.streetValue = 100 * 20
        this.measure = 'pieces'
    }

    dropDrug(timesToRun = 1) {
        for (let x = 0; x < timesToRun; x++) {
            this.setActive(true);
            this.setVisible(true)
            this.x = this.parentContainer.x
            this.y = this.parentContainer.y
            this.body.setCollideWorldBounds(true)
            this.body.setBoundsRectangle(new Phaser.Geom.Rectangle(this.parentContainer.getBounds() * 2.5))
        }
    }


}