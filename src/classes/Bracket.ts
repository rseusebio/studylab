import Draw , { DrawTypes } from "./Draw";



export enum BracketState {
    Opened = 0,
    Closed = 1,
}

// Parantheses
export default class Bracket extends Draw {

    private     _height:    number;
    private     _width:     number;
    private     _color:     string;
    private     _x:         number;
    private     _y:         number;
    private     _state:      BracketState;

    //#region Getters & Setters
    get Height(): number {
        return this._height;
    }

    get Width(): number {
        return this._width;
    }

    get Color(): string {
        return this._color;
    }

    get X(): number {
        return this._x;
    }

    get Y(): number {
        return this._y;
    }

    get State(): BracketState {
        return this._state;
    }
    //#endregion

    constructor(type: DrawTypes, x: number, y: number, h: number, w: number, c: string, state: BracketState, canvasWidth: number, canvasHeight: number) {
        super(type, canvasWidth, canvasHeight);
        this._height    = h;
        this._width     = w;
        this._color     = c;
        this._x         = x;
        this._y         = y;
        this._state      = state;
    }
}