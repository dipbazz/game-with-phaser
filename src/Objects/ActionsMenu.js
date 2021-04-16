import EventDispatcher from '../Utility/EventDispatcher';
import Menu from './Menu';

export default class ActionsMenu extends Menu {
  constructor(scene, x, y) {
    super(scene, x, y);
    this.emitter = EventDispatcher.getInstance();
  }

  confirm() {
    this.emitter.emit('ActionSelected', this.menuItemIndex, this);
  }
}
