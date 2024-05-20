export class Gameover extends Phaser.Scene{

    constructor(){
        super({key: 'Gameover'});
    }

    preload(){
        this.load.image('gameover', 'assets/image/gameover.png');
        this.load.image('jogardenovo', 'assets/image/jogardenovo.png');
        this.load.image('sair', 'assets/image/sair.png');
                 
    }

    create(){
        const gameOver = this.add.image(350,100,'gameover').setOrigin(0,0); 
        const jogar = this.add.image(540,330,'jogardenovo').setOrigin(0,0); 
        const sair = this.add.image(540,410,'sair').setOrigin(0,0); 
        gameOver.displayWidth = 564;
        gameOver.displayHeight = 430;

       jogar.setInteractive();
       sair.setInteractive();
        jogar.on("pointerdown",()=>{
            this.scene.start('Cena1');
        });
        sair.on("pointerdown",()=>{
        
            this.scene.start('Menu');
        });
    }

}