class Circle extends Phaser.Scene {
  constructor() {
    super('circle');
    this.inputKeys;
  }
  preload() {
    this.load.path = "./assets/";
    this.load.image('space', 'space3.png');
    this.load.image('phouse', 'star.png');
    
  }

  

  addEvents() {
    // this.input.on('pointermove', (pointer) => {
    //   this.met.x = pointer.x;
    // });

    this.input.on('pointerdown', pointer => {
      this.shootLaser();
    });

    this.inputKeys = [
      
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    ];
  }

  create() {
    this.addEvents();

    ////////////////stats////////////////////////
    const text = this.add.text(1600, 100, 'LIVES: ' + lives, { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' });
    text.setDepth(1);
    const text2 = this.add.text(1600, 150, 'SCORE: ' + score, { fontFamily: 'Arial', fontSize: 40, color: '#ffffff' });
    text2.setDepth(1);
    

    // define variables
    this.ANG_VELOCITY = 180;    // degrees/second
    this.MAX_VELOCITY = 500;    // pixels/second
    this.DRAG = 0.99;

    ////////////met spawn////////////////////
    this.met = this.physics.add.sprite(1000, 100, 'met').setScale(SCALE);
    this.met.setDepth(1);
    this.met.setMaxVelocity(this.MAX_VELOCITY);
    this.met.setDamping(true);
    this.met.setDrag(this.DRAG);

    //////////////////respawn/////////////////////
    if (!firstcheesevisit) {
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
      firstcheesevisit = false;
    }

    // set up Phaser-provided cursor key input
    cursors = this.input.keyboard.createCursorKeys();

    /////////////////rectangle spawn////////////////////
    this.rectangleGroup4 = this.physics.add.group([
    

    this.add.rectangle(900, 1300, 2100, 700, 0x034687) // x, y, width, height
    .setDepth(1)
    .setStrokeStyle(4, 0x00FF00),

    this.add.rectangle(900, 500, 200, 150, 0x034687)
    .setDepth(1)
    .setStrokeStyle(4, 0x00FF00)
    .setOrigin(0.5),
    //this.rectangle3.setAngle(-45);

    

    this.add.rectangle(1400, 300, 200, 150, 0x034687)
    .setDepth(1)
    .setStrokeStyle(4, 0x00FF00)
    .setOrigin(0.5)
  ]);

    
    //////////////////////house spawn/////////////////////
    if (cheesehouse) {
      this.phouse = this.physics.add.sprite(
        900,//x
        800,//y
        'phouse',//imagename
      )
      this.phouse.setScale(1, -1);
      this.phouse.setDepth(1)
      this.phouse.setScale(0.5) //resize
    }

    if (cheesehouse2) {
      this.phouse2 = this.physics.add.sprite(
        1700,//x
        400,//y
        'phouse',//imagename
      )
      this.phouse2.setScale(1, -1);
      this.phouse2.setDepth(1)
      this.phouse2.setScale(0.5) //resize
    }

    if (cheesehouse3) {
      this.phouse3 = this.physics.add.sprite(
        200,//x
        300,//y
        'phouse',//imagename
      )
      this.phouse3.setScale(1, -1);
      this.phouse3.setDepth(1)
      this.phouse3.setScale(0.5) //resize
    }

    const space = this.add.image(200, 0, 'space');
    space.setOrigin(0);
    space.setDepth(0);
  }

  update() {
    

    ///////////////////movement///////////////////////
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

    ////////////////collisions/////////////////////
    
    this.physics.add.overlap(this.met, this.phouse, tohit, null, this);
    this.physics.add.overlap(this.met, this.phouse2, tohit2, null, this);
    this.physics.add.overlap(this.met, this.phouse3, tohit3, null, this);

    
    this.physics.add.collider(this.met, this.rectangleGroup4, togameover, null, this);

    
    

    // Collision callback function
    function togameover() {
      // Trigger the scene change here
      // For example:
      if (lives == 1) {
        this.scene.start('gameover');
        lives = 3;
      }
      else {
        lives--;
        this.scene.start('circle');
      }
    }

    ///////////////destroy houses////////////////
    function tohit(a, b) {
      if (b.setActive == true) {
      cheesehouse = false;
      this.phouse.destroy();
      score += 100;
      }
    }
    function tohit2(a, b) {
      if (b.setActive == true) {
      cheesehouse2 = false;
      this.phouse2.destroy();
      score += 100;
      }
    }
    function tohit3(a, b) {
      if (b.setActive == true) {
      cheesehouse3 = false;
      this.phouse3.destroy();
      score += 100;
      }
    }

    ////////////////////to menu/////////////////////
    if (!this.physics.world.bounds.contains(this.met.x, this.met.y)) {
      // Scene change logic
      this.scene.start('level_select');
    }

    
    
  }
}