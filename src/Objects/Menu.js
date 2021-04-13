import Phaser from 'phaser';
import Unit from '../Models/Unit';
import MenuItem from './MenuItem';

export default class Menu extends Phaser.GameObjects.Container {
  constructor(scene, x, y) {
    super(scene, x, y);

    this.menuItems = [];
    this.menuItemIndex = 0;
    this.x = x;
    this.y = y;
    this.selected = false;
  }

  addMenuItem(item) {
    const menuItem = new MenuItem(
      this.x + 10,
      this.y + this.menuItems.length * 20,
      item,
      this.scene,
    );
    this.menuItems.push(menuItem);
    return menuItem;
  }

  moveSelectionUp() {
    this.menuItems[this.menuItemIndex].deselect();
    do {
      this.menuItemIndex -= 1;
      if (this.menuItemIndex < 0) this.menuItemIndex = this.menuItems.length - 1;
    } while (!this.menuItems[this.menuItemIndex].active);
    this.menuItems[this.menuItemIndex].select();
  }

  moveSelectionDown() {
    this.menuItems[this.menuItemIndex].deselect();
    do {
      this.menuItemIndex += 1;
      if (this.menuItemIndex >= this.menuItems.length) this.menuItemIndex = 0;
    } while (!this.menuItems[this.menuItemIndex].active);
    this.menuItems[this.menuItemIndex].select();
  }

  select(index = 0) {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = (index >= this.menuItems.length) ? 0 : index;
    while (!this.menuItems[this.menuItemIndex].active) {
      this.menuItemIndex += 1;
      if (this.menuItemIndex >= this.menuItems.length) this.menuItemIndex = 0;

      if (this.menuItemIndex === index) return;
    }
    this.menuItems[this.menuItemIndex].select();
    this.selected = true;
  }

  deselect() {
    this.menuItems[this.menuItemIndex].deselect();
    this.menuItemIndex = 0;
    this.selected = false;
  }

  clear() {
    this.menuItems.forEach(item => {
      item.destroy();
    });
    this.menuItems.length = 0;
    this.menuItemIndex = 0;
  }

  remap(items) {
    this.clear();
    for (let i = 0; i < items.length; i += 1) {
      const item = items[i];
      const menu = this.addMenuItem(item.type);
      if (item instanceof Unit) {
        item.setMenuItem(menu);
      }
      this.scene.add.existing(menu);
    }

    this.menuItemIndex = 0;
  }
}
