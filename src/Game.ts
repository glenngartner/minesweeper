import {Game} from "phaser";

export class SimpleGame {

    public game: Phaser.Game;

    constructor() {
        let gameConfig = <GameConfig>{
            width: 800,
            height: 800,
            parent: 'game',
            type: Phaser.AUTO,
            backgroundColor: '#d5eeee'
        }
        this.game = new Phaser.Game(gameConfig);
    }

    private preload() {
        // this.game.load.image('logo', 'phaser2.png');
    }

    private create() {
        // let logo = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, 'logo');
        // logo.anchor.setTo(0.5, 0.5);
    }

}
