"use strict";

GameStates.makePreloader = function( game ) {

	var background = null;
	var preloadBar = null;

	var ready = false;

    return {
    
        preload: function () {
    
            //	These are the assets we loaded in Boot.js
            //	A nice sparkly background and a loading progress bar
            background = game.add.sprite(0, 0, 'preloadBack');
            preloadBar = game.add.sprite(300, 400, 'preloadBar');
    
            //	This sets the preloadBar sprite as a loader sprite.
            //	What that does is automatically crop the sprite from 0 to full-width
            //	as the files below are loaded in.
            game.load.setPreloadSprite(preloadBar);
    
            //	Here we load the rest of the assets our game needs.
            //	As this is just a Project Template I've not provided these assets, swap them for your own.
            game.load.image('menuBack', 'assets/MenuBack.png');
            game.load.image('playLevelOne', 'assets/LevelOneButton.png');
            game.load.image('playLevelTwo', 'assets/LevelTwoButton.png');
            game.load.image('playLevelThree', 'assets/LevelThreeButton.png');
            game.load.image('playBonus', 'assets/BonusLevelButton.png');
            game.load.image('musicToggle', 'assets/MusicToggle.png');
            game.load.audio('menuMusic', ['assets/Undertale OST - Spider Dance Menu Music.mp3']);
            game.load.image('gameBack', 'assets/GameBack.png');
            game.load.spritesheet('elephSheet', 'assets/ElephantSpriteSheet.png', 120, 70, 32);
            game.load.spritesheet('jagSheet', 'assets/JaguarSpriteSheet.png', 80, 50, 6);
            game.load.spritesheet('zebraSheet', 'assets/ZebraSpriteSheet.png', 90, 70, 12);
            game.load.image('player', 'assets/Player.png');
            game.load.image('nightPlayer', 'assets/NightPlayer.png');
            game.load.image('gunArm', 'assets/GunArm.png');
            game.load.image('bullet', 'assets/Bullet.png');
            game.load.image('poacher', 'assets/Poacher.png');
            game.load.image('winButt', 'assets/VictoryButton.png');
            game.load.image('loseButt', 'assets/DefeatButton.png');
            game.load.audio('gameMusic', ['assets/Benny Hill Theme.mp3']);
            game.load.image('bonusBack', 'assets/BonusBack.png');
            game.load.image('gorilla', 'assets/GorillaSprite.png');
            game.load.spritesheet('gorSheet', 'assets/GorillaSpriteSheet.png', 80, 90, 12);
            game.load.audio('bonusMusic', ['assets/GorillaTheme.mp3']);
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
            
            if (game.cache.isSoundDecoded('menuMusic') && ready == false)
            {
                ready = true;
                game.state.start('MainMenu');
            }
    
        }
    
    };
};
