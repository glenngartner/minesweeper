import {GameService} from "./GameService";
import {GameScene} from "./GameScene";

export class RenderGame {

    private game: Phaser.Game;
    private sceneName = 'scene01';
    private scene: GameScene;

    constructor(public rows = 8, public cols = 8) {
        this.buildGame();
    }

    public resetGame(){
        this.scene.rows = this.rows;
        this.scene.cols = this.cols;
        // this.scene.scene.restart(); // doesn't dynamically resize canvas, but is a nice refresh option
        // this.scene.game.renderer.resize(this.cols * 50 + 50, this.rows * 50 + 50)
        this.game.destroy(true);
        this.buildGame();
    }

    private buildGame(){
        let sceneConfig = {
            key: this.sceneName,
            active: true,
            visible: true
        };
        this.scene = new GameScene(this.rows, this.cols, sceneConfig);
        let gameConfig = <GameConfig>{
            width: this.cols * 50 + 50,
            height: this.rows * 50 + 50,
            parent: 'game',
            type: Phaser.AUTO,
            backgroundColor: '#d5eeee',
            scene:this.scene,
        };

        this.game = new Phaser.Game(gameConfig);
        GameService.game = this.game;
        GameService.scene = this.scene;
    }

}
