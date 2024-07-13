import Phaser from "../lib/phaser.js";
import Bullet from "../myLib/Bullet.js";
import Tree from "../myLib/Tree.js";
import Resource from "../myLib/Resource.js";
import Mountain from "../myLib/Mountain.js"
import Player from "../myLib/Player.js";
import Enemy from "../myLib/Enemy.js";
import phaser from "../lib/phaser.js";




// hardware
var mousePointer;

// projectiles
var bullet;

// gropus
var bullets;
var myBullets;
var enemyBullets;
var enemies;
var mountains
var resources;
var trees


//sprites and images
var tree;
var player;
var companion;
var mountain;
var enemy;

// MISC
var checkTime = 0
var placeText;
var shootingDistance;
var companionArea;

export default class Game extends Phaser.Scene {
    
        constructor() {
        super('game');
    }

    preload() {

        /*This is where we load our assets at. We don't make them variables but we do assign them keys to reference
        later        */

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
        // this.load.image('cokeBlock', '../assets/cokeBlock.png')
        // this.load.image('weedBag', '../assets/weedBag.png')
        // this.load.image('acidSheet', '../assets/acidSheet.png')
        // this.load.image('xtcPill', '../assets/xtcPill.png')


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
            classType: Bullet,
            runChildUpdate: true,
        })

        enemies = this.physics.add.group({
            classType: Enemy,
            active: true,
            setActive: true,
            runChildUpdate: true
        })

        resources = this.physics.add.staticGroup({
                active: true,
                classType: Resource,
                
        })
        mountains = this.physics.add.staticGroup({
            classType: Mountain,
            active: true,
        })  

        trees = this.physics.add.staticGroup({
            classType: Tree,
            active: true,
        })

        // Create player object
        player = new Player(this, 200, 50, 'redSoldier');
        
        
        /* Populate resources group with children*/
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
        for (let x = 0; x < 10; x++) {
            enemy = enemies.get(Phaser.Math.Between(1300, 1400), Phaser.Math.Between(1300, 1400),'blueSoldier', resources)
            enemy.target = player
            enemy.setName("Enemy" + x.toString())
            
        }
        
        /* Create the companion object. He just follows player around*/
        companion = this.physics.add.sprite(200, 300, 'blueRocketGuy', 4)
        .setVisible(true)
        .setName('Casper')
        .setActive(true)
        .setInteractive()
        companion.body.setCircle(10, 6, 6)
        
        /* Set main camera to center on and follow the player*/
        this.cameras.main.centerOn(player.x, player.y);
        this.cameras.main.startFollow(player);

        /* Add colliders for game objects*/
        this.physics.add.collider(player, resources, function (player, resource) {

        });        

        this.physics.add.collider(enemy, resources, function (player, resource) {

        });

        this.physics.add.collider(enemies, bullets, function(enemy, bullet){
            enemy.destroy()
            bullet.destroy()
        })

        this.physics.add.collider(enemies, resources, function(enemy, resource){
            // enemy.destroy()
            
        })

        this.physics.add.collider(bullets, mountains, function (bullet, mountain) {
                            
            mountain.destroy()
            bullet.destroy()
            player.grabResource('stone', 25)

        })
        
        this.physics.add.collider(bullets, trees, function (bullet, tree) {
                 
            tree.destroy()
            bullet.destroy()
            player.grabResource('wood', 25)

        })
        
        this.physics.add.collider(companion, resources)

        this.physics.add.collider(player.rect, enemies)
        
        this.physics.add.collider(enemies, shootingDistance, function(enemy) {
            enemy.stopAdvance()
        })
       
        /* Create animations and text objects for game*/
        this.anims.play('blueRocketAnimationStill', companion)
        placeText = this.add.text(0, 0, ' ' + resources.getLength()).setPosition(0, 0).setScrollFactor(1, 1)
        this.events.addListener('stopped', function() {
            return enemy.name, enemy.x, enemy.y
        })
        this.events.addListener('start', function() {
            console.log('on the move again')
        })
    }
    
    update(time, delta) {
        enemies.runChildUpdate = true        
        player.update()
        companionArea = new Phaser.Geom.Rectangle(player.x - 60, player.y - 60, 40, 40)
        shootingDistance = new Phaser.Geom.Rectangle(player.x, player.y, player.width*3, player.height*3)
        this.scene.setActive(true, companionArea)
        this.scene.setVisible(true, companionArea)
        this.scene.setActive(true, shootingDistance)
        this.scene.setVisible(true, shootingDistance)
        

        this.physics.world.collide(player, enemies)


        if (player.data.get('health') <= 0) {
            console.log("You're Dead!")
            this.scene.pause()
        }
        
        if (companionArea.contains(companion.x, companion.y)) {
            companion.setVelocity(0,0)
        }
        
        else {
            this.physics.moveTo(companion, player.x - 30, player.y - 30, 180)
        }
        
        this.physics.collide(player.rect, enemies, function (enemy) {
            
        })
        if (resources) {
            placeText.destroy()
            placeText = this.add.text(0, 0, 'Health ' + player.getData('health') + "\n" + 'Magic ' + player.getData('magic')  + ' Gold ' + player.getData('gold') + '\n' + 'Wood ' + player.getData('wood') + '   ' + 'Stone ' + player.getData('stone'))
            .setScrollFactor(0,0)
            .setBackgroundColor('black')
            .setColor('blue')
            .setScale(1.5, 1.5)
        }

        
        enemies.children.each(function(enemy, target) {            
            enemy.advance(player)
            return enemy.stopped
            enemy.checkShootingDistance(target)
        })
        
        if (this.w.isDown) {
            player.setVelocityY(-200);
            player.setFrame(1);
        }        
        else if (this.s.isDown) {
            player.setVelocityY(200);
            player.setFrame(3);
        }
        else if (this.d.isDown) {
            player.setVelocityX(200);
            player.setFrame(2);
        }
        else if (this.a.isDown) {
            player.setVelocityX(-200);
            player.setFrame(0);
        }
        else {
            player.setVelocity(0, 0);
        }
        
        if (mousePointer.isDown) {
            
            if (checkTime < 500) {
                checkTime += delta;
            }
            else {
            bullet = bullets.get()
            if (bullet) {
                bullet.mouseX = mousePointer.x;
                bullet.mouseY = mousePointer.y;
                bullet.body.setMass(100);
                bullet.fire(player.getCenter(), mousePointer.position);  
                }
            
            
            checkTime = 0;
            }
        }
        
        if (enemy) {
            
            if (checkTime < 500) {
                checkTime += delta;
            }
            else {
            bullet = bullets.get()
            if (bullet) {
                bullet.mouseX = mousePointer.x;
                bullet.mouseY = mousePointer.y;
                bullet.body.setMass(100);
                bullet.fire(player.getCenter(), mousePointer.position);  
                }
            
            
            checkTime = 0;
            }
        }
        
    }

}