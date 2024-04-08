import * as Phaser from "phaser";
import {Cena1} from "./scenes/Cena1";
import {menu} from "./scenes/menu";
const config = {
  type: Phaser.CANVAS, // auto
  backgroundColor: "#125555",
  width: 1200,
  height: 640,
  scene: [Cena1],
  physics:{
    default: "arcade",
    arcade:{
      gravity:{y:500}, //850
      debug:true
    }
  },
  pixelArt: true
};

const game = new Phaser.Game(config);

