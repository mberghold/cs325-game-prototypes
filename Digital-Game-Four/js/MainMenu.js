"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
	var playButton = null;
    
    function startGame(pointer) {

        //	Ok, the Play Button has been clicked or touched, so let's stop the music (otherwise it'll carry on playing)
        music.stop();

        //	And start the actual game
        game.state.start('Game');

    }
    
    return {
    
        create: function () {
    
            //	We've already preloaded our assets, so let's kick right into the Main Menu itself.
            //	Here all we're doing is playing some music and adding a picture and button
            //	Naturally I expect you to do something significantly better :)
    
            music = game.add.audio('menuMusic');
            music.play();
    
            game.add.sprite(0, 0, 'menuBack');
    
            playButton = game.add.button( 450, 450, 'playButton', startGame);

            var style = { font: "25px Verdana", fill: "#0099CC", align: "center" };
            var text = game.add.text( 450, 400, "High score: " + shared[0], style);
    
        },
    
        update: function () {
    
            //	Do some nice funky main menu effect here
    
        }
        
    };
};
