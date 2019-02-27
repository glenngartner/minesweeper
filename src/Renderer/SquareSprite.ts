import {GameService} from "./GameService";
import {Square} from "../Data/Square";
import {DataService} from "../Data/DataService";

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
    private debugMineLocs = true;

    constructor(square: Square, x = 0, y = 0, texture = '') {
        super(GameService.scene, x, y, texture);
        this.square = square;
        this.square.renderRep = this;
        if (this.debugMineLocs && square.hasMine) {
            this.swapTexture('clickedMine');
        } else {
            this.swapTexture('rest');
        }
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
            console.log(`num adjacent to this: ${this.square.numAdjacentMines}`);
            console.log(`adjacent squares: `, this.square.adjacent);
            if (this.square.hasMine) this.defaultColor = 'clickedMine';
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
                // if I click on a mine, game over
                if (this.square.hasMine) {
                    color = 'clickedMine';
                    console.log("GAME OVER");
                }
                // if has adjacent, done, just orange
                else if (this.square.numAdjacentMines > 0) {
                    color = 'clickedFlag';
                    GameService.scene.add.text(this.getCenter().x, this.getCenter().y, `${this.square.numAdjacentMines}`, {color: 0x000000});
                    console.log(`drawing a number ${this.square.numAdjacentMines} on top`);
                } else {
                    // if empty, and no adjacent mines
                    color = 'clickedEmpty';
                    this.revealAdjacent(this.square.adjacent, color);
                }
            }
            if (isRMB) {
                color = 'clickedFlag';
            }
            this.swapTexture(color);
            this.defaultColor = color;
            this.hasBeenClicked = !this.hasBeenClicked;
        }, this);

    }

    private revealAdjacent(squares: Square[], color: string) {
        let searched: Square[] = [];
        for (let square of squares) {
            if (square.numAdjacentMines > 0) {
                // make orange
                color = 'clickedFlag';
                square.renderRep.swapTexture(color);
            } else {
                color = 'clickedEmpty';
                square.renderRep.swapTexture(color);
                square.renderRep.defaultColor = color;
                square.renderRep.hasBeenClicked = !square.renderRep.hasBeenClicked;
                // this.revealAdjacent(square.adjacent, 'clickedEmpty');
            }
        }
    }
}