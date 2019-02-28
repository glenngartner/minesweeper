import {GameService} from "./GameService";
import {GameScene} from "./GameScene";

export class RenderGame {

    private game: Phaser.Game;
    private sceneName = 'scene01';
    private scene: GameScene;
    private canvas: HTMLCanvasElement;
    private width: number;
    private height: number;

    constructor(public rows = 8, public cols = 8) {
        this.setDims();
        this.canvas = <HTMLCanvasElement>document.getElementById('game');
        this.buildGame();
    }

    private setDims(){
        this.width = this.cols * 50 + 50;
        this.height = this.rows * 50 + 50;
    }

    public resetGame(){
        this.scene.rows = this.rows;
        this.scene.cols = this.cols;
        // this.setDims();
        this.scene.scene.restart();
        // this.canvas.width = this.width;
        // this.canvas.height = this.height;

        // this.scene.scene.restart(); // doesn't dynamically resize canvas, but is a nice refresh option
        // this.scene.cameras.resize(this.width, this.height);
        // this.scene.cameras.main.setPosition(0, 0);
        // this.scene.game.renderer.resize(this.width, this.height);
        // this.scene.cameras.main.setBounds(0, 0, this.width, this.height);
        // this.scene.sys.game.destroy(true);
        // this.scene = null;
        // this.game = null;
        // this.buildGame();
    }

    private buildGame(){
        let sceneConfig = {
            key: this.sceneName,
            active: true,
            visible: true
        };
        this.scene = new GameScene(this.rows, this.cols, sceneConfig);
        let gameConfig = <GameConfig>{
            width: 1050,
            height: 750,
            // parent: 'game',
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
