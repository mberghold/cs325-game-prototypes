"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var key1;
    var instruct;
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
    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        game.state.start('MainMenu');

    }

    function toggleInstruct() {
        if(toggle) {
            instruct = game.add.sprite(0, 0, 'instruct') 
        } else {
            instruct.destroy();
        }
    }

    function pickCards() {
        var count = 0;
        text = game.add.text(600, 50, "Pick your four face up cards", style);

        ace = game.add.sprite(20, 250, 'ace');
        ace.inputEnabled = true;
        ace.events.onInputDown(upAce, this);

        two = game.add.sprite(260, 250, 'two');
        two.inputEnabled = true;
        two.events.onInputDown(upTwo, this);

        three = game.add.sprite(500, 250, 'three');
        three.inputEnabled = true;
        three.events.onInputDown(upThree, this);

        four = game.add.sprite(740, 250, 'four');
        four.inputEnabled = true;
        four.events.onInputDown(upFour, this);

        five = game.add.sprite(980, 250, 'five');
        five.inputEnabled = true;
        five.events.onInputDown(upFive, this);

        six = game.add.sprite(20, 600, 'six');
        six.inputEnabled = true;
        six.events.onInputDown(upSix, this);

        seven = game.add.sprite(260, 600, 'seven');
        seven.inputEnabled = true;
        seven.events.onInputDown(upSeven, this);

        eight = game.add.sprite(500, 600, 'ace');
        eight.inputEnabled = true;
        eight.events.onInputDown(upEight, this);

        nine = game.add.sprite(740, 600, 'nine');
        nine.inputEnabled = true;
        nine.events.onInputDown(upNine, this);

        ten = game.add.sprite(980, 600, 'ten');
        ten.inputEnabled = true;
        ten.events.onInputDown(upTen, this);
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
    }

    function makeBoard() {

    }
    
    return {
    
        create: function () {
    
        key1 = game.input.keyboard.addKey(Phaser.Keyboard.I);
        key1.onDown.add(toggleInstruct);

        game.add.image(0, 0, 'preback');
        itext = game.add.text(600, 750, "Press I for instructions.", style);

        pickCards();

        },
    
        update: function () {
            if(count === 4) {
                beginGame();
            }
        }
    };
};
