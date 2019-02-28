import {GameService} from "./GameService";
import {GameScene} from "./GameScene";
import {DataService} from "../Data/DataService";

export class RenderGame {

    private game: Phaser.Game;
    private sceneName = 'scene01';
    private scene: GameScene;
    private canvas: HTMLCanvasElement;
    private width: number;
    private height: number;
    private canvasWidth = 1100;
    private canvasHeight = 750;

    constructor(public rows = 8, public cols = 8) {
        this.setDims();
        this.canvas = <HTMLCanvasElement>document.getElementById('game');
        this.buildGame();
    }

    private setDims(){
        this.width = this.cols * 50 + 50;
        this.height = this.rows * 50 + 50;
        DataService.tilesWide = this.rows;
        DataService.tilesHigh = this.cols;
    }

    public resetGame(){
        this.setDims();
        this.scene.rows = this.rows;
        this.scene.cols = this.cols;
        this.scene.scene.restart();
    }

    private buildGame(){
        let sceneConfig = {
            key: this.sceneName,
            active: true,
            visible: true
        };
        this.scene = new GameScene(this.rows, this.cols, sceneConfig);
        let gameConfig = <GameConfig>{
            width: this.canvasWidth,
            height: this.canvasHeight,
            canvas: this.canvas,
            type: Phaser.WEBGL,
            backgroundColor: '#d5eeee',
            scene:this.scene,
        };

        this.game = new Phaser.Game(gameConfig);
        GameService.game = this.game;
        GameService.scene = this.scene;
    }

}
