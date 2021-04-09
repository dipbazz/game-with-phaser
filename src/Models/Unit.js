import 'phaser';

export default class Unit extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame);
    this.type = type;
    this.maxHp = this.hp = hp;
    this.damage = damage;
    this.living = true;
  }

  attack (target) {
    target.takeDamage(this.damage);
  }

  takeDamage (damage) {
    this.hp -= damage;
    if(this.hp <= 0) {
      this.hp = 0;
      this.living = false;
    }
  }
}
