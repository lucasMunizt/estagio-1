export class Gameover extends Phaser.Scene{
    constructor(){
        super({key: 'Gameover'});
    }

    preload(){
        this.load.image('gameover', 'assets/image/gameover3.png');
        this.load.image('jogardenovo', 'assets/image/jogardenovo.png');
        this.load.image('sair', 'assets/image/sair.png');
                 
    }

    create(){
        this.scene.stop('Name')
        const gameOver = this.add.image(350,100,'gameover').setOrigin(0,0); 
        const jogar = this.add.image(540,370,'jogardenovo').setOrigin(0,0); 
        const sair = this.add.image(540,440,'sair').setOrigin(0,0); 
      
     
       jogar.setInteractive();
       sair.setInteractive();
        jogar.on("pointerdown",()=>{
            this.scene.start('Cena1');
        });
        sair.on("pointerdown",()=>{
            this.scene.stop('Cena1');
            this.scene.start('Menu');
        });
    }
    
}