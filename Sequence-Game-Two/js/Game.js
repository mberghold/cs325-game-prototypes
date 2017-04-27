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
    var deck = {};

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

            deck[0] = topleft;
            deck[1] = topcen;
            deck[2] = topright;
            deck[3] = midleft;
            deck[4] = midcen;
            deck[5] = midright;
            deck[6] = botleft;
            deck[7] = botcen;
            deck[8] = botright;

            random = game.rnd.integerInRange(1, 9);

            for(var i = 0; i < 9; i++) {
                deck[i].[1] = 0;
                deck[i].[2] = 0;
                if(deck[i].[0] === random) {
                    deck[i].[2] = 1;
                }
            }

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
