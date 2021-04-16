import Unit from './Unit';

export default class Player extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame, type, hp, damage);
    this.flipX = true;
    this.setScale(2);
  }

  attack(target) {
    super.attack(target);

    if (this.model.soundOn) {
      this.attackMusic = this.scene.sound.add('heroAttackSound', { volume: 0.5 });
      this.attackMusic.play();
    }
  }
}
