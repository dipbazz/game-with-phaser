import Menu from "./Menu";

export default class EnemiesMenu extends Menu {
  constructor(scene, x, y) {
    super (scene, x, y);
  }

  confirm () {
    this.scene.events.emit('EnemySelected', this.menuItemIndex, this);
  }
}
