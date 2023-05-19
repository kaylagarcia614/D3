class Triangle extends Phaser.Scene {
  constructor() {
    super('triangle');
    this.inputKeys;
  }
  preload() {
    this.load.path = "./assets/";
    this.load.image('space', 'space3.png');
    this.load.image('ehouse', 'star.png');
    
  }

  

  addEvents() {
    
    this.inputKeys = [
      
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    ];
  }

  create() {
    this.addEvents();

    /////////////////////stats//////////////////
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

    /////////////////meteor spawn//////////////////////
    this.met = this.physics.add.sprite(1000, 100, 'met').setScale(SCALE);
    this.met.setDepth(1);
    this.met.setMaxVelocity(this.MAX_VELOCITY);
    this.met.setDamping(true);
    this.met.setDrag(this.DRAG);

    //////////////respawn///////////////
    if (!firstearthvisit) {
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
      firstearthvisit = false;
    }

    // set up Phaser-provided cursor key input
    cursors = this.input.keyboard.createCursorKeys();

    ////////////spawn rectangles//////////////////
    

    this.rectangleGroup3 = this.physics.add.group([
      this.add.rectangle(950, 500, 100, 50, 0x8A9A5B)
      .setDepth(1),

      this.add.rectangle(900, 1300, 2100, 700, 0x8A9A5B) // x, y, width, height
      .setDepth(1),
  ]);

    //////////////spawn houses///////////////////
    if (earthhouse) {
      this.ehouse = this.physics.add.sprite(
        700,//x
        700,//y
        'ehouse',//imagename
      )
      this.ehouse.setScale(1, -1);
      this.ehouse.setDepth(1)
      this.ehouse.setScale(0.5) //resize
    }

    if (earthhouse2) {
      this.ehouse2 = this.physics.add.sprite(
        1700,//x
        600,//y
        'ehouse',//imagename
      )
      this.ehouse2.setScale(1, -1);
      this.ehouse2.setDepth(1)
      this.ehouse2.setScale(0.5) //resize
    }

    if (earthhouse3) {
      this.ehouse3 = this.physics.add.sprite(
        200,//x
        100,//y
        'ehouse',//imagename
      )
      this.ehouse3.setScale(1, -1);
      this.ehouse3.setDepth(1)
      this.ehouse3.setScale(0.5) //resize
    }

    const space = this.add.image(200, 0, 'space');
    space.setOrigin(0);
    space.setDepth(0);
  }

  update() {
    // physics methods adapted from the Phaser 3 Asteroids Example 👍
    // handle input

    ////////////////movement///////////////////
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
      
    }

    
    /////////////////collisions///////////////
    

    this.physics.add.collider(this.met, this.ehouse, tohit, null, this);
    this.physics.add.collider(this.met, this.ehouse2, tohit2, null, this);
    this.physics.add.collider(this.met, this.ehouse3, tohit3, null, this);

    
    this.physics.add.collider(this.met, this.rectangleGroup3, togameover, null, this);

    
    

    /////////////game over////////////////
    function togameover() {
      if (lives == 1) {
        this.scene.start('gameover');
        lives = 3;
      }
      else {
        lives--;
        this.scene.start('triangle');
      }
    }

    ////////////////destroy houses///////////////
    function tohit() {
      earthhouse = false;
      this.ehouse.destroy();
      score += 100;
    }
    function tohit2() {
      earthhouse2 = false;
      this.ehouse2.destroy();
      score += 100;
    }
    function tohit3() {
      earthhouse3 = false;
      this.ehouse3.destroy();
      score += 100;
    }
    
    ///////////to main menu///////////////
    if (!this.physics.world.bounds.contains(this.met.x, this.met.y)) {
      this.scene.start('level_select');
    }

    
    
  }
}