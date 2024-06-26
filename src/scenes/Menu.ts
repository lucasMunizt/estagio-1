export class Menu extends Phaser.Scene{
    MenuMusic: Phaser.Sound.NoAudioSound | Phaser.Sound.HTML5AudioSound | Phaser.Sound.WebAudioSound;
    constructor(){
        super('Menu');
    }

    preload(){
        this.load.audio('menuMusic','./assets/music/Menumusic.mp3')
        this.load.image('menu','./assets/image/menu.jpg')
        this.load.image('iniciar','./assets/image/iniciar.png')
        this.load.image('rank','./assets/image/rank.png')
    }

    create(){
       this.MenuMusic = this.sound.add('menuMusic');
        this.MenuMusic.play({
            volume:0.5,
            loop:true
        });
        const menu = this.add.image(0,0,'menu').setOrigin(0,0);
        const iniciar = this.add.image(530,250,'iniciar').setOrigin(0,0).setScale(1);
        const rank = this.add.image(530,350,'rank').setOrigin(0,0).setScale(1);
        
        menu.displayWidth = 1200;
        menu.displayHeight = 640;
        rank.setInteractive();
       
        iniciar.setInteractive();

        iniciar.on("pointerdown", () => {
            this.MenuMusic.stop();
            this.scene.start('Tutorial');
        });

        rank.on("pointerdown", () => {
            this.MenuMusic.stop();
            this.scene.start('Ranking');
        });

    }

}
