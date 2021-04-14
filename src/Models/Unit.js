import Phaser from 'phaser';
import HealthBar from '../Objects/HealthBar';
import EventDispatcher from '../Utility/EventDispatcher';

export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame);
    this.model = scene.game.globals.model;
    this.scene = scene;
    this.type = type;
    this.hp = new HealthBar(scene, this, hp);
    this.damage = damage;
    this.living = true;
    this.menuItem = null;
    this.emitter = EventDispatcher.getInstance();
  }

  setMenuItem(item) {
    this.menuItem = item;
  }

  attack(target) {
    if (target.living) {
      target.takeDamage(this.damage);
      this.emitter.emit('Message', `${this.type} attacks ${target.type} for ${this.damage} damage.`);
    }
  }

  takeDamage(damage) {
    if (this.hp.decrease(damage)) {
      this.hp.destroy();
      this.visible = false;
      this.living = false;
      this.menuItem.unitKilled();
    }
  }
}
