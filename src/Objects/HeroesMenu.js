import EventDispatcher from '../Utility/EventDispatcher';
import Menu from './Menu';

export default class HeroesMenu extends Menu {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.emitter = EventDispatcher.getInstance();
  }

  confirm() {
    this.emitter.emit('HeroSelected', this.menuItemIndex, this);
  }
}
