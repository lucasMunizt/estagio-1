interface PlayerWithJump extends Phaser.Types.Physics.Arcade.SpriteWithDynamicBody {
    canjump: boolean;
}
export class Cena1 extends Phaser.Scene {
    control: Phaser.Types.Input.Keyboard.CursorKeys;
    player: PlayerWithJump;
    platforms: Phaser.Physics.Arcade.StaticGroup;
    ladders: Phaser.Physics.Arcade.StaticGroup;
    walls: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super('Cena1');
    }

    preload() {
        this.load.image('sky', './maps/mapcidade.jpg');
        this.load.image('platform', './assets/character/industrialTile_81.png');
        this.load.image('platform1', './assets/character/obj_box005.png');
        this.load.image('ladder', './assets/character/ladder1.png');
        this.load.image('wall', './assets/character/industrialTile_25.png');
        this.load.image('muro', './assets/character/industrialTile_03.png');
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
            frameRate: 6,
            repeat: -1
        })

        this.control = this.input.keyboard.createCursorKeys();
        this.platforms = this.physics.add.staticGroup();
        this.ladders = this.physics.add.staticGroup();
        this.walls = this.physics.add.staticGroup();


        // 1 plataforma superior  inicio do jogo
        for (let i = 17; i < 242; i += 32) {

            this.platforms.create(i, 170, 'wall').setScale().refreshBody();
        }

        // 4 unica plataforma da esquerda para direita
        this.platforms.create(350, 170, 'wall').setScale().refreshBody();
        this.platforms.create(382, 170, 'wall').setScale().refreshBody();

        //1 escadas superio a esquerda para direita aumenta 50
        this.ladders.create(245, 250, 'ladder').setScale(1, 2).refreshBody();
        this.ladders.create(245, 200, 'ladder').setScale(1, 2).refreshBody();

        // 2  plataforma a baixo da escada a esquerda para direita

        for (let i = 240; i < 432; i += 32) {

            this.platforms.create(i, 300, 'wall').setScale().refreshBody();
        }

        // 2 escadas
        this.ladders.create(380, 328, 'ladder').setScale(1, 2).refreshBody();
        this.ladders.create(380, 392, 'ladder').setScale(1, 2).refreshBody();
        this.ladders.create(380, 420, 'ladder').setScale(1, 2).refreshBody();

        // 3 platafoma da direita para esquerda
        for (let i = 215; i < 407; i += 32) {
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
        this.ladders.create(220, 510, 'ladder').setScale(1, 2).refreshBody();
        this.ladders.create(220, 570, 'ladder').setScale(1, 2).refreshBody();

        // fim do jogo 1 plataforma a partir 
        for (let i = 534; i < 662; i += 32) {
            this.platforms.create(i, 120, 'wall').setScale().refreshBody();
        }


        // 2 plataforma
        for (let i = 650; i < 842; i += 32) {
            this.platforms.create(i, 295, 'wall').setScale().refreshBody();
        }

        // 1 escada 
        this.ladders.create(748, 330, 'ladder').setScale(1, 2).refreshBody();
        this.ladders.create(748, 395, 'ladder').setScale(1, 2).refreshBody();

        // 3 plataforma
        this.platforms.create(645, 440, 'wall').setScale().refreshBody();
        this.platforms.create(677, 440, 'wall').setScale().refreshBody();
        this.platforms.create(709, 440, 'wall').setScale().refreshBody();
        this.platforms.create(741, 440, 'wall').setScale().refreshBody();

        // 2 escada
        this.ladders.create(648, 480, 'ladder').setScale(1, 2).refreshBody();

        // 4 plataforma
        for (let i = 650; i < 950; i += 32) {
            this.platforms.create(i, 530, 'wall').setScale().refreshBody();
        }

        // 5 plataforma
        for (let i = 900; i < 1028; i += 32) {
            this.platforms.create(i, 440, 'wall').setScale().refreshBody();
        }

        // 3 escada
        this.ladders.create(905, 480, 'ladder').setScale(1, 2).refreshBody();


        // 6 plataforma
        for (let i = 983; i < 1200; i += 32) {
            this.platforms.create(i, 230, 'wall').setScale().refreshBody();
        }

        // 4 escada
        for (let i = 250; i < 440; i += 32) {
            this.platforms.create(986, i, 'ladder').setScale().refreshBody();
        }

        // platafoma chão
        for (let i = 40; i < 1221; i += 90) {
            this.platforms.create(i, 645, 'platform').setScale(3).refreshBody();
        }



        this.physics.add.collider(this.player, this.platforms);

        this.physics.add.overlap(this.player, this.ladders, () => {
            this.player.setVelocityX(0);
            this.player.setVelocityY(0);
        });
    }

   /* update() {
        // Verifica se o personagem está sobre uma escada
        const onLadder = this.physics.overlap(this.player, this.ladders);

        if (this.control.left.isDown) {
            this.player.flipX = true;
            this.player.anims.play('walk', true);
            this.player.setVelocityX(-150);
        }
        else if (this.control.right.isDown) {
            this.player.flipX = false;
            this.player.anims.play('walk', true);
            this.player.setVelocityX(150);
        }
        else {
            this.player.setVelocityX(0);
            this.player.setFrame(1);
        }

        // Se o personagem estiver sobre uma escada, permite o movimento vertical
        if (onLadder) {
            this.player.setVelocityX(0); // Impede o movimento horizontal
            if (this.control.up.isDown) {
                this.player.setVelocityY(-150);
            } else if (this.control.down.isDown) {
                this.player.setVelocityY(150);
            } else {
                this.player.setVelocityY(0); // Mantém o personagem parado na escada
            }
        } 

        
        
    
        else if (this.control.space.isDown && this.player.canjump && this.player.body.touching.down ) {
            this.player.setVelocityY(-400);
            this.player.canjump = false;
        }
        else if(!this.control.up.isDown && !this.player.canjump && this.player.body.touching.down){
            this.player.canjump = true;
        }

        // Verifica se o personagem pode subir novamente ao tocar o chão
        if (!this.player.body.touching.down && !onLadder) {
            this.player.canjump = false;
        }

        else {
            this.player.canjump = true;
        }

    }*/
    update() {
        // Verifica se o personagem está sobre uma escada
        const onLadder = this.physics.overlap(this.player, this.ladders);
    
        // Controle do movimento horizontal
        if (this.control.left.isDown) {
            this.player.flipX = true;
            this.player.anims.play('walk', true);
            this.player.setVelocityX(-150);
        }
        else if (this.control.right.isDown) {
            this.player.flipX = false;
            this.player.anims.play('walk', true);
            this.player.setVelocityX(150);
        }
        else {
            this.player.setVelocityX(0);
            this.player.setFrame(1);
        }
    
        // Se o personagem estiver sobre uma escada, permite o movimento vertical
        if (onLadder) {
            if (this.control.up.isDown) {
                this.player.setVelocityY(-150);
            } else if (this.control.down.isDown) {
                this.player.setVelocityY(150);
            } else {
                this.player.setVelocityY(0); // Mantém o personagem parado na escada
            }
            // Ajusta a posição do jogador para o centro da escada
            this.player.x = this.ladders.getFirst(true).x;
        } else {
            // Aplica a gravidade normalmente se não estiver na escada
            this.player.setGravityY(300);
        }
    
        // Controle de pulo apenas se não estiver na escada
        if (!onLadder && this.control.space.isDown && this.player.canjump && this.player.body.touching.down) {
            this.player.setVelocityY(-400);
            this.player.canjump = false;
        } else if (!this.control.up.isDown && !this.player.canjump && this.player.body.touching.down) {
            this.player.canjump = true;
        }
    
        // Verifica se o personagem pode subir novamente ao tocar o chão
        if (!this.player.body.touching.down && !onLadder) {
            this.player.canjump = false;
        } else {
            this.player.canjump = true;
        }
    
        // Ajusta a posição do jogador para o início da plataforma superior
       
    }
    
}

