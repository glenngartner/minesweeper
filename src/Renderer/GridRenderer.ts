import {Square} from "../Data/Square";
import {GameService} from "./GameService";
import {DataService} from "../Data/DataService";
import {SquareSprite} from "./SquareSprite";

export class GridRenderer {
    private sprites: Phaser.GameObjects.Sprite[] = [];

    constructor(){
        this.drawGrid(DataService.grid);
    }
    public drawGrid(squares: Square[]) {
        for (let square of squares) {
            let calcX = square.pos.x * square.width;
            let calcY = square.pos.y * square.height;
            this.sprites.push(new SquareSprite(square, calcX, calcY));
        }
    }

    // createTexture(square: Square): Phaser.GameObjects.Sprite {
    //     let calcX = square.pos.x * square.width;
    //     let calcY = square.pos.y * square.height;
    //     let graph = GameService.scene.add.graphics();
    //     graph.fillStyle(0xFFFFFF, 1);
    //     graph.lineStyle(5, 0x222222, 1);
    //     graph.fillRoundedRect(
    //         calcX,
    //         calcY,
    //         square.width,
    //         square.height,
    //         5);
    //     graph.strokeRoundedRect(
    //         calcX,
    //         calcY,
    //         square.width,
    //         square.height,
    //         5);
    //     let texKey = 'squareTex';
    //     let tex = graph.generateTexture(texKey, square.width, square.height);
    //     let sprite =new Phaser.GameObjects.Sprite(GameService.scene, calcX, calcY, texKey);
    //     sprite.setTint(0xFF0000);
    //     return  sprite;
    // }
    //
    // private setEventListeners(sprite: Phaser.GameObjects.Sprite){
    //     sprite.setInteractive();
    //    sprite.on('pointerover', () => {
    //         console.log(`mouse over sprite at pos: ${sprite.x}, ${sprite.y}`);
    //    })
    // }

}