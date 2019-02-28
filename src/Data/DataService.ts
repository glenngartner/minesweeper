import {Grid} from "./Grid";
import {Square} from "./Square";

export class DataService {
    public static grid: Grid;
    public static tilesWide: number;
    public static tilesHigh: number;

    public static Start () {

    }
    public static getAdjacent(square: Square): Square[] {
        return DataService.grid.getAdjacent(square);
    }
}