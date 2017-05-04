"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = game.add.sprite(0, 0, 'preloadback');
            preloadBar = game.add.sprite(300, 400, 'preloadbar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            game.load.setPreloadSprite(preloadBar);
    
            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            // game.load.image('titlePage', 'assets/title.jpg');
            // game.load.atlas('playButton', 'assets/play_button.png', 'assets/play_button.json');
            // game.load.audio('titleMusic', ['assets/Poppers and Prosecco.mp3']);
            //	+ lots of other required assets here
            // game.load.image( 'logo', 'assets/phaser.png' );
            game.load.audio('titleMusic', 'assets/PinkPanther.mp3');
            game.load.audio('gameMusic', 'assets/Rain.mp3');
            game.load.audio('lamp', 'assets/lamp.mp3');
            game.load.image('menuPlay', 'assets/MenuPlay.png');
            game.load.image('menuBack', 'assets/menuBackground.png');
            game.load.image('gameBack', 'assets/GameBack.png');
            game.load.image('inone', 'assets/InHouse1.png');
            game.load.image('intwo', 'assets/InHouse2.png');
            game.load.image('inthree', 'assets/InHouse3.png');
            game.load.image('infour', 'assets/InHouse4.png');
            game.load.image('infive', 'assets/InHouse5.png');
            game.load.image('insix', 'assets/InHouse6.png');
            game.load.image('inseven', 'assets/InHouse7.png');
            game.load.image('ineight', 'assets/InHouse8.png');
            game.load.image('innine', 'assets/InHouse9.png');
            game.load.image('outone', 'assets/EmptyHouse1.jpg');
            game.load.image('outtwo', 'assets/EmptyHouse2.jpg');
            game.load.image('outthree', 'assets/EmptyHouse3.jpg');
            game.load.image('outfour', 'assets/EmptyHouse4.jpg');
            game.load.image('outfive', 'assets/EmptyHouse5.jpg');
            game.load.image('outsix', 'assets/EmptyHouse6.jpg');
            game.load.image('outseven', 'assets/EmptyHouse7.jpg');
            game.load.image('outeight', 'assets/EmptyHouse8.jpg');
            game.load.image('outnine', 'assets/EmptyHouse9.jpg');
            game.load.image('button', 'assets/Button.png');
            game.load.image('return', 'assets/returnButton.png');
            game.load.image('endscreen', 'assets/EndScreen.png');



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
            
            if (game.cache.isSoundDecoded('titleMusic') && ready == false)
            {
                ready = true;
                game.state.start('MainMenu');
            }
    
        }
    
    };
};
