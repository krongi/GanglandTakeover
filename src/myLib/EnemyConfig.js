import phaser from "../lib/phaser.js"


enemyConfig = new GroupGroupConfig({
    setXy: {
        x: Phaser.Math.Between(1300, 1400),
        y: Phaser.Math.Between(1300, 1400)
    },
    
    setOrigin: {
        x: Phaser.Math.Between(1300, 1400),
        y: Phaser.Math.Between(1300, 1400)},
    setXY: (Phaser.Math.Between(1300, 1400),Phaser.Math.Between(1300, 1400)),
    key: 'blueSoldier',
    frame: 'blueSoldier',
    bulletGroup: enemyBullets,
    max: 10,
    resources: {
        gold: 250,
        copper: 100,
        dick: 10
    },
    target: player,            
    // name: "Enemy", // + x.toString(),
    runChildUpdate: true,
    active: true,
    visible: true,            
    })