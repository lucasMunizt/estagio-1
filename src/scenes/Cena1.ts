import { Game } from "phaser";

interface PlayerWithJump extends Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    canjump: boolean;
}
export class Cena1 extends Phaser.Scene {
    control: Phaser.Types.Input.Keyboard.CursorKeys;
    player: PlayerWithJump;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    ladders: Phaser.Physics.Arcade.StaticGroup;
    walls: Phaser.Physics.Arcade.StaticGroup;
    estrelas: Phaser.Physics.Arcade.Group;
    platformCoords: { x: number, y: number }[] = [];
    score: number
    txt: Phaser.GameObjects.Text;
  

    constructor() {
        super('Cena1');
    }
    
    preload() {
        this.load.image('sky', './maps/mapcidade.jpg');
        this.load.image('platform', './assets/character/industrialTile_81.png');
        this.load.image('platform1', './assets/character/obj_box005.png');
        this.load.image('ladder', './assets/character/ladder1.png');
        this.load.image('ladder2', './assets/character/ladder2.png');
        this.load.image('wall', './assets/character/industrialTile_25.png');
        this.load.image('muro', './assets/character/industrialTile_03.png');
        this.load.image('estrela', './assets/character/estrela.png');
        //this.load.audio('menuMusic','./assets/music/Menumusic.mp3')

        this.load.spritesheet('guy', './assets/character/guy.png', { frameWidth: 16, frameHeight: 24 }); //16 24
    }

