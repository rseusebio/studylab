const defaultCanvasSizes = () => {
    const canvasHeightPercentage = 0.97;
    const canvasWidthHeightRatio = 0.9;
    const canvasHeight = window.innerHeight * canvasHeightPercentage;
    const canvasWidth = canvasHeight * canvasWidthHeightRatio;
    return {
        _canvasHeight: canvasHeight,
        _canvasWidth: canvasWidth,
    }
}

const _loadImage = (): boolean => {
    const imgSrc: HTMLImageElement = document.getElementById(_imageId) as HTMLImageElement;
    if (!imgSrc) {
        return false;
    }
    const canvas: HTMLCanvasElement = document.getElementById(_canvasId) as HTMLCanvasElement;
    if (!canvas) {
        return false;
    }
    const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!context) {
        return false;
    }
    context.drawImage(imgSrc, 0, 0, imgSrc.width as number, imgSrc.height as number, 0, 0,canvas.width, canvas.height);
    return true;
}

//#region Defining Inital State Variables
const _imageId      = "myImage";
const _canvasId     = "myCanvas";
const _urlInputId   = "myUrlInput";

const { _canvasHeight, _canvasWidth } = defaultCanvasSizes();
const _zoom                           = 1;
const _imageUrl                       = "";


const _canvasSize                     = { width: _canvasWidth, height: _canvasHeight};


const _setImageSource = (imgUrl: string = _imageUrl): boolean => {
    const img: HTMLImageElement = document.getElementById(_imageId) as HTMLImageElement;
    if (!img || !imgUrl) {
        return false;
    }
    img.src = imgUrl;
    return true;
}

const _clearCanvas = () => {
    const canvas: HTMLCanvasElement = document.getElementById(_canvasId) as HTMLCanvasElement;
    if (!canvas) {
        return;
    }
    const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!context) {
        return;
    }
    context.clearRect(0, 0, canvas.width, canvas.height);
}
//#endregion

//#region constants' reducers
const imageId = (state: string = _imageId, action: any) => (state);
const canvasId = (state: string = _canvasId, action: any) => (state);
const urlInputId = (state: string = _urlInputId, action: any) => (state);
const canvasHeight = (state: number = _canvasHeight, action: any) => (state);
const canvasWidth = (state: number = _canvasWidth, action: any) => (state);
const loadImageOnCanvas = (state: Function = _loadImage, action: any) => (state);
const clearCanvas = (state: Function = _clearCanvas, action: any) => (state);
const setImageSource = (state: Function = _setImageSource, action: any) => (state);
////#endregion


const initialState = {
    // constants
    imageId:            _imageId,
    canvasId:           _canvasId,
    urlInputId:         _urlInputId,
    // variables
    zoom:               _zoom,
    imageUrl:           _imageUrl,
    canvasHeight:       _canvasHeight,
    canvasWidth:        _canvasWidth,

    canvasSize:         _canvasSize,
    
    clearCanvas:        _clearCanvas,
    setImageSource:     _setImageSource,
    loadImageOnCanvas:  _loadImage, 
}

export default initialState;
export {
    imageId,
    canvasId,
    urlInputId,
    canvasHeight,
    canvasWidth,
    loadImageOnCanvas,
    clearCanvas,
    setImageSource,

    _imageUrl,
    _zoom,

    defaultCanvasSizes
}