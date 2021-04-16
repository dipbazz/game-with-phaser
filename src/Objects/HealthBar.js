import Phaser from 'phaser';

export default class HealthBar extends Phaser.GameObjects.Graphics {
  constructor(scene, character, value) {
    super(scene, character.x, character.y);
    this.value = value;
    this.x = character.x;
    this.y = character.y;
    this.p = 40 / 100;

    this.draw();
    scene.add.existing(this);
  }

  decrease(amount) {
    this.value -= amount;

    if (this.value < 0) {
      this.value = 0;
    }
    this.draw();

    return (this.value === 0);
  }

  draw() {
    this.clear();

    //  Health
    this.fillStyle(0xffffff);
    this.fillRoundedRect(-20, -25, 40, 3, 2);

    if (this.value < 40) {
      this.fillStyle(0xff0000);
    } else {
      this.fillStyle(0x00ff00);
    }

    if (this.value > 0) {
      const d = Math.floor(this.p * this.value);
      this.fillRoundedRect(-20, -25, d, 3, 2);
    }
  }
}
