import {Square} from "./Square";
import {GameService} from "../Renderer/GameService";

export class Grid {
    private _cols = 8;
    private _rows = 8;
    public squares: Square[] = [];

    constructor() {
        this.buildGrid();
        this.drawGrid();
    }

    buildGrid() {
        let x = 1;
        let y = 1;
        for (y; y <= this._rows; y++) {
            for (x; x <= this._cols; x++) {
                this.squares.push(new Square(x, y));
            }
            x = 1;
        }
        console.log(`Grid build: `, this);
    }

    drawGrid() {
        for (let square of this.squares) {
            let graph = GameService.scene.add.graphics();
            graph.setDefaultStyles({
                lineStyle: {
                    width: 1,
                    color: 0x333333,
                    alpha: 1
                },
                fillStyle: {
                    color: 0xFF0000,
                    alpha: 1
                }
            });
            graph.fillRoundedRect(0, 0, 50, 50, 5);
        }
    }
}