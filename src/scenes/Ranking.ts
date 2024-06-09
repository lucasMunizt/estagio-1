import{getScores}  from '../config/firebaseconfig'
export class Ranking extends Phaser.Scene{

    constructor(){
        super({ key: 'Ranking' });
    }

    preload(){
        this.load.image('rankimg', 'assets/image/ranktela.png');
       this.load.image('voltar', 'assets/image/voltar.png');
        
    }

    async create() {
        const rankimg = this.add.image(600, 350, 'rankimg');
        const voltar2 = this.add.image(600, 570, 'voltar');

        // Obter os scores
        const scores = await getScores();

        // Exibir os scores na tela
        let yPosition = 150; // Posição inicial y para o primeiro score
        const xPosition = 520; // Posição x onde os scores serão exibidos

        scores.forEach((score, index) => {
            this.add.text(xPosition, yPosition, `${index + 1}. ${score.nome}: ${score.pontuacao}`, {
                fontSize: '18px',
                color: '#ffffff'
            });
            yPosition += 40; // Incrementa a posição y para o próximo score
        });

        voltar2.setInteractive();
        voltar2.on("pointerdown", () => {
            // Lógica para voltar à cena anterior ou menu
            this.scene.start('Menu');
        });
    }



}