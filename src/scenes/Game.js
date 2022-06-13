
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

export default class Game extends Phaser.Scene {
    
        constructor() {
        super('game');
    }

    preload() {

        /*This is where we load our assets at. We don't make them variables but we do assign them keys to reference
        later        */
        
    
        this.load.spritesheet('redSoldier', '../assets/redSoldiers.png', {frameWidth: 64, frameHeight: 64});
        this.load.spritesheet('blueSoldier', '../assets/blueSoldiers.png', {frameWidth: 64, frameHeight: 64});
        this.load.atlas('laser', '../assets/lasers.png', '../assets/lasers.json');
        this.load.atlas('worldTilesAtlas', '../assets/worldTiles.png', '../assets/worldTiles.json');
        this.load.atlas('bullets', '../assets/lasers.png', '../assets/lasers.json');
        this.load.spritesheet('worldTiles', '../assets/worldTiles.png', {frameWidth: 64, frameHeight: 64});
        this.load.image('laser1','../assets/laser1.png');
        this.load.image('tree', 'object_tree_64.png')

    }
        
    create() {

        
        

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
        
        this.tween = this.tweens.addCounter({
            from: 500,
            to: 0,
            yoyo: true,
            duration: 15000, 
            ease: 'Sine.easeInOut',
            repeat: -1,
    
        })
        
        player = this.physics.add.sprite(200, 50, 'redSoldier');
        player.setScale(0.5, 0.5);
        player.setData({health: 100, gold: 50, wood: 20});
        player.body.setCollideWorldBounds(true);
        player.body.setMass(1);
        player.setImmovable(false);
        player.setInteractive();
        player.body.setSize(player.body.width * 0.5, player.body.height * 0.5, true)
        player.body.setCircle(player.body.width * 0.5,)
        
        bullets = this.physics.add.group({
            defaultFrame: 'laser1',
            active: true,
            classType: Bullet,
            runChildUpdate: true,
        

        })
        trees = new Phaser.Physics.Arcade.StaticGroup();
        trees = this.physics.add.staticGroup({
            classType: Tree,
        
        })
        

        for (let x = 0; x < 100; x++) {
            tree = this.physics.add.staticImage(Phaser.Math.Between(40, 1400), Phaser.Math.Between(40, 1400),'worldTilesAtlas', 'object_tree_64.png');
            tree.body.setMass(200);
            tree.body.setCircle(tree.width * 0.5)
            tree.setPushable(false);
            tree.name = `tree`+ x.toString();
            tree.setData({wood: 100})
            
            trees.add(tree);
        }
    
        treeMembers = trees.getChildren();

        this.physics.world.addCollider(bullets, trees, function (bullet, tree, player) {
                
            let name = tree.name
            
            tree.destroy();
            bullet.speed = bullet.speed * 0.5
            bullet.destroy();
            console.log(name +' has been destroyed \n');
                
        });        
        
        this.cameras.main.centerOn(player.x, player.y);
        this.cameras.main.startFollow(player);

        console.log(mousePointer.positionToCamera(this.cameras.main));
        this.physics.add.collider(player, trees, function dicked(player, tree) {
            console.log("player dicked by " + tree.name);

        });

        placeText = this.add.text(0, 0, 'total trees ' + trees.getLength()).setPosition(0, 0).setScrollFactor(1, 1)
        placeText.setBackgroundColor('black')
    }

    update(time, delta) {
        


        if (checkTime < 5000) {

            checkTime += delta;
            
        }
        else {
            if (trees.getMatching('state', 'gay')) {
                let treeToBeRemoved = trees.getMatching('state', 'gay');
                console.log(treeToBeRemoved)
            }
            console.log(player.data.list);
            checkTime = trees.length;
        }
        if (count != trees.getLength()) {
            placeText.destroy()
            placeText = this.add.text(0, 0, 'total trees ' + trees.getLength()).setScrollFactor(0,0).setBackgroundColor('black').setColor('blue').setScale(2, 2)
            
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
        let halfSize = [player.body.halfHeight, player.body.halfWidth];

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