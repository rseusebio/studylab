import Draw, { DrawTypes } from "./Draw";
import DrawCoords from "./DrawCoords";

export default class FreeDraw extends Draw {
    private     _path:          Array<DrawCoords>;
    private     _color:         string;

    constructor(cw: number, ch: number, color: string = "black") {
        super(DrawTypes.Free, cw, ch);

        this._path      = new Array<DrawCoords>();
        this._color     = color;

    }

    Add(coord: DrawCoords, canvasId: string): void {

        this.draw(coord, canvasId);

        this._path.push(coord);
    }

    draw(coord: DrawCoords, canvasId: string): void {
        let ctx = this.getContext(canvasId);

        ctx.beginPath();
        ctx.strokeStyle = this._color;

        if (this._path.length > 0) {
            const previousCoord = this._path[this._path.length - 1];
            ctx.moveTo(previousCoord.X, previousCoord.Y);
        }

        ctx.lineTo(coord.X, coord.Y);
        ctx.stroke();
    }

    drawAll (canvasId: string) {
        const ctx                           = this.getContext(canvasId);
        const { canvasWidth, canvasHeight } = this.getCurrentCanvasSize(canvasId);

        ctx.beginPath ();
        ctx.strokeStyle = this._color;
        this._path.forEach ( (coord, index) => {

            if (index > 0) {
                const previousCoord = this._path[index - 1];

                const prevX = previousCoord.X * canvasHeight / this.CanvasHeight;
                const prevY = previousCoord.Y * canvasWidth  / this.CanvasWidth;

                ctx.moveTo(prevX, prevY);
            }
 
            const x =  coord.X * canvasHeight / this.CanvasHeight;
            const y =  coord.Y * canvasWidth  / this.CanvasWidth;

            ctx.lineTo(x, y);
            ctx.stroke();
        });
    }

    Find(coord: DrawCoords): boolean {
        let found = false;
        this._path.forEach((c) => {
            if (coord.Equals(c)) {
                found = true;
                return;
            }
        });
        return found;
    }
}

export enum FreeDrawState {
    Started = 0,
    Finished = 1,
}