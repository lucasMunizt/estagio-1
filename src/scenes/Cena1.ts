import { Game, Tilemaps } from "phaser";

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
    MenuMusic: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
    ruby: Phaser.Physics.Arcade.StaticGroup;
    oba: Phaser.GameObjects.Text;
    cronometro: Phaser.GameObjects.Text;
    tempo: number;
    cronometroTexto: Phaser.GameObjects.Text;
    cronometroEvento: Phaser.Time.TimerEvent;
    tempoIniciado: boolean = false;
    enemys: Phaser.Physics.Arcade.StaticGroup;
    platforms1: Phaser.Physics.Arcade.StaticGroup;
    initialFallY: number;
    vida: number;
    txtvida: Phaser.GameObjects.Text;
    hasBeenHit: any;
    temporizadorDestruicao: Phaser.Time.TimerEvent;
    playerPreviousY = 0; 
    temporizadorContato: Phaser.Time.TimerEvent | null = null;
    MAXIMA_ALTURA_QUEDA = 412;
    Velocidade_Minima_Queda = 5; 
    alturaAnteriorJogador = 0;
    jogadorPerdeuVida: boolean;
    tempoContatoNecessario: number;
    touchingEnemy: boolean;
    vilao: PlayerWithJump
    direction: number;
    muro: Phaser.Physics.Arcade.StaticGroup;

    constructor() {
        super('Cena1');
        this.direction = 1;
    }
    
    preload() {
        this.load.image('sky', './maps/mapcidade.jpg');
        this.load.image('platform', './assets/character/chao.png');
        this.load.image('ladder2', './assets/character/ladder2.png');
        this.load.image('wall', './assets/character/plataformas.png');
        this.load.image('muro', './assets/character/parede.png');
        this.load.image('ruby','./assets/character/ruby.png');
        this.load.image('enemy','./assets/character/spikeball.png');
        this.load.spritesheet('estrela', './assets/character/coin.png' , {frameWidth: 16, frameHeight: 16});
        this.load.audio('menuMusic','./assets/music/cena1.mp3');
        this.load.spritesheet('monstro', './assets/character/lobo.png',{ frameWidth: 48, frameHeight: 75 }); //48,75
        this.load.spritesheet('guy', './assets/character/guy.png', { frameWidth: 16, frameHeight: 24 }); //16 24
    }

    create() {
        this.tempoIniciado = false
        let map = this.add.image(0, 0, 'sky').setOrigin(0, 0);
        this.player = this.physics.add.sprite(0, 135, 'guy').setCollideWorldBounds(true).setScale(1.7) as PlayerWithJump;
        this.vilao = this.physics.add.sprite(1100,574, 'monstro').setCollideWorldBounds(true).setScale(1) as PlayerWithJump;
        this.vilao.canjump = true;
        this.vilao.setFrame(1)
        this.vilao.body.setSize(16,32)
        this.player.canjump = true;
        this.player.setFrame(5)
        this.startMoving();

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('guy', {
                start: 5,
                end: 6
            }),
            frameRate: 4,
            repeat: -1
        })
        this.playerPreviousY = this.player.y;

     /*  this.MenuMusic = this.sound.add('menuMusic');
        this.MenuMusic.play({
            volume:0.2,
            loop:true
        });*/


        this.anims.create({
            key:'moveUp',
            frames: this.anims.generateFrameNumbers('guy', {
                start: 13,
                end: 16
            }),
            frameRate:2,
            repeat: -1
        })

      /*  this.anims.create({
            key:'movermonstro',
            frames: this.anims.generateFrameNumbers('monstro', {
                start: 1,
                end: 11
            }),
            frameRate:1,
            repeat: -1
        })?*/



            this.estrelas = this.physics.add.group({
                key:'estrela',
                repeat:16,
                setXY:{
                    x:240,
                    y:-50,
                    stepX:70,
                }
            }) 
                
        
        this.anims.create({
            key:'spin',
            frames: this.anims.generateFrameNumbers('estrela', {
                start: 2,
                end: 8
            }),
            frameRate:8,
            repeat: -1
        })

        this.anims.create({
            key:'test',
            frames: this.anims.generateFrameNumbers('ruby', {
                start: 0,
                end: 1

            }),
            frameRate:8,
            repeat: -1
        })

        //mecher na escala das moedas
        this.estrelas.children.iterate((estrela: Phaser.GameObjects.GameObject) => {
            (estrela as Phaser.Physics.Arcade.Image).setScale(1.3);
            return true; // Indicando que o loop deve continuar
        });

        
        this.control = this.input.keyboard.createCursorKeys();
        this.platforms = this.physics.add.staticGroup();
        this.ladders = this.physics.add.staticGroup();
        this.walls = this.physics.add.staticGroup();
        this.ruby = this.physics.add.staticGroup();
        this.enemys = this.physics.add.staticGroup()
        this.platforms1 = this.physics.add.staticGroup();
        this.muro = this.physics.add.staticGroup();
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
        this.ladders.create(244, 168, 'ladder2').setScale(1, 1).refreshBody();
        this.ladders.create(244, 207, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(244, 259, 'ladder2').setScale(1, 2).refreshBody();
     

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
            this.muro.create(375, i, 'muro').setScale().refreshBody();
            this.platformCoords.push({x:375,y:i})
        }

        // 3 escada 
        this.ladders.create(220, 485, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(220, 517, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(220, 549, 'ladder2').setScale(1, 2).refreshBody();
        this.ladders.create(220, 581, 'ladder2').setScale(1, 1).refreshBody();
        this.ruby.create(320,584,'ruby').setScale(1.4)
        
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
        for (let i = 1015; i < 1208; i += 32) {
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
            this.platforms1.create(i, 645, 'platform').setScale(3).refreshBody();
            this.platformCoords.push({x:i,y:645})
        }

        this.ruby.create(1180,584,'ruby').setScale(1.4)
        
        this.estrelas.children.iterate((c) => {
            const sprite = c as Phaser.Physics.Arcade.Sprite;
            sprite.anims.play('spin', true)
            sprite.setTexture('estrela');
            sprite.setBounceY(0.4);
            return true;
        });

        this.vida = 100
        this.score = 0
        this.tempo = 50
        this.txt = this.add.text(15,10,`SCORE:  ${this.score}`,{fontSize:"18px"}).setShadow(0,0,'#000',5);
        this.txtvida = this.add.text(700,10,`VIDA:${this.vida}`, { fontSize: "18px", color: "#000" });
        this.cronometroTexto = this.add.text(600, 10, `TIME: ${this.tempo}`, { fontSize: "18px", color: "#000" }).setShadow(0, 0, '#000', 5);

        this.setScore()
        this.physics.add.collider(this.vilao,this.platforms1);
        this.physics.add.collider(this.player, this.platforms);
        this.physics.add.collider(this.estrelas, this.platforms);
        this.physics.add.overlap(this.estrelas,this.player,this.colectCoin,null,this);
        this.physics.add.overlap(this.ruby,this.player,this.colectRuby,null,this);
        this.physics.add.collider(this.enemys,this.player,this.handleEnemyCollision,null,this);
        this.physics.add.collider(this.player,this.platforms1,this.setVida,null,this);
        this.physics.add.collider(this.player,this.vilao,this.gameOver,null,this);
        this.physics.add.collider(this.player,this.muro);

       // this.physics.add.collider(this.player, this.enemys, this.endColiderEnemys, null, this);

     //   this.enemys.create(150,135,'enemy').setScale().setVisible(false).setBounceY(1);

      //  this.enemys.create(746,500,'enemy').setScale().setVisible(false);
       // this.enemys.create(1100,580,'enemy').setScale().setVisible(false);
       this.vilao.play('walkDown');
    }
    startMoving() {
        this.vilao.setVelocityX(100 * this.direction);
    }

    handleEnemyCollision(player: Phaser.Types.Physics.Arcade.GameObjectWithBody, enemy: Phaser.Types.Physics.Arcade.GameObjectWithBody) {
        if (!this.touchingEnemy) {
            this.touchingEnemy = true;
            this.vida -= 20; // Aplica o dano imediatamente
            this.txtvida.setText('Vida: ' + this.vida); // Atualiza o texto de vida
    
            // Torna o inimigo invisível
            this.enemys.setVisible(true);
            //enemy.body.enable = false;
    
            // Configura um temporizador de 5 segundos para destruir o inimigo
            this.time.delayedCall(5000, () => {
                enemy.destroy();
            }, [], this);
    
            // Verifica se a vida do jogador chegou a zero
            if (this.vida <= 0) {
                this.gameOver(); // Chama gameOver se a vida for menor ou igual a 0
            }
    
            // Temporizador para permitir novo contato com o inimigo
            this.temporizadorContato = this.time.delayedCall(this.tempoContatoNecessario, () => {
                this.touchingEnemy = false;
            }, [], this);
        }
    } 
    
    
    colidiuComPlataforma = false; 
        setVida() {

            const alturaJogador = this.player.y;
            const caindo = alturaJogador > this.alturaAnteriorJogador;
            const velocidadeQueda = caindo ? alturaJogador - this.alturaAnteriorJogador : 0;
            
            this.alturaAnteriorJogador = alturaJogador;

            // Verifica se o jogador colidiu com uma plataforma pela primeira vez
            if (!this.colidiuComPlataforma) {
                this.colidiuComPlataforma = true;
                return; // Não faz nada na primeira colisão
            }

            // Verifica se a velocidade de queda é suficiente para perder vida
            if (velocidadeQueda >= this.Velocidade_Minima_Queda) {
                this.vida -= 50;
                this.setVidan();
            }
            if(this.vida == 0){
                this.gameOver();
            }
        }
            // Verifica se a vida chegou a zero para encerrar o jogo
        
        
        
     setVidan(){
        this.txtvida.setText(`Vida:  ${this.vida}`)
     }   
  


    setScore(){
       //this.txt.setText(this.estrelas.countActive(true) > 9 ?`SCORE:  ${this.score}`:`0 ${this.score}`)
       this.txt.setText(`SCORE:  ${this.score}`)
    }

    setTime(){
        this.cronometro.setText(`TIME:  ${this.tempo}`)
    }
 
    colectCoin( player: PlayerWithJump,estrela:Phaser.Physics.Arcade.Sprite){
        estrela.destroy();
        this.score +=10;
        this.setScore();
        this.physics.world.gravity.y = 850;
    }

    colectRuby(player:PlayerWithJump,ruby:Phaser.Physics.Arcade.Image){
        ruby.destroy();
        this.score +=20;
        console.log(this.score)
        this.setScore();
    }

    
    atualizarCronometro() {

        this.tempo--;

        this.cronometroTexto.setText(`TIME: ${this.tempo}`);

        if (this.tempo <= 0) {
           
            this.gameOver();
        }
    }

    resetTimer() {
        // Reinicia o tempo
        this.tempo = 50;
        // Atualiza o texto do cronômetro
        this.cronometroTexto.setText(`TIME: ${this.tempo}`);
        // Cancela o evento do cronômetro se estiver ativo
        if (this.cronometroEvento) {
            this.cronometroEvento.destroy();
        }
        // Inicia novamente o evento do cronômetro
        this.cronometroEvento = this.time.addEvent({
            delay: 1000,
            callback: this.atualizarCronometro,
            callbackScope: this,
            loop: true
        });
    }
    
    gameOver() {  
       if(this.vida == 0){
        this.scene.launch('Gameover')
        
       }
       console.log("fim do jogo ")
       this.scene.launch('Gameover')
       this.scene.pause();
       this.resetTimer();
    }
    
    update() {
        if(this.vida == 0 || this.vida < 0){
            this.scene.launch('Gameover')
            
           }

        if (this.vilao.body.blocked.right) {
           // this.vilao.play('movermonstro');
            this.direction = -1; 
        } 
        else if (this.physics.collide(this.vilao,this.muro)) {
         //   this.vilao.play('movermonstro');
            this.direction = 1; 
        }

        this.vilao.setVelocityX(100 * this.direction);
    
        this.startMoving() 
        if (!this.tempoIniciado && (this.control.left.isDown || this.control.right.isDown)) {
            // O personagem começou a se mover, comece o cronômetro
            this.tempoIniciado = true;
            // Crie um evento de tempo que será chamado a cada segundo
            this.cronometroEvento = this.time.addEvent({
                delay: 1000, // 1000ms = 1 segundo
                callback: this.atualizarCronometro,
                callbackScope: this,
                loop: true
            });
        }

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