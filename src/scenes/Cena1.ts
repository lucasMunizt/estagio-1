interface PlayerWithJump extends Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    canjump: boolean;
}
export class Cena1 extends Phaser.Scene{
    control: Phaser.Types.Input.Keyboard.CursorKeys;
    player: PlayerWithJump;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    ladders: Phaser.Physics.Arcade.StaticGroup;
    walls: Phaser.Physics.Arcade.StaticGroup;
   
    constructor(){
        super('Cena1');
    }

    preload() {
        this.load.image('sky', './assets/map/mapcidade.jpg');
        //this.load.tilemapTiledJSON('map', './assets/map/map1.json');
        this.load.image('platform', './assets/character/industrialTile_81.png');
        this.load.image('ladder', './assets/character/ladder1.png');
        this.load.image('wall', './assets/character/industrialTile_25.png');
        
        
        this.load.spritesheet('guy', './assets/character/guy.png',{frameWidth: 16, frameHeight: 25});
    }
  
    create() {
        let map = this.add.image(0,0,'sky').setOrigin(0,0);
       // map.displayWidth = 800;
        //map.displayHeight = 40;
        this.player = this.physics.add.sprite(0,100,'guy').setCollideWorldBounds(true).setScale(2) as PlayerWithJump;;
        this.player.canjump = true;
        this.player.setFrame(1)
        this.control = this.input.keyboard.createCursorKeys();  
        this.platforms = this.physics.add.staticGroup();
        this.ladders = this.physics.add.staticGroup();
        this.walls = this.physics.add.staticGroup();

        // 1 plataforma superior  inicio do jogo
        this.platforms.create(0,100,'platform').setScale(2).refreshBody();
        this.platforms.create(30,100,'platform').setScale(2).refreshBody();
        this.platforms.create(60,100,'platform').setScale(2).refreshBody();
        this.platforms.create(90,100,'platform').setScale(2).refreshBody();
        this.platforms.create(152,100,'platform').setScale(2).refreshBody();
        this.platforms.create(210,100,'platform').setScale(2).refreshBody();
      
        // 4 unica plataforma da esquerda para direita
        this.platforms.create(350,100,'platform').setScale(2).refreshBody();
        this.platforms.create(410,100,'platform').setScale(2).refreshBody();
      
        //1 escadas superio a esquerda para direita aumenta 50
        this.ladders.create(230,130,'ladder').setScale(1,2).refreshBody(); 
        this.ladders.create(230,180,'ladder').setScale(1,2).refreshBody(); 
        this.ladders.create(230,230,'ladder').setScale(1,2).refreshBody(); 

        
        // 2  plataforma a baixo da escada a esquerda para direita
        this.platforms.create(240,295,'platform').setScale(2).refreshBody();
        this.platforms.create(300,295,'platform').setScale(2).refreshBody();
        this.platforms.create(360,295,'platform').setScale(2).refreshBody();
        
        // 2 escadas
        this.ladders.create(380,320,'ladder').setScale(1,2).refreshBody();
        this.ladders.create(380,370,'ladder').setScale(1,2).refreshBody();
        this.ladders.create(380,420,'ladder').setScale(1,2).refreshBody();

        // 3 platafoma da direita para esquerda
        this.platforms.create(360,485,'platform').setScale(2).refreshBody();
        this.platforms.create(310,485,'platform').setScale(2).refreshBody();
        this.platforms.create(250,485,'platform').setScale(2).refreshBody();

        // 5 plataforma da esquerda para direita 
        this.platforms.create(500,485,'platform').setScale(2).refreshBody();
         
        //parede ligado ao chão
        this.platforms.create(375,500,'wall').setScale(1).refreshBody();
        this.platforms.create(375,530,'wall').setScale(1).refreshBody();
        this.platforms.create(375,560,'wall').setScale(1).refreshBody();
        this.platforms.create(375,585,'wall').setScale(1).refreshBody();

        // 3 escada 
        this.ladders.create(237,510,'ladder').setScale(1,2).refreshBody(); 
        this.ladders.create(237,560,'ladder').setScale(1,2).refreshBody(); 

        // fim do jogo 1 plataforma a partir 
        this.platforms.create(570,100,'platform').setScale(2).refreshBody();
        this.platforms.create(630,100,'platform').setScale(2).refreshBody();
        this.platforms.create(693,100,'platform').setScale(2).refreshBody();
        
        // 2 plataforma
        this.platforms.create(510,230,'platform').setScale(2).refreshBody();
        this.platforms.create(570,230,'platform').setScale(2).refreshBody();
        this.platforms.create(630,230,'platform').setScale(2).refreshBody();

        // 1 escada 
        this.ladders.create(650,260,'ladder').setScale(1,2).refreshBody(); 
        this.ladders.create(650,320,'ladder').setScale(1,2).refreshBody(); 
        
        // 3 plataforma
       this.platforms.create(665,385,'platform').setScale(2).refreshBody();
       this.platforms.create(729,385,'platform').setScale(2).refreshBody();

        // 2 escada
        this.ladders.create(650,417,'ladder').setScale(1,2).refreshBody(); 
        this.ladders.create(650,479,'ladder').setScale(1,2).refreshBody(); 

        // 4 plataforma
        this.platforms.create(663,514,'platform').setScale(2).refreshBody();
        this.platforms.create(727,514,'platform').setScale(2).refreshBody();
        this.platforms.create(763,514,'platform').setScale(2).refreshBody();
        this.platforms.create(826,514,'platform').setScale(2).refreshBody();
        this.platforms.create(889,514,'platform').setScale(2).refreshBody();
        this.platforms.create(923,514,'platform').setScale(2).refreshBody();
        this.platforms.create(950,514,'platform').setScale(2).refreshBody();

        // 5 plataforma
        this.platforms.create(900,385,'platform').setScale(2).refreshBody();
        this.platforms.create(964,385,'platform').setScale(2).refreshBody();
        this.platforms.create(1025,385,'platform').setScale(2).refreshBody();

        // 3 escada
        this.ladders.create(964,415,'ladder').setScale(1,2).refreshBody();
        this.ladders.create(964,450,'ladder').setScale(1,2).refreshBody();

        // 6 plataforma
        this.platforms.create(1015,230,'platform').setScale(2).refreshBody();
        this.platforms.create(1072,230,'platform').setScale(2).refreshBody();
        this.platforms.create(1136,230,'platform').setScale(2).refreshBody();
        this.platforms.create(1200,230,'platform').setScale(2).refreshBody();

        // 4 escada
        this.ladders.create(1000,260,'ladder').setScale(1,2).refreshBody();
        this.ladders.create(1000,320,'ladder').setScale(1,2).refreshBody();



        // platafoma chão
        for (let i = 40; i < 1221; i+=90) {
            this.platforms.create(i,645,'platform').setScale(3).refreshBody();
        }

        this.physics.add.collider(this.player, this.platforms);
    }
    
    update() {
        if (this.control.left.isDown) {
            this.player.setVelocityX(-150);
        }else if(this.control.right.isDown){
            this.player.setVelocityX(150);
        }else if (this.control.space.isDown && this.player.canjump && this.player.body.touching.down ) {
            this.player.setVelocityY(-400);
            this.player.canjump = false;
        }else if(!this.control.up.isDown && !this.player.canjump && this.player.body.touching.down){
            this.player.canjump = true;
        
        }
        else{
            this.player.setVelocityX(0);
        }
    }
  
}