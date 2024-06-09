
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
        this.scene.stop("Tutorial")
        const nomeimg = this.add.image(600, 350, 'nomeimg');
        const iniciar = this.add.image(600, 470, 'iniciar');
        // Cria um elemento input HTML
        this.nameInput = document.createElement('input');
        this.nameInput.type = 'text';
        this.nameInput.placeholder = 'Digite seu nome';
        this.nameInput.style.position = 'absolute';
        this.nameInput.style.top = '330px'; 
        this.nameInput.style.left = '570px'; 
        this.nameInput.style.width = '200px';
        this.nameInput.style.padding = '10px';
        this.nameInput.style.fontSize = '16px';
        this.nameInput.style.border = 'none';
        this.nameInput.style.borderRadius = '6px';
        this.nameInput.maxLength = 10;

        // Adiciona o elemento input ao corpo do documento
        document.body.appendChild(this.nameInput);
        iniciar.setInteractive();
   
      iniciar.on("pointerdown",()=>{
            this.savename = this.nameInput.value;
            localStorage.setItem('playerName', this.savename);
            this.nameInput.remove();
            this.scene.stop('Name');
            this.scene.start('Cena1');

        })
        this.events.on('shutdown', this.shutdown, this);
    }

    shutdown() {
        // Remove o input quando a cena for parada
        if (this.nameInput) {
            this.nameInput.remove();
            this.nameInput = null;
        }
    }
    
    get getName(): string {
        this.savename = localStorage.getItem('playerName') || '';
        console.log("get: "+ this.savename)
        return this.savename;
    }
   
  
}
