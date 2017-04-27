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
    var style = null;
    var spytext = null;
    var ordtext = null;
    var count = 0;
    var prompt = null;
    var guess = null;
    var random;
    

    function startPrint() {
        topleft[3] = game.add.sprite(100, 100, 'back');
        topleft[3].scale.setTo(0.5, 0.5);
        topleft[3].inputEnabled = true;
        topleft[3].events.onInputDown.add(flipTL, this);

        topcen[3] = game.add.sprite(230, 100, 'back');
        topcen[3].scale.setTo(0.5, 0.5);
        topcen[3].inputEnabled = true;
        topcen[3].events.onInputDown.add(flipTC, this);

        topright[3] = game.add.sprite(360, 100, 'back');
        topright[3].scale.setTo(0.5, 0.5);
        topright[3].inputEnabled = true;
        topright[3].events.onInputDown.add(flipTR, this);

        midleft[3] = game.add.sprite(100, 255, 'back');
        midleft[3].scale.setTo(0.5, 0.5);
        midleft[3].inputEnabled = true;
        midleft[3].events.onInputDown.add(flipML, this);

        midcen[3] = game.add.sprite(230, 255, 'back');
        midcen[3].scale.setTo(0.5, 0.5);
        midcen[3].inputEnabled = true;
        midcen[3].events.onInputDown.add(flipMC, this);

        midright[3] = game.add.sprite(360, 255, 'back');
        midright[3].scale.setTo(0.5, 0.5);
        midright[3].inputEnabled = true;
        midright[3].events.onInputDown.add(flipMR, this);

        botleft[3] = game.add.sprite(100, 410, 'back');
        botleft[3].scale.setTo(0.5, 0.5);
        botleft[3].inputEnabled = true;
        botleft[3].events.onInputDown.add(flipBL, this);

        botcen[3] = game.add.sprite(230, 410, 'back');
        botcen[3].scale.setTo(0.5, 0.5);
        botcen[3].inputEnabled = true;
        botcen[3].events.onInputDown.add(flipBC, this);

        botright[3] = game.add.sprite(360, 410, 'back');
        botright[3].scale.setTo(0.5, 0.5);
        botright[3].inputEnabled = true;
        botright[3].events.onInputDown.add(flipBR, this);
    }

    function flipTL() {
        flipCard(topleft);
        flipCard(topcen);
        flipCard(topright);
        flipCard(midleft);
        flipCard(botleft);
        count += 1;
    }

    function flipTC() {
        flipCard(topleft);
        flipCard(topcen);
        flipCard(topright);
        flipCard(midcen);
        flipCard(botcen);
        count += 1;
    }

    function flipTR() {
        flipCard(topleft);
        flipCard(topcen);
        flipCard(topright);
        flipCard(midright);
        flipCard(botright);
        count += 1;
    }

    function flipML() {
        flipCard(topleft);
        flipCard(midleft);
        flipCard(midcen);
        flipCard(midright);
        flipCard(botleft);
        count += 1;
    }

    function flipMC() {
        flipCard(topcen);
        flipCard(midleft);
        flipCard(midcen);
        flipCard(midright);
        flipCard(botcen);
        count += 1;
    }

    function flipMR() {
        flipCard(topright);
        flipCard(midleft);
        flipCard(midcen);
        flipCard(midright);
        flipCard(botright);
        count += 1;
    }

    function flipBL() {
        flipCard(topleft);
        flipCard(midleft);
        flipCard(botleft);
        flipCard(botcen);
        flipCard(botright);
        count += 1;
    }

    function flipBC() {
        flipCard(topcen);
        flipCard(midcen);
        flipCard(botleft);
        flipCard(botcen);
        flipCard(botright);
        count += 1;
    }

    function flipBR() {
        flipCard(topright);
        flipCard(midright);
        flipCard(botleft);
        flipCard(botcen);
        flipCard(botright);
        count += 1;
    }

    function flipCard(card) {
        if(card[4] === 1) {
            card[3].loadTexture('back');
            card[4] = 0;
            if(card[2] === 1) {
                spytext.text = "All clear for now...";
            }
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
            if(card[2] === 1) {
                if(game.rnd.integerInRange(1, 2) === 1) {
                    spytext.text = "We're being hacked!";
                }
            }
        }
    }

    function guessSpy() {
        prompt = window.prompt("Who is the spy?? (1 - 9)");

        if(prompt === random) {
            shared[0] = count;
        }

        music.stop();
        game.state.start('MainMenu');
    }
    
    return {
    
        create: function () {

            game.add.image(0, 0, 'gameBack');
            music = game.add.audio('gameMusic');
            music.play();

            count = 0;

            style = { font: "20px Verdana", fill: "#FFFFFF", align: "center" };
            spytext = game.add.text(500, 100, "All clear for now...", style);
            ordtext = game.add.text(500, 150, "Orders given: " + count, style);
            guess = game.add.sprite(500, 200, 'button');
            guess.inputEnabled = true;
            guess.events.onInputDown.addOnce(guessSpy, this);

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
            topcen[2] = 0;
            topcen[4] = 0;
            if(topcen[0] === random)
                topcen[2] = 1;
            topright[2] = 0;
            topright[4] = 0;
            if(topright[0] === random)
                topright[2] = 1;
            midleft[2] = 0;
            midleft[4] = 0;
            if(midleft[0] === random)
                midleft[2] = 1;
            midcen[2] = 0;
            midcen[4] = 0;
            if(midcen[0] === random)
                midcen[2] = 1;
            midright[2] = 0;
            midright[4] = 0;
            if(midright[0] === random)
                midright[2] = 1;
            botleft[2] = 0;
            botleft[4] = 0;
            if(botleft[0] === random)
                botleft[2] = 1;
            botcen[2] = 0;
            botcen[4] = 0;
            if(botcen[0] === random)
                botcen[2] = 1;
            botright[2] = 0;
            botright[4] = 0;
            if(botright[0] === random)
                botright[2] = 1;

            startPrint();

            // prompt = window.prompt("Who is the spy?? (Input 1 - 9)");
    
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            //
        },
    
        update: function () {
            ordtext.text = "Orders given: " + count;
            //  Honestly, just about anything could go here. It's YOUR game after all. Eat your heart out!
            //
        }
    };
};
