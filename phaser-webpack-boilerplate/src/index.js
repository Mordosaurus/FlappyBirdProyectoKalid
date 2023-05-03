
import Phaser, { Scenes } from "phaser";
import GameScene from "./scenes/game-scene";
import MenuScene from "./scenes/menu-scene";

const GLOBAL_CONFIG = {
  width: 800,
  height: 600,
}

const config = {
  type: Phaser.AUTO,
  ...GLOBAL_CONFIG,
  physics: {
    default: "arcade",
    arcade: {
      debug: false,
      gravity: {y: 450}
    }
  },
  scene: [
    new MenuScene(GLOBAL_CONFIG),
    new GameScene(GLOBAL_CONFIG)]
}

new Phaser.Game(config);
