"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var playButton = null;
    var instruct = null;
    var key1 = null;
    var toggle = true;
    
    function startGame(pointer) {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)

        //	And start the actual game
        game.state.start('Game');

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
    
    return {
    
        create: function () {
    
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
            key1 = game.input.keyboard.addKey(Phaser.Keyboard.I);
            key1.onDown.add(toggleInstruct);
    
            game.add.sprite(0, 0, 'menuback');

            console.log("Update 0.3");
    
            playButton = game.add.button( 503, 550, 'play', startGame);
    
        },
    
        update: function () {
    
            //	Do some nice funky main menu effect here
    
        }
        
    };
};
