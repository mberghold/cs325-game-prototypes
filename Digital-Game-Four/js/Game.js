"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    // var bouncy = null;
    
    function quitWonGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        if (bullCount < shared[0] || shared[0] === 0) {
            shared[0] = bullCount;
        }
        game.state.start('MainMenu');

    }

    function quitLostGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    } 
    
    var bullet;
    var gunArm;
    var cursors;
    var trigger;
    var bullCount = 0;

    return {
    
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

            // When you click on the sprite, you go back to the MainMenu.
            // bouncy.inputEnabled = true;
            // bouncy.events.onInputDown.add( function() { quitGame(); }, this );
            var gameBack = game.add.image(0, 0, 'gameBack');

            var elephant = game.add.sprite(26, 483, 'elephSheet');
            var drink = elephant.animations.add('drink');
            elephant.animations.play('drink', 6, true);

            var jaguar = game.add.sprite(45, 300, 'jagSheet');
            var tail = jaguar.animations.add('tail');
            jaguar.animations.play('tail', 4, true);

            var body = game.add.sprite(45, 350, 'player');


            bullet = game.add.weapon(30, 'bullet');
            game.physics.arcade.enable(bullet);
            bullet.bulletKillType = Phaser.Weapon.KILL_WORLD_BOUNDS;
            bullet.bulletSpeed = 400;
            bullet.fireRate = 200;

            gunArm = game.add.sprite(72, 373, 'gunArm');
            gunArm.anchor.set(0.1, 0.4);
            game.physics.arcade.enable(gunArm);

            bullet.trackSprite(gunArm, 0, 0, true);

            cursors = game.input.keyboard.createCursorKeys();
            trigger = game.input.keyboard.addKey(Phaser.KeyCode.SPACEBAR);

            //spawnPoacher();

        },

        /*
        spawnPoacher: function () {
            poacher = game.add.sprite.(900, game.world.randomY%300 + 300, 'poacher');
            poacher.anchor.setTo(0.5, 0.5);
            // game.add.tween(poacher).to({ x: 40 }, { y: 490}, 100, Phaser.Easing.Linear.None, true);
        },
        */
        gameFail: function () {
            bullet.destroy();
            var button = game.add.button(game.world.centerX, game.world.centerY, 'loseButt', quitLostGame);
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
                bullet.fire();
                bullCount += 1;
            }
            // game.physics.arcade.overlap(bullet, poachers, killPoacher, null, this);
            // game.physics.arcade.overlap(elephant, poachers, gameFail, null, this);
        }
    };  
};
