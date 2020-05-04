export default class DrawCoords {
    private _x: number = 0;
    private _y: number = 0;

    constructor(x: number, y: number) {
        this.X = x;
        this.Y = y;
    }

    get X(): number {
        return this._x;
    }

    set X(x: number) {
        if (x < 0) {
            this._x = 0;
        }
        else {
            this._x = x;
        }
    }

    get Y(): number {
        return this._y;
    }

    set Y(y: number) {
        if (y < 0) {
            this._y = 0;
        }
        else {
            this._y = y;
        }
    }

    Equals(coord: DrawCoords): boolean {
        return coord.X === this.X && coord.Y === this.Y;
    }
}