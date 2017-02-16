window.onload = function() {
    
    "use strict";
    
    var game = new Phaser.Game( 800, 600, Phaser.AUTO, 'game', { preload: preload, create: create, update: update } );
    

    var total = 0;
    var speed = 1;
    var killcount = 0;

    function preload() {
        // I used the code from loading images and writing text in the minimal game design
        // as a basis for getting images and text in this game.
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
    var style
    var style2
    var text
    var victory

    function create() {
        background = game.add.image( 0, 0, 'background');
        cannon = game.add.sprite( 750, 550, 'cannon');
        reticle = game.add.sprite( 375, 275, 'reticle');
        reticle.anchor.setTo(0.5, 0.5);
        cannon.anchor.setTo(0.5, 0.8);
        game.physics.enable(reticle, Phaser.Physics.ARCADE);
        game.physics.enable(cannon, Phaser.Physics.ARCADE);
        style = {font: "25px Arial", fill: "#9999ff", align: "right"};
        style2 = {font: "35px Arial", fill: "#9999ff", align: "right"};
        text = game.add.text(game.world.centerX, 15, "Kill count: " + killcount, style);
        victory = game.add.text(game.world.centerX, 300, "", style2);
        text.anchor.setTo(0.5, 0.0);
        victory.anchor.setTo(0.5, 0.5);
        
    }

    function releaseAsteroid() {
        // Phaser had a command called add several sprites which I used to help make this function.
        asteroid = game.add.sprite(-(Math.random() * 800), (game.world.randomY%400 + 150), 'asteroid');
        asteroid.anchor.setTo(0.5, 0.5);
        asteroid.inputEnabled = true;
        asteroid.input.useHandCursor = true;
        asteroid.events.onInputDown.add(destroyAsteroid, this);
        game.add.tween(asteroid).to({ x: game.width + (1600 + asteroid.x) }, (30000/speed), Phaser.Easing.Linear.None, true);
        total++;
    }

    function destroyAsteroid (sprite) {
        // Phaser had a command called destroy sprite which I used to help make this function.
        sprite.destroy();
        total--;
        killcount++;
        speed = speed + .2;
    }
    
    function update() {
        text.text = "Kill count: " + killcount;
        if(total < 15)
        {
           releaseAsteroid();
        }

        // I looked up Phaser physics and found the pointer manipulation commands.
        game.physics.arcade.moveToPointer(reticle, 300, this.game.input.activePointer, 60);
        cannon.rotation = game.physics.arcade.angleToPointer(cannon, this.game.input.activePointer) + 1.6;

        if(killcount === 50)
        {
            total = 100
            victory.text = "You killed 50! You fought for " + Math.round(game.time.now) / 1000 + " seconds.";
            text.anchor.setTo( 0.5, 0.0 );
        }

    }
};
