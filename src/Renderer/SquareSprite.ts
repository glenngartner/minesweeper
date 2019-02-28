import {GameService} from "./GameService";
import {Square} from "../Data/Square";

interface textureColor {
    [key: string]: {
        color: number,
        texKey?: string
    };
}

export class SquareSprite extends Phaser.GameObjects.Group {

    private square: Square;
    private sprite: Phaser.GameObjects.Sprite;
    private text: Phaser.GameObjects.Text;
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
    private _searchAdjacent: Square[] = [];

    constructor(square: Square, x = 0, y = 0, texture = '') {
        super(GameService.scene);
        this.square = square;
        this.square.renderRep = this;

        this.add(this.sprite = new Phaser.GameObjects.Sprite(GameService.scene, x, y, texture));
        this.add(this.text = new Phaser.GameObjects.Text(GameService.scene, this.sprite.getCenter().x, this.sprite.getCenter().y,'', {}));

        if (this.debugMineLocs && square.hasMine) {
            this.swapTexture('clickedMine');
        } else {
            this.swapTexture('rest');
        }
        this.setEventListeners();
        console.log(`created square group`, this);
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
        this.sprite.setTexture(texKey);
        return texKey;
    }

    private setEventListeners(sprite = this.sprite) {
        sprite.setInteractive();
        sprite.on('pointerover', () => {
            if (this.square.hasMine) this.defaultColor = 'clickedMine';
            console.log(`pointer over x: ${sprite.x}, y: ${sprite.y}`);
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
                    this.text.setText(`${this.square.numAdjacentMines}`);
                } else {
                    // if empty, and no adjacent mines
                    color = 'clickedEmpty';
                    this.revealAdjacent(this.square.adjacent);
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

    private revealAdjacent(squares: Square[], alreadySearched: Square[] = []) {
        let color = '';
        for (let square of squares) {
            if (square.numAdjacentMines > 0) {
                this._searchAdjacent.push(square);
                // make orange
                color = 'clickedFlag';
                square.renderRep.swapTexture(color);
            } else {
                color = 'clickedEmpty';
                square.renderRep.swapTexture(color);
                square.renderRep.defaultColor = color;
                square.renderRep.hasBeenClicked = !square.renderRep.hasBeenClicked;
                alreadySearched.push(square);
                // remove searched for items
                let culledArray = square.adjacent.filter((val: Square) => val !== alreadySearched.find((obj: Square) => obj.pos === val.pos));
                this.revealAdjacent(culledArray, alreadySearched);
            }
        }
    }
}