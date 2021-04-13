import 'phaser';
import EventDispatcher from '../Utility/EventDispatcher';

export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame);
    this.type = type;
    this.maxHp = this.hp = hp;
    this.damage = damage;
    this.living = true;
    this.menuItem = null;
    this.emitter = EventDispatcher.getInstance();
  }

  setMenuItem(item) {
    this.menuItem = item;
  }

  attack (target) {
    if(target.living) {
      target.takeDamage(this.damage);
      this.emitter.emit("Message", `${this.type} attacks ${target.type} for ${this.damage} damage.`);
    }
  }

  takeDamage (damage) {
    this.hp -= damage;
    if(this.hp <= 0) {
      this.hp = 0;
      this.visible = false;
      this.living = false;
      this.menuItem.unitKilled();
    }
  }
}
