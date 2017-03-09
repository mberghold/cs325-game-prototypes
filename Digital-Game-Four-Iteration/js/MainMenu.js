"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
	var playButton1 = null;
    var key1;

    function startOne(pointer) {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        if(shared[4]) {
            shared[4] = false;
            music.stop();
        }       

        //	And start the actual game
        game.state.start('LevelOne');

    }

    function startTwo(pointer) {
        if(shared[4]) {
           music.stop(); 
        }
        game.state.start('LevelTwo');
    }

    function startTwo(pointer) {
        if(shared[4]) {
           music.stop(); 
        }
        game.state.start('LevelTwo');
    }

    function startTwo(pointer) {
        if(shared[4]) {
           music.stop(); 
        }
        game.state.start('LevelThree');
    }

    function startTwo(pointer) {
        if(shared[4]) {
           music.stop(); 
        }
        game.state.start('BonusLevel');
    }
    
    function toggleMusic() {
        if(shared[4]) {
            music.stop();
        }
        else {
            music.play();
        }
            
    }

    return {
    

        create: function () {
    
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
    
            music = game.add.audio('menuMusic');
            music.play();
            
            key1 = game.input.keyboard.addKey(Phaser.Keyboard.M);
            key1.onDown.add(toggleMusic);

            game.add.sprite(0, 0, 'menuBack');
    
            playButton1 = game.add.button( 400, 400, 'playButton', startOne);
            if(shared[1]) {
                playButton1 = game.add.button( 400, 450, 'playButton', startTwo);
            }
            if(shared[2]) {
                playButton1 = game.add.button( 500, 400, 'playButton', startThree);
            }
            if(shared[3]) {
                playButton1 = game.add.button( 500, 450, 'playButton', startBonus);
            }


            var style = { font: "20px Verdana", fill: "#FFFFFF", align: "center" };
            var text = game.add.text( 450, 350, "Wins: " + shared[0], style);
    
        },
    
        update: function () {
    
            //	Do some nice funky main menu effect here
    
        }
        
    };
};
