import Bracket, { BracketState } from "./Bracket";
import { DrawTypes } from "./Draw";

export default class CulyBracket extends Bracket {

    constructor(x: number, y: number, h: number, w: number, c: string, s: BracketState, cw: number, ch: number) {
        super(DrawTypes.Curly, x, y, h, w, c, s, cw, ch);
    }

    draw(canvasId: string, reDrawing: boolean = false): void {

        let ctx = this.getContext(canvasId);

        let height  = this.Height;
        let width   = this.Width;
        let x       = this.X;
        let y       = this.Y;

        if (reDrawing) {
            let { canvasWidth, canvasHeight } = this.getCurrentCanvasSize(canvasId);

            height      =    this.Height    *   canvasHeight  / this.CanvasHeight;
            width       =    this.Width     *   canvasWidth   / this.CanvasWidth;
            x           =    this.X         *   canvasHeight  / this.CanvasHeight;
            y           =    this.Y         *   canvasWidth   / this.CanvasWidth;
        }
        
        
        ctx.lineWidth = width;
        ctx.strokeStyle = this.Color;
        let halfSize: number = height / 2;
        let quarterSize: number = height / 4;
        let oneEighthSize: number = height / 8;
        let radius: number = oneEighthSize;

        if (this.State === BracketState.Opened) {
            ctx.moveTo(x - oneEighthSize, y);
            ctx.arcTo(x, y, x, y - oneEighthSize, radius);
            ctx.lineTo(x, y - oneEighthSize - quarterSize);
            ctx.arcTo(x, y - halfSize, x + oneEighthSize, y - halfSize, radius);

            ctx.moveTo(x - oneEighthSize, y);
            ctx.arcTo(x, y, x, y + oneEighthSize, radius);
            ctx.lineTo(x, y + oneEighthSize + quarterSize);
            ctx.arcTo(x, y + halfSize, x + oneEighthSize, y + halfSize, radius);
        }
        else {
            ctx.moveTo(x + oneEighthSize, y);
            ctx.arcTo(x, y, x, y - oneEighthSize, radius);
            ctx.lineTo(x, y - oneEighthSize - quarterSize);
            ctx.arcTo(x, y - halfSize, x - oneEighthSize, y - halfSize, radius);

            ctx.moveTo(x + oneEighthSize, y);
            ctx.arcTo(x, y, x, y + oneEighthSize, radius);
            ctx.lineTo(x, y + oneEighthSize + quarterSize);
            ctx.arcTo(x, y + halfSize, x - oneEighthSize, y + halfSize, radius);
        }

        ctx.stroke();
    }
}

