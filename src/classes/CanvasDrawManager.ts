import Draw, { DrawTypes }                 from     './Draw';
import SquareBracket                       from     './SquareBracket';
import CurlyBracket                        from     './CurlyBracket';
import DrawCoords                          from     './DrawCoords';
import FreeDraw                            from     './FreeDraw';
import { BracketState }                    from     './Bracket';


export default class CanvasDrawManager {

    private _x:                 number                 = 0;
    private _y:                 number                 = 0;
    private _freeDrawing:       boolean                = false; // add a get and set
    private _height:            number                 = 25;
    private _width:             number                 = 2;
    private _color:             string                 = "black";
    private _drawStack:         Array<Draw>            = new Array<Draw>();
    private _keyState:          Map<string, boolean>   = new Map<string, boolean>();
    private _freeDraw:          FreeDraw | null        = null;
    private _isSearching:       boolean                = false;       
    private _setCursor:         Function;

    //#region Getters and Setters 
    constructor(setCursor: Function) {
        this._setCursor = setCursor;
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

    get Drawing(): boolean {
        return this._freeDrawing;
    }

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
    //#endregion 

    public SetFreeDrawing(drawing: boolean, cw: number = 0, ch: number = 0) {
        this._freeDrawing = !!drawing;
        if (this._freeDrawing) {
            this._freeDraw = new FreeDraw(cw, ch);
            this._setCursor(true);
        }
        else {
            this._drawStack.push(this._freeDraw as FreeDraw);
            this._setCursor(false);
        }
    }

    private IsKeyPressed(key: string): boolean {
        return this._keyState.get(key) as boolean;
    }

    public KeyUp(key: string) {
        this._keyState.set(key, false);
    }

    public KeyDown(key: string) {
        this._keyState.set(key, true);
    }

    public FreeDraw(x: number, y: number, canvasId: string): void {
        if (!this.Drawing) {
            return;
        }
        let coord = new DrawCoords(x, y);
        try {
            (this._freeDraw as FreeDraw).Add(coord, canvasId);
        }
        catch{ }

    }

    // try to make it async 
    public SearchDraws(x: number, y: number) {
        
        if(this._isSearching)
        {
            return;
        }

        let found: boolean = false;

        this._drawStack.reverse().forEach( 
            (draw, index) => {

            if (found) {
                return;
            }

            switch (draw.Type) {

                case DrawTypes.Free:
                    {
                        const freeDraw = (draw as FreeDraw);
                        const coords = new DrawCoords(x, y);

                        if (freeDraw.Find(coords)) {
                            found = true;
                            delete this._drawStack[index];
                        }

                        return;
                    }
                case DrawTypes.Curly:
                    {
                        const curlyDraw = (draw as CurlyBracket);

                        if (curlyDraw.X === x && curlyDraw.Y === y) {
                            found = true;
                            delete this._drawStack[index];
                        }

                        return;
                    }
                case DrawTypes.Square:
                    {
                        const squareDraw = (draw as SquareBracket);

                        if (squareDraw.X === x && squareDraw.Y === y) {
                            found = true;
                            delete this._drawStack[index];
                        }

                        return;
                    }
            }
        });
    }

    public DrawBracket(x: number, y: number, canvasId: string, canvasWidth: number, canvasHeight: number): void {
        // canvasState.Coords.X = ev.nativeEvent.offsetX;
        // canvasState.Coords.Y = ev.nativeEvent.offsetY;
        // CTRL key
        if (this.IsKeyPressed("17")) {
            let square = new SquareBracket(x, y, this.Height, this.Width, this._color, BracketState.Opened, canvasWidth, canvasHeight);
            try {
                square.draw(canvasId);
                this._drawStack.push(square);
            }
            catch{ }
        }
        // SHIFT key
        else if (this.IsKeyPressed("16")) {
            let square = new SquareBracket(x, y, this.Height, this.Width, this._color, BracketState.Closed, canvasWidth, canvasHeight);
            try {
                square.draw(canvasId);
                this._drawStack.push(square);
            }
            catch{ }
        }
        // 'C' key
        else if (this.IsKeyPressed("67")) {
            let square = new CurlyBracket(x, y, this.Height, this.Width, this._color, BracketState.Opened, canvasWidth, canvasHeight);
            try {
                square.draw(canvasId);
                this._drawStack.push(square);
            }
            catch{ }
        }
        // 'V' key
        else if (this.IsKeyPressed("86")) {
            let square = new CurlyBracket(x, y, this.Height, this.Width, this._color, BracketState.Closed, canvasWidth, canvasHeight);
            try {
                square.draw(canvasId);
                this._drawStack.push(square);
            }
            catch{ }
        }
    }

    ReDraw(canvasId: string) {
        this._drawStack.forEach((draw, index) => {
            if(!draw)
            {
                return;
            }
            switch (draw.Type) {
                case DrawTypes.Free:
                    (draw as FreeDraw).drawAll(canvasId);
                    break;
                case DrawTypes.Curly:
                    (draw as CurlyBracket).draw(canvasId, true);
                    break;
                default:
                case DrawTypes.Square:
                    (draw as SquareBracket).draw(canvasId, true);
                    break;
            }
        });
    }
}

