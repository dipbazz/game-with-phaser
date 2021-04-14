import Phaser from 'phaser';
import config from './Config/config';
import BootScene from './Scenes/BootScene';
import GameScene from './Scenes/GameScene';
import PreloaderScene from './Scenes/PreloaderScene';
import TitleScene from './Scenes/TitleScene';
import CreditScene from './Scenes/CreditScene';
import BattleScene from './Scenes/BattleScene';
import UIScene from './Scenes/UIScene';
import GameOverScene from './Scenes/GameOverScene';
import OptionsScene from './Scenes/OptionsScene';
import Model from './Models/Model';
import LeaderboardScene from './Scenes/LeaderboardScene';


class Game extends Phaser.Game {
  constructor() {
    super(config);
    const model = new Model();
    this.globals = { model, bgMusic: null };
    this.scene.add('Boot', BootScene);
    this.scene.add('Preloader', PreloaderScene);
    this.scene.add('Title', TitleScene);
    this.scene.add('Game', GameScene);
    this.scene.add('Credit', CreditScene);
    this.scene.add('Battle', BattleScene);
    this.scene.add('UI', UIScene);
    this.scene.add('GameOver', GameOverScene);
    this.scene.add('Options', OptionsScene);
    this.scene.add('Leaderboard', LeaderboardScene);

    this.scene.start('Boot');
  }
}

window.game = new Game();
