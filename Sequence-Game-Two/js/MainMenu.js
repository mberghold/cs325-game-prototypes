"use strict";

GameStates.makeMainMenu = function( game, shared ) {

	var music = null;
	var playButton = null;
    var style = null;
    var text = null;
    
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
    
            music = game.add.audio('titleMusic');
            music.play();
    
            game.add.sprite(0, 0, 'menuBack');

            style = { font: "20px Verdana", fill: "#FFFFFF", align: "center" };
            text = game.add.text(280, 350, "", style);


            if(shared.count === 1000) {
                text.text = "The game has not been beaten!";
            } else {
                text.text = "Game beaten! Least orders: " + shared.count;
            }
    
            playButton = game.add.button( 303, 400, 'menuPlay', startGame);

            console.log("Update 0.41");
    
        },
    
        update: function () {
    
            //	Do some nice funky main menu effect here
    
        }
        
    };
};
