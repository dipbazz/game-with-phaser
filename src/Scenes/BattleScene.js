import 'phaser';
import Enemy from '../Models/Enemy';
import Player from '../Models/Player';

export default class BattleScene extends Phaser.Scene {
  constructor () {
    super('Battle');
  }

  create () {
    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    this.generateCharacter();
    this.generateActions();
    this.scene.launch('UI');

  }

  generateCharacter () {
    let blueDragon = new Enemy(this, 50, 50, 'blueDragon', 1, 'Dragon',  100, 10);
    this.add.existing(blueDragon);

    let orangeDragon = new Enemy(this, 50, 100, 'orangeDragon', 1, 'Dragon2',  100, 13);
    this.add.existing(orangeDragon);

    let warrior = new Player(this, 250, 50, 'player', 1, 'Warrior', 100, 20);
    this.add.existing(warrior);

    let mage = new Player(this, 250, 100, 'player', 4, 'Mage', 80, 8);
    this.add.existing(mage);

    this.heroes = [warrior, mage];
    this.enemies = [blueDragon, orangeDragon];
    this.units = this.heroes.concat(this.enemies);
  }

  generateActions () {
    this.actions = [{type: 'Attack'}]
  }

  startBattle(action, attacker, defender) {
    console.log(action, attacker, defender);
    if(action.type === 'Attack') {
      attacker.attack(defender);
    }
  }
}
