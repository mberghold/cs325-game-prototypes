"use strict";

GameStates.makeBonusLevel = function( game, shared ) {
    // Create your own variables.
    // var bouncy = null;
    
    function quitLostGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        if(shared[4]) {
            music.stop();
        }
        game.state.start('MainMenu');

    } 

    function spawnGorilla() {
        gorilla = game.add.sprite(900, (game.world.randomY%250 + 300), 'gorilla');
        gorilla.anchor.setTo(0.5, 0.5);
        game.add.tween(gorilla).to({x: 45, y: 355}, speed, Phaser.Easing.Linear.None, true);
        game.physics.arcade.enable(gorilla);
        gorilla.enableBody = true;
        gorilla.physicsBodyType = Phaser.Physics.ARCADE;
    }
    
    function killGorilla(gorillas, bullets) {
        kills += 1;
        gorillas.destroy();
        bullets.destroy();
    }

    function gameFail () {
        var button2 = game.add.button(game.world.centerX, game.world.centerY, 'loseButt', quitLostGame);
    }

    function toggleMusic() {
        if(shared[4]) {
            shared[4] = false;
            music.stop();
        }
        else {
            music.play();
            shared[4] = true;
        }
            
    }

    function startAnimation() {
        var intimidate = startGorilla.animations.add('intimidate');
        startGorilla.animations.play('intimidate', 8, false);
        intimidate.onComplete.add(walkBack, this);

    }

    function walkBack() {
        var tween2 = game.add.tween(startGorilla).to({x: 900, y: 350}, 3500, Phaser.Easing.Linear.None, true);
        tween2.onComplete.add(spawnGorilla, this);
    }


    var gunArm;
    var cursors;
    var trigger;
    var gameBack
    var weapon;
    var gorilla;
    var startGorilla;
    var kills = 0;
    var killCheck = 1;
    var speed = 3000;
    var music;
    var key1;
    var body;

    return {
    
        create: function () {
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!

            music = game.add.audio('bonusMusic');
            if(shared[4]) {
               music.play();
            }
            key1 = game.input.keyboard.addKey(Phaser.Keyboard.M);
            key1.onDown.add(toggleMusic);

            game.physics.startSystem(Phaser.Physics.ARCADE);
            gameBack = game.add.image(0, 0, 'bonusBack');
            game.add.sprite(0, 0, 'musicToggle');

            body = game.add.sprite(45, 350, 'nightPlayer');
            game.physics.arcade.enable(body);
            body.enableBody = true;
            body.physicsBodyType = Phaser.Physics.ARCADE;

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

            startGorilla = game.add.sprite(900, 350, 'gorSheet');
            var tween1 = game.add.tween(startGorilla).to({x: 600, y: 350}, 3500, Phaser.Easing.Linear.None, true);
            tween1.onComplete.add(startAnimation, this);


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


            if (kills === killCheck) {
                killCheck += 1;
                speed = speed/1.2;
                spawnGorilla();
            }



            game.physics.arcade.overlap(body, gorilla, gameFail);
            game.physics.arcade.overlap(weapon.bullets, gorilla, killGorilla);
        }
    };  
};