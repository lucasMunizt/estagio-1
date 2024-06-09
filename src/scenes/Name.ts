
export class Name extends Phaser.Scene {
    private nameInput: HTMLInputElement | null = null;
    score:number
    savename:string 
    constructor() {
        super({ key: 'Name' });
       
    }

    preload() {
        this.load.image('nomeimg', 'assets/image/name.png');
        this.load.image('iniciar','assets/image/iniciar.png');
    }

    
    create() {
        const nomeimg = this.add.image(600, 350, 'nomeimg');
        const iniciar = this.add.image(600, 470, 'iniciar');
        // Cria um elemento input HTML
        this.nameInput = document.createElement('input');
        this.nameInput.type = 'text';
        this.nameInput.placeholder = 'Digite seu nome';
        this.nameInput.style.position = 'absolute';
        this.nameInput.style.top = '330px'; // Ajuste conforme necessário
        this.nameInput.style.left = '570px'; // Ajuste conforme necessário
        this.nameInput.style.width = '200px';
        this.nameInput.style.padding = '10px';
        this.nameInput.style.fontSize = '16px';
        this.nameInput.style.border = 'none';
        this.nameInput.style.borderRadius = '6px';
        this.nameInput.maxLength = 10;

        // Adiciona o elemento input ao corpo do documento
        document.body.appendChild(this.nameInput);
        iniciar.setInteractive();
        //this.savename = this.nameInput.value 
      //  console.log("score: "+ this.score)
 
      iniciar.on("pointerdown",()=>{
            this.savename = this.nameInput.value;
            console.log(" A: " +this.savename )
            this.nameInput.remove();
            localStorage.setItem('playerName', this.savename);
            this.scene.start('Cena1');
        })
        
    }
    
    get getName(): string {
        this.savename = localStorage.getItem('playerName') || '';
        console.log("get: "+ this.savename)
        return this.savename;
    }
   
  
}
