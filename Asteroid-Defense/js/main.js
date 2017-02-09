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
    
    var timer = 0;
    var total = 0;
    var speed = 1;

    function preload() {
        // Load an image and call it 'logo'.
        game.load.image( 'background', 'assets/Galaxy.png' );
        game.load.image( 'asteroid', 'assets/Cowboy-Asteroid2.png' );
        game.load.image( 'reticle', 'assets/Cannon-Reticle2.png' );
        game.load.image( 'cannon', 'assets/NASA-Cannon2.png' );
        game.load.image( 'blast', 'assets/Cannon-Blast2.png' );

    }
  
    var cannon
    var reticle
    var background
    var asteroid
    var speed

    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        background = game.add.image( 0, 0, 'background');
        cannon = game.add.sprite( 750, 550, 'cannon');
        reticle = game.add.sprite( 375, 275, 'reticle');
        reticle.anchor.setTo(0.5, 0.5);
        cannon.anchor.setTo(0.5, 0.8);
        game.physics.enable(reticle, Phaser.Physics.ARCADE);
        game.physics.enable(cannon, Phaser.Physics.ARCADE);
        // releaseAsteroid();
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        //screen.anchor.setTo( 0.5, 0.5 );
        
        // Turn on the arcade physics engine for this sprite.
        // game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        // bouncy.body.collideWorldBounds = true;
        
    }

    function releaseAsteroid() {
        asteroid = game.add.sprite(-(Math.random() * 800), (game.world.randomY%400 + 150), 'asteroid');
        asteroid.anchor.setTo(0.5, 0.5);
        asteroid.inputEnabled = true;
        asteroid.input.useHandCursor = true;
        asteroid.events.onInputDown.add(destroyAsteroid, this);
        game.add.tween(asteroid).to({ x: game.width + (1600 + asteroid.x) }, (30000/speed), Phaser.Easing.Linear.None, true);
        total++;
        timer = game.time.now + 50;
    }

    function destroyAsteroid (sprite) {
        sprite.destroy();
        total--;
        speed = speed + .2;
    }
    
    function update() {

        if (total < 5 && game.time.now > timer)
        {
           releaseAsteroid();
        }
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        game.physics.arcade.moveToPointer(reticle, 300, this.game.input.activePointer, 60);
        cannon.rotation = game.physics.arcade.angleToPointer(cannon, this.game.input.activePointer) + 1.6;
    }
};
