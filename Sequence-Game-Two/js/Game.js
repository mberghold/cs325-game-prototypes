"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.

    var cards = [];
    var music = null;

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
    var spy = null;
    var style = null;
    var spytext = null;
    var seconds = null;

    var random;
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        music.stop();
        game.state.start('MainMenu');

    }

    function startPrint() {
        topleft[3] = game.add.sprite(100, 100, 'back');
        topleft[3].scale.setTo(0.5, 0.5);
        topcen[3] = game.add.sprite(230, 100, 'back');
        topcen[3].scale.setTo(0.5, 0.5);
        topright[3] = game.add.sprite(360, 100, 'back');
        topright[3].scale.setTo(0.5, 0.5);
        midleft[3] = game.add.sprite(100, 255, 'back');
        midleft[3].scale.setTo(0.5, 0.5);
        midcen[3] = game.add.sprite(230, 255, 'back');
        midcen[3].scale.setTo(0.5, 0.5);
        midright[3] = game.add.sprite(360, 255, 'back');
        midright[3].scale.setTo(0.5, 0.5);
        botleft[3] = game.add.sprite(100, 410, 'back');
        botleft[3].scale.setTo(0.5, 0.5);
        botcen[3] = game.add.sprite(230, 410, 'back');
        botcen[3].scale.setTo(0.5, 0.5);
        botright[3] = game.add.sprite(360, 410, 'back');
        botright[3].scale.setTo(0.5, 0.5);
    }

    function flipCard(card) {
        if(card[4] === 1) {
            card[3].loadTexture('back');
            card[4] = 0;
        }
        else {
            if(card[0] === 1) {
                card[3].loadTexture('ace');
            } else if(card[0] === 2) {
                card[3].loadTexture('two');
            } else if(card[0] === 3) {
                card[3].loadTexture('three');
            } else if(card[0] === 4) {
                card[3].loadTexture('four');
            } else if(card[0] === 5) {
                card[3].loadTexture('five');
            } else if(card[0] === 6) {
                card[3].loadTexture('six');
            } else if(card[0] === 7) {
                card[3].loadTexture('seven');
            } else if(card[0] === 8) {
                card[3].loadTexture('eight');
            } else if(card[0] === 9) {
                card[3].loadTexture('nine');
            }
            card[4] = 1;
        }
    }
    
    return {
    
        create: function () {

            game.add.image(0, 0, 'menuBack');
            music = game.add.audio('gameMusic');
            music.play();

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
            topleft[4] = 0;
            if(topleft[0] === random)
                topleft[2] = 1;
                spy = topleft;
            topcen[2] = 0;
            topcen[4] = 0;
            if(topcen[0] === random)
                topcen[2] = 1;
                spy = topcen;
            topright[2] = 0;
            topright[4] = 0;
            if(topright[0] === random)
                topright[2] = 1;
                spy = topright;
            midleft[2] = 0;
            midleft[4] = 0;
            if(midleft[0] === random)
                midleft[2] = 1;
                spy = midleft;
            midcen[2] = 1;
            midcen[4] = 0;
            if(midcen[0] === random)
                midcen[2] = 1;
                spy = midcen;
            midright[2] = 0;
            midright[4] = 0;
            if(midright[0] === random)
                midright[2] = 1;
                spy = midright;
            botleft[2] = 0;
            botleft[4] = 0;
            if(botleft[0] === random)
                botleft[2] = 1;
                spy = botleft;
            botcen[2] = 0;
            botcen[4] = 0;
            if(botcen[0] === random)
                botcen[2] = 1;
                spy = botcen;
            botright[2] = 0;
            botright[4] = 0;
            if(botright[0] === random)
                botright[2] = 1;
                spy = botright;

            startPrint();

            flipCard(midcen);

            style = { font: "20px Verdana", fill: "#FFFFFF", align: "center" };

            seconds = Math.floor(game.time.time / 1000) % 5;

            spytext = game.add.text(500, 100, "", style);
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            //
        },
    
        update: function () {
            seconds = Math.floor(game.time.time / 1000) % 60;
            if(seconds = 4){
                flipCard(midcen);
            }
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            //

            if(spy[4] = 1) {
                spytext.text = seconds;
            } else {
                spytext.text = "All clear for now...";
            }
        }
    };
};
