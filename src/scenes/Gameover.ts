
export class Gameover extends Phaser.Scene{
    private nameInput: HTMLInputElement | null = null;
    constructor(){
        super({key: 'Gameover'});
    }

    preload(){
        this.load.image('gameover', 'assets/image/game over3.png');
        this.load.image('jogardenovo', 'assets/image/jogardenovo.png');
        this.load.image('sair', 'assets/image/sair.png');
                 
    }

    create(){
        const gameOver = this.add.image(350,100,'gameover').setOrigin(0,0); 
        const jogar = this.add.image(540,370,'jogardenovo').setOrigin(0,0); 
        const sair = this.add.image(540,440,'sair').setOrigin(0,0); 
        gameOver.displayWidth = 564;
        gameOver.displayHeight = 430;
       /* this.nameInput = document.createElement('input');
        this.nameInput.type = 'text';
        this.nameInput.placeholder = 'Digite seu nome';
        this.nameInput.style.position = 'absolute';
        this.nameInput.style.top = '300px'; // Ajuste conforme necessário
        this.nameInput.style.left = '600px'; // Ajuste conforme necessário
        this.nameInput.style.width = '200px';
        this.nameInput.style.padding = '10px';
        this.nameInput.style.fontSize = '16px';
        this.nameInput.style.border = 'none';
        this.nameInput.style.borderRadius = '6px';*/

        // Adiciona o elemento input ao corpo do documento
       // document.body.appendChild(this.nameInput);


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