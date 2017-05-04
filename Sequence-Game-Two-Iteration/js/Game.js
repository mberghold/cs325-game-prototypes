"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.

    var music = null;
    var lamp = null;
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
    var count;
    var prompt = null;
    var guess = null;
    var random;
    var endtext;
    var returnbut;
    

    function startPrint() {
        topleft[3] = game.add.sprite(40, 100, 'outone');
        topleft[3].scale.setTo(0.75, 0.75);
        topleft[3].inputEnabled = true;
        topleft[3].events.onInputDown.add(flipTL, this);

        topcen[3] = game.add.sprite(190, 100, 'outtwo');
        topcen[3].scale.setTo(0.75, 0.75);
        topcen[3].inputEnabled = true;
        topcen[3].events.onInputDown.add(flipTC, this);

        topright[3] = game.add.sprite(340, 100, 'outthree');
        topright[3].scale.setTo(0.75, 0.75);
        topright[3].inputEnabled = true;
        topright[3].events.onInputDown.add(flipTR, this);

        midleft[3] = game.add.sprite(40, 255, 'outfour');
        midleft[3].scale.setTo(0.75, 0.75);
        midleft[3].inputEnabled = true;
        midleft[3].events.onInputDown.add(flipML, this);

        midcen[3] = game.add.sprite(190, 255, 'outfive');
        midcen[3].scale.setTo(0.75, 0.75);
        midcen[3].inputEnabled = true;
        midcen[3].events.onInputDown.add(flipMC, this);

        midright[3] = game.add.sprite(340, 255, 'outsix');
        midright[3].scale.setTo(0.75, 0.75);
        midright[3].inputEnabled = true;
        midright[3].events.onInputDown.add(flipMR, this);

        botleft[3] = game.add.sprite(40, 410, 'outseven');
        botleft[3].scale.setTo(0.75, 0.75);
        botleft[3].inputEnabled = true;
        botleft[3].events.onInputDown.add(flipBL, this);

        botcen[3] = game.add.sprite(190, 410, 'outeight');
        botcen[3].scale.setTo(0.75, 0.75);
        botcen[3].inputEnabled = true;
        botcen[3].events.onInputDown.add(flipBC, this);

        botright[3] = game.add.sprite(340, 410, 'outnine');
        botright[3].scale.setTo(0.75, 0.75);
        botright[3].inputEnabled = true;
        botright[3].events.onInputDown.add(flipBR, this);
    }

    function flipTL() {
        lamp.play();
        flipCard(topleft);
        flipCard(topcen);
        flipCard(topright);
        flipCard(midleft);
        flipCard(botleft);
        count += 1;
    }

    function flipTC() {
        lamp.play();
        flipCard(topleft);
        flipCard(topcen);
        flipCard(topright);
        flipCard(midcen);
        flipCard(botcen);
        count += 1;
    }

    function flipTR() {
        lamp.play();
        flipCard(topleft);
        flipCard(topcen);
        flipCard(topright);
        flipCard(midright);
        flipCard(botright);
        count += 1;
    }

    function flipML() {
        lamp.play();
        flipCard(topleft);
        flipCard(midleft);
        flipCard(midcen);
        flipCard(midright);
        flipCard(botleft);
        count += 1;
    }

    function flipMC() {
        lamp.play();
        flipCard(topcen);
        flipCard(midleft);
        flipCard(midcen);
        flipCard(midright);
        flipCard(botcen);
        count += 1;
    }

    function flipMR() {
        lamp.play();
        flipCard(topright);
        flipCard(midleft);
        flipCard(midcen);
        flipCard(midright);
        flipCard(botright);
        count += 1;
    }

    function flipBL() {
        lamp.play();
        flipCard(topleft);
        flipCard(midleft);
        flipCard(botleft);
        flipCard(botcen);
        flipCard(botright);
        count += 1;
    }

    function flipBC() {
        lamp.play();
        flipCard(topcen);
        flipCard(midcen);
        flipCard(botleft);
        flipCard(botcen);
        flipCard(botright);
        count += 1;
    }

    function flipBR() {
        lamp.play();
        flipCard(topright);
        flipCard(midright);
        flipCard(botleft);
        flipCard(botcen);
        flipCard(botright);
        count += 1;
    }

    function flipCard(card) {
        if(card[4] === 1) {
            if(card[0] === 1) {
                card[3].loadTexture('outone');
            } else if(card[0] === 2) {
                card[3].loadTexture('outtwo');
            } else if(card[0] === 3) {
                card[3].loadTexture('outthree');
            } else if(card[0] === 4) {
                card[3].loadTexture('outfour');
            } else if(card[0] === 5) {
                card[3].loadTexture('outfive');
            } else if(card[0] === 6) {
                card[3].loadTexture('outsix');
            } else if(card[0] === 7) {
                card[3].loadTexture('outseven');
            } else if(card[0] === 8) {
                card[3].loadTexture('outeight');
            } else if(card[0] === 9) {
                card[3].loadTexture('outnine');
            }
            card[4] = 0;
            if(card[2] === 1) {
                spytext.text = "All clear for now...";
            }
        }
        else {
            if(card[0] === 1) {
                card[3].loadTexture('inone');
            } else if(card[0] === 2) {
                card[3].loadTexture('intwo');
            } else if(card[0] === 3) {
                card[3].loadTexture('inthree');
            } else if(card[0] === 4) {
                card[3].loadTexture('infour');
            } else if(card[0] === 5) {
                card[3].loadTexture('infive');
            } else if(card[0] === 6) {
                card[3].loadTexture('insix');
            } else if(card[0] === 7) {
                card[3].loadTexture('inseven');
            } else if(card[0] === 8) {
                card[3].loadTexture('ineight');
            } else if(card[0] === 9) {
                card[3].loadTexture('innine');
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
        console.log(prompt - random);
        if((prompt - random) === 0) {
            if(shared.count > count) {
                shared.count = count;
            }
        }
        endScreen();
    }

    function endScreen() {
        lamp = null;
        game.add.image(0, 0, 'endscreen');
        returnbut = game.add.sprite(330, 400, 'return');
        returnbut.inputEnabled = true;
        returnbut.events.onInputDown.add(goMenu, this);
        endtext = game.add.text(100, 100, "", style);
        if(prompt - random === 0) {
            endtext.text = "We've done it! The spy was at house " + random + "! \nYou did it in " + count + " moves.";
        }
        else {
            endtext.text = "Dear Neptune! You were wrong! \nWe've witnessed the spy running away from house " + random + "!";
        }
    }

    function goMenu() {
        music.stop();
        game.state.start('MainMenu');
    }
    
    return {
    
        create: function () {

            game.add.image(0, 0, 'gameBack');
            music = game.add.audio('gameMusic');
            lamp = game.add.audio('lamp');
            music.play();

            count = 0;

            style = { font: "20px Verdana", fill: "#FFFFFF", align: "center" };
            spytext = game.add.text(500, 100, "All clear for now...", style);
            ordtext = game.add.text(500, 150, "Orders given: " + count, style);
            guess = game.add.sprite(500, 200, 'button');
            guess.inputEnabled = true;
            guess.events.onInputDown.addOnce(guessSpy, this);

            topleft[0] = 1;
            topcen[0] = 2;
            topright[0] = 3;
            midleft[0] = 4;
            midcen[0] = 5;
            midright[0] = 6;
            botleft[0] = 7;
            botcen[0] = 8;
            botright[0] = 9;

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
