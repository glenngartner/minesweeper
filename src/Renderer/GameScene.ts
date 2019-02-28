import {Grid} from "../Data/Grid";
import {GridRenderer} from "./GridRenderer";

export class GameScene extends Phaser.Scene {

    constructor(public rows = 8, public cols = 8, config: Phaser.Scenes.Settings.Config) {
        super(config);
    }

    public init () {}

    public preload(){
    }

    create(){
        let grid = new Grid(this.rows, this.cols);
        let gridRenderer = new GridRenderer();
    }

    update(time: number, delta: number) {}
}