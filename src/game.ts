import * as Phaser from "phaser";
import {Cena1} from "./scenes/Cena1";
import {menu} from "./scenes/menu";
const config = {
  type: Phaser.CANVAS, // auto
  backgroundColor: "#125555",
  width: 1200,
  height: 640,
  scene: [menu,Cena1],
  physics:{
    default: "arcade",
    arcade:{
      gravity:{y:500},
      debug:false
    }
  },
  pixelArt: true
};

const game = new Phaser.Game(config);

