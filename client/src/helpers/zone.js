export default class Zone {
    constructor(scene) {
        // this.renderZone = () => {
        //     let dropZone = scene.add.zone(700, 375, 450, 125).setRectangleDropZone(450, 125);
        //     dropZone.setData({ cards: 0 });
        //     return dropZone;
        // };
        this.renderZone = () => {
            let discardZone = scene.add.zone(500, 375, 120, 175).setRectangleDropZone(120, 175);
            discardZone.setData({ cards: 0 });
            return discardZone;
        };
        this.renderDeckZone = () => {
            let deckZone = scene.add.zone(650, 375, 120, 175).setRectangleDropZone(120, 175);
            deckZone.setData({ cards: 0 });
            return deckZone;
        };
        this.renderOutline = (deckZone) => {
            let deckZoneOutline = scene.add.graphics();
            deckZoneOutline.lineStyle(4, 0xff69b4);
            deckZoneOutline.strokeRect(deckZone.x - deckZone.input.hitArea.width / 2, deckZone.y - deckZone.input.hitArea.height / 2, deckZone.input.hitArea.width, deckZone.input.hitArea.height)
        }
        this.renderOutline = (discardZone) => {
            let discardZoneOutline = scene.add.graphics();
            discardZoneOutline.lineStyle(4, 0xff69b4);
            discardZoneOutline.strokeRect(discardZone.x - discardZone.input.hitArea.width / 2, discardZone.y - discardZone.input.hitArea.height / 2, discardZone.input.hitArea.width, discardZone.input.hitArea.height)
        }
    }
}
