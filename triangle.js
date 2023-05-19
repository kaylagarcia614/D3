class Triangle extends Phaser.Scene {
  constructor() {
    super('triangle');
    this.inputKeys;
  }
  preload() {
    this.load.path = "./assets/";
    this.load.image('space', 'space3.png');
    this.load.image('ehouse', 'star.png');
    this.load.image('laser', 'fireball.png');
  }

  shootLaser() {
    this.laserGroup.fireLaser(this.met.x, this.met.y - 20);
  }

  addEvents() {
    // this.input.on('pointermove', (pointer) => {
    //   this.met.x = pointer.x;
    // });

    this.input.on('pointerdown', pointer => {
      this.shootLaser();
    });

    this.inputKeys = [
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER),
    ];
  }

  create() {
    this.addEvents();

    this.laserGroup = new LaserGroup(this);
    this.laserGroup.setDepth(1);

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
      this.add.rectangle(950, 500, 1200, 50, 0xFFFFFF)
      .setDepth(1),

      this.add.rectangle(900, 1300, 2100, 700, 0x8A9A5B) // x, y, width, height
      .setDepth(1),
  ]);

    //////////////spawn houses///////////////////
    if (earthhouse) {
      this.ehouse = this.physics.add.sprite(
        700,//x
        900,//y
        'ehouse',//imagename
      )
      this.ehouse.setScale(1, -1);
      this.ehouse.setDepth(1)
      this.ehouse.setScale(0.5) //resize
    }

    if (earthhouse2) {
      this.ehouse2 = this.physics.add.sprite(
        1700,//x
        900,//y
        'ehouse',//imagename
      )
      this.ehouse2.setScale(1, -1);
      this.ehouse2.setDepth(1)
      this.ehouse2.setScale(0.5) //resize
    }

    if (earthhouse3) {
      this.ehouse3 = this.physics.add.sprite(
        200,//x
        900,//y
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
      // this.leftKey.tint = 0xFFFFFF;   // un-tint keys
      // this.rightKey.tint = 0xFFFFFF;
    }

    
    /////////////////collisions///////////////
    //this.physics.add.collider(this.met, this.ehouse, togameover, null, this);
    //this.physics.add.collider(this.met, this.ehouse2, togameover, null, this);
    //this.physics.add.collider(this.met, this.ehouse3, togameover, null, this);

    this.physics.add.collider(this.met, this.ehouse, tohit, null, this);
    this.physics.add.collider(this.met, this.ehouse2, tohit2, null, this);
    this.physics.add.collider(this.met, this.ehouse3, tohit3, null, this);

    
    this.physics.add.collider(this.met, this.rectangleGroup3, togameover, null, this);

    
    this.physics.add.overlap(this.laserGroup, this.rectangleGroup3, toexpl, null, this);

    function toexpl(a,b) {
      //debugger;
      boom = true;
      a.hit(true);
  }

    /////////////game over////////////////
    function togameover() {
      if (lives == 1) {
        this.scene.start('gameover');
        lives = 3;
      }
      else {
        lives--;
        this.scene.start('earth');
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

    ///////////////////shoot///////////////
    this.inputKeys.forEach(key => {
      // If key was just pressed down, shoot the laser. We use JustDown to make sure this only fires once.
      if (Phaser.Input.Keyboard.JustDown(key)) {
        this.shootLaser();
      }
    });
  }
}