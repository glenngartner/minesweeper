import {Square} from "./Square";
import {DataService} from "./DataService";

export class Grid {
    private _cols = 8;
    private _rows = 8;
    public grid: Square[] = [];

    constructor() {
        this.buildGrid();
        this.gridToService();
    }

    buildGrid() {
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

    gridToService(){
        DataService.grid = this.grid;
    }
}