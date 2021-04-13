import 'phaser';
import Enemy from '../Models/Enemy';
import Player from '../Models/Player';
import EventDispatcher from '../Utility/EventDispatcher';

export default class BattleScene extends Phaser.Scene {
  constructor () {
    super('Battle');
  }

  create () {
    this.emitter = EventDispatcher.getInstance();

    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    this.generateCharacter();
    this.generateActions();
    this.scene.launch('UI');

  }

  generateCharacter () {
    let blueDragon = new Enemy(this, 50, 50, 'blueDragon', 1, 'Dragon',  100, 50);
    this.add.existing(blueDragon);

    let orangeDragon = new Enemy(this, 50, 100, 'orangeDragon', 1, 'Dragon2',  100, 50);
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
    if(action.type === 'Attack' && defender.living) {
      attacker.attack(defender);
    }

    if(attacker instanceof Player){
      console.log(this.scene)
      this.scene.scene.time.addEvent({delay: 2000, callback:this.counterAttack, callbackScope: this})
    }

    if(attacker instanceof Enemy) {
      this.scene.scene.time.addEvent({delay: 2000, callback:this.nextTurn, callbackScope: this})
    }
  }

  counterAttack () {
    const enemy = this.getRandomEnemies(this.enemies);
    const action = this.getRandomAction(this.actions);
    const hero = this.getRandomHeroes(this.heroes);
    this.startBattle(action, enemy, hero);
  }

  nextTurn () {
    this.emitter.emit('HeroSelected');
  }

  getRandomAction(actions) {
    return actions[0];
  }

  getRandomEnemies(enemies) {
    return enemies[Math.floor(Math.random() * enemies.length)];
  }

  getRandomHeroes(heroes) {
    return heroes[Math.floor(Math.random() * heroes.length)];
  }
}
