import Unit from './Unit';

export default class Enemy extends Unit {
  attack(target) {
    super.attack(target);

    if (this.model.soundOn) {
      this.attackMusic = this.scene.sound.add('dragonAttackSound', { volume: 0.5 });
      this.attackMusic.play();
    }
  }
}
