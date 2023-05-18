
class Title extends Phaser.Scene {
    constructor() {
        super('title');
    }
    preload(){
        this.load.path = "./assets/";
        this.load.image('space', 'space3.png');
        
    }
    create() {
        

        //this.image.add()
        this.titleob = this.add.text(
            600,//x
            200,//y
            'D3 Assignment',//imagename
            {
                font: "100px Impact",
                color: "#2a9df4",
                align: "center"
            }
            )
            //this.title.setDepth(1)
            this.titleob.setDepth(1);
            this.titleob.setScale(1) //resize
            const instructions = this.add.text(600, 500, "HOW TO PLAY:\nControl spaceship.\n'Right'/'Left' arrows rotate.\n'up' arrow is forward.\ncollect stars by colliding into them\nDon’t crash into the walls!", { fontSize: '40px', fill: '#2a9df4' });
            instructions.setDepth(1);
            
        const playText = this.add.text(600, 800, 'PLAY', { fontSize: '100px', fill: '#fff' });
        playText.setDepth(1);
        playText.setInteractive();
        playText.on('pointerover', () => {
            playText.setStyle({ fill: '#ff0' });
        });
        playText.on('pointerout', () => {
            playText.setStyle({ fill: '#fff' });
        });
        playText.on('pointerdown', () => {
            this.scene.start('level_select');
        });

        const space = this.add.image(200, 0, 'space');
        //space.scale(.5);
        space.setOrigin(0);
        space.setDepth(0);

        
    }
}