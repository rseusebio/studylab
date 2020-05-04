import { DrawTypes } from "./Draw";
import Brackets, { BracketState } from "./Bracket";

export default class SquareBracket extends Brackets {

    constructor(x: number, y: number, h: number, w: number, c: string, s: BracketState, cw: number, ch: number) {
        super(DrawTypes.Square, x, y, h, w, c, s, cw, ch);
    }

    draw(canvasId: string, reDrawing: boolean = false): void {
        let ctx: CanvasRenderingContext2D = this.getContext(canvasId);
        let height = this.Height;
        let width  = this.Width;
        let x      = this.X;
        let y      = this.Y;

        if (reDrawing) {
            let { canvasWidth, canvasHeight } = this.getCurrentCanvasSize(canvasId);

            height      =    this.Height * canvasHeight / this.CanvasHeight;
            width       =    this.Width * canvasWidth / this.CanvasWidth;
            x           =    this.X *   this.CanvasWidth / canvasWidth;
            y           =    this.Y * this.CanvasHeight / canvasHeight;
        }
        

        ctx.lineWidth = width;
        ctx.strokeStyle = this.Color;
        let halfSize: number = height / 2;

        ctx.moveTo(x, y);
        ctx.lineTo(x, y + halfSize);

        if (this.State == BracketState.Opened) {
            ctx.lineTo(x + halfSize, y + halfSize);
        }
        else {
            ctx.lineTo(x - halfSize, y + halfSize);
        }

        ctx.moveTo(x, y);
        ctx.lineTo(x, y - halfSize);

        if (this.State == BracketState.Opened) {
            ctx.lineTo(x + halfSize, y - halfSize);
        }
        else {
            ctx.lineTo(x - halfSize, y - halfSize);
        }

        ctx.stroke();
    }
}
