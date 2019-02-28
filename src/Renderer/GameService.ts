import {SquareSprite} from "./SquareSprite";

export class GameService {
    public static game: Phaser.Game;
    public static scene: Phaser.Scene;
    public static renderGrid: SquareSprite[];
    public static gameOvertext: Phaser.GameObjects.Text;
}