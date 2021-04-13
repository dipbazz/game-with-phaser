import HealthBar from '../Objects/HealthBar';
import Unit from './Unit';

export default class Enemy extends Unit {
  constructor(scene, x, y, texture, frame, type, hp, damage) {
    super(scene, x, y, texture, frame, type, hp, damage);
  }
}
