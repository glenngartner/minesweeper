import {Vec2} from "../interfaces";
import {SquareSprite} from "../Renderer/SquareSprite";

export class Square {
    public isRevealed = false;
    public hasMine = false;
    public hasFlag = false;
    public pos: Vec2 = {x: 0, y: 0};
    public width = 50;
    public height = 50;
    public renderRep: SquareSprite;
    public numAdjacentMines = 0;
    public adjacent: Square[] = [];

    constructor(x = 0, y = 0) {
        this.pos.x = x;
        this.pos.y = y;
    }

}