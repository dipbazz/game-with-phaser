import 'phaser';
import ActionsMenu from '../Objects/ActionsMenu';
import EnemiesMenu from '../Objects/EnemiesMenu';
import HeroesMenu from '../Objects/HeroesMenu';
import Menu from '../Objects/Menu';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UI');
  }

  create () {
    this.addUIGraphics();
    this.menus = this.createMenus(this.scene.get('Battle'));
    this.currentMenu = this.menus.enemiesMenu;
    this.menus.enemiesMenu.select(0);

    this.input.keyboard.on('keydown', this.onKeyDown, this);
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
    let enemiesMenu = new EnemiesMenu(this, 0, 150);
    enemiesMenu.remap(battleScene.enemies);

    let actionsMenu =  new ActionsMenu(this, 95, 150);
    actionsMenu.remap(battleScene.actions);

    let heroesMenu =  new HeroesMenu(this, 188, 150);
    heroesMenu.remap(battleScene.heroes);

    return {enemiesMenu, actionsMenu, heroesMenu};
  }

  onKeyDown (event) {
    console.log(event);
    console.log(this.currentMenu);
    if(this.currentMenu && this.currentMenu.selected) {
      if(event.code === 'ArrowUp'){
        this.currentMenu.moveSelectionUp();
      } else if(event.code === 'ArrowDown') {
        this.currentMenu.moveSelectionDown();
      } else if (event.code === 'Space' || event.code === 'ArrowLeft') {
        this.currentMenu.confirm();
      }
    }
  }
}
