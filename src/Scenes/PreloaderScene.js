import Phaser from 'phaser';
import config from '../Config/config';

export default class PreloaderScene extends Phaser.Scene {
  constructor() {
    super('Preloader');
  }

  preload() {
    const { width } = config.scale;
    const { height } = config.scale;

    this.createProgress(width, height);

    this.load.on('progress', value => this.onProgress(value, width, height));
    this.load.on('fileprogress', file => this.onFileprogress(file));
    this.load.on('complete', () => this.onComplete());


    this.load.image('tiles', 'assets/map/spritesheet.png');
    this.load.tilemapTiledJSON('map', 'assets/map/map.json');
    this.load.spritesheet('player', 'assets/RPG_assets.png', { frameWidth: 16, frameHeight: 16 });
    this.load.image('blueDragon', 'assets/dragonblue.png');
    this.load.image('orangeDragon', 'assets/dragonorange.png');

    this.load.image('blueButton1', 'assets/ui/blue_button02.png');
    this.load.image('blueButton2', 'assets/ui/blue_button03.png');
    this.load.image('uncheckedBox', 'assets/ui/grey_box.png');
    this.load.image('checkedBox', 'assets/ui/blue_boxCheckmark.png');
    this.load.audio('bgMusic', ['assets/music/TownTheme.mp3']);
  }

  create() {
    this.scene.start('Title');
  }

  createProgress(width, height) {
    this.progressBox = this.add.graphics();
    this.progressBar = this.add.graphics();
    this.progressBox.fillStyle(0x222222, 1);
    this.progressBox.fillRect(width / 2 - 75, height / 2 - 15, 150, 24);

    this.loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 30,
      text: 'Loading ...',
      style: {
        font: '15px monospace',
        fill: '#ffffff',
      },
    });
    this.loadingText.setOrigin(0.5, 0.5);

    this.percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 4,
      text: '0%',
      style: {
        font: '14px monospace',
        fill: '#ffffff',
      },
    });
    this.percentText.setOrigin(0.5, 0.5);

    this.assetText = this.make.text({
      x: width / 2,
      y: height / 2 + 30,
      text: '',
      style: {
        font: '14px monospace',
        fill: '#ffffff',
      },
    });
    this.assetText.setOrigin(0.5, 0.5);
  }

  onProgress(value, width, height) {
    this.percentText.setText(`${parseInt(value * 100, 10)}%`);
    this.progressBar.clear();
    this.progressBar.fillStyle(0x159cef, 1);
    this.progressBar.fillRect(width / 2 + 2.5 - 75, height / 2 + 2 - 15, 145 * value, 20);
  }

  onFileprogress(file) {
    this.assetText.setText(`Loading asset: ${file.key}`);
  }

  onComplete() {
    this.progressBar.destroy();
    this.progressBox.destroy();
    this.loadingText.destroy();
    this.percentText.destroy();
    this.assetText.destroy();
  }
}
