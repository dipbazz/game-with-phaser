import 'phaser';
import MenuItem from './MenuItem';

export default class Menu extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y)

    this.menuItems = []
    this.menuItemIndex = 0;
    this.x = x;
    this.y = y;
    this.selected = false;
  }

  addMenuItem(item) {
    let menuItem = new MenuItem(this.x + 10, this.y + this.menuItems.length * 20 , item, this.scene);
    this.menuItems.push(menuItem);
    return menuItem;
  }

  moveSelectionUp() {
    this.menuItems[this.menuItemIndex].deselect();
    do {
      this.menuItemIndex--;
      if(this.menuItemIndex < 0)
        this.menuItemIndex = this.menuItems.length - 1;
    } while(!this.menuItems[this.menuItemIndex].active);
    this.menuItems[this.menuItemIndex].select();
  }

  moveSelectionDown () {
    this.menuItems[this.menuItemIndex].deselect();
    do{
      this.menuItemIndex++;
      if(this.menuItemIndex >= this.menuItems.length)
        this.menuItemIndex = 0;
    } while(!this.menuItems[this.menuItemIndex].active);
    this.menuItems[this.menuItemIndex].select();
  }

  confirm() {
  }

  select(index = 0) {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = (index >= this.menuItems.length) ? 0 : index;
    this.menuItems[this.menuItemIndex].select();
    this.selected = true;
  }

  deselect() {
    this.menuItems[this.menuItemIndex].deselect();
    this.selected = false;
  }

  clear() {
    this.menuItems.forEach(item => {
      item.destroy();
    })
    this.menuItems.length = 0;
    this.menuItemIndex = 0;
  }

  remap(items) {
    this.clear();
    for(let i=0; i<items.length; i++) {
      let item = items[i];
      let menu = this.addMenuItem(item.type);
      this.scene.add.existing(menu);
    }

    this.menuItemIndex = 0;
  }
}
