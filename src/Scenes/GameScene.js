import 'phaser';

export default class GameScene extends Phaser.Scene {
  constructor () {
    super ('Game');
  }

  create () {
    let map = this.make.tilemap({key: 'map'});
    let tiles = map.addTilesetImage('spritesheet', 'tiles');

    let grass = map.createStaticLayer('Grass', tiles, 0, 0);
    let obstacles = map.createStaticLayer('Obstacles', tiles, 0, 0);
    obstacles.setCollisionByExclusion([-1]);

    this.player = this.physics.add.sprite(50, 100, 'player', 6);

    this.physics.world.bounds.width = map.widthInPixels;
    this.physics.world.bounds.height = map.heightInPixels;
    this.player.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.startFollow(this.player);
    this.cameras.main.roundPixels = true;

    this.createMovementAnimation();
    this.physics.add.collider(this.player, obstacles);

    this.spawnEnemies();
  }

  update () {
    this.player.body.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.body.setVelocityX(-80);
    } else if (this.cursors.right.isDown) {
      this.player.body.setVelocityX(80);
    }

    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-80)
    } else if (this.cursors.down.isDown) {
      this.player.body.setVelocityY(80);
    }

    if (this.cursors.left.isDown) {
        this.player.anims.play('left', true);
    } else if (this.cursors.right.isDown) {
        this.player.anims.play('right', true);
    } else if (this.cursors.up.isDown) {
        this.player.anims.play('up', true);
    } else if (this.cursors.down.isDown) {
        this.player.anims.play('down', true);
    } else {
        this.player.anims.stop();
    }
  }

  createMovementAnimation() {
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13]}),
      frameRate: 10,
      repeat: -1
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('player', { frames: [1, 7, 1, 13] }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', { frames: [2, 8, 2, 14]}),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', { frames: [ 0, 6, 0, 12 ] }),
      frameRate: 10,
      repeat: -1
    });
  }

  spawnEnemies () {
    this.spawns = this.physics.add.group({
      classType: Phaser.GameObjects.Zone
    });

    for (let i = 0; i < 30; i++) {
      let x = Phaser.Math.RND.between(0, this.physics.world.bounds.width);
      let y = Phaser.Math.RND.between(0, this.physics.world.bounds.height);

      this.spawns.create(x, y, 20, 20);
    }
  }
}
