import EventDispatcher from '../Utility/EventDispatcher';
import Menu from './Menu';

export default class EnemiesMenu extends Menu {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.emitter = EventDispatcher.getInstance();
  }

  confirm() {
    this.emitter.emit('EnemySelected', this.menuItemIndex, this);
  }
}
