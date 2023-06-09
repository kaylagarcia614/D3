class Square extends Phaser.Scene {
    constructor() {
        super('square');
        this.inputKeys;
    }
    preload() {
        this.load.path = "./assets/";
        this.load.image('space', 'space3.png');
        this.load.image('bhouse', 'star.png');
    }

    addEvents() {
        
        this.inputKeys = [
            
            this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
        ];
        this.pointer = this.input.activePointer;
        this.pointer.leftButtonDown = false;
    }

    create() {
        this.addEvents();

        // Touch screen movement
        this.input.on('pointerdown', () => {
            this.pointer.leftButtonDown = true;
        });

        this.input.on('pointerup', () => {
            this.pointer.leftButtonDown = false;
            this.met.setAcceleration(0);
        });

        //////////////////stats//////////////////
        const text = this.add.text(1600, 100, 'LIVES: ' + lives, { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' });
        text.setDepth(1);
        const text2 = this.add.text(1600, 150, 'SCORE: ' + score, { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' });
        text2.setDepth(1);
        
        // this.player = new Player(this, 400, 300);
        // this.cursors = this.input.keyboard.createCursorKeys();
        // define variables
        this.ANG_VELOCITY = 180;    // degrees/second
        this.MAX_VELOCITY = 500;    // pixels/second
        this.DRAG = 0.99;

        ///////////////////meteor spawn///////////////////////
        this.met = this.physics.add.sprite(1000, 100, 'met').setScale(SCALE);
        this.met.setDepth(1);
        this.met.setMaxVelocity(this.MAX_VELOCITY);
        this.met.setDamping(true);
        this.met.setDrag(this.DRAG);

        ///////////////////respawn///////////////////
        let firstbluevisit;
        if (!firstbluevisit) {
            // Define the duration and number of flashes
            const duration = 2000; // Duration in milliseconds
            const numFlashes = 4; // Number of times the sprite will flash
            // Define the tween animation
            this.tweens.add({
                targets: this.met,
                alpha: 0, // Make the sprite transparent
                ease: 'Linear',
                duration: duration / (2 * numFlashes), // Divide the duration evenly across the number of flashes
                repeat: numFlashes - 1, // Number of additional flashes (subtracting the initial state)
                yoyo: true, // Make the tween reverse back to its initial state
                onComplete: () => {
                    // Reset the sprite's alpha to 1 (fully opaque) after the tween is complete
                    this.met.alpha = 1;
                }
            });
        }
        else {
            firstbluevisit = false;
        }

        // set up Phaser-provided cursor key input
        cursors = this.input.keyboard.createCursorKeys();

        ////////////////spawn rectangles//////////////////////
        this.rectangleGroup5 = this.physics.add.group([
        
        this.add.rectangle(900, 1300, 2100, 700, 0x4B0082) // x, y, width, height
        .setDepth(1)
        .setStrokeStyle(4, 0xA30000),

        this.add.rectangle(900, 600, 400, 50, 0xA30000)
        .setDepth(1)
        .setStrokeStyle(4, 0x4B0082)
        .setOrigin(0.5),
        //this.rectangle3.setAngle(45);

        this.add.rectangle(1700, 600, 200, 50, 0xA30000)
        .setDepth(1)
        .setStrokeStyle(4, 0x4B0082),

        this.add.rectangle(1400, 300, 400, 50, 0xA30000)
        .setDepth(1)
        .setStrokeStyle(4, 0x4B0082)
        ]);

        
        //////////////spawn houses//////////////////
        if (bluehouse) {
            this.bhouse = this.physics.add.sprite(
                900,//x
                800,//y
                'bhouse',//imagename
            )
            this.bhouse.setScale(1, -1);
            this.bhouse.setDepth(1)
            this.bhouse.setScale(0.5) //resize
        }

        if (bluehouse2) {
            this.bhouse2 = this.physics.add.sprite(
                1700,//x
                800,//y
                'bhouse',//imagename
            )
            this.bhouse2.setScale(1, -1);
            this.bhouse2.setDepth(1)
            this.bhouse2.setScale(0.5) //resize
        }

        if (bluehouse3) {
            this.bhouse3 = this.physics.add.sprite(
                200,//x
                100,//y
                'bhouse',//imagename
            )
            this.bhouse3.setScale(1, -1);
            this.bhouse3.setDepth(1)
            this.bhouse3.setScale(0.5) //resize
        }


        const space = this.add.image(200, 0, 'space');
        space.setOrigin(0);
        space.setDepth(0);
    }

    update() {
        
        // Touch screen movement
        if (this.pointer.leftButtonDown) {
            const touchX = this.pointer.x;
            const touchY = this.pointer.y;

            const angle = Phaser.Math.Angle.Between(this.met.x, this.met.y, touchX, touchY);
            const distance = Phaser.Math.Distance.Between(this.met.x, this.met.y, touchX, touchY);
            const acceleration = Math.min(distance / 10, 200); // Adjust the divisor to control the acceleration speed

            this.physics.velocityFromRotation(angle, acceleration, this.met.body.acceleration);
        }

        /////////////////movement////////////////////
        if (cursors.up.isDown) {
            this.physics.velocityFromRotation(this.met.rotation - Math.PI / 2 * 3, 200, this.met.body.acceleration);
            // this.upKey.tint = 0xFACADE;     // tint keyboard key
        } else {
            this.met.setAcceleration(0);
            // this.upKey.tint = 0xFFFFFF;     // un-tint key
        }

        if (cursors.left.isDown) {
            this.met.setAngularVelocity(-this.ANG_VELOCITY);
            // this.leftKey.tint = 0xFACADE;   // tint keyboard key
        } else if (cursors.right.isDown) {
            this.met.setAngularVelocity(this.ANG_VELOCITY);
            // this.rightKey.tint = 0xFACADE;   // tint keyboard key
        } else {
            this.met.setAngularVelocity(0);
            // this.leftKey.tint = 0xFFFFFF;   // un-tint keys
            // this.rightKey.tint = 0xFFFFFF;
        }

        /////////////////collisions//////////////////

        this.physics.add.overlap(this.met, this.bhouse, tohit, null, this);
        this.physics.add.overlap(this.met, this.bhouse2, tohit2, null, this);
        this.physics.add.overlap(this.met, this.bhouse3, tohit3, null, this);

       
        this.physics.add.collider(this.met, this.rectangleGroup5, togameover, null, this);

        

        ////////////////game over////////////////
        function togameover() {
            // Trigger the scene change here
            // For example:
            if (lives == 1) {
                this.scene.start('gameover');
                lives = 3;
            }
            else {
                lives--;
                this.scene.start('square');
            }
        }

        //////////////destroy houses/////////////////
        function tohit(a, b) {
            //debugger;
            if (b.setActive == false) {
            // bluehouse = false;
            // this.bhouse.destroy();
            // score += 100;
            return;
            }
            
            bluehouse = false;
            this.bhouse.destroy();
            score += 100;
            
        }
        function tohit2(a, b) {
            if (b.setActive == false) {
            // bluehouse2 = false;
            // this.bhouse2.destroy();
            // score += 100;
            }
            else {
                bluehouse2 = false;
            this.bhouse2.destroy();
            score += 100;
            }
        }
        function tohit3(a, b) {
            if (b.setActive == false) {
            // bluehouse3 = false;
            // this.bhouse3.destroy();
            // score += 100;
            }
            else {
            bluehouse3 = false;
            this.bhouse3.destroy();
            score += 100;
            }
        }

        ///////////////to menu/////////////////////
        if (!this.physics.world.bounds.contains(this.met.x, this.met.y)) {
            // Scene change logic
            this.scene.start('level_select');
        }

        
    }
}