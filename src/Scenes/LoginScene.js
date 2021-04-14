import Phaser from 'phaser';

export default class LoginScene extends Phaser.Scene {
  constructor () {
    super('Login');
  }

  create () {
    this.model = this.sys.game.globals.model;
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');

    var text = this.add.text(80, 10, 'Please login to play', { color: 'white', fontFamily: 'Arial', fontSize: '16px '});

    // console.log(this.add.dom)
    let element = this.add.dom().createFromCache('loginForm');
    console.log(element);

    // element.setPerspective(800);
  }

  displayForm() {

  }

};
