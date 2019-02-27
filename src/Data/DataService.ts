import {Grid} from "./Grid";
import {Square} from "./Square";

export class DataService {
    public static grid: Grid;

    public static Start () {

    }
    public static getAdjacent(square: Square): Square[] {
        return DataService.grid.getAdjacent(square);
    }
}