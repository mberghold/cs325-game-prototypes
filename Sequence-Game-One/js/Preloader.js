"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = game.add.sprite(0, 0, 'preback');
            preloadBar = game.add.sprite(490, 650, 'prebar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            game.load.setPreloadSprite(preloadBar);
    
            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            game.load.image('ace', 'AceSpade.png');
            game.load.image('two', 'TwoSpade.png');
            game.load.image('three', 'ThreeSpade.png');
            game.load.image('four', 'FourSpade.png');
            game.load.image('five', 'FiveSpade.png');
            game.load.image('six', 'SixSpade.png');
            game.load.image('seven', 'SevenSpade.png');
            game.load.image('eight', 'EightSpade.png');
            game.load.image('nine', 'NineSpade.png');
            game.load.image('ten', 'TenSpade.png');
            game.load.image('back', 'CardBack.gif');
            game.load.image('menuback', 'MainMenuBack.png');
            game.load.image('play', 'MenuPlay.png');
            game.load.image('instruct', 'SampleInstruct.png');




            //	+ lots of other required assets here
        },
    
        create: function () {
    
            //	Once the load has finished we disable the crop because we're going to sit in the update loop for a short while as the music decodes
            preloadBar.cropEnabled = false;
    
        },
    
        update: function () {
    
            //	You don't actually need to do this, but I find it gives a much smoother game experience.
            //	Basically it will wait for our audio file to be decoded before proceeding to the MainMenu.
            //	You can jump right into the menu if you want and still play the music, but you'll have a few
            //	seconds of delay while the mp3 decodes - so if you need your music to be in-sync with your menu
            //	it's best to wait for it to decode here first, then carry on.
            
            //	If you don't have any music in your game then put the game.state.start line into the create function and delete
            //	the update function completely.
            
            game.state.start('MainMenu');
            
    
        }
    
    };
};
