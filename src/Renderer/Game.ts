import {GameService} from "./GameService";
import {GameScene} from "./GameScene";

export class RenderGame {

    public game: Phaser.Game;

    constructor() {
        let sceneConfig = {
            key: 'scene01',
            active: true,
            visible: true
        };
        let scene = new GameScene(sceneConfig);
        let gameConfig = <GameConfig>{
            width: 450,
            height: 450,
            parent: 'game',
            type: Phaser.AUTO,
            backgroundColor: '#d5eeee',
            scene:scene,
        };

        GameService.game = new Phaser.Game(gameConfig);
        GameService.scene = scene;
    }

}
