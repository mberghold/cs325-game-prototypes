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


    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

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

        makeBoard();

        compDraw();
        quitGame();
    }

    function compDraw() {
        complay.id = removeRandomItem(computer);
        placeCard(260, 150, complay.card, complay.id);
        compturns++;
        complay.playing = true;
        while(complay.playing) {

        }
        if(compturns < 10) {
            compDraw();
        }

    }

    function makeBoard() {
        placeCard(20, 450, card1, faceups[0]);
        card1.inputEnabled = true;
        card1.events.onInputDown.add(playCard, this, 0, faceups[0]);

        placeCard(260, 450, card2, faceups[1]);
        card2.inputEnabled = true;
        card2.events.onInputDown.add(playCard, this, 0, faceups[1]);

        placeCard(500, 450, card3, faceups[2]);
        card3.inputEnabled = true;
        card3.events.onInputDown.add(playCard, this, 0, faceups[2]);

        placeCard(740, 450, card4, faceups[3]);
        card4.inputEnabled = true;
        card4.events.onInputDown.add(playCard, this, 0, faceups[3]);

        facedown = game.add.sprite(980, 450, 'back');
        facedown.inputEnabled = true;
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

    function placeCard(x, y, card, id) {
        if(id === 1) {
            card = game.add.sprite(x, y, 'ace');
        } else if(id === 2) {
            card = game.add.sprite(x, y, 'two');
        } else if(id === 3) {
            card = game.add.sprite(x, y, 'three');
        } else if(id === 4) {
            card = game.add.sprite(x, y, 'four');
        } else if(id === 5) {
            card = game.add.sprite(x, y, 'five');
        } else if(id === 6) {
            card = game.add.sprite(x, y, 'six');
        } else if(id === 7) {
            card = game.add.sprite(x, y, 'seven');
        } else if(id === 8) {
            card = game.add.sprite(x, y, 'eight');
        } else if(id === 9) {
            card = game.add.sprite(x, y, 'nine');x
        } else {
            card = game.add.sprite(x, y, 'ten');
        }
    }
    
    return {
    
        create: function () {
    
        key1 = game.input.keyboard.addKey(Phaser.Keyboard.I);
        key1.onDown.add(toggleInstruct);

        game.add.image(0, 0, 'preback');
        itext = game.add.text(460, 750, "Press I for instructions.", style);

        for(i = 0; i < 10; i++) {
            computer[i] = i + 1;
        }

        for(i = 0; i < 10; i++) {
            leftover[i] = i + 1;
        }

        pickCards();

        },
    
        update: function () {
            if(count === 4) {
                beginGame();
            }
        }
    };
};
