class CanvasSizeManager {

    private _width:         number;
    private _height:        number;
    private _zoom:          number;
    private _canvasHeight:  number;
    private _canvasWidth:   number;

    get Width() {
        return this._width;
    }

    set Width(w: number) {
        if (w < 0) {
            const { canvasWidth } = this.getDefaultSizes();
            this._width = canvasWidth;
        }
        else {
            this._width = w;
        }
    }

    get Height() {
        return this._height;
    }

    set Height(h: number) {
        if (h < 0) {
            const { canvasHeight } = this.getDefaultSizes();
            this._height = canvasHeight;
        }
        else {
            this._height = h;
        }
    }

    get Zoom() {
        return this._zoom;
    }

    constructor() {
        const { canvasWidth, canvasHeight, zoom } = this.getDefaultSizes();

        this._width             = canvasWidth;
        this._height            = canvasHeight;
        this._zoom              = 1;
        this._canvasHeight      = canvasHeight;
        this._canvasWidth       = canvasWidth;
    }

    SetZoom(porcentage: number) {
        this._zoom += porcentage;
        if (this._zoom < 0) {
            this._zoom = 0;
        }
    }

    getDefaultSizes() {
        const canvasHeightPercentage = 0.97;
        const canvasWidthHeightRatio = 0.9;
        const canvasHeight = window.innerHeight * canvasHeightPercentage;
        const canvasWidth = canvasHeight * canvasWidthHeightRatio;

        return {
            canvasWidth,
            canvasHeight,
            zoom: 1
        }
    }
}

export default CanvasSizeManager;