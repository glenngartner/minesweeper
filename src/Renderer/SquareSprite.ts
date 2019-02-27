import {GameService} from "./GameService";
import {Square} from "../Data/Square";

interface textureColor {
    [key: string]: {
        color: number,
        texKey?: string
    };
}

export class SquareSprite extends Phaser.GameObjects.Sprite {

    private square: Square;
    private hasBeenClicked = false;
    private defaultColor = 'rest';
    private texTypes: textureColor = {
        'rest': {color: 0x888888},
        'pointerOver': {color: 0xE3EE6A},
        'clickedEmpty': {color: 0xDDDDDD},
        'clickedMine': {color: 0xFF0000},
        'clickedFlag': {color: 0xEE8D6F}
    };

    constructor(square: Square, x = 0, y = 0, texture = '') {
        super(GameService.scene, x, y, texture);
        this.square = square;
        this.swapTexture('rest');
        this.setEventListeners();
    }

    private swapTexture(key: string) {
        let texKey = this.createTexture(this.square, this.texTypes[key].color, key);
        this.texTypes[key].texKey = texKey;
    }

    createTexture(square = this.square, color = 0xFFFFFF, key: string): string {
        let calcX = square.pos.x * square.width - square.width / 2;
        let calcY = square.pos.y * square.height - square.height / 2;
        let graph = GameService.scene.add.graphics();
        graph.fillStyle(color, 1);
        graph.lineStyle(5, 0x222222, 1);
        graph.fillRoundedRect(
            calcX,
            calcY,
            square.width,
            square.height,
            5);
        graph.strokeRoundedRect(
            calcX,
            calcY,
            square.width,
            square.height,
            5);
        let texKey = key;
        let tex = graph.generateTexture(texKey, square.width, square.height);
        this.setTexture(texKey);
        return texKey;
    }

    private setEventListeners(sprite = this) {
        sprite.setInteractive();
        sprite.on('pointerover', () => {
            console.log(`mouse over sprite at pos: ${sprite.x}, ${sprite.y}`);
            this.swapTexture('pointerOver');
        }, this);
        sprite.on('pointerout', () => {
            this.swapTexture(this.defaultColor);
        }, this);
        sprite.on('pointerdown', () => {
            let isLMB = GameService.scene.input.activePointer.leftButtonDown();
            let isRMB = GameService.scene.input.activePointer.rightButtonDown();
            let color = '';
            if (isLMB) {
                if (this.square.hasMine) color = 'clickedMine';
                else color = 'clickedEmpty';
            }
            if (isRMB) {
                color = 'clickedFlag';
            }
            this.swapTexture(color);
            this.defaultColor = color;
            this.hasBeenClicked = !this.hasBeenClicked;
        }, this);

    }


}