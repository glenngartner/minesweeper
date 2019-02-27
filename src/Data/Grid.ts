import {Square} from "./Square";
import {DataService} from "./DataService";

export class Grid {
    private _cols = 8;
    private _rows = 8;
    public grid: Square[] = [];

    constructor() {
        this.buildGrid();
        this.gridToService();
        this.assignRandomMines();
    }

    private buildGrid() {
        let x = 1;
        let y = 1;
        for (y; y <= this._rows; y++) {
            for (x; x <= this._cols; x++) {
                this.grid.push(new Square(x, y));
            }
            x = 1;
        }
        console.log(`Grid build: `, this);
    }

    private gridToService() {
        DataService.grid = this;
    }

    public getAdjacent(square: Square): Square[] {
        let adjacent: Square[] = [];

        adjacent.push(this.getWest(square));
        adjacent.push(this.getEast(square));
        adjacent.push(this.getNorth(square));
        adjacent.push(this.getSouth(square));
        adjacent.push(this.getNorthEast(square));
        adjacent.push(this.getNorthWest(square));
        adjacent.push(this.getSouthEast(square));
        adjacent.push(this.getSouthWest(square));
        return adjacent;
    }

    private getWest(square: Square): Square {
        let index = this.grid.indexOf(square);
        let onLeftCol = square.pos.x === 1;
        if (index === 0 || onLeftCol) return square;
        else return this.grid[this.grid.indexOf(square) - 1];
    }
    private getEast(square: Square): Square {
        let index = this.grid.indexOf(square);
        let onRightCol = square.pos.x === this._cols;
        if (index === this.grid.length - 1 || onRightCol) return square;
        else return this.grid[this.grid.indexOf(square) + 1];
    }
    private getNorth(square: Square): Square {
        let index = this.grid.indexOf(square);
        let onTopRow = square.pos.y === 1;
        if (onTopRow) return square;
        else return this.grid[index - this._cols];
    }

    private getSouth(square: Square): Square {
        let index = this.grid.indexOf(square);
        let onBottomRow = square.pos.y === this._rows;
        if (onBottomRow) return square;
        else return this.grid[index + this._cols];
    }

    private getNorthEast(square: Square) {
        let index = this.grid.indexOf(square);
        let onTopRow = square.pos.y === 1;
        let onRightCol = square.pos.x === this._cols;
        if (onTopRow || onRightCol) return square;
        return this.grid[index - this._cols + 1];
    }

    private getNorthWest(square: Square) {
        let index = this.grid.indexOf(square);
        let onTopRow = square.pos.y === 1;
        let onLeftCol = square.pos.x === 1;
        if (onTopRow || onLeftCol) return square;
        else return this.grid[index - this._cols - 1];
    }

    private getSouthEast(square: Square) {
        let index = this.grid.indexOf(square);
        let onBottomRow = square.pos.y === this._rows;
        let onRightCol = square.pos.x === this._cols;
        if (onBottomRow || onRightCol) return square;
        return this.grid[index + this._cols + 1];
    }

    private getSouthWest(square: Square) {
        let index = this.grid.indexOf(square);
        let onBottomRow = square.pos.y === this._rows;
        let onLeftCol = square.pos.x === 1;
        if (onBottomRow || onLeftCol) return square;
        else return this.grid[index + this._cols - 1];
    }


    private assignRandomMines(){
        let storedRandoms : number[] = [];
        let maxMines = 10;
        while(storedRandoms.length < maxMines){
            var r = Math.floor(Math.random() * this._rows * this._cols) + 1;
            if(storedRandoms.indexOf(r) === -1) storedRandoms.push(r);
        }

        for (let random of storedRandoms) {
            this.grid[random].hasMine = true;
        }
    }
}