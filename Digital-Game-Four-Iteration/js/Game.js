"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    // var bouncy = null;
    
    function quitWonGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        music.stop();
        shared[0] += 1;
        game.state.start('MainMenu');

    }

    function quitLostGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        music.stop();
        game.state.start('MainMenu');

    } 

    function spawnPoacher() {
        poacher = game.add.sprite(900, (game.world.randomY%250 + 300), 'poacher');
        poacher.anchor.setTo(0.5, 0.5);
        game.add.tween(poacher).to({x: 100, y: 500}, speed, Phaser.Easing.Linear.None, true);
        game.physics.arcade.enable(poacher);
        poacher.enableBody = true;
        poacher.physicsBodyType = Phaser.Physics.ARCADE;
    }
    
    function killPoacher(poachers, bullets) {
        kills += 1;
        poachers.destroy();
    }

    function gameWin () {
        game.time.events.remove(spawnLoop);
        var button1 = game.add.button(game.world.centerX, game.world.centerY, 'winButt', quitWonGame);
    }

    function gameFail () {
        game.time.events.remove(spawnLoop);
        var button2 = game.add.button(game.world.centerX, game.world.centerY, 'loseButt', quitLostGame);
    }



    var gunArm;
    var cursors;
    var trigger;
    var gameBack
    var elephant
    var weapon;
    var poacher;
    var kills = 0;
    var speed = 3000;
    var music;
    var spawnLoop;

    return {
    
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

            music = game.add.audio('gameMusic');
            music.play();

            game.physics.startSystem(Phaser.Physics.ARCADE);
            gameBack = game.add.image(0, 0, 'gameBack');

            elephant = game.add.sprite(26, 483, 'elephSheet');
            var drink = elephant.animations.add('drink');
            elephant.animations.play('drink', 6, true);
            game.physics.arcade.enable(elephant);
            elephant.enableBody = true;
            elephant.physicsBodyType = Phaser.Physics.ARCADE;

            var jaguar = game.add.sprite(25, 300, 'jagSheet');
            var tail = jaguar.animations.add('tail');
            jaguar.animations.play('tail', 4, true);

            var zebra = game.add.sprite(75, 290, 'zebraSheet');
            var munch = zebra.animations.add('munch');
            zebra.animations.play('munch', 6, true);

            var body = game.add.sprite(45, 350, 'player');


            weapon = game.add.weapon(1, 'bullet');
            // game.physics.arcade.enable(bullet);
            weapon.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
            weapon.bulletSpeed = 800;
            weapon.fireRate = 200;
            // bullet.enableBody = true;
            // bullet.physicsBodyType = Phaser.Physics.ARCADE;

            gunArm = game.add.sprite(72, 373, 'gunArm');
            gunArm.anchor.set(0.1, 0.4);
            game.physics.arcade.enable(gunArm);

            weapon.trackSprite(gunArm, 0, 0, true);

            cursors = game.input.keyboard.createCursorKeys();
            trigger = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);
            kills = 0;
            spawnLoop = game.time.events.loop(3000, spawnPoacher);

        },
    
        update: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

            if (cursors.up.isDown && (gunArm.angle > -30) ) {
                gunArm.body.angularVelocity = -50;
            }
            else if (cursors.down.isDown && (gunArm.angle < 55)) {
                gunArm.body.angularVelocity = 50;
            }
            else {
                gunArm.body.angularVelocity = 0;
            }
            if (trigger.isDown) {
                weapon.fire();
            }
            if (kills <= 5) {
                speed = 3000;
            }
            if (kills > 5 && kills <= 10) {
                speed = 2500;
            }
            if (kills > 10 && kills <= 15) {
                speed = 2000;
            }
            if (kills > 15 && kills <= 20) {
                speed = 1500;
            }
            if (kills > 20 && kills <= 25) {
                speed = 1000;
            }
            game.physics.arcade.overlap(elephant, poacher, gameFail);
            game.physics.arcade.overlap(weapon.bullets, poacher, killPoacher);
            if (kills >= 25) {
                gameWin();
            }
        }
    };  
};
