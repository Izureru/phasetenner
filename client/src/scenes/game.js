import io from 'socket.io-client';
import Card from '../helpers/card';
import Dealer from "../helpers/dealer";
import Zone from '../helpers/zone';

export default class Game extends Phaser.Scene {
    constructor() {
        super({
            key: 'Game'
        });
    }

    preload() {
        this.load.image('1Ba', 'src/assets/1Ba.png');
        this.load.image('1Ya', 'src/assets/1Ya.png');
        this.load.image('1Ga', 'src/assets/1Ga.png');
        this.load.image('1Ra', 'src/assets/1Ra.png');
        this.load.image('1Bb', 'src/assets/1Bb.png');
        this.load.image('1Yb', 'src/assets/1Yb.png');
        this.load.image('1Gb', 'src/assets/1Gb.png');
        this.load.image('1Rb', 'src/assets/1Rb.png');
        this.load.image('2Ba', 'src/assets/2Ba.png');
        this.load.image('2Ya', 'src/assets/2Ya.png');
        this.load.image('2Ga', 'src/assets/2Ga.png');
        this.load.image('2Ra', 'src/assets/2Ra.png');
        this.load.image('2Bb', 'src/assets/2Bb.png');
        this.load.image('2Yb', 'src/assets/2Yb.png');
        this.load.image('2Gb', 'src/assets/2Gb.png');
        this.load.image('2Rb', 'src/assets/2Rb.png');
        this.load.image('3Ba', 'src/assets/3Ba.png');
        this.load.image('3Ya', 'src/assets/3Ya.png');
        this.load.image('3Ga', 'src/assets/3Ga.png');
        this.load.image('3Ra', 'src/assets/3Ra.png');
        this.load.image('3Bb', 'src/assets/3Bb.png');
        this.load.image('3Yb', 'src/assets/3Yb.png');
        this.load.image('3Gb', 'src/assets/3Gb.png');
        this.load.image('3Rb', 'src/assets/3Rb.png');
        this.load.image('cardback', 'src/assets/cardback.png');
        
    }

    create() {
        this.isPlayerA = false;
        this.opponentCards = [];

        this.zone = new Zone(this);
        this.dropZone = this.zone.renderZone();
        this.deckZone = this.zone.renderDeckZone();
        this.outline = this.zone.renderOutline(this.dropZone);
        this.deckOutline = this.zone.renderOutline(this.deckZone);

        this.dealer = new Dealer(this);

        let self = this;

        this.socket = io('http://localhost:3000');

        this.socket.on('connect', function () {
            console.log('Connected!');
        });

        this.socket.on('isPlayerA', function () {
            self.isPlayerA = true;
        })

        this.socket.on('dealCards', function () {
            self.dealer.dealCards();
            self.dealText.disableInteractive();
        })

        this.socket.on('cardPlayed', function (gameObject, isPlayerA) {
            if (isPlayerA !== self.isPlayerA) {
                let sprite = gameObject.textureKey;
                self.opponentCards.shift().destroy();
                self.dropZone.data.values.cards++;
                let card = new Card(self);
                card.render((self.dropZone), (self.dropZone.y), sprite).disableInteractive();
            }
        })

        this.dealText = this.add.text(600, 350, ['DEAL CARDS']).setFontSize(18).setFontFamily('Trebuchet MS').setColor('#00ffff').setInteractive();

        this.dealText.on('pointerdown', function () {
            self.socket.emit("dealCards");
        })

        this.dealText.on('pointerover', function () {
            self.dealText.setColor('#ff69b4');
        })

        this.dealText.on('pointerout', function () {
            self.dealText.setColor('#00ffff');
        })

        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })

        this.input.on('dragstart', function (pointer, gameObject) {
            gameObject.setTint(0xff69b4);
            self.children.bringToTop(gameObject);
        })

        this.input.on('dragend', function (pointer, gameObject, dropped) {
            gameObject.setTint();
            if (!dropped) {
                gameObject.x = gameObject.input.dragStartX;
                gameObject.y = gameObject.input.dragStartY;
            }
        })

        this.input.on('drop', function (pointer, gameObject, dropZone) {
            dropZone.data.values.cards++;
            gameObject.x = dropZone.x;
            gameObject.y = dropZone.y;
            gameObject.disableInteractive();
            self.socket.emit('cardPlayed', gameObject, self.isPlayerA);
        })
    }

    update() {

    }
}