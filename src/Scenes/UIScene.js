import 'phaser';
import Menu from '../Objects/Menu';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UI');
  }

  create () {
    this.addUIGraphics();
    this.menus = this.add.container();

    this.createMenus(this.scene.get('Battle'));
  }

  addUIGraphics () {
    this.graphics = this.add.graphics();
    this.graphics.lineStyle(1, 0xffffff);
    this.graphics.fillStyle(0x031f4c, 1);
    this.graphics.strokeRect(2, 150, 90, 100);
    this.graphics.fillRect(2, 150, 90, 100);
    this.graphics.strokeRect(95, 150, 90, 100);
    this.graphics.fillRect(95, 150, 90, 100);
    this.graphics.strokeRect(188, 150, 130, 100);
    this.graphics.fillRect(188, 150, 130, 100);
  }

  createMenus(battleScene) {
    let enemiesMenu = new Menu(this, 0, 150);
    this.mapMenuItems(enemiesMenu, battleScene.enemies);

    let actionsMenu =  new Menu(this, 95, 150);
    this.mapMenuItems(actionsMenu, battleScene.actions);


    let heroesMenu =  new Menu(this, 188, 150);
    this.mapMenuItems(heroesMenu, battleScene.heroes);
  }

  mapMenuItems(menu, items) {
    menu.remap(items);
  }
}
