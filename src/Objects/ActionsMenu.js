import Menu from "./Menu";

export default class ActionsMenu extends Menu {
  constructor(scene, x, y) {
    super (scene, x, y);
  }

  confirm () {
    console.log('confirm action menu');
    this.scene.events.emit('ActionSelected', this.menuItemIndex);
  }
}
