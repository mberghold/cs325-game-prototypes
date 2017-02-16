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
        // Load an image and call it 'logo'.
        game.load.image( 'body', 'assets/Game2Body2.png' );
        game.load.image( 'thigh', 'assets/Game2Thigh2.png' );
        game.load.image( 'leg', 'assets/Game2Leg2.png' );
        game.load.image( 'shoe', 'assets/Game2Shoe2.png' );
    }
    
    var shoe1;
    var shoe2;
    var leg1;
    var leg2;
    var thigh1;
    var thigh2;
    var body;
    var human;
    
    function create() {
        // Create a sprite at the center of the screen using the 'logo' image.
        // bouncy = game.add.sprite( game.world.centerX, game.world.centerY, 'logo' );
        // Anchor the sprite at its center, as opposed to its top-left corner.
        // so it will be truly centered.
        //bouncy.anchor.setTo( 0.5, 0.5 );
        game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.arcade.gravity.y = 100;


        leg1 = game.add.sprite(300, 200, 'leg');
        leg1.scale.setTo(0.8, 0.8);
        leg1.anchor.setTo(0.5, 0.1);
        leg2 = game.add.sprite(120, 400, 'leg');
        leg2.scale.setTo(0.8, 0.8);
        shoe1 = game.add.sprite(leg1.x, leg1.y + 120, 'shoe');
        shoe1.scale.setTo(0.5, 0.5);
        shoe1.anchor.setTo(0.4, 0.2);
        shoe2 = game.add.sprite(120, 550, 'shoe');
        shoe2.scale.setTo(0.5, 0.5);
        thigh1 = game.add.sprite(80, 300, 'thigh');
        thigh1.scale.setTo(0.75, 0.75);
        thigh2 = game.add.sprite(100, 300, 'thigh');
        thigh2.scale.setTo(0.75, 0.75);
        body = game.add.sprite(80, 50, 'body');
        body.scale.setTo(1, 1);

        game.physics.enable([leg1, shoe1], Phaser.Physics.ARCADE);
        shoe1.body.collideWorldBounds = true;
        leg1.body.collideWorldBounds = true;
        /*
        game.physics.enable([shoe1, shoe2, leg1, leg2, thigh1, thigh2, ], Phaser.Physics.ARCADE);

        shoe1.body.collideWorldBounds = true;
        shoe2.body.collideWorldBounds = true;
        leg1.body.collideWorldBounds = true;
        leg2.body.collideWorldBounds = true;
        thigh1.body.collideWorldBounds = true;
        thigh2.body.collideWorldBounds = true;
        body.body.collideWorldBounds = true;
        */
        //human = game.add.group();
        //human.add(shoe1, shoe2, leg1, leg2, thigh1, thigh2, body);
        
        // Turn on the arcade physics engine for this sprite.
        //game.physics.enable( bouncy, Phaser.Physics.ARCADE );
        // Make it bounce off of the world bounds.
        //bouncy.body.collideWorldBounds = true;
        
        // Add some text using a CSS style.
        // Center it in X, and position its top 15 pixels from the top of the world.
        //var style = { font: "25px Verdana", fill: "#9999ff", align: "center" };
        //var text = game.add.text( game.world.centerX, 15, "Build something amazing.", style );
        //text.anchor.setTo( 0.5, 0.0 );
    }
    
    function update() {
        shoe1.x = leg1.x;
        shoe1.y = leg1.y + 120;
        // Accelerate the 'logo' sprite towards the cursor,
        // accelerating at 500 pixels/second and moving no faster than 500 pixels/second
        // in X or Y.
        // This function returns the rotation angle that makes it visually match its
        // new trajectory.
        //bouncy.rotation = game.physics.arcade.accelerateToPointer( bouncy, this.game.input.activePointer, 500, 500, 500 );
    }
};
