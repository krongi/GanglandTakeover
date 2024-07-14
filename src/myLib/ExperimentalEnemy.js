import Phaser from "../lib/phaser.js";
import Game from "../scenes/Game.js";
import Player from "./Player.js";
import Bullet from "./Bullet.js";

export default class ExperimentalEnemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, resources, target ) {
        super(scene, x, y, texture = 'blueSoldier')
        this.target = target, 
        this.x = x
        this.y = y
        this.gameType = "ExperimentalEnemy"
        this.scene = scene
        this.setData({health: 40, magic: 100, gold: 200, wood: 0, stone: 0})
        this.resources = resources,
        this.setDisplaySize(this.width * 0.5, this.height * 0.5)
        this.setActive(true)
        scene.add.existing(this)
        scene.physics.add.existing(this)
        this.body.setCircle(this.width * 0.5)
        this.setInteractive();
        this.setVisible(true);
        this.setCollideWorldBounds(true);
        this.setMass(2);
        this.setImmovable(false);
        this.incX = 0
        this.incY = 0
        this.lifeSpan = 0
        this.resources
        this.speed = Phaser.Math.GetSpeed(50, 1);
        this.stopped 
        this.parentScene = scene
        this.xDiff
        this.yDiff
        this.experimentalEnemyBullets = new Phaser.Physics.Arcade.Group(scene.physics.world, scene)
        this.experimentalEnemyBullet = new Bullet(scene, this.x, this.y, 'laser1')
        scene.add.existing(this.experimentalEnemyBullet)
        scene.add.existing(this.experimentalEnemyBullets)
        scene.physics.add.existing(this.experimentalEnemyBullet)
        scene.physics.add.existing(this.experimentalEnemyBullets)
        this.bulletPhysicsGroup = bulletPhysicsGroup
    
        console.log(this)
    }

    augmentResource(resource, amount) {
        this.data.inc(resource, amount)
    }

   
    advance(target) {
        let xDiff = Math.abs(this.x) - Math.abs(target.x)
        let yDiff = Math.abs(this.y) - Math.abs(target.y)
        this.xDiff = xDiff
        this.yDiff = yDiff
        if (Math.abs(xDiff) < 300 && Math.abs(yDiff) < 300) {
            this.setVelocity(0,0)
        }
        else {
            this.scene.physics.moveToObject(this, target, 100)
        }        
    }

    stopAdvance() {
        this.setVelocity(0, 0)
    }

    grabResource(resourceGrabbed, amount) {
        this.incData(resourceGrabbed, amount)  
    }

    shootEm(parentScene) {
        
    }

    update(time, delta) {
        
        this.lifeSpan += delta
        this.x -= this.incX * (this.speed * delta)
        this.body.x -= this.incX * (this.speed * delta)
        this.y -= this.incY * (this.speed * delta)
        this.body.y -= this.incY * (this.speed * delta)
    }
}

export class ExperimentalEnemyBullet extends Bullet {
    constructor(scene, x, y, imageKey) {
        super(scene, x, y, imageKey = 'laser1')
    }
}