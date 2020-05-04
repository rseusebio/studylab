const canvasSizes = () => {
    const canvasHeightPercentage = 0.97;
    const canvasWidthHeightRatio = 0.9;
    const canvasHeight = window.innerHeight * canvasHeightPercentage;
    const canvasWidth = canvasHeight * canvasWidthHeightRatio;
    return {
        _canvasHeight: canvasHeight,
        _canvasWidth: canvasWidth,
    }
}

const _getImageSize = (canvas: HTMLCanvasElement, imgSrc: CanvasImageSource) => {
    console.info(`imgSrc: height: ${imgSrc.height}, width: ${imgSrc.width}`);
    console.info(`canvas :: height: ${canvas.height},width: ${canvas.width}`);
    let imgWidth = imgSrc.width;
    let imgHeight = imgSrc.height;
    if (imgSrc.width > imgSrc.height && imgSrc.width > canvas.width) {
        imgWidth = canvas.width as number;
        imgHeight = (canvas.width * (imgSrc.height as number)) / (imgSrc.width as number);
    }
    else if (imgSrc.height > canvas.height) {
        imgHeight = canvas.height as number;
        imgWidth = (canvas.height * (imgSrc.width as number)) / (imgSrc.height as number);
    }
    return {imgHeight, imgWidth};
}

const _loadImageOnCanvas = (imgSrc: CanvasImageSource) => {
    const canvas: HTMLCanvasElement = document.getElementById(_canvasId) as HTMLCanvasElement;
    if (!canvas) {
        return false;
    }
    const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
    if (!context) {
        return false;
    }
    let {imgHeight, imgWidth} = _getImageSize(canvas, imgSrc);
    context.drawImage(imgSrc, 0, 0, imgSrc.width as number, imgSrc.height as number, 0, 0, imgHeight as number, imgWidth as number);
    return true;
}

//#region Defining Inital State Variables
const _imageId = "myImage";
const _canvasId = "myCanvas";
const _urlInputId = "myUrlInput";

const { _canvasHeight, _canvasWidth } = canvasSizes();
const _zoom                           = 1;
const _imageUrl                       = "";
const _imageWidth                     = _canvasWidth;
const _imageHeight                    = _canvasHeight;

const _drawImageAtCanvas = (imgUrl: string = _imageUrl) => {
    const img: HTMLImageElement = document.getElementById(_imageId) as HTMLImageElement;
    if (!img) {
        return false;
    }
    if (imgUrl == "" && img.src != "") {
        return _loadImageOnCanvas(img as CanvasImageSource);
    }
    else {
        img.onload = (ev) => {
            // ev.preventDefault();
            _loadImageOnCanvas(img as CanvasImageSource);
        }
        img.src = imgUrl;
        return true;
    }
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
const drawImageAtCanvas = (state: Function = _drawImageAtCanvas, action: any) => (state);
const clearCanvas = (state: Function = _clearCanvas, action: any) => (state);
////#endregion


const initialState = {
    // constants
    imageId: _imageId,
    canvasId: _canvasId,
    urlInputId: _urlInputId,
    // variables
    zoom: _zoom,
    imageUrl: _imageUrl,
    canvasHeight: _canvasHeight,
    canvasWidth: _canvasWidth,
    
    drawImageAtCanvas: _drawImageAtCanvas,
    clearCanvas: _clearCanvas,
}

export default initialState;
export {
    imageId,
    canvasId,
    urlInputId,
    canvasHeight,
    canvasWidth,
    drawImageAtCanvas,
    clearCanvas,

    _imageUrl,
    _zoom
}