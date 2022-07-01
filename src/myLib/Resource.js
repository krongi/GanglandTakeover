import Phaser from "../lib/phaser.js";
import { GanglandTakeover } from "../main.js";
import Game from "../scenes/Game.js";

export default class Resource extends Phaser.Physics.Arcade.Image {
    constructor(scene, x, y, texture) {

        super(scene, x, y, texture)
        // this.scene.physics.add.existing(this, true)
        // this.setActive()
        // this.setVisible()
        // this.setBodySize(this.width * 0.5, this.height * 0.5)
        // this.setActive(true)
        // this.body = new Phaser.Physics.Arcade.Body(this, this)
        // this.body.setMass(200)
        // this.body.setCircle(this.body.width * 0.5)
        // this.setPushable(false)
        // this.key = resourceKey
        // Phaser.GameObjects.Image.call(this, scene, x, y, key, frame)
        // this.staticImage(x, y, key, frame)
        // this.body.setSize(this.width * 0.5, this.height * 0.5)
        // this.body.setCircle(this.body.width * 0.5)

    }

    dropResource(key) {
        let resourceFrom = this.getCenter()
        console.log(this)
        let miniResource = new Phaser.Physics.Arcade.Image(this, resourceFrom.x, resourceFrom.y, key).setAcceleration(Phaser.Math.Between(resourceFrom.x - 10, resourceFrom.x + 10), Phaser.Math.Between(resourceFrom.y - 10, resourceFrom.y + 10))
        console.log(this)
        for (let x = 0; x < 4; x++) {
            let miniResource = this.scene.physics.add.image(resourceFrom.x, resourceFrom.y, key)
            .setAcceleration(Phaser.Math.Between(resourceFrom.x - 10, resourceFrom.x + 10), Phaser.Math.Between(resourceFrom.y - 10, resourceFrom.y + 10))
            miniResource.setSize(this.width * 0.25, this.height * 0.25)
            miniResource.setDisplaySize(this.width * 0.5, this.height * 0.5)
            miniResource.setActive()
            this.scene.physics.accelerateTo(miniResource, resourceFrom.x + Phaser.Math.Between(-10, 10), resourceFrom.y + Phaser.Math.Between(-10, 10))
            
        }
        // miniResource.setScale(0.25, 0.25)
        // miniResource.setActive(true)
        // miniResource.setVisible(true)
        // miniResource.setFriction(1, 1)
        // this.scene.physics.accelerateTo(miniResource, Phaser.Math.Between(resourceFrom.x - 10, resourceFrom.x + 10), Phaser.Math.Between(resourceFrom.y - 10, resourceFrom.y + 10), 60)
        // resourceDepletion -= 1
    }
}