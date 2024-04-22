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
        // map.displayWidth = 800;
        //map.displayHeight = 40;
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
            key: 'estrela',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        this.estrelas.children.iterate((child: Phaser.Physics.Arcade.Sprite): boolean => {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
            return true;
        });
        
        this.control = this.input.keyboard.createCursorKeys();
        this.platforms = this.physics.add.staticGroup();
        this.ladders = this.physics.add.staticGroup();
        this.walls = this.physics.add.staticGroup();


        // 1 plataforma superior  inicio do jogo
        for (let i = 17; i < 210; i += 32) {

            this.platforms.create(i, 170, 'wall').setScale().refreshBody();
        }

        // 4 unica plataforma da esquerda para direita
        this.platforms.create(350, 170, 'wall').setScale().refreshBody();
        this.platforms.create(382, 170, 'wall').setScale().refreshBody();

        //1 escadas superio a esquerda para direita aumenta 50 168
        this.ladders.create(242, 168, 'ladder2').setScale(1, 1).refreshBody();
        this.ladders.create(242, 207, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(242, 259, 'ladder2').setScale(1, 2).refreshBody();

        // 2  plataforma a baixo da escada a esquerda para direita

        for (let i = 240; i < 368; i += 32) {

            this.platforms.create(i, 300, 'wall').setScale().refreshBody();
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
        }

        // 5 plataforma da esquerda para direita 
        this.platforms.create(500, 485, 'wall').setScale().refreshBody();
        this.platforms.create(532, 485, 'wall').setScale().refreshBody();

        // 1 parede ligado ao chão antes platform 
        for (let i = 500; i < 617; i += 32) {
            this.platforms.create(375, i, 'muro').setScale().refreshBody();
        }

        // 3 escada 
        this.ladders.create(220, 485, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(220, 517, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(220, 549, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(220, 581, 'ladder2').setScale(1, 1).refreshBody();

        // fim do jogo 1 plataforma a partir 
        for (let i = 534; i < 662; i += 32) {
            this.platforms.create(i, 120, 'wall').setScale().refreshBody();
        }


        // 2 plataforma
        for (let i = 620; i < 718; i += 32) {
            this.platforms.create(i, 295, 'wall').setScale().refreshBody();
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

        // 2 escada
        this.ladders.create(646, 452, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(646, 490, 'ladder2').setScale(1, 1.8).refreshBody();

        // 4 plataforma
        for (let i = 650; i < 950; i += 32) {
            this.platforms.create(i, 530, 'wall').setScale().refreshBody();
        }

        // 5 plataforma
        for (let i = 932; i < 1028; i += 32) {
            this.platforms.create(i, 440, 'wall').setScale().refreshBody();
        }

        // 3 escada
        this.ladders.create(905, 452, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(905, 490, 'ladder2').setScale(1, 1.8).refreshBody();

        // 6 plataforma
        for (let i = 1015; i < 1200; i += 32) {
            this.platforms.create(i, 230, 'wall').setScale().refreshBody();
        }

        // 4 escada

        this.ladders.create(986, 240, 'ladder2').setScale(1,1.8).refreshBody();
        this.ladders.create(986, 286, 'ladder2').setScale(1,1.8).refreshBody();
        this.ladders.create(986, 332, 'ladder2').setScale(1,1.8).refreshBody();
        this.ladders.create(986, 378, 'ladder2').setScale(1,1.8).refreshBody();
        this.ladders.create(986, 414, 'ladder2').setScale(1).refreshBody();
      // platafoma chão
        for (let i = 40; i < 1221; i += 90) {
            this.platforms.create(i, 645, 'platform').setScale(3).refreshBody();
        }



        this.physics.add.collider(this.player, this.platforms);

        
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
            this.physics.world.gravity.y = 200;
        }
    }
}

