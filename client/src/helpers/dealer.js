import Card from './card'

export default class Dealer {
    constructor(scene) {
        this.dealCards = () => {
            let playerSprite;
            let opponentSprite;
            let cardDeck = [
                '1Ba', '1Bb', '1Ra', '1Rb', '1Ya', '1Yb', '1Ga', '1Gb',
                '2Ba', '2Bb', '2Ra', '2Rb', '2Ya', '2Yb', '2Ga', '2Gb',
                '3Ba', '3Bb', '3Ra', '3Rb', '3Ya', '3Yb', '3Ga', '3Gb',
                '4Ba', '4Bb', '4Ra', '4Rb', '4Ya', '4Yb', '4Ga', '4Gb',
                '5Ba', '5Bb', '5Ra', '5Rb', '5Ya', '5Yb', '5Ga', '5Gb',
                '6Ba', '6Bb', '6Ra', '6Rb', '6Ya', '6Yb', '6Ga', '6Gb',
                '7Ba', '7Bb', '7Ra', '7Rb', '7Ya', '7Yb', '7Ga', '7Gb',
                '8Ba', '8Bb', '8Ra', '8Rb', '8Ya', '8Yb', '8Ga', '8Gb',
                '9Ba', '9Bb', '9Ra', '9Rb', '9Ya', '9Yb', '9Ga', '9Gb',
                '10Ba', '10Bb', '10Ra', '10Rb', '10Ya', '10Yb', '10Ga', '10Gb',
                '11Ba', '11Bb', '11Ra', '11Rb', '11Ya', '11Yb', '11Ga', '11Gb',
                '12Ba', '12Bb', '12Ra', '12Rb', '12Ya', '12Yb', '12Ga', '12Gb',
                'Wa', 'Wb', 'Wb', 'Wb', 'Wb', 'Wb', 'Wb', 'Wb', 'Wb', 'Wb', 'Wb', 'Wb',
                'Sa', 'Sb', 'Sb', 'Sb'
            ];
            const shuffled = cardDeck.sort(() => 0.5 - Math.random());
            let playerAHand = shuffled.slice(0, 10);
            let playerBHand = shuffled.slice(11, 21);
            let playerCHand = shuffled.slice(21, 31);
            let playerDHand = shuffled.slice(31, 41);

            if (scene.isPlayerA) {
                playerSprite = '7G';
                opponentSprite = 'cardback';
            } else {
                playerSprite = '8B';
                opponentSprite = 'cardback';
            };
            for (let i = 0; i < 10; i++) {
                let playerCard = new Card(scene);

                playerCard.render(200 + (i * 100), 650, playerSprite);

                let opponentCard = new Card(scene);
                scene.opponentCards.push(opponentCard.render(200 + (i * 100), 125, opponentSprite).disableInteractive());
            }
//alternative for the above is below
            playerAHand.forEach(card => {
                console.log('PLAYER A = ', card)
            });


        }
    }

}