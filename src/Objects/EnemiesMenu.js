import Menu from "./Menu";

export default class EnemiesMenu extends Menu {
  constructor(scene, x, y) {
    super (scene, x, y);
  }

  confirm () {
    console.log('confirm enemy menu');
    this.scene.events.emit('EnemySelected', this.menuItemIndex);
  }
}
