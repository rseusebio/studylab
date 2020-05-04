export class CanvasNotFound extends Error {

    constructor(message: string) {
        super(message);
    }

}

export class ContextNotFound extends Error {
    
    constructor(message: string) {
        super(message);
    }
}

export enum DrawTypes {
    Free    = "FreeDrawing",
    Round   = "RoundBrackets",
    Square  = "SquareBrackets",
    Angle   = "AngleBrackets",
    Curly   = "CurlyBrackets"
}

interface CanvasSize {
    canvasHeight: number;
    canvasWidth:  number;
}

export default class Draw {
    private _type:                    DrawTypes;
    private _originalCanvasHeight:    number;
    private _originalCanvasWidth:     number;

    constructor(type: DrawTypes, canvasWidth: number, canvasHeight: number ) {
        this._type                      = type;
        this._originalCanvasWidth       = canvasWidth;
        this._originalCanvasHeight      = canvasHeight;
    }

    get Type(): DrawTypes {
        return this._type;
    }

    get CanvasHeight(): number {
        return this._originalCanvasHeight
    }

    get CanvasWidth(): number {
        return this._originalCanvasWidth
    }

    private getCanvas(canvasId: string): HTMLCanvasElement {
        let canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        if (!canvas) {
            throw new CanvasNotFound(`No canvas for id: ${canvasId}`);
        }
        return canvas;
    }

    public getCurrentCanvasSize(canvasId: string): CanvasSize {
        let canvas = this.getCanvas(canvasId);
        return { canvasHeight: canvas.height, canvasWidth: canvas.width };
    }

    public getContext(canvasId: string): CanvasRenderingContext2D {
        let canvas = this.getCanvas(canvasId);
        let ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
        if (!ctx) {
            throw new CanvasNotFound(`No context for id: ${canvasId}`);
        }
        return ctx;
    }
}

