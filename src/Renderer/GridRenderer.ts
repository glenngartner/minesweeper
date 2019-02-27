import {Square} from "../Data/Square";
import {DataService} from "../Data/DataService";
import {SquareSprite} from "./SquareSprite";

export class GridRenderer {
    private sprites: Phaser.GameObjects.Sprite[] = [];

    constructor(){
        this.drawGrid(DataService.grid.grid);
    }
    public drawGrid(squares: Square[]) {
        for (let square of squares) {
            let calcX = square.pos.x * square.width;
            let calcY = square.pos.y * square.height;
            this.sprites.push(new SquareSprite(square, calcX, calcY));
        }
    }
}