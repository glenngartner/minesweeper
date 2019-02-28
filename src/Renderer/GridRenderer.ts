import {Square} from "../Data/Square";
import {DataService} from "../Data/DataService";
import {SquareSprite} from "./SquareSprite";
import {GameService} from "./GameService";

export class GridRenderer {
    private sprites: Phaser.GameObjects.Group[] = [];

    constructor(){
        this.drawGrid(DataService.grid.grid);
    }
    public drawGrid(squares: Square[]) {
        for (let square of squares) {
            let calcX = square.pos.x * square.width;
            let calcY = square.pos.y * square.height;
            let grp = new SquareSprite(square, calcX, calcY, '');
            // GameService.scene.add.group(grp);
            this.sprites.push(grp);
        }
    }
}