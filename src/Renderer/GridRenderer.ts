import {Square} from "../Data/Square";
import {DataService} from "../Data/DataService";
import {SquareSprite} from "./SquareSprite";
import {GameService} from "./GameService";

export class GridRenderer {
    private sprites: SquareSprite[] = [];
    private gamegroup: Phaser.GameObjects.Container;

    constructor(){
        this.gamegroup = GameService.scene.add.container(0,0);
        this.drawGrid(DataService.grid.grid);
        GameService.renderGrid = this.sprites;
        this.positionGroupToCenter();
    }
    public drawGrid(squares: Square[]) {
        for (let square of squares) {
            let calcX = square.pos.x * square.width;
            let calcY = square.pos.y * square.height;
            let grp: SquareSprite;
            this.gamegroup.add(grp = new SquareSprite(square, this.gamegroup, calcX, calcY));
            this.sprites.push(grp);
        }
        let gameOverText = GameService.scene.add.text(
            0,
            0,
            "BOOM",
            {
                align: 'center',
                fontSize: '128px',
                stroke: 0x333,
                strokeThickness: 3,
            });
        gameOverText.setPosition(
            GameService.game.renderer.width / 2 - gameOverText.width / 2,
            GameService.game.renderer.height / 2 - gameOverText.height / 2
        );
        gameOverText.setVisible(false);
        GameService.gameOvertext = gameOverText;
    }

    private positionGroupToCenter(){
        let renderRowWidth = DataService.tilesWide * 50;
        let renderRowHeight = DataService.tilesHigh * 50;
        this.gamegroup.setPosition(
            GameService.scene.game.renderer.width / 2 - renderRowHeight / 2 - 25 ,
            GameService.scene.game.renderer.height / 2 - renderRowWidth / 2 - 25);
    }
}