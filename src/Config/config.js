import Phaser from 'phaser';

export default {
  type: Phaser.AUTO,
  scale: {
    mode: Phaser.Scale.NONE,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    width: 320,
    height: 240,
  },
  parent: 'content',
  zoom: 2,
  pixelArt: true,
  physics: {
    default: 'arcade',
    acrade: {
      gravity: { y: 0 },
      debug: true,
    },
  },
};
