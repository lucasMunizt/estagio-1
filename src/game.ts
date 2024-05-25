import * as Phaser from "phaser";
import {Cena1} from "./scenes/Cena1";
import {Menu} from "./scenes/Menu";
import {Gameover} from "./scenes/Gameover";
import {Tutorial} from "./scenes/Tutorial";

const config = {
  type: Phaser.CANVAS, // auto
  backgroundColor: "#125555",
  width: 1200,
  height: 640,
  scene: [Cena1,Gameover],
  physics:{
    default: "arcade",
    arcade:{
      gravity:{y:850}, //850
      debug:true
    }
  },
  pixelArt: true
};

const game = new Phaser.Game(config);

