import Phaser from 'phaser';

export default class Button extends Phaser.GameObjects.Container {
  constructor(scene, x, y, key1, key2, text, targetScene) {
    super(scene);
    this.x = x;
    this.y = y;

    this.button = scene.add.sprite(0, 0, key1).setInteractive();
    this.button.scale = 0.7;
    this.text = scene.add.text(0, 0, text, { fontSize: '16px', fill: '#ffffff' });
    Phaser.Display.Align.In.Center(this.text, this.button);

    this.add(this.button);
    this.add(this.text);

    this.button.on('pointerdown', () => {
      scene.scene.start(targetScene);
    });

    this.button.on('pointerover', () => {
      this.button.setTexture(key2);
    });

    this.button.on('pointerout', () => {
      this.button.setTexture(key1);
    });
  }
}
