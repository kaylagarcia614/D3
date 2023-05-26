class Level_select extends Phaser.Scene {
    constructor() {
        super('level_select');
    }

    preload() {
        this.load.path = "./assets/";
        this.load.image('space', 'space3.png');
        this.load.image('blue', 'square.png');
        this.load.image('cheese', 'circle.png');
        this.load.image('earth', 'triangle.png');
        this.load.image('met', 'meteor.png');
    }

    create() {
        let firstcheesevisit = true;
        let firstbluevisit = true;
        let firstearthvisit = true;
        const text = this.add.text(1600, 100, 'LIVES: ' + lives, { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' });
        text.setDepth(1);
        const text2 = this.add.text(1600, 150, 'SCORE: ' + score, { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' });
        text2.setDepth(1);

        this.ANG_VELOCITY = 180;    // degrees/second
        this.MAX_VELOCITY = 500;    // pixels/second
        this.DRAG = 0.99;

        this.met = this.physics.add.sprite(game.config.width / 2, game.config.height / 2, 'met').setScale(SCALE);
        this.met.setDepth(1);
        this.met.setMaxVelocity(this.MAX_VELOCITY);
        this.met.setDamping(true);
        this.met.setDrag(this.DRAG);

        cursors = this.input.keyboard.createCursorKeys();

        this.blue = this.physics.add.sprite(
            1000,
            950,
            'blue',
        );
        this.blue.setScale(1, -1);
        this.blue.setDepth(1);
        this.blue.setScale(.35);

        this.cheese = this.physics.add.sprite(
            200,
            300,
            'cheese',
        );
        this.cheese.setScale(1, -1);
        this.cheese.setDepth(1);
        this.cheese.setScale(.3);

        this.earth = this.physics.add.sprite(
            1500,
            200,
            'earth',
        );
        this.earth.setScale(1, -1);
        this.earth.setDepth(1);
        this.earth.setScale(.3);

        this.physics.add.collider(this.met, this.earth, toearth, null, this);
        this.physics.add.collider(this.met, this.cheese, tocheese, null, this);
        this.physics.add.collider(this.met, this.blue, toblue, null, this);

        function toearth() {
            this.scene.start('triangle');
        }

        function tocheese() {
            this.scene.start('circle');
        }

        function toblue() {
            this.scene.start('square');
        }

        const space = this.add.image(200, 0, 'space');
        space.setOrigin(0);
        space.setDepth(0);

        this.blue.background = this.back;
        this.earth.background = this.back;
        this.cheese.background = this.back;

        // Enable touch input for mobile devices
        this.input.addPointer(2);

        // Add touch input event listeners
        this.input.on('pointerdown', this.handlePointerDown, this);
        this.input.on('pointerup', this.handlePointerUp, this);
        this.input.on('pointermove', this.handlePointerMove, this);
    }

    update() {
        if (cursors.up.isDown) {
            this.physics.velocityFromRotation(this.met.rotation - Math.PI / 2 * 3, 200, this.met.body.acceleration);
        } else {
            this.met.setAcceleration(0);
        }

        if (cursors.left.isDown) {
            this.met.setAngularVelocity(-this.ANG_VELOCITY);
        } else if (cursors.right.isDown) {
            this.met.setAngularVelocity(this.ANG_VELOCITY);
        } else {
            this.met.setAngularVelocity(0);
        }

        this.physics.world.wrap(this.met, this.met.width * SCALE / 2);
    }

    handlePointerDown(pointer) {
        if (pointer.x < game.config.width / 2) {
            this.met.setAngularVelocity(-this.ANG_VELOCITY);
        } else {
            this.met.setAngularVelocity(this.ANG_VELOCITY);
        }
    }

    handlePointerUp(pointer) {
        this.met.setAngularVelocity(0);
    }

    handlePointerMove(pointer) {
        if (pointer.y < game.config.height / 2) {
            this.physics.velocityFromRotation(this.met.rotation - Math.PI / 2 * 3, 200, this.met.body.acceleration);
        } else {
            this.met.setAcceleration(0);
        }
    }
}
