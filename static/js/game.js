import ComicIntroScene from './comicIntro.js';
import TutorialScene from './tutorial.js';
import Level1Scene from './level1.js';
import Level2Scene from './level2.js';

const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [ComicIntroScene, Level1Scene],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

const game = new Phaser.Game(config);
