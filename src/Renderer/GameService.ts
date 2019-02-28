import {SquareSprite} from "./SquareSprite";

export class GameService {
    public static game: Phaser.Game;
    public static scene: Phaser.Scene;
    public static renderGrid: SquareSprite[];
    public static gameOvertext: Phaser.GameObjects.Text;
    public static numMines: number = 0;
    private static _numRevealed: number = 0;
    public static set numRevealed (num: number) {
        GameService._numRevealed = num;
    };
    public static get numRevealed(): number {
        return GameService._numRevealed;
    }
}