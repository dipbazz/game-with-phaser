import Phaser from 'phaser';
import Leaderboard from '../API/Leaderboard';
import config from '../Config/config';
import Button from '../Objects/Button';

export default class LeaderboardScene extends Phaser.Scene {
  constructor() {
    super('Leaderboard');
  }

  create() {
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    this.api = new Leaderboard();

    this.drawLeaderboardTitle();
    const scores = this.api.getScores();
    scores.then(data => {
      const players = data.result.sort((a, b) => b.score - a.score);
      this.drawTop5Player(players.slice(0, 5));
    });

    const menuButton = new Button(this, config.scale.width / 2, config.scale.height / 2 + 80, 'blueButton1', 'blueButton2', 'Menu', 'Title');
    this.add.existing(menuButton);
  }

  drawLeaderboardTitle() {
    this.add.text(
      config.scale.width / 2 - 50,
      config.scale.height / 2 - 100,
      'Leaderboard',
      { color: '#fff', fontSize: 15 },
    );

    const graphics = this.add.graphics();
    graphics.lineStyle(1, 0xffffff, 1);

    graphics.beginPath();

    graphics.moveTo(
      config.scale.width / 2 - 70,
      config.scale.height / 2 - 80,
    );
    graphics.lineTo(
      config.scale.width / 2 + 70,
      config.scale.height / 2 - 80,
    );
    graphics.strokePath();
  }

  drawTop5Player(players) {
    for (let index = 0; index < players.length; index += 1) {
      const player = players[index];
      this.add.text(
        config.scale.width / 2 - 70,
        config.scale.height / 2 - 70 + (index * 20),
        `${index + 1}. `,
        { color: '#fff', fontSize: 15 },
      );
      this.add.text(
        config.scale.width / 2 - 50,
        config.scale.height / 2 - 70 + (index * 20),
        player.user,
        { color: '#fff', fontSize: 15 },
      );

      this.add.text(
        config.scale.width / 2 + 40,
        config.scale.height / 2 - 70 + (index * 20),
        player.score,
        { color: '#fff', fontSize: 15 },
      );
    }
  }
}