    create() {
        let map = this.add.image(0, 0, 'sky').setOrigin(0, 0);
        this.player = this.physics.add.sprite(0, 135, 'guy').setCollideWorldBounds(true).setScale(1.7) as PlayerWithJump;
        this.player.canjump = true;
        this.player.setFrame(5)
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('guy', {
                start: 5,
                end: 6
            }),
            frameRate: 4,
            repeat: -1
        })

        this.anims.create({
            key:'moveUp',
            frames: this.anims.generateFrameNumbers('guy', {
                start: 13,
                end: 16
            }),
            frameRate:2,
            repeat: -1
        })

        this.estrelas = this.physics.add.group({
            key:'estrela',
            repeat:15,
            setXY:{
                x:240,
                y:-50,
                stepX:70,
                scale:2022
            }
        })
        this.estrelas.children.iterate((estrela: Phaser.GameObjects.GameObject) => {
            (estrela as Phaser.Physics.Arcade.Image).setScale(1.3);
            return true; // Indicando que o loop deve continuar
        });
        //this.estrelas = this.physics.add.group();
        this.control = this.input.keyboard.createCursorKeys();
        this.platforms = this.physics.add.staticGroup();
        this.ladders = this.physics.add.staticGroup();
        this.walls = this.physics.add.staticGroup();

        /*for (let i = 0; i < 15; i++) {
            const x = Phaser.Math.Between(240, this.physics.world.bounds.width);
            const y = Phaser.Math.Between(0, this.physics.world.bounds.height);
            const estrelas = this.physics.add.sprite(x, y, 'estrela').setScale(1.3);
            this.estrelas.add(estrelas);
            
        }*/
          
       
        // 1 plataforma superior  inicio do jogo
        for (let i = 17; i < 210; i += 32) {

            this.platforms.create(i, 170, 'wall').setScale().refreshBody();
            this.platformCoords.push({ x: i, y: 170 });
        }

        // 4 unica plataforma da esquerda para direita
        this.platforms.create(350, 170, 'wall').setScale().refreshBody();
        this.platforms.create(382, 170, 'wall').setScale().refreshBody();
        this.platformCoords.push({x:350,y:170})
        this.platformCoords.push({x:382,y:170})

        //1 escadas superio a esquerda para direita aumenta 50 168
        this.ladders.create(242, 168, 'ladder2').setScale(1, 1).refreshBody();
        this.ladders.create(242, 207, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(242, 259, 'ladder2').setScale(1, 2).refreshBody();
     

        // 2  plataforma a baixo da escada a esquerda para direita

        for (let i = 240; i < 368; i += 32) {

            this.platforms.create(i, 300, 'wall').setScale().refreshBody();
            this.platformCoords.push({x:i,y:300})
        }

        // 2 escadas
        this.ladders.create(370, 310, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(370, 342, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(370, 374, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(370, 406, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(370, 440, 'ladder2').setScale(1, 1).refreshBody();

        // 3 platafoma da direita para esquerda
        for (let i = 253; i < 407; i += 32) {
            this.platforms.create(i, 470, 'wall').setScale().refreshBody();
            this.platformCoords.push({x:i,y:470})
        }

        // 5 plataforma da esquerda para direita 
        this.platforms.create(500, 485, 'wall').setScale().refreshBody();
        this.platforms.create(532, 485, 'wall').setScale().refreshBody();
        this.platformCoords.push({x:500,y:485})
        this.platformCoords.push({x:532,y:485})

        // 1 parede ligado ao chão antes platform 
        for (let i = 500; i < 617; i += 32) {
            this.platforms.create(375, i, 'muro').setScale().refreshBody();
            this.platformCoords.push({x:375,y:i})
        }

        // 3 escada 
        this.ladders.create(220, 485, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(220, 517, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(220, 549, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(220, 581, 'ladder2').setScale(1, 1).refreshBody();

        // fim do jogo 1 plataforma a partir 
        for (let i = 534; i < 662; i += 32) {
            this.platforms.create(i, 120, 'wall').setScale().refreshBody();
            this.platformCoords.push({x:i,y:120})
        }


        // 2 plataforma
        for (let i = 620; i < 718; i += 32) {
            this.platforms.create(i, 295, 'wall').setScale().refreshBody();
            this.platformCoords.push({x:i,y:295})
        }

        // 1 escada 
        this.ladders.create(748, 305, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(748, 337, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(748, 369, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(748, 401, 'ladder2').setScale(1, 1.8).refreshBody();

        // 3 plataforma
        
        this.platforms.create(677, 440, 'wall').setScale().refreshBody();
        this.platforms.create(709, 440, 'wall').setScale().refreshBody();
        this.platforms.create(741, 440, 'wall').setScale().refreshBody();
        this.platformCoords.push({x:677,y:440})
        this.platformCoords.push({x:709,y:440})
        this.platformCoords.push({x:741,y:440})

        // 2 escada
        this.ladders.create(646, 452, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(646, 490, 'ladder2').setScale(1, 1.8).refreshBody();

        // 4 plataforma
        for (let i = 650; i < 950; i += 32) {
            this.platforms.create(i, 530, 'wall').setScale().refreshBody();
            this.platformCoords.push({x:i,y:530})
        }

        // 5 plataforma
        for (let i = 932; i < 1028; i += 32) {
            this.platforms.create(i, 440, 'wall').setScale().refreshBody();
            this.platformCoords.push({x:i,y:440})
        }

        // 3 escada
        this.ladders.create(903, 452, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(903, 490, 'ladder2').setScale(1, 1.8).refreshBody();

        // 6 plataforma
        for (let i = 1015; i < 1200; i += 32) {
            this.platforms.create(i, 230, 'wall').setScale().refreshBody();
            this.platformCoords.push({x:i,y:230})
        }

        // 4 escada

        this.ladders.create(984, 240, 'ladder2').setScale(1,1.8).refreshBody();
        this.ladders.create(984, 286, 'ladder2').setScale(1,1.8).refreshBody();
        this.ladders.create(984, 332, 'ladder2').setScale(1,1.8).refreshBody();
        this.ladders.create(984, 378, 'ladder2').setScale(1,1.8).refreshBody();
        this.ladders.create(984, 414, 'ladder2').setScale(1).refreshBody();
      // platafoma chão
        for (let i = 40; i < 1221; i += 90) {
            this.platforms.create(i, 645, 'platform').setScale(3).refreshBody();
            this.platformCoords.push({x:i,y:645})
        }

        
        this.estrelas.children.iterate((c) => {
            const sprite = c as Phaser.Physics.Arcade.Sprite;
            sprite.setTexture('estrela');
            sprite.setBounceY(0.4);
            return true;
        });
            
        this.score = 0
        this.txt = this.add.text(15,10,`SCORE:  ${this.score}`,{fontSize:"18px"}).setShadow(0,0,'#000',5)
        this.setScore()
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.estrelas, this.platforms);
        
        this.physics.add.overlap(this.estrelas,this.player,this.colectStar,null,this);
            
    }
    setScore(){
       //this.txt.setText(this.estrelas.countActive(true) > 9 ?`SCORE:  ${this.score}`:`0 ${this.score}`)
       this.txt.setText(`SCORE:  ${this.score}`)
    }


    colectStar( player: PlayerWithJump,  estrela:Phaser.Physics.Arcade.Sprite){
        estrela.destroy();
        this.score +=10;
        this.setScore();
        this.physics.world.gravity.y = 850;
    }
    update() {
        if (this.physics.overlap(this.player, this.ladders)) {
            
            this.player.setDepth(1000);
            this.physics.world.gravity.y = 0;
            this.player.setVelocityX(0);
           if (this.control.right.isDown) {
            this.player.flipX = false;
            this.player.anims.play('walk', true);
            this.player.setVelocityX(100);
        } else if (this.control.left.isDown) {
            this.player.flipX = true;
            this.player.anims.play('walk', true);
            this.player.setVelocityX(-100);
        }
           
           
           if (this.control.up.isDown) {
                this.player.anims.play('moveUp', true);
                this.player.setVelocityY(-150);
            } else if (this.control.down.isDown) {
                this.player.anims.play('moveUp', true);
                this.player.setVelocityY(150);
            } else {
                this.player.setVelocityY(0);
                this.player.setFrame(13);
            }
        } else if (this.physics.overlap(this.player, this.platforms)) {
           
            if (this.control.right.isDown) {
                this.player.flipX = false;
                this.player.anims.play('walk', true);
                this.player.setVelocityX(100);
            } else if (this.control.left.isDown) {
                this.player.flipX = true;
                this.player.anims.play('walk', true);
                this.player.setVelocityX(-100);
            } else {
                this.player.setVelocityX(0);
                this.player.setFrame(1);
            }
        } else {
            if (this.control.left.isDown) {
                this.player.flipX = true;
                this.player.anims.play('walk', true);
                this.player.setVelocityX(-150);
            } else if (this.control.right.isDown) {
                this.player.flipX = false;
                this.player.anims.play('walk', true);
                this.player.setVelocityX(150);
            } else if (this.control.space.isDown && this.player.canjump && this.player.body.touching.down) {
                this.player.setVelocityY(-400);
                this.player.canjump = false;
            } else if (!this.control.space.isDown &&!this.player.canjump && this.player.body.touching.down) {
                this.player.canjump = true;
            } else {
                this.player.setVelocityX(0);
                this.player.setFrame(1);
            }
            this.physics.world.gravity.y = 850;
        }
        this.estrelas.children.iterate((estrela: Phaser.GameObjects.GameObject) => {
            (estrela.body as Phaser.Physics.Arcade.Body).gravity.y = 850; // Altere este valor conforme necessário
            return true;
        });
    }
}



