import Phaser from "../lib/phaser.js";
import Game from "../scenes/Game.js";

export default class Resource extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, key, frame) {
        super(scene, x, y, key, frame)
        // this.body.setSize(this.width * 0.5, this.height * 0.5)
        // this.body.setCircle(this.body.width * 0.5)

    }

    dropResource() {
        let resourceFrom = this.getCenter()
        let miniResource = new Phaser.Physics.Arcade.Image(scene, resourceFrom.x, resourceFrom.y, key).setAcceleration(Phaser.Math.Between(resourceFrom.x - 10, resourceFrom.x + 10), Phaser.Math.Between(resourceFrom.y - 10, resourceFrom.y + 10))
        miniResource.setScale(0.25, 0.25)
        miniResource.setActive(true)
        miniResource.setVisible(true)
        miniResource.setFriction(1, 1)
        this.scene.physics.accelerateTo(miniResource, Phaser.Math.Between(resourceFrom.x - 10, resourceFrom.x + 10), Phaser.Math.Between(resourceFrom.y - 10, resourceFrom.y + 10), 60)
        resourceDepletion -= 1
    }
}