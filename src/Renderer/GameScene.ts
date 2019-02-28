import {Grid} from "../Data/Grid";
import {GridRenderer} from "./GridRenderer";

export class GameScene extends Phaser.Scene {

    constructor(config: Phaser.Scenes.Settings.Config) {
        super(config);
    }

    public init () {}

    public preload(){
    }

    create(){
        let grid = new Grid();
        let gridRenderer = new GridRenderer();
    }

    update(time: number, delta: number) {}
}