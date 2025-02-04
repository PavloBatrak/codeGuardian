class ComicIntroScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ComicIntroScene' });
    }

    preload() {
        // Ładowanie kadrów komiksu
        this.load.image('comic1', '/static/assets/comic1.png');
        this.load.image('comic2', '/static/assets/comic2.png');
        this.load.image('comic3', '/static/assets/comic3.png');
        this.load.image('comic4', '/static/assets/comic4.png');
    }

    create() {
        const comicScenes = [
            { imageKey: 'comic1', text: 'Jadę rowerem do lasu.' },
            { imageKey: 'comic2', text: 'Spaceruję po górach, ciesząc się widokami.' },
            { imageKey: 'comic3', text: '"Potrzebujemy Twojej pomocy w znalezieniu błędów!"' },
            { imageKey: 'comic4', text: 'Wracam do miasta, gotów do działania.' }
        ];

        let currentScene = 0;
        const comicImage = this.add.image(400, 300, comicScenes[currentScene].imageKey).setScale(0.8);
        const comicText = this.add.text(400, 550, comicScenes[currentScene].text, { fontSize: '20px', color: '#ffffff', fontStyle: 'italic', backgroundColor: 'rgba(0, 0, 0, 0.6)', padding: { x: 10, y: 5 } }).setOrigin(0.5);

        this.input.on('pointerdown', () => {
            if (currentScene < comicScenes.length - 1) {
                currentScene++;
                comicImage.setTexture(comicScenes[currentScene].imageKey);
                comicText.setText(comicScenes[currentScene].text);
            } else {
                this.scene.start('Level1Scene');  // Przejście do poziomu 1 po zakończeniu intro
            }
        });
    }
}

export default ComicIntroScene;
