import {Grid} from "../Data/Grid";

export class GameScene extends Phaser.Scene {
    constructor(config: Phaser.Scenes.Settings.Config) {
        super(config);
    }

    public init () {}

    public preload(){}

    create(){
        let grid = new Grid();
    }

    update(time: number, delta: number) {}
}