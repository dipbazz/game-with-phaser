import Phaser from 'phaser';
import Enemy from '../Models/Enemy';
import Player from '../Models/Player';
import EventDispatcher from '../Utility/EventDispatcher';
import Message from '../Utility/Message';

export default class BattleScene extends Phaser.Scene {
  constructor() {
    super('Battle');
  }

  create() {
    this.emitter = EventDispatcher.getInstance();
    this.model = this.sys.game.globals.model;

    this.cameras.main.setBackgroundColor('rgba(0, 200, 0, 0.5)');
    this.generateCharacter();
    this.generateActions();
    this.scene.launch('UI');
    this.message = new Message(this, this.emitter);
    this.add.existing(this.message);

    this.scene.launch('Score');

    this.events.on('wake', () => {
      this.create();
    });
  }

  generateCharacter() {
    const blueDragon = new Enemy(this, 50, 80, 'blueDragon', 1, 'Dragon', 100, 20);
    this.add.existing(blueDragon);

    const orangeDragon = new Enemy(this, 50, 130, 'orangeDragon', 1, 'Dragon2', 100, 8);
    this.add.existing(orangeDragon);

    const warrior = new Player(this, 250, 80, 'player', 1, 'Warrior', 100, 20);
    this.add.existing(warrior);

    const mage = new Player(this, 250, 130, 'player', 4, 'Mage', 80, 8);
    this.add.existing(mage);

    this.heroes = [warrior, mage];
    this.enemies = [blueDragon, orangeDragon];
    this.units = this.heroes.concat(this.enemies);
  }

  generateActions() {
    this.actions = [{ type: 'Attack' }];
  }

  startBattle(action, attacker, defender) {
    if (action.type === 'Attack' && defender.living) {
      attacker.attack(defender);
    }

    if (attacker instanceof Player) {
      this.model.score += 10;
      this.emitter.emit('ScoreChanged', this.model.score);
      this.scene.scene.time.addEvent({
        delay: 2000,
        callback: this.counterAttack,
        callbackScope: this,
      });
    }

    if (attacker instanceof Enemy) {
      this.scene.scene.time.addEvent({ delay: 2000, callback: this.nextTurn, callbackScope: this });
    }
    this.checkEndBattle();
  }

  checkEndBattle() {
    const aliveHeroes = this.heroes.filter(item => item.living);
    const aliveEnemies = this.enemies.filter(item => item.living);

    if (aliveHeroes.length <= 0) {
      this.scene.stop('UI');
      this.scene.stop('Game');
      this.scene.stop('Battle');
      this.scene.start('GameOver');
    }

    if (aliveEnemies.length <= 0) {
      this.scene.sleep('UI');
      this.scene.sleep('Battle');
      this.scene.switch('Game');
    }
  }

  counterAttack() {
    const enemy = this.getRandomEnemies();
    const action = this.getRandomAction();
    const hero = this.getRandomHeroes();
    this.startBattle(action, enemy, hero);
  }

  nextTurn() {
    this.emitter.emit('HeroSelected');
  }

  getRandomAction() {
    return this.actions[0];
  }

  getRandomEnemies() {
    const alive = this.enemies.filter(unit => unit.living);
    return alive[Math.floor(Math.random() * alive.length)];
  }

  getRandomHeroes() {
    const alive = this.heroes.filter(unit => unit.living);
    return alive[Math.floor(Math.random() * alive.length)];
  }
}
