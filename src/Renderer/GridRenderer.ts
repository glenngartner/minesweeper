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
        let gameOverText = GameService.scene.add.text(
            GameService.scene.game.renderer.width  / 2 - 150,
            GameService.scene.game.renderer.height / 2 - 80,
            "BOOM",
            {
                align: 'center',
                fontSize: '128px',
                stroke: 0x333,
                strokeThickness: 3,
            });
        gameOverText.setVisible(false);
        GameService.gameOvertext = gameOverText;

    }
}