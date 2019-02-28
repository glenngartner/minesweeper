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
    private graph: Phaser.GameObjects.Graphics;
    public text: Phaser.GameObjects.Text;
    private hasBeenClicked = false;
    private defaultColor = 'rest';
    private texTypes: textureColor = {
        'rest': {color: 0x888888},
        'pointerOver': {color: 0xE3EE6A},
        'clickedEmpty': {color: 0xDDDDDD},
        'clickedMine': {color: 0xFF0000},
        'clickedFlag': {color: 0xEE8D6F}
    };
    private debugMineLocs = false;

    constructor(square: Square, parent: Phaser.GameObjects.Container, x = 0, y = 0, texture = '') {
        super(GameService.scene, x, y, texture);
        this.square = square;
        this.parentContainer = parent;
        this.square.renderRep = this;
        this.graph = GameService.scene.add.graphics();
        if (this.parentContainer) this.parentContainer.add(this.graph);

        this.text = GameService.scene.add.text(x - 10, y - 12, '', {
            align: 'center',
            stroke: 0x000,
            strokeThickness: 5,
            fontSize: '24px'
        });
        this.parentContainer.add(this.text);
        this.text.depth = 1;
        this.depth = 0;

        if (this.debugMineLocs && square.hasMine) {
            this.swapTexture('clickedMine');
        } else {
            this.swapTexture('rest');
        }
        this.setEventListeners();
    }

    public swapTexture(key: string) {
        let texKey = this.createTexture(this.square, this.texTypes[key].color, key);
        this.texTypes[key].texKey = texKey;
    }

    private createTexture(square = this.square, color = 0xFFFFFF, key: string): string {
        let calcX = square.pos.x * square.width - square.width / 2;
        let calcY = square.pos.y * square.height - square.height / 2;
        this.graph.clear();
        this.graph.fillStyle(color, 1);
        this.graph.lineStyle(5, 0x222222, 1);
        this.graph.fillRoundedRect(
            calcX,
            calcY,
            square.width,
            square.height,
            5);
        this.graph.strokeRoundedRect(
            calcX,
            calcY,
            square.width,
            square.height,
            5);
        let texKey = key;
        let tex = this.graph.generateTexture(texKey, square.width, square.height);
        this.setTexture(texKey);
        // graph.destroy();
        return texKey;
    }

    private setEventListeners(sprite = this) {
        sprite.setInteractive();
        sprite.on('pointerover', () => {
            // if (this.square.hasMine) this.defaultColor = 'clickedMine';
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
                    for (let sprite of GameService.renderGrid) {
                        sprite.swapTexture('clickedMine');
                        sprite.text.setText('');
                        sprite.defaultColor = 'clickedMine';
                    }
                    GameService.gameOvertext.setVisible(true);
                    GameService.gameOvertext.depth = 2;
                    console.log("GAME OVER");
                }
                // if has adjacent, done, just orange
                else if (this.square.numAdjacentMines > 0) {
                    color = 'clickedEmpty';
                    this.text.setText(`${this.square.numAdjacentMines}`);
                } else {
                    // if empty, and no adjacent mines
                    color = 'clickedEmpty';
                    this.revealAdjacent(this.square.adjacent);
                }

            }
            if (isRMB) {
                color = 'clickedFlag';
                this.defaultColor = 'clickedFlag';
                this.text.setText('F');
            }
            this.swapTexture(color);
            this.defaultColor = color;
            this.hasBeenClicked = !this.hasBeenClicked;
            // quick way to watch if a square is revealed or flagged
            // helps track game end state
            if (this.defaultColor === 'clickedEmpty') {
                this.square.isRevealed = true;
            }
            this.checkForWinState();
        }, this);

    }

    private checkForWinState() {
        let numTiles = GameService.renderGrid.length;
        let numMines = GameService.numMines;
        let numRevealed = 0;
        for (let num of DataService.grid.grid) {
            if (num.isRevealed) numRevealed++;
        }
        if ((numMines + numRevealed) === numTiles) {
            GameService.gameOvertext.setText("You Win!");
            GameService.gameOvertext.setColor('lime');
            GameService.gameOvertext.setFontSize(90);
            GameService.gameOvertext.setPosition(
                GameService.game.renderer.width / 2 - GameService.gameOvertext.width / 2,
                GameService.game.renderer.height / 2 - GameService.gameOvertext.height / 2
            );
            GameService.gameOvertext.setVisible(true);
            GameService.gameOvertext.depth = 2;
        }
    }

    private revealAdjacent(squares: Square[], alreadySearched: Square[] = []) {
        let color = '';
        for (let square of squares) {
            if (square.numAdjacentMines > 0) {
                //show adjacent number
                color = 'clickedEmpty';
                square.renderRep.defaultColor = color;
                square.renderRep.text.setText(`${square.numAdjacentMines}`);
                square.renderRep.swapTexture(color);
                square.isRevealed = true;
            } else {
                color = 'clickedEmpty';
                square.renderRep.defaultColor = color;
                square.renderRep.text.setText(``);
                square.renderRep.swapTexture(color);
                square.renderRep.defaultColor = color;
                square.renderRep.hasBeenClicked = !square.renderRep.hasBeenClicked;
                square.isRevealed = true;
                alreadySearched.push(square);
                // remove searched for items
                let culledArray = square.adjacent.filter((val: Square) => val !== alreadySearched.find((obj: Square) => obj.pos === val.pos));
                this.revealAdjacent(culledArray, alreadySearched);
            }
        }
    }
}