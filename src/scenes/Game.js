import Phaser from "../lib/phaser.js";
import Bullet from "../myLib/Bullet.js";
import Tree from "../myLib/Tree.js";
import Resource from "../myLib/Resource.js";
import Mountain from "../myLib/Mountain.js"
import Player from "../myLib/Player.js";
import Enemy from "../myLib/Enemy.js";
import EnemyBullet from "../myLib/EnemyBullet.js"

// hardware
let mousePointer;

// projectiles
let bullet;

// gropus
let bullets;
let myBullets;
let enemyBullets;
let enemies;
let enemyBullet;
let mountains
let resources;
let trees


//sprites and images
let tree;
let player;
let companion;
let mountain;
let enemy;

// MISC
let checkTime = 0
let placeText;
let shootingDistance;
let companionArea;
let startFiringListener;
let stopFiringListener
let enemyStopped
let target
let playerThis
let angleIncrementCounter = 0
let deadMessage


export default class Game extends Phaser.Scene {
    
        constructor() {
        super('game');
    }

    preload() {

        /**Load images and other assets to be used by this scene */
        this.load.spritesheet('blueRocketGuy', '../assets/blueRocketGuy.png', {frameWidth:32, frameHeight: 32})
        this.load.spritesheet('redSoldier', '../assets/redSoldiers.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('blueSoldier', '../assets/blueSoldiers.png', {frameWidth: 64, frameHeight: 64});
        this.load.atlas('laser', '../assets/lasers.png', '../assets/lasers.json');
        this.load.atlas('worldTilesAtlas', '../assets/worldTiles.png', '../assets/worldTiles.json');
        this.load.atlas('bullets', '../assets/lasers.png', '../assets/lasers.json');
        this.load.spritesheet('worldTiles', '../assets/worldTiles.png', {frameWidth: 64, frameHeight: 64})
        this.load.image('laser1','../assets/laser1.png');
        this.load.image('tree', '../assets/tree.png');
        this.load.image('mountain', '../assets/mountain.png');

    }
        
    create() {

        // Create animations for sprites etc
        this.anims.create({
            delay: 0,
            frameRate: 6,
            frames: this.anims.generateFrameNumbers('blueRocketGuy', {
                start: 4,
                end: 6,
                first: 4,
            }),
            key: 'blueRocketAnimationStill',
            repeat: -1,
            yoyo: true,
        })

        this.anims.create({
            delay: 0,
            defaultTextureKey: 'blueRocketGuy',
            duration: -1,
            frameRate: 18,
            frames: [0, 4],
            key: 'blueRocketAnimationUp',
            repeat: -1,
            yoyo: true,
        })

        this.anims.create({
            delay: 0,
            defaultTextureKey: 'blueRocketGuy',
            duration: -1,
            frameRate: 18,
            frames: [1, 4],
            key: 'blueRocketAnimationDown',
            repeat: -1,
            yoyo: true,
        })

        this.anims.create({
            delay: 0,
            defaultTextureKey: 'blueRocketGuy',
            duration: -1,
            frameRate: 18,
            frames: [2, 4],
            key: 'blueRocketAnimationLeft',
            repeat: -1,
            yoyo: true,
        })

        this.anims.create({
            delay: 0,
            defaultTextureKey: 'blueRocketGuy',
            duration: -1,
            frameRate: 18,
            frames: [3, 4],
            key: 'blueRocketAnimationRight',
            repeat: -1,
            yoyo: true,
        })

        /* Add the inputs for the game here. Currently will only be using certain keys and 
        some mouse */
        mousePointer = this.input.activePointer;
        this.w = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        this.s = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.a = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.d = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        this.e = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        this.spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        /* Add tile sprites to game for background etc*/
        this.add.tileSprite(800, 800, 2400, 2400, 'worldTiles', 15).setOrigin(0.5, 0.5);
        this.add.tileSprite(800, 800, 1600, 1600, 'worldTiles', 6).setOrigin(0.5, 0.5);
        
        /* Create groups for certain game objects*/
        bullets = this.physics.add.staticGroup({
            classType: Bullet,
            defaultFrame: 'laser1',
            runChildUpdate: true,    
        })

        myBullets = this.physics.add.staticGroup({
            defaultFrame: 'laser1',
            active: true,
            classType: Bullet,
            runChildUpdate: true
        })

        enemyBullets = this.physics.add.staticGroup({
            defaultFrame: 'laser1',
            active: true,
            classType: EnemyBullet,
            runChildUpdate: true,
        })

        this.enemies = this.physics.add.group({
            classType: Enemy,
            active: true,
            setActive: true,
            runChildUpdate: true
        })

        resources = this.add.group({
                active: false,
                setVisible: false,
                classType: Resource,
                setDepth: -1                
        })

        mountains = this.physics.add.staticGroup({
            classType: Mountain,
            active: true,
        })  

        trees = this.physics.add.staticGroup({
            classType: Tree,
            active: true,
        })
        
        /**Create and activate player */
        this.player = new Player(this, Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 400), 'redSoldier');
        this.player.setActive(true).setVisible(true).setInteractive()
        
        /**Populate map with collidable objects that will hold resources later */
        for (let x = 0; x < 75; x++) {
            mountain = mountains.get(Phaser.Math.Between(40, 1400), Phaser.Math.Between(40, 1400))
            mountain.setMass(200)
            mountain.setBodySize(mountain.width * 0.5, mountain.height * 0.5)
            mountain.body.setCircle(mountain.body.width * 0.5, mountain.body.height * 0.5)

            tree = trees.get(Phaser.Math.Between(40, 1400), Phaser.Math.Between(40, 1400))
            tree.setMass(200)
            tree.setBodySize(tree.width * 0.5, tree.height * 0.5)
            tree.body.setCircle(tree.body.width * 0.5, tree.body.height * 0.5)
            resources.add(mountain)
            resources.add(tree)           
            
        }   
        /**Create enemies */ 
        for (let x = 0; x < 10; x++) {
            // enemy = this.enemies.get(Phaser.Math.Between(1300, 1400), Phaser.Math.Between(1300, 1400),'blueSoldier', resources, this.player)
            enemy = new Enemy(this, Phaser.Math.Between(1300, 1400), Phaser.Math.Between(1300, 1400),'blueSoldier', resources, this.player)
            // enemy.bulletPhysicsGroup = enemyBullets
            enemy.target = this.player
            enemy.setName("Enemy" + x.toString())
            enemy.advance(this.player)
            enemy.setActive(true).setVisible(true).setInteractive()
            this.enemies.add(enemy)
            
        }
        
        /* Create the companion object. He just follows player around*/
        companion = this.physics.add.sprite(200, 300, 'blueRocketGuy', 4)
            .setVisible(true)
            .setName('Casper')
            .setActive(true)
            .setInteractive()
        companion.body.setCircle(10, 6, 6)
        
        /* Set main camera to center on and follow the player*/
        this.cameras.main.centerOn(this.player.x, this.player.y);
        this.cameras.main.startFollow(this.player);

        /* Add colliders for game objects*/
        this.physics.add.collider(this.player, resources, function (player, resource) {
            
        });        

        this.physics.add.collider(enemy, resources, function (player, resource) {

        });

        this.physics.add.collider(this.enemies, bullets, function(enemy, bullet){
            enemy.destroy()
            bullet.destroy()
        })

        this.physics.add.collider(this.player, enemyBullets, function (player = this.player, enemyBullet) {
            player.healthDown(10)
            enemyBullet.destroy()
        })
        this.physics.add.collider(this.enemies, resources, function(enemy, resource){
            
        })

        this.physics.add.collider(bullets, mountains, function (bullet, mountain) {
                            
            mountain.destroy()
            bullet.destroy()
            // this.player.grabResource('stone', 25)

        })
        this.physics.add.collider(trees, enemyBullets, function(tree, enemyBullet){
            tree.destroy()
            enemyBullet.destroy()
        })

        this.physics.add.collider(mountains, enemyBullets, function(mountain, enemyBullet){
            mountain.destroy()
            enemyBullet.destroy()
        })

        this.physics.add.collider(bullets, trees, function (bullet, tree) {     
            tree.destroy()
            bullet.destroy()
            // this.player.grabResource('wood', 25)
        })
        /**Add some generic colliders */
        this.physics.add.collider(companion, resources)
        this.physics.add.collider(this.enemies)
        this.physics.add.collider(trees, mountains)
        
       
        /* Create animations and text objects for game*/
        this.anims.play('blueRocketAnimationStill', companion)

        /**Create rectangle that will follow player so companion will follow */
        this.companionArea = new Phaser.Geom.Rectangle(this.player.x - 60, this.player.y - 60, 40, 40)
         
        /**Create the "HUD" and the on death message, the on death message is
         * set below everything else, it will be displayed on death */
        this.placeText = this.add.text(0, 0, 'Health ' + this.player.getData('health') + "\n" + 'Magic ' + this.player.getData('magic')  + ' Gold ' + this.player.getData('gold') + '\n' + 'Wood ' + this.player.getData('wood') + '   ' + 'Stone ' + this.player.getData('stone'))
            .setScrollFactor(0,0)
            .setBackgroundColor('black')
            .setColor('grey')
            .setScale(1.5, 1.5)
            .setDepth(10)

            
        this.deadMessage = this.add.text(this.player.x, this.player.y, "  YOU'RE DEAD  ")
            .setScrollFactor(0,0)
            .setBackgroundColor('black')
            .setColor('red')
            .setScale(5)
            .setDepth(-1)
    }
    
    update(time, delta) {
        /**Ensure companion area fallows player around */
        this.companionArea.setPosition(this.player.getCenter().x, this.player.getCenter().y)
        
        /**Update the "HUD" on the screen with relevant info*/
        if (this.player) {
            this.placeText.destroy()
            this.placeText = this.add.text(0, 0, 'Health ' + this.player.getData('health') + "\n" + 'Magic ' + this.player.getData('magic')  + ' Gold ' + this.player.getData('gold')
             + '\n' + 'Wood ' + this.player.getData('wood') + '   ' + 'Stone ' + this.player.getData('stone'))
            .setScrollFactor(0,0)
            .setBackgroundColor('black')
            .setColor('grey')
            .setScale(1.5, 1.5)
            .setDepth(10)
        }

        /** Check if enemies are in range, stop and fire if so */
        let inRange = false
        this.enemies.children.each(function enemiesLocationCheck(enemy) {
            let playerCurrentLocation = this.player.position
            let enemyCurrentLocation = enemy.position
            let xdiff = Math.abs(enemy.x) - Math.abs(this.player.x)
            let ydiff = Math.abs(enemy.y) - Math.abs(this.player.y)
            if (Math.abs(xdiff) < 300 && Math.abs(ydiff) < 300) {
                // console.log(enemy.name + ' is in range...')
                inRange = true
            }
            if (inRange == true) {
                    if (checkTime < 1500) {
                        checkTime += delta;
                    }
                    else {
                    enemyBullet = enemyBullets.get()
                    if (enemyBullet) {
                        angleIncrementCounter += 0.1
                        // enemyBullet.mouseX = this.player.x;
                        // enemyBullet.mouseY = this.player.y;
                        enemyBullet.body.setMass(100);
                        enemyBullet.fire(enemy.getCenter(), this.player.getCenter(), angleIncrementCounter);
                        if (angleIncrementCounter < 1) {
                            angleIncrementCounter = 0
                        }
                        }
                    checkTime = 0;
                    
                }
            }
            else {
                inRange = false
            }
            
        }, this)
        
        /** Check if companion is in the area (follows player), if not move to the area */
        if (this.companionArea.contains(companion.x, companion.y)) {
            companion.setVelocity(0,0)
        }
        else {
            this.physics.moveTo(companion, this.player.x - 30, this.player.y - 30, 180)
        }
        
        /** Ensure player is actually alive and part of scene before taking input
         * to move him, kept getting crashes due to the player being destoryed and
         * scene trying to set velocity to  0
         */
        if (!this.player.isAlive) {
            this.placeText.setDepth(-1)
            this.deadMessage.setDepth(10)
            this.player.destroy()
            this.scene.pause()
        }
        else {
            if (this.w.isDown) {
                this.player.setVelocityY(-200);
                this.player.setFrame(1);
            }        
            else if (this.s.isDown) {
                this.player.setVelocityY(200);
                this.player.setFrame(3);
            }
            else if (this.d.isDown) {
                this.player.setVelocityX(200);
                this.player.setFrame(2);
            }
            else if (this.a.isDown) {
                this.player.setVelocityX(-200);
                this.player.setFrame(0);
            }
            else {
                this.player.setVelocity(0, 0);
            }
        }
        if (mousePointer.isDown && this.player.isAlive) {
            
            if (checkTime < 500) {
                checkTime += delta;
            }
            else {
            bullet = bullets.get()
            if (bullet) {
                bullet.mouseX = mousePointer.x;
                bullet.mouseY = mousePointer.y;
                bullet.body.setMass(100);
                bullet.fire(this.player.getCenter(), mousePointer.position);  
                }
            checkTime = 0;
            }
        }
               
    }

}
