import Bracket, { BracketState } from "./Bracket";
import { DrawTypes } from "./Draw";

export default class CulyBracket extends Bracket {

    constructor(x: number, y: number, h: number, w: number, c: string, s: BracketState, cw: number, ch: number) {
        super(DrawTypes.Curly, x, y, h, w, c, s, cw, ch);
    }

    draw(canvasId: string): void {

        let ctx = this.getContext(canvasId);
        
        ctx.lineWidth = this.Width;
        ctx.strokeStyle = this.Color;
        let halfSize: number = this.Height / 2;
        let quarterSize: number = this.Height / 4;
        let oneEighthSize: number = this.Height / 8;
        let radius: number = oneEighthSize;

        if (this.State == BracketState.Opened) {
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
    }
}

