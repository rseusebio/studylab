import { ReactNode } from "react";


export default interface CanvasProps extends JSX.IntrinsicAttributes {
    _id: string;
    children?: ReactNode;
}

export class CanvasCoords {
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
}

export class CanvasInternalStates {
    private _drawing: boolean = false; // add a get and set
    public keyState: Map<string, boolean> = new Map<string, boolean>();
    // private _coords = new CanvasCoords(0, 0);
    private _height: number = 25;
    private _width: number = 2;
    private _drawStack: Array<Draw> = new Array<Draw>();
    public Coords: CanvasCoords = new CanvasCoords(0,0);

    constructor(/*h: number, w: number*/) {
        /*
        this._height = h;
        this._width = w;
        */
    }

    get Drawing(): boolean {
        return this._drawing;
    }

    set Drawing(drawing: boolean) {
        this._drawing = !!drawing;
    }

    // get Coords(): CanvasCoords {
    //     return this._coords;
    // }

    get Height(): number {
        return this._height;
    }

    set Height(h: number) {
        this._height = h;
    }

    get Width(): number {
        return this._width;
    }

    set Width(w: number) {
        this._width = w;
    }

    set Add(draw: Draw) {
        this._drawStack.push(draw);
    }

    search(c: CanvasCoords): CanvasCoords | null {
        // should reverse our drawStack because it should behave as a stack (first in, last out)
        this._drawStack.reverse().filter((d: Draw) => {
            if (d.Type == DrawTypes.Free) {
                return (d as FreeDraw).Find(c);
            }
            else if (d.Type == DrawTypes.Curly) {
                // TODO implement search logic
                return null;
            }
            else if (d.Type == DrawTypes.Square) {
                // TODO implement search logic
                return null;
            }
        });
        return null;
    }
}

export enum DrawTypes {
    Free = "FreeDrawing",
    Square = "SquareBrackets",
    Curly = "CurlyBrackets"
}

class Draw {
    private _type: DrawTypes;

    constructor(type: DrawTypes) {
        this._type = type;
    }

    get Type(): DrawTypes {
        return this._type;
    }
}

export class FreeDraw extends Draw {
    private _path: Array<CanvasCoords>;

    constructor(t: DrawTypes, coord: CanvasCoords) {
        super(t);
        this._path = new Array<CanvasCoords>();
        this._path.push(coord);
    }

    set Add(coord: CanvasCoords) {
        this._path.push(coord);
    }

    Find(coords: CanvasCoords): CanvasCoords | null {
        let found: boolean = false;
        let foundCoords: CanvasCoords | null = null;
        this._path.forEach((c: CanvasCoords) => {
            if (found) {
                return;
            }
            if (c.X == coords.X && c.Y == coords.Y) {
                found = true;
                foundCoords = c;
            }
        });
        return foundCoords;
    }
}

export class Brackets extends Draw {
    private _height: number;
    private _width: number;
    private _color: string;
    private _coords: CanvasCoords;
    private _open: boolean;

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
        return this._coords.X;
    }

    get Y(): number {
        return this._coords.Y;
    }

    get Open(): boolean {
        return this._open;
    }

    constructor(type: DrawTypes, x: number, y: number, h: number, w: number, c: string, o: boolean) {
        super(type);
        this._height = h;
        this._width = w;
        this._color = c;
        this._coords = new CanvasCoords(x, y);
        this._open = o;
    }
}

export class SquareBrackets extends Brackets {

    constructor(x: number, y: number, h: number, w: number, c: string, o: boolean) {
        super(DrawTypes.Square, x, y, h, w, c, o);
    }

    draw(canvasId: string): void {
        let canvas: any = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!canvas) {
            return;
        }
        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        if (!ctx) {
            return;
        }
        ctx.lineWidth = this.Width;
        ctx.strokeStyle = this.Color;
        let halfSize: number = this.Height / 2;
        ctx.moveTo(this.X, this.Y);
        ctx.lineTo(this.X, this.Y + halfSize);
        if (this.Open) {
            ctx.lineTo(this.X + halfSize, this.Y + halfSize);
        }
        else {
            ctx.lineTo(this.X - halfSize, this.Y + halfSize);
        }
        ctx.moveTo(this.X, this.Y);
        ctx.lineTo(this.X, this.Y - halfSize);
        if (this.Open) {
            ctx.lineTo(this.X + halfSize, this.Y - halfSize);
        }
        else {
            ctx.lineTo(this.X - halfSize, this.Y - halfSize);
        }
        ctx.stroke();
    }
}

export class CulyBrackets extends Brackets {

    constructor(x: number, y: number, h: number, w: number, c: string, o: boolean) {
        super(DrawTypes.Curly, x, y, h, w, c, o);
    }

    draw(canvasId: string): void {
        // Getting canvas by id and checking if it exists
        let canvas: any = document.getElementById(canvasId);
        if (!canvas) {
            return;
        }
        // getting canvas' context
        let ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        // setting context properties
        ctx.lineWidth = this.Width;
        ctx.strokeStyle = "blue";
        let halfSize: number = this.Height / 2;
        let quarterSize: number = this.Height / 4;
        let oneEighthSize: number = this.Height / 8;
        let radius: number = oneEighthSize;
        // #region drawing curly brackets
        if (this.Open) {
            ctx.moveTo(this.X - oneEighthSize, this.Y);
            ctx.arcTo(this.X, this.Y, this.X, this.Y - oneEighthSize, radius);
            ctx.lineTo(this.X, this.Y - oneEighthSize - quarterSize);
            ctx.arcTo(this.X, this.Y - halfSize, this.X + oneEighthSize, this.Y - halfSize, radius);
            ctx.moveTo(this.X - oneEighthSize, this.Y);
            ctx.arcTo(this.X, this.Y, this.X, this.Y + oneEighthSize, radius);
            ctx.lineTo(this.X, this.Y + oneEighthSize + quarterSize);
            ctx.arcTo(this.X, this.Y + halfSize, this.X + oneEighthSize, this.Y + halfSize, radius);
        }
        else {
            ctx.moveTo(this.X + oneEighthSize, this.Y);
            ctx.arcTo(this.X, this.Y, this.X, this.Y - oneEighthSize, radius);
            ctx.lineTo(this.X, this.Y - oneEighthSize - quarterSize);
            ctx.arcTo(this.X, this.Y - halfSize, this.X - oneEighthSize, this.Y - halfSize, radius);
            ctx.moveTo(this.X + oneEighthSize, this.Y);
            ctx.arcTo(this.X, this.Y, this.X, this.Y + oneEighthSize, radius);
            ctx.lineTo(this.X, this.Y + oneEighthSize + quarterSize);
            ctx.arcTo(this.X, this.Y + halfSize, this.X - oneEighthSize, this.Y + halfSize, radius);
        }
        ctx.stroke();
        // #endregion
    }
}

