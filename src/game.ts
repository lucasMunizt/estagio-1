import * as Phaser from "phaser";
import {Cena1} from "./scenes/Cena1";

const config = {
  type: Phaser.CANVAS, // auto
  backgroundColor: "#125555",
  width: 1200,
  height: 640,
  scene: [Cena1],
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

/*export default class Demo extends Phaser.Scene {



  constructor() {
    super("demo");
  }

  preload() {
    this.load.image("tiles", "./assets/map/output.png");
   // this.load.image("border", "./assets/map/water.png");
    this.load.tilemapTiledJSON("map", "./assets/map/map.json");
  }

  create() {
   // const map = this.make.tilemap({ key: "map" });
    //const tilesetGrass = map.addTilesetImage("grass", "tiles");
   // const tilesetWater = map.addTilesetImage("water", "border");
    this.tiles = this.add.image(0,0,'tiles');
    //const ground = map.createLayer("grass", tilesetGrass, 0, 0);
    //const water = map.createLayer("water", tilesetWater, 0, 0);
    
  }

}*/