"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.

    var cards = [];

    // This will hold the card. I'm thinking [0] will be card value, [1] if it is the spy.
    // Maybe [2] the sprite?
    var topleft = {};
    var topcen = {};
    var topright = {};
    var midleft = {};
    var midcen = {};
    var midright = {};
    var botleft = {};
    var botcen = {};
    var botright = {};

    var random;
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }

    function startPrint() {
        topleft[3] = game.add.sprite(100, 200, 'back');
        topcen[3] = game.add.sprite(230, 355, 'back');
        topright[3] = game.add.sprite(360, 510, 'back');
        midleft[3] = game.add.sprite(100, 200, 'back');
        midcen[3] = game.add.sprite(230, 355, 'back');
        midright[3] = game.add.sprite(360, 510, 'back');
        botleft[3] = game.add.sprite(100, 200, 'back');
        botcen[3] = game.add.sprite(230, 355, 'back');
        botright[3] = game.add.sprite(360, 510, 'back');
    }
    
    return {
    
        create: function () {

            game.add.image(0, 0, 'menuBack');

            for(var i = 0; i < 9; i++) {
                cards[i] = i + 1;
            }

            topleft[0] = Phaser.ArrayUtils.removeRandomItem(cards);
            topcen[0] = Phaser.ArrayUtils.removeRandomItem(cards);
            topright[0] = Phaser.ArrayUtils.removeRandomItem(cards);
            midleft[0] = Phaser.ArrayUtils.removeRandomItem(cards);
            midcen[0] = Phaser.ArrayUtils.removeRandomItem(cards);
            midright[0] = Phaser.ArrayUtils.removeRandomItem(cards);
            botleft[0] = Phaser.ArrayUtils.removeRandomItem(cards);
            botcen[0] = Phaser.ArrayUtils.removeRandomItem(cards);
            botright[0] = Phaser.ArrayUtils.removeRandomItem(cards);

            random = game.rnd.integerInRange(1, 9);

            topleft[2] = 0;
            if(topleft[0] === random)
                topleft[2] = 1;
            topcen[2] = 0;
            if(topcen[0] === random)
                topcen[2] = 1;
            topright[2] = 0;
            if(topright[0] === random)
                topright[2] = 1;
            midleft[2] = 0;
            if(midleft[0] === random)
                midleft[2] = 1;
            midcen[2] = 0;
            if(midcen[0] === random)
                midcen[2] = 1;
            midright[2] = 0;
            if(midright[0] === random)
                midright[2] = 1;
            botleft[2] = 0;
            if(botleft[0] === random)
                botleft[2] = 1;
            botcen[2] = 0;
            if(botcen[0] === random)
                botcen[2] = 1;
            botright[2] = 0;
            if(botright[0] === random)
                botright[2] = 1;

            startPrint();


    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            //
        },
    
        update: function () {
        
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            //
        }
    };
};
