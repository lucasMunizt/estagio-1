// Name.ts
/*import { db } from './firebaseconfig'; // Certifique-se de usar a extensão correta '.ts'
import { collection, addDoc } from 'firebase/firestore';

export class Name extends Phaser.Scene {
    private nameInput: HTMLInputElement | null = null;
    private feedbackDiv: HTMLDivElement | null = null;

    constructor() {
        super({ key: 'Name' });
    }

    preload() {
        this.load.image('tutorial', 'assets/image/name.png');
    }

    create() {
        const tutorialimg = this.add.image(600, 350, 'tutorial');

        // Cria um elemento input HTML
        this.nameInput.type = 'text';
        this.nameInput.placeholder = 'Digite seu nome';
        this.nameInput.style.position = 'absolute';
        this.nameInput.style.top = '340px'; // Ajuste conforme necessário
        this.nameInput.style.left = '560px'; // Ajuste conforme necessário
        this.nameInput.style.width = '200px';
        this.nameInput.style.padding = '10px';
        this.nameInput.style.fontSize = '16px';
        this.nameInput.style.border ='none';
        this.nameInput.style.borderRadius ='5px';

        // Adiciona o elemento input ao corpo do documento
        document.body.appendChild(this.nameInput);

        // Adiciona um div para feedback
        this.feedbackDiv = document.createElement('div');
        this.feedbackDiv.style.position = 'absolute';
        this.feedbackDiv.style.top = '350px';
        this.feedbackDiv.style.left = '400px';
        this.feedbackDiv.style.width = '200px';
        this.feedbackDiv.style.padding = '10px';
        this.feedbackDiv.style.fontSize = '16px';
        document.body.appendChild(this.feedbackDiv);

        // Adiciona listener para quando o usuário pressionar Enter
        this.nameInput.addEventListener('keydown', async (event: KeyboardEvent) => {
            if (event.key === 'Enter') {
                const userName = this.nameInput!.value;
                console.log('Nome digitado:', userName);

                // Salvar o nome no Firestore
                try {
                    const docRef = await addDoc(collection(db, 'users'), {
                        name: userName
                    });
                    console.log('Documento escrito com ID: ', docRef.id);
                    this.showFeedback('Nome salvo com sucesso!', 'green');
                } catch (e) {
                    console.error('Erro ao adicionar documento: ', e);
                    this.showFeedback('Erro ao salvar o nome.', 'red');
                }

                // Limpar o input após salvar
                this.nameInput!.value = '';
            }
        });

        // Adiciona lógica para remover o input quando a cena é encerrada
        this.events.on('shutdown', this.removeInput, this);
        this.events.on('destroy', this.removeInput, this);
    }

    private showFeedback(message: string, color: string) {
        // Exibir feedback ao usuário
        if (this.feedbackDiv) {
            this.feedbackDiv.textContent = message;
            this.feedbackDiv.style.color = color;
        }
    }

    private removeInput() {
        // Remove o elemento input do DOM
        if (this.nameInput) {
            this.nameInput.remove();
            this.nameInput = null;
        }
        // Remove o div de feedback
        if (this.feedbackDiv) {
            this.feedbackDiv.remove();
            this.feedbackDiv = null;
        }
    }
}*/
