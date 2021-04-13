import 'phaser';
import ActionsMenu from '../Objects/ActionsMenu';
import EnemiesMenu from '../Objects/EnemiesMenu';
import HeroesMenu from '../Objects/HeroesMenu';
import EventDispatcher from '../Utility/EventDispatcher';

export default class UIScene extends Phaser.Scene {
  constructor() {
    super('UI');
  }

  create () {
    this.emitter = EventDispatcher.getInstance();

    this.addUIGraphics();
    this.battleScene = this.scene.get('Battle')
    this.menus = this.createMenus(this.battleScene);
    this.selectHeroes(this.menus.heroesMenu);

    this.input.keyboard.on('keydown', this.onKeyDown, this);

    this.emitter.on('HeroSelected', this.onHeroSelected, this);
    this.emitter.on('ActionSelected', this.onActionSelected, this);
    this.emitter.on('EnemySelected', this.onEnemySelected, this);
  }


  onHeroSelected (id = null) {
    if(!id) {
      id = Math.floor(Math.random() * this.battleScene.heroes.length);
    }
    this.currentMenu = this.menus.heroesMenu;
    this.currentMenu.select(id);
    this.selectedHero = id;
    this.currentMenu = this.menus.actionsMenu;
    this.currentMenu.select(0);
  }

  onActionSelected (id) {
    this.selectedAction = id;
    this.currentMenu = this.menus.enemiesMenu;
    this.currentMenu.select(0);
  }

  onEnemySelected (id) {
    this.currentMenu = null;
    this.selectedEnemy = id;
    this.menus.heroesMenu.deselect();
    this.menus.actionsMenu.deselect();
    this.menus.enemiesMenu.deselect();
    this.battleScene.startBattle(
      this.battleScene.actions[this.selectedAction],
      this.battleScene.heroes[this.selectedHero],
      this.battleScene.enemies[this.selectedEnemy]
    );
  }

  selectHeroes(heroesMenu) {
    const id =Math.floor(Math.random() * this.battleScene.heroes.length);
    heroesMenu.select(id);
    heroesMenu.confirm();
    this.selectedHero = id;
    this.currentMenu = this.menus.actionsMenu;
    this.currentMenu.select(0);
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
