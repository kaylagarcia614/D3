class Intro extends Phaser.Scene {
    constructor() {
        super('intro');
    }
    preload(){
        this.load.path = "./assets/";
        this.load.audio('logos', 'logos.wav');
        this.load.image('space', 'space3.png');
        this.load.spritesheet('slogo', 'slogo.png', {
            frameWidth: 500,
            frameHeight: 500
        });
    }
    create() {
        const backgroundMusic = this.sound.add('logos', { loop: false });
        backgroundMusic.play();
    /////////////////animated///////////////////
        this.imageObject2 = this.add.sprite(
            900,//x
            500,//y
            'slogo',//imagename
        );
        this.imageObject2.setDepth(1)
        this.imageObject2.setScale(1); //resize
        this.anims.create({
            key: 'slogo',
            frames: this.anims.generateFrameNumbers('slogo', {
                start: 0,
                end: 11
            }),
            frameRate: 30,
            repeat: 0
        });
        this.imageObject2.anims.play('slogo', true);
        this.time.delayedCall(100, () => {
            this.tweens.add({
                targets: this.imageObject2,
                alpha:0,
                duration: 2000,
                repeat: 0,
                onComplete: () => {
                    this.textObject8 = this.add.text(
                        850, //x
                        420,//y
                        "click", //text
                        {
                            font: "60px Impact",
                            color: "#FFFFFF",
                            align: "center"
                        } //style
                    );
                    this.tweens.add({
                        targets: this.textObject8,
                        alpha:0,
                        duration: 2000,
                        repeat: -1,
                    });
                }
            });
        }, null, this);
        this.input.on('pointerdown', () => this.scene.start('title'));

        const space = this.add.image(200, 0, 'space');
        //space.scale(.5);
        space.setOrigin(0);
        space.setDepth(0);

        this.imageObject2.background = this.back;
    }
}