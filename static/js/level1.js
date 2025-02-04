const config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

let player;
let cursors;
let bugs;
let collectedBugs = 0;
let bugText;
let gameOver = false;

const game = new Phaser.Game(config);

function preload() {
    this.load.image('background', '/static/assets/office-background.png');
    this.load.image('ground', '/static/assets/ground.png');
    this.load.image('bug', '/static/assets/bug.png');
    this.load.spritesheet('dude', '/static/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
}

function create() {
    // Tło i inne elementy poziomu 1
    this.add.image(400, 300, 'background');

    // Dodanie tytułu gry na ekranie przez 3 sekundy
    const titleText = this.add.text(400, 200, 'CodeGuardian: Rise of the Tester',
        { fontSize: '48px', fill: '#ffffff', fontStyle: 'bold' });
    titleText.setOrigin(0.5, 0.5);

    // Ukryj tytuł po 3 sekundach
    this.time.delayedCall(3000, () => {
        titleText.setVisible(false);
    });

    // Gracz
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    // Animacje dla gracza
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

    // Platformy
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();

    // Błędy do zebrania
    bugs = this.physics.add.group({
        key: 'bug',
        repeat: 9,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    bugs.children.iterate(function (child) {
        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
    });

    // Kolizje
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(bugs, platforms);

    // Zbieranie błędów
    this.physics.add.overlap(player, bugs, collectBug, null, this);

    // Tekst licznika błędów
    bugText = this.add.text(16, 16, 'Błędy: 0/10', { fontSize: '32px', fill: '#000' });

    // Sterowanie
    cursors = this.input.keyboard.createCursorKeys();
}

function update() {
    if (gameOver) {
        return;
    }

    if (cursors.left.isDown) {
        player.setVelocityX(-160);
        player.anims.play('left', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        player.anims.play('right', true);
    } else {
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }
}

function collectBug(player, bug) {
    bug.disableBody(true, true);
    collectedBugs += 1;
    bugText.setText('Błędy: ' + collectedBugs + '/10');

    if (collectedBugs === 10) {
        this.add.text(200, 300, 'Gratulacje! Udało Ci się znaleźć wszystkie błędy!',
                      { fontSize: '32px', fill: '#00FF00' });
        gameOver = true;
    }
}
