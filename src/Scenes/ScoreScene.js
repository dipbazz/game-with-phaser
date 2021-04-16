import Phaser from 'phaser';
import EventDispatcher from '../Utility/EventDispatcher';

export default class ScoreScene extends Phaser.Scene {
  constructor() {
    super('Score');
  }

  create() {
    this.model = this.sys.game.globals.model;
    this.emitter = EventDispatcher.getInstance();

    this.emitter.on('ScoreChanged', (score) => {
      this.destroyScoreBoard();
      this.scoreBoard(score);
    });

    this.scoreBoard(this.model.score);
  }

  scoreBoard(score) {
    const scoreText = this.add.text(
      0, 0, 'Score: ',
      { color: '#fff', fontSize: 15, fontStyle: 'bold' },
    );

    this.add.text(
      scoreText.width - 2, 0, score,
      { color: '#fff', fontSize: 15, fontStyle: 'bold' },
    );
  }

  destroyScoreBoard() {
    this.add.displayList.removeAll();
  }
}
