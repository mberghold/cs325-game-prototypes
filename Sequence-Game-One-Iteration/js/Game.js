"use strict";

GameStates.makeGame = function( game, shared ) {
    // Create your own variables.
    var key1 = null;
    var instruct = null;
    var toggle = true;
    var itext = null;
    var back = null;
    var faceups = [];
    var style = { font: "20px Verdana", fill: "#FFFFFF", align: "center" };
    var text = null;
    var ace = null;
    var two = null;
    var three = null;
    var four = null;
    var five = null;
    var six = null;
    var seven = null;
    var eight = null;
    var nine = null;
    var ten = null;
    var count = null;
    var card1 = null;
    var card2 = null;
    var card3 = null;
    var card4 = null;
    var leftover = [];
    var randcards = [];
    var facedown = null;
    var computer = [];
    var complay = null;
    var compturns = 0;
    var compscore = 0;
    var playerscore = 0;
    var randomplays = 0;
    var scoretext = null;
    var complayid = null;
    var complaycard = null;
    var complaycardmade = false;
    var randomtext = null;
    var click = null;
    var winSound = null;
    var loseSound = null;
    var beginTurnSound = null;
    var drawSound = null;
    var loseRound = null;
    var winRound = null;
    var tieRound = null;
    var randCardPlay = null;
    var randTween = null;

    
    function quitGame() {

        //  Here you should destroy anything you no longer need.
        //  Stop music, delete sprites, purge caches, free resources, all that good stuff.

        //  Then let's go back to the main menu.
        compturns = 0;
        count = null;
        compscore = 0;
        playerscore = 0;
        leftover = [];
        randcards = [];
        computer = [];
        randomplays = 0;
        complaycard = null;
        complaycardmade = false;
        complayid = null;
        complay = null;
        randCardPlay = null;
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
        return;
    }

    function pickCards() {
        count = 0;
        text = game.add.text(460, 50, "Pick your four face up cards", style);

        ace = game.add.sprite(20, 100, 'ace');
        ace.inputEnabled = true;
        ace.events.onInputDown.addOnce(upAce, this);
            
        two = game.add.sprite(260, 100, 'two');
        two.inputEnabled = true;
        two.events.onInputDown.addOnce(upTwo, this);

        three = game.add.sprite(500, 100, 'three');
        three.inputEnabled = true;
        three.events.onInputDown.addOnce(upThree, this);

        four = game.add.sprite(740, 100, 'four');
        four.inputEnabled = true;
        four.events.onInputDown.addOnce(upFour, this);

        five = game.add.sprite(980, 100, 'five');
        five.inputEnabled = true;
        five.events.onInputDown.addOnce(upFive, this);

        six = game.add.sprite(20, 400, 'six');
        six.inputEnabled = true;
        six.events.onInputDown.addOnce(upSix, this);

        seven = game.add.sprite(260, 400, 'seven');
        seven.inputEnabled = true;
        seven.events.onInputDown.addOnce(upSeven, this);

        eight = game.add.sprite(500, 400, 'eight');
        eight.inputEnabled = true;
        eight.events.onInputDown.addOnce(upEight, this);

        nine = game.add.sprite(740, 400, 'nine');
        nine.inputEnabled = true;
        nine.events.onInputDown.addOnce(upNine, this);

        ten = game.add.sprite(980, 400, 'ten');
        ten.inputEnabled = true;
        ten.events.onInputDown.addOnce(upTen, this);

        return;
    }

    function upAce() {
        faceups[count] = 1;
        click.play();
        ace.loadTexture('back', 0);
        count++;
        return;
    }

    function upTwo() {
        faceups[count] = 2;
        click.play();
        two.loadTexture('back', 0);
        count++;
        return;
    }

    function upThree() {
        faceups[count] = 3;
        click.play();
        three.loadTexture('back', 0);
        count++;
        return;
    }

    function upFour() {
        faceups[count] = 4;
        click.play();
        four.loadTexture('back', 0);
        count++;
        return;
    }

    function upFive() {
        faceups[count] = 5;
        click.play();
        five.loadTexture('back', 0);
        count++;
        return;
    }

    function upSix() {
        faceups[count] = 6;
        click.play();
        six.loadTexture('back', 0);
        count++;
        return;
    }

    function upSeven() {
        faceups[count] = 7;
        click.play();
        seven.loadTexture('back', 0);
        count++;
        return;
    }

    function upEight() {
        faceups[count] = 8;
        click.play();
        eight.loadTexture('back', 0);
        count++;
        return;
    }

    function upNine() {
        faceups[count] = 9;
        click.play();
        nine.loadTexture('back', 0);
        count++;
        return;
    }

    function upTen() {
        faceups[count] = 10;
        click.play();
        ten.loadTexture('back', 0);
        count++;
        return;
    }

    function makeRandDeck() {
        var p = 0;
        for(var t = 0; t < 10; t++) {
            if(faceups[0] != computer[t] && faceups[1] != computer[t] && faceups[2] != computer[t] && faceups[3] != computer[t]) {
                leftover[p] = t + 1;
                p++;
            }
        }
        return;
    }

    function compDraw() {
        complayid = Phaser.ArrayUtils.removeRandomItem(computer, 0, 9 - compturns);
        if(complaycardmade) {
            if(complayid === 1) {
                complaycard.loadTexture('ace', 0);
            } else if(complayid === 2) {
                complaycard.loadTexture('two', 0);
            } else if(complayid === 3) {
                complaycard.loadTexture('three', 0);
            } else if(complayid === 4) {
                complaycard.loadTexture('four', 0);
            } else if(complayid === 5) {
                complaycard.loadTexture('five', 0);
            } else if(complayid === 6) {
                complaycard.loadTexture('six', 0);
            } else if(complayid === 7) {
                complaycard.loadTexture('seven', 0);
            } else if(complayid === 8) {
                complaycard.loadTexture('eight', 0);
            } else if(complayid === 9) {
                complaycard.loadTexture('nine', 0);
            } else {
                complaycard.loadTexture('ten', 0);
            }
        } else {
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
            complaycardmade = true;
        }
        return;
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
            card1 = game.add.sprite(20, 450, 'nine');
        } else {
            card1 = game.add.sprite(20, 450, 'ten');
        }
        card1.inputEnabled = true;
        card1.events.onInputDown.addOnce(playCard1);

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
            card2 = game.add.sprite(260, 450, 'nine');
        } else {
            card2 = game.add.sprite(260, 450, 'ten');
        }
        card2.inputEnabled = true;
        card2.events.onInputDown.addOnce(playCard2);

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
            card3 = game.add.sprite(500, 450, 'nine');
        } else {
            card3 = game.add.sprite(500, 450, 'ten');
        }
        card3.inputEnabled = true;
        card3.events.onInputDown.addOnce(playCard3);

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
        card4.events.onInputDown.addOnce(playCard4);

        facedown = game.add.sprite(980, 450, 'back');
        facedown.inputEnabled = true;
        facedown.events.onInputDown.add(playRandom);

        return;
    }

    function showRandom(int) {
        if(int === 1) {
            randCardPlay = game.add.sprite(980, 450, 'ace');
        } else if(int === 2) {
            randCardPlay = game.add.sprite(980, 450, 'two');
        } else if(int === 3) {
            randCardPlay = game.add.sprite(980, 450, 'three');
        } else if(int === 4) {
            randCardPlay = game.add.sprite(980, 450, 'four');
        } else if(int === 5) {
            randCardPlay = game.add.sprite(980, 450, 'five');
        } else if(int === 6) {
            randCardPlay = game.add.sprite(980, 450, 'six');
        } else if(int === 7) {
            randCardPlay = game.add.sprite(980, 450, 'seven');
        } else if(int === 8) {
            randCardPlay = game.add.sprite(980, 450, 'eight');
        } else if(int === 9) {
            randCardPlay = game.add.sprite(980, 450, 'nine');
        } else {
            randCardPlay = game.add.sprite(980, 450, 'ten');
        }
        randTween = game.add.tween(randCardPlay).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
        randTween.onComplete.add(function(){randCardPlay.kill();}, this);
        

    }

    function playRandom() {
        click.play();
        randomplays++;
        var int = Phaser.ArrayUtils.removeRandomItem(leftover, 0, 6 - randomplays);
        showRandom(int);
        randcards[randomplays] = int;
        if(int === complayid) {
            tieRound.play();
            playerscore += 1;
            compscore += 1;
        } else if(int - complayid > 0) {
            winRound.play();
            playerscore += 3;
        } else {
            loseRound.play();
            compscore += 3;
        }
        if(randomplays === 6) {
            facedown.inputEnabled = false;
            game.add.tween(facedown).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
        }
        compturns++;
        if(compturns < 10) {
            compDraw();
        }
        return;
    }

    function playCard1() {
        click.play();
        playCard(faceups[0], 1);
        return;
    }

    function playCard2() {
        click.play();
        playCard(faceups[1], 2);
        return;
    }

    function playCard3() {
        click.play();
        playCard(faceups[2], 3);
        return;
    }

    function playCard4() {
        click.play();
        playCard(faceups[3], 4);
        return;
    }

    function playCard(int, numCard) {
        if(int === complayid) {
            tieRound.play();
            playerscore += 1;
            compscore += 1;
        } else if(int - complayid > 0) {
            winRound.play();
            playerscore += 3;
        } else {
            loseRound.play();
            compscore += 3;
        }
        if(numCard === 1) {
            card1.inputEnabled = false;
            game.add.tween(card1).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
        } else if(numCard === 2) {
            card2.inputEnabled = false;
            game.add.tween(card2).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
        } else if(numCard === 3) {
            card3.inputEnabled = false;
            game.add.tween(card3).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
        } else if(numCard === 4) {
            card4.inputEnabled = false;
            game.add.tween(card4).to({alpha: 0}, 1500, Phaser.Easing.Linear.None, true);
        }
        compturns++;
        if(compturns < 10) {
            compDraw();
        }
        return;
    }

    function beginGame() {
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
        beginTurnSound.play();
        compDraw();
    }
    
    return {
    
        create: function () {
    
        click = game.add.audio('clickNote');
        winSound = game.add.audio('winSound');
        loseSound = game.add.audio('loseSound');
        drawSound = game.add.audio('drawSound');
        beginTurnSound = game.add.audio('beginTurnSound');
        winRound = game.add.audio('winRound');
        loseRound = game.add.audio('loseRound');
        tieRound = game.add.audio('tieRound');

        key1 = game.input.keyboard.addKey(Phaser.Keyboard.I);
        key1.onDown.add(toggleInstruct);

        game.add.image(0, 0, 'preback');
        itext = game.add.text(460, 750, "Press I for instructions.", style);
        scoretext = game.add.text(400, 50, "Player: " + playerscore + "   Computer: " + compscore, style);
        randomtext = game.add.text(700, 50, "Random Cards Played: ", style);

        for(var i = 0; i < 10; i++) {
            computer[i] = i + 1;
        }

        pickCards();

        text.text = "";

        },
    
        update: function () {
            scoretext.text = "Player: " + playerscore + "   Computer: " + compscore;

            if(randomplays === 0) {
                randomtext.text = "Random Cards Played: " ;
            } else if(randomplays === 1) {
                randomtext.text = "Random Cards Played: " + randcards[1];
            } else if(randomplays === 2) {
                randomtext.text = "Random Cards Played: " + randcards[1] + ", " + randcards[2];
            } else if(randomplays === 3) {
                randomtext.text = "Random Cards Played: " + randcards[1] + ", " + randcards[2] + ", " + randcards[3];
            } else if(randomplays === 4) {
                randomtext.text = "Random Cards Played: " + randcards[1] + ", " + randcards[2] + ", " + randcards[3] + ", " + randcards[4];
            } else if(randomplays === 5) {
                randomtext.text = "Random Cards Played: " + randcards[1] + ", " + randcards[2] + ", " + randcards[3] + ", " + randcards[4] + ", " + randcards[5];
            } else if(randomplays === 6) {
                randomtext.text = "Random Cards Played: " + randcards[1] + ", " + randcards[2] + ", " + randcards[3] + ", " + randcards[4] + ", " + randcards[5] + ", " + randcards[6];
            }

            if(compturns >= 10) {
                if(playerscore > compscore) {
                    winSound.play();
                } else if(compscore > playerscore) {
                    loseSound.play();
                } else {
                    drawSound.play();
                }
                endGame();
            }

            if(count >= 4) {
                beginGame();
                count = 0;
            }

        }
    };
};

