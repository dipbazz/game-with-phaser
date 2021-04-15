import Phaser from 'phaser';
import config from '../Config/config';

export default class LoginScene extends Phaser.Scene {
  constructor() {
    super('Login');
  }

  create() {
    this.model = this.sys.game.globals.model;
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

    if (!this.model.username) {
      this.displayForm();
    } else {
      this.scene.start('Game');
    }
  }

  displayForm() {
    const element = this.add.dom(config.scale.width / 2, config.scale.height / 2).createFromCache('loginForm');

    element.addListener('click');

    element.on('click', (event) => {
      if (event.target.name === 'loginButton') {
        const username = element.getChildByName('username');
        const error = element.getChildByID('error-message');
        const usernamePattern = new RegExp(/\s/);

        if (username.value === '') {
          username.style.borderColor = 'red';
          error.innerHTML = 'Username cannot be blank.';
        } else if (usernamePattern.test(username.value)) {
          error.innerHTML = 'Username cannot have space character.';
        } else {
          element.removeListener('click');
          this.tweens.add({
            targets: element,
            y: 500,
            duration: 500,
            ease: 'Power3',
            onComplete: () => {
              this.model.username = username.value;
              this.scene.start('Game');
            },
          });
        }
      }
    });
  }
}
