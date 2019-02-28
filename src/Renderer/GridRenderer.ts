import {Square} from "../Data/Square";
import {DataService} from "../Data/DataService";
import {SquareSprite} from "./SquareSprite";
import {GameService} from "./GameService";

export class GridRenderer {
    private sprites: SquareSprite[] = [];

    constructor(){
        this.drawGrid(DataService.grid.grid);
        GameService.renderGrid = this.sprites;
    }
    public drawGrid(squares: Square[]) {
        for (let square of squares) {
            let calcX = square.pos.x * square.width;
            let calcY = square.pos.y * square.height;
            let grp = new SquareSprite(square, calcX, calcY, '');
            this.sprites.push(grp);
        }
    }
}