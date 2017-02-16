window.onload = function() {
    // You might want to start with a template that uses GameStates:
    //     https://github.com/photonstorm/phaser/tree/v2.6.2/resources/Project%20Templates/Basic
    
    // You can copy-and-paste the code from any of the examples at http://examples.phaser.io here.
    // You will need to change the fourth parameter to "new Phaser.Game()" from
    // 'phaser-example' to 'game', which is the id of the HTML element where we
    // want the game to go.
    // The assets (and code) can be found at: https://github.com/photonstorm/phaser/tree/master/examples/assets
    // You will need to change the paths you pass to "game.load.image()" or any other
    // loading functions to reflect where you are putting the assets.
    // All loading functions will typically all be found inside "preload()".
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    
    function preload() {
        game.load.image('hands', 'assets/Game2Hands.png');
        game.load.image('screen', 'assets/Game2Screen.png');
        game.load.image('incision', 'assets/Game2Incision.png');
        game.load.image('scar', 'assets/Game2Scar.png');
        game.load.image('primary', 'assets/Game2PrimaryIncision.png');
        game.load.image('heart', 'assets/Game2Heart.png');
        game.load.image('left', 'assets/Game2LKidney.png');
        game.load.image('right', 'assets/Game2RKidney.png');
        game.load.image('organs', 'assets/Game2Organs.png');
        game.load.image('button', 'assets/Game2Button.png');
        game.load.image('button2', 'assets/Game2Button2.png');

    }

    var cutCount = 0;
    var screen;
    var organs;
    var heart;
    var lKid;
    var rKid;
    var hands;
    var recHeart = 0;
    var recLKid = 0;
    var recRKid = 0;
    var style;
    var heartOpen = 0;
    var lKidOpen = 0;
    var rKidOpen = 0;

    function create() {
        screen = game.add.sprite(0, 0, 'screen');
        screen.inputEnabled = true;
        screen.input.useHandCursor = true;
        screen.events.onInputDown.add(spawnIncision, this);

        organs = game.add.sprite(650, 400, 'organs');
        organs.anchor.setTo(0.5, 0.5);

        hands = game.add.sprite(game.world.centerX, game.world.centerY, 'hands');
        hands.anchor.setTo(0.5, 0.5);

        game.input.mouse.capture = true;

        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 300;

        game.physics.enable(organs, Phaser.Physics.ARCADE);
        organs.body.allowGravity = false;
        organs.body.immovable = true;

        style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
    }

    function spawnIncision() {
        if(game.input.mousePointer.x > 200 && game.input.mousePointer.x < 300 && 
            game.input.mousePointer.y > 100 && game.input.mousePointer.y < 200) {
            if(heartOpen === 0) {
                cutCount += 1;
                extractHeart();
            }
        }

        else if(game.input.mousePointer.x > 100 && game.input.mousePointer.x < 200 && 
            game.input.mousePointer.y > 300 && game.input.mousePointer.y < 400) {
            if(lKidOpen === 0) {
                cutCount += 1;
                extractLeft();
            }
        }

        else if(game.input.mousePointer.x > 300 && game.input.mousePointer.x < 400 && 
            game.input.mousePointer.y > 300 && game.input.mousePointer.y < 400) {
            if(rKidOpen === 0) {
                cutCount += 1;
                extractRight();
            }
        }

        else if(game.input.mousePointer.x > 75 && game.input.mousePointer.x < 425 && 
            game.input.mousePointer.y > 25 && game.input.mousePointer.y < 425) {
            var cut = game.add.sprite(game.input.mousePointer.x, game.input.mousePointer.y, 'incision');
            cut.anchor.setTo(0.5, 0.5);
            cut.inputEnabled = true;
            cut.input.useHandCursor = true;
            cut.events.onInputDown.add(repairIncision, this);
            cutCount += 1;
        }
    }

    function repairIncision(cut) {
        var scar = game.add.sprite(cut.x, cut.y, 'scar');
        scar.anchor.setTo(0.5, 0.5);
        cut.destroy();
    }

    function extractHeart() {
        heartOpen = 1;
        var primary = game.add.sprite(250, 150, 'primary');
        primary.anchor.setTo(0.5, 0.5);
        primary.inputEnabled = true;
        primary.input.useHandCursor = true;
        primary.events.onInputDown.add(repairPrimaryHeart, this);

        heart = game.add.sprite(250, 150, 'heart');
        heart.anchor.setTo(0.5, 0.5);
        heart.inputEnabled = true;
        heart.input.useHandCursor = true;
        heart.checkWorldBounds = true;
        heart.events.onOutOfBounds.add(gameFail);
        heart.input.enableDrag(true);
        heart.events.onInputDown.add(enablePhysics, this);
    }

    function extractLeft() {
        lKidOpen = 1;
        var primary = game.add.sprite(150, 350, 'primary');
        primary.anchor.setTo(0.5, 0.5);
        primary.inputEnabled = true;
        primary.input.useHandCursor = true;
        primary.events.onInputDown.add(repairPrimaryLeft, this);

        lKid = game.add.sprite(150, 350, 'left');
        lKid.anchor.setTo(0.5, 0.5);
        lKid.inputEnabled = true;
        lKid.input.useHandCursor = true;
        lKid.checkWorldBounds = true;
        lKid.events.onOutOfBounds.add(gameFail);
        lKid.input.enableDrag(true);
        lKid.events.onInputDown.add(enablePhysics, this);
    }

    function extractRight() {
        rKidOpen = 1;
        var primary = game.add.sprite(350, 350, 'primary');
        primary.anchor.setTo(0.5, 0.5);
        primary.inputEnabled = true;
        primary.input.useHandCursor = true;
        primary.events.onInputDown.add(repairPrimaryRight, this);

        rKid = game.add.sprite(350, 350, 'right');
        rKid.anchor.setTo(0.5, 0.5);
        rKid.inputEnabled = true;
        rKid.input.useHandCursor = true;
        rKid.checkWorldBounds = true;
        rKid.events.onOutOfBounds.add(gameFail);
        rKid.input.enableDrag(true);
        rKid.events.onInputDown.add(enablePhysics, this);
    }

    function repairPrimaryHeart(primary) {
        if(recHeart === 0) {
            gameFail();
        }
        var scar = game.add.sprite(primary.x, primary.y, 'scar');
        scar.anchor.setTo(0.5, 0.5);
        primary.destroy();
    }

    function repairPrimaryLeft(primary) {
        if(recLKid === 0) {
            gameFail();
        }
        var scar = game.add.sprite(primary.x, primary.y, 'scar');
        scar.anchor.setTo(0.5, 0.5);
        primary.destroy();
    }

    function repairPrimaryRight(primary) {
        if(recRKid === 0) {
            gameFail();
        }
        var scar = game.add.sprite(primary.x, primary.y, 'scar');
        scar.anchor.setTo(0.5, 0.5);
        primary.destroy();
    }

    function salvageHeart() {
        recHeart = 1;
        heart.destroy();
    }

    function salvageLeft() {
        recLKid = 1;
        lKid.destroy();
    }

    function salvageRight() {
        recRKid = 1;
        rKid.destroy();
    }

    function enablePhysics(sprite) {
        game.physics.enable(sprite, Phaser.Physics.ARCADE);
    }

    function gameFail() {
        var failscreen = game.add.sprite(0, 0, 'screen');
        var button = game.add.button(game.world.centerX, game.world.centerY, 'button', restart);
    }

    function winGame() {
        var winscreen = game.add.sprite(0, 0, 'screen');
        var button2 = game.add.button(game.world.centerX, game.world.centerY, 'button2', restart);
    }

    function restart() {
        recHeart = 0;
        recLKid = 0;
        recRKid = 0;
        heartOpen = 0;
        lKidOpen = 0;
        rKidOpen = 0;
        cutCount = 0;
        game.state.restart();
    }
    
    function update() {
        hands.x = game.input.mousePointer.x;
        hands.y = game.input.mousePointer.y;

        if(cutCount > 10) {
            cutCount = 0;
            gameFail();
        }

        game.world.bringToTop(hands);

        game.physics.arcade.collide(organs, heart, salvageHeart);
        game.physics.arcade.collide(organs, lKid, salvageLeft);
        game.physics.arcade.collide(organs, rKid, salvageRight);

        if(recHeart === 1) {
            var text = game.add.text( 550, 20, "Heart saved!", style);
        }

        if(recLKid === 1) {
            var text = game.add.text( 520, 50, "Left Kidney saved!", style);
        }

        if(recRKid === 1) {
            var text = game.add.text( 520, 80, "Right Kidney saved!", style);
        }

        if(recHeart === 1 && recRKid === 1 && recLKid === 1) {
            recHeart = 0;
            recLKid = 0;
            recRKid = 0;
            heartOpen = 0;
            lKidOpen = 0;
            rKidOpen = 0;
            winGame();
        }


    }
};
