import Menu from "./Menu";

export default class HeroesMenu extends Menu {
  constructor(scene, x, y) {
    super (scene, x, y);
  }

  confirm () {
    console.log('heroes confirmed');
    this.scene.events.emit('HeroSelected', this.menuItemIndex, this);
  }
}
