export class Tutorial extends Phaser.Scene{
    constructor(){
        super({key: 'Tutorial'});
    }

    preload(){
        this.load.image('tutorial', 'assets/image/tutorial.png');
        this.load.image('voltar', 'assets/image/voltar.png');
        this.load.image('iniciar', 'assets/image/iniciar.png');
        
    }
    create(){
        const tutorialimg = this.add.image(600,350,'tutorial');
        const iniciar = this.add.image(790,590,'iniciar').setInteractive();
        const voltar = this.add.image(425,590,'voltar').setInteractive();
        
        voltar.setInteractive();
        iniciar.setInteractive();

        voltar.on("pointerdown",()=>{
            this.scene.start('Menu');
        })
        iniciar.on("pointerdown",()=>{
            this.scene.start('Cena1');
        })
    
    }



}