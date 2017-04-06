"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var key1;
    var instruct;
    var toggle = true;
    var itext;
    var back;
    var faceups = {};
    var style = { font: "20px Verdana", fill: "#FFFFFF", align: "center" };
    var text;
    var ace;
    var two;
    var three;
    var four;
    var five;
    var six;
    var seven;
    var eight;
    var nine;
    var ten;
    var count;
    var card1;
    var card2;
    var card3;
    var card4;
    var leftover = {};
    var facedown;
    var computer = {};
    var complay;
    var compturns = 0;
    var compscore = 0;
    var playerscore = 0;
    var turns = 0;
    var randomplays = 0;
    var scoretext;
    var complayid;
    var complaycard;
    var complayplaying;


    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.

        game.state.start('MainMenu');

    }

    function endGame() {
        var endscreen = game.add.sprite(0, 0, 'preback');
        endscreen.inputEnabled = true;
        endscreen.events.onInputDown.add(quitGame);

        var endtext = game.add.text(500, 200, "Player: " + playerscore + "   Computer: " + compscore + "\n Click to return to menu.", style);
    }

    function toggleInstruct() {
        if(toggle) {
            instruct = game.add.sprite(0, 0, 'instruct');
            toggle = false; 
        } else {
            instruct.destroy();
            toggle = true;
        }
    }

    function pickCards() {
        count = 0;
        text = game.add.text(460, 50, "Pick your four face up cards", style);

        ace = game.add.sprite(20, 100, 'ace');
        ace.inputEnabled = true;
        ace.events.onInputDown.add(upAce, this);

        two = game.add.sprite(260, 100, 'two');
        two.inputEnabled = true;
        two.events.onInputDown.add(upTwo, this);

        three = game.add.sprite(500, 100, 'three');
        three.inputEnabled = true;
        three.events.onInputDown.add(upThree, this);

        four = game.add.sprite(740, 100, 'four');
        four.inputEnabled = true;
        four.events.onInputDown.add(upFour, this);

        five = game.add.sprite(980, 100, 'five');
        five.inputEnabled = true;
        five.events.onInputDown.add(upFive, this);

        six = game.add.sprite(20, 400, 'six');
        six.inputEnabled = true;
        six.events.onInputDown.add(upSix, this);

        seven = game.add.sprite(260, 400, 'seven');
        seven.inputEnabled = true;
        seven.events.onInputDown.add(upSeven, this);

        eight = game.add.sprite(500, 400, 'eight');
        eight.inputEnabled = true;
        eight.events.onInputDown.add(upEight, this);

        nine = game.add.sprite(740, 400, 'nine');
        nine.inputEnabled = true;
        nine.events.onInputDown.add(upNine, this);

        ten = game.add.sprite(980, 400, 'ten');
        ten.inputEnabled = true;
        ten.events.onInputDown.add(upTen, this);
    }

    function upAce() {
        faceups[count] = 1;
        ace.destroy();
        count++;
    }

    function upTwo() {
        faceups[count] = 2;
        two.destroy();
        count++;
    }

    function upThree() {
        faceups[count] = 3;
        three.destroy();
        count++;
    }

    function upFour() {
        faceups[count] = 4;
        four.destroy();
        count++;
    }

    function upFive() {
        faceups[count] = 5;
        five.destroy();
        count++;
    }

    function upSix() {
        faceups[count] = 6;
        six.destroy();
        count++;
    }

    function upSeven() {
        faceups[count] = 7;
        seven.destroy();
        count++;
    }

    function upEight() {
        faceups[count] = 8;
        eight.destroy();
        count++;
    }

    function upNine() {
        faceups[count] = 9;
        nine.destroy();
        count++;
    }

    function upTen() {
        faceups[count] = 10;
        ten.destroy();
        count++;
    }

    function beginGame() {
        count = 5;
        text.destroy();
        ace.destroy();
        two.destroy();
        three.destroy();
        four.destroy();
        five.destroy();
        six.destroy();
        seven.destroy();
        eight.destroy();
        nine.destroy();
        ten.destroy();

        makeRandDeck();

        makeBoard();

        compDraw();
        endGame();
    }

    function makeRandDeck() {
        for(var t = 0; t < 10; t++) {
            if(leftover[t] === faceups[0] || leftover[t] === faceups[1] || leftover[t] === faceups[2] || leftover[t] === faceups[3]) {
                leftover[t] = null;
            }
        }
    }

    function compDraw() {
        complayid = Phaser.ArrayUtils.removeRandomItem(computer);
        if(complayid === 1) {
            complaycard = game.add.sprite(260, 150, 'ace');
        } else if(complayid === 2) {
            complaycard = game.add.sprite(260, 150, 'two');
        } else if(complayid === 3) {
            complaycard = game.add.sprite(260, 150, 'three');
        } else if(complayid === 4) {
            complaycard = game.add.sprite(260, 150, 'four');
        } else if(complayid === 5) {
            complaycard = game.add.sprite(260, 150, 'five');
        } else if(complayid === 6) {
            complaycard = game.add.sprite(260, 150, 'six');
        } else if(complayid === 7) {
            complaycard = game.add.sprite(260, 150, 'seven');
        } else if(complayid === 8) {
            complaycard = game.add.sprite(260, 150, 'eight');
        } else if(complayid === 9) {
            complaycard = game.add.sprite(260, 150, 'nine');
        } else {
            complaycard = game.add.sprite(260, 150, 'ten');
        }
        complaycard.inputEnabled = true;
        compturns++;
        complayplaying = true;
        while(complayplaying) {

        }
        if(compturns < 10) {
            compDraw();
        }

    }

    function makeBoard() {
        if(faceups[0] === 1) {
            card1 = game.add.sprite(20, 450, 'ace');
        } else if(faceups[0] === 2) {
            card1 = game.add.sprite(20, 450, 'two');
        } else if(faceups[0] === 3) {
            card1 = game.add.sprite(20, 450, 'three');
        } else if(faceups[0] === 4) {
            card1 = game.add.sprite(20, 450, 'four');
        } else if(faceups[0] === 5) {
            card1 = game.add.sprite(20, 450, 'five');
        } else if(faceups[0] === 6) {
            card1 = game.add.sprite(20, 450, 'six');
        } else if(faceups[0] === 7) {
            card1 = game.add.sprite(20, 450, 'seven');
        } else if(faceups[0] === 8) {
            card1 = game.add.sprite(20, 450, 'eight');
        } else if(faceups[0] === 9) {
            card1 = game.add.sprite(20, 450, 'nine');x
        } else {
            card1 = game.add.sprite(20, 450, 'ten');
        }
        card1.inputEnabled = true;
        card1.events.onInputDown.add(playCard, this, 0, faceups[0]);

        if(faceups[1] === 1) {
            card2 = game.add.sprite(260, 450, 'ace');
        } else if(faceups[1] === 2) {
            card2 = game.add.sprite(260, 450, 'two');
        } else if(faceups[1] === 3) {
            card2 = game.add.sprite(260, 450, 'three');
        } else if(faceups[1] === 4) {
            card2 = game.add.sprite(260, 450, 'four');
        } else if(faceups[1] === 5) {
            card2 = game.add.sprite(260, 450, 'five');
        } else if(faceups[1] === 6) {
            card2 = game.add.sprite(260, 450, 'six');
        } else if(faceups[1] === 7) {
            card2 = game.add.sprite(260, 450, 'seven');
        } else if(faceups[1] === 8) {
            card2 = game.add.sprite(260, 450, 'eight');
        } else if(faceups[1] === 9) {
            card2 = game.add.sprite(260, 450, 'nine');x
        } else {
            card2 = game.add.sprite(260, 450, 'ten');
        }
        card2.inputEnabled = true;
        card2.events.onInputDown.add(playCard, this, 0, faceups[1]);

        if(faceups[2] === 1) {
            card3 = game.add.sprite(500, 450, 'ace');
        } else if(faceups[2] === 2) {
            card3 = game.add.sprite(500, 450, 'two');
        } else if(faceups[2] === 3) {
            card3 = game.add.sprite(500, 450, 'three');
        } else if(faceups[2] === 4) {
            card3 = game.add.sprite(500, 450, 'four');
        } else if(faceups[2] === 5) {
            card3 = game.add.sprite(500, 450, 'five');
        } else if(faceups[2] === 6) {
            card3 = game.add.sprite(500, 450, 'six');
        } else if(faceups[2] === 7) {
            card3 = game.add.sprite(500, 450, 'seven');
        } else if(faceups[2] === 8) {
            card3 = game.add.sprite(500, 450, 'eight');
        } else if(faceups[2] === 9) {
            card3 = game.add.sprite(500, 450, 'nine');x
        } else {
            card3 = game.add.sprite(500, 450, 'ten');
        }
        card3.inputEnabled = true;
        card3.events.onInputDown.add(playCard, this, 0, faceups[2]);

        if(faceups[3] === 1) {
            card4 = game.add.sprite(740, 450, 'ace');
        } else if(faceups[3] === 2) {
            card4 = game.add.sprite(740, 450, 'two');
        } else if(faceups[3] === 3) {
            card4 = game.add.sprite(740, 450, 'three');
        } else if(faceups[3] === 4) {
            card4 = game.add.sprite(740, 450, 'four');
        } else if(faceups[3] === 5) {
            card4 = game.add.sprite(740, 450, 'five');
        } else if(faceups[3] === 6) {
            card4 = game.add.sprite(740, 450, 'six');
        } else if(faceups[3] === 7) {
            card4 = game.add.sprite(740, 450, 'seven');
        } else if(faceups[3] === 8) {
            card4 = game.add.sprite(740, 450, 'eight');
        } else if(faceups[3] === 9) {
            card4 = game.add.sprite(740, 450, 'nine');
        } else {
            card4 = game.add.sprite(740, 450, 'ten');
        }
        card4.inputEnabled = true;
        card4.events.onInputDown.add(playCard, this, 0, faceups[3]);

        facedown = game.add.sprite(980, 450, 'back');
        facedown.inputEnabled = true;
        facedown.events.onInputDown.add(playRandom, this);
    }

    function playRandom() {
        var int = Phaser.ArrayUtils.removeRandomItem(leftover);
        if(int === complay.id) {
        } else if(int - complay.id > 0) {
            playerscore += 3;
        } else {
            compscore += 3;
        }
        complay.playing = false;
        if(randomplays === 6) {
            this.destroy();
        }
    }

    function playCard(int) {
        if(int === complay.id) {
        } else if(int - complay.id > 0) {
            playerscore += 3;
        } else {
            compscore += 3;
        }
        complay.playing = false;
        this.destroy();
        return;
    }
    
    return {
    
        create: function () {
    
        key1 = game.input.keyboard.addKey(Phaser.Keyboard.I);
        key1.onDown.add(toggleInstruct);

        game.add.image(0, 0, 'preback');
        itext = game.add.text(460, 750, "Press I for instructions.", style);
        scoretext = game.add.text(900, 100, "Player: " + playerscore + "   Computer: " + compscore, style);

        for(var i = 0; i < 10; i++) {
            computer[i] = i + 1;
        }

        for(var g = 0; g < 10; g++) {
            leftover[g] = g + 1;
        }

        pickCards();

        },
    
        update: function () {
            scoretext.text = "Player: " + playerscore + "   Computer: " + compscore;
            if(count === 4) {
                beginGame();
            }


        }
    };
};
