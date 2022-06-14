
import Phaser from "../lib/phaser.js";
import Bullet from "../myLib/Bullet.js";
import Tree from "../myLib/Tree.js";
import { GanglandTakeover } from "../main.js";

var bullet;
var bullets;
var mousePointer;
var playerCollider;
var data;
var collision;
var playerAngle;
var playerFacing;
var angleResult;
var checkTime = 0
var bulletCollider;
var trees;
var tree;
var player;
var playerControls;
var bulletCircle;
var treeMembers;
var placeText;
var count = 0
var gayst;
var mountains;
var mountain;

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
        this.load.spritesheet('worldTiles', '../assets/worldTiles.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('laser1','../assets/laser1.png');
        // this.load.image('tree', 'object_tree_64.png')

    }
        
    create() {

        
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

        this.add.tileSprite(800, 800, 2400, 2400, 'worldTiles', 15).setOrigin(0.5, 0.5);
        this.add.tileSprite(800, 800, 1600, 1600, 'worldTiles', 6).setOrigin(0.5, 0.5);
        
        player = this.physics.add.sprite(200, 50, 'redSoldier');
        player.setScale(0.5, 0.5);
        player.setData({health: 100, gold: 0, wood: 0, stone: 0});
        player.body.setCollideWorldBounds(true);
        player.body.setMass(1);
        player.setImmovable(false);
        player.setInteractive();
        player.body.setSize(player.body.width * 0.5, player.body.height * 0.5, true)
        player.body.setCircle(player.body.width * 0.5,)

        mountains = this.physics.add.staticGroup({
            active: true,

        })

        for (let x = 0; x < 100; x++) {
            mountain = this.physics.add.staticImage(Phaser.Math.Between(40, 1400), Phaser.Math.Between(40, 1400), 'worldTilesAtlas', 'object_mountain_64.png')
            mountain.body.setMass(200)
            mountain.body.setSize(mountain.body.width * 0.5, mountain.body.height * 0.5)
            mountain.body.setCircle(mountain.body.width * 0.6)
            mountain.setPushable(false)
            mountain.name = 'mountain' + x.toString()
            mountain.setData({stone: 100})
            mountains.add(mountain)
        }
        
        bullets = this.physics.add.group({
            defaultFrame: 'laser1',
            active: true,
            classType: Bullet,
            runChildUpdate: true,
        
        })
        trees = this.physics.add.staticGroup({
            classType: Tree,
        
        })

        for (let x = 0; x < 100; x++) {
            tree = this.physics.add.staticImage(Phaser.Math.Between(40, 1400), Phaser.Math.Between(40, 1400),'worldTilesAtlas', 'object_tree_64.png');
            tree.body.setMass(200);
            tree.body.setSize(tree.body.width * 0.5, tree.body.height * 0.5)
            tree.body.setCircle(tree.body.width * 0.6)
            tree.setPushable(false);
            tree.name = `tree`+ x.toString();
            tree.setData({wood: 100})
            trees.add(tree);
        }
        
        treeMembers = trees.getChildren();       
           
        gayst = this.physics.add.sprite(200, 300, 'blueRocketGuy', 4)
        .setVisible(true)
        .setActive(true)
        .setInteractive()
        gayst.body.setCircle(10, 6, 6)
        
        this.cameras.main.centerOn(player.x, player.y);
        this.cameras.main.startFollow(player);

        this.physics.add.collider(player, trees, function dicked(player, tree) {
            console.log("player dicked by " + tree.name);

        });

        this.physics.world.addCollider(bullets, trees, function (bullet, tree) {
                
            let name = tree.name
            let data = tree.getData('wood')
            player.incData('wood', data)
            tree.destroy();
            bullet.destroy();
            console.log(name +' has been destroyed \n');
                
        }); 

        this.physics.world.addCollider(bullets, mountains, function (bullet, mountain) {
                
            let name = mountain.name
            let data = mountain.getData('stone')
            player.incData('stone', data)
            mountain.destroy();
            bullet.destroy();
            console.log(name +' has been destroyed \n');
                
        });

        console.log(trees.getChildren())
        
        this.physics.world.addCollider(gayst, trees)
        this.physics.world.addCollider(gayst, mountains)
        this.physics.world.addCollider(player, mountains)
        
        this.anims.play('blueRocketAnimationStill', gayst)
        placeText = this.add.text(0, 0, 'total trees ' + trees.getLength()).setPosition(0, 0).setScrollFactor(1, 1)
        
    }

    update(time, delta) {
        
        let gaystArea = new Phaser.Geom.Rectangle(player.x - 60, player.y - 60, 40, 40)
        
        if (gaystArea.contains(gayst.x, gayst.y)) {
            gayst.setVelocity(0,0)
        }
        else {
            this.physics.moveTo(gayst, player.x - 30, player.y - 30, 180)
        }
        
        
        if (checkTime < 5000) {

            checkTime += delta;
            
        }
        else {

            console.log(player.data.list);
            checkTime = 0;

        }
        
        if (count != trees.getLength()) {

            placeText.destroy()
            placeText = this.add.text(0, 0, 'Health ' + player.getData('health') + ' Gold ' + player.getData('gold') + '\n' + 'Wood ' + player.getData('wood') + '   ' + 'Stone ' + player.getData('stone'))
            .setScrollFactor(0,0)
            .setBackgroundColor('black')
            .setColor('blue')
            .setScale(1.5, 1.5)
            count = trees.length

        }

        
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
            bullet = bullets.get();
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