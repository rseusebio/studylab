import { combineReducers }               from 'redux'
import zoom                              from './zoom';
import imageUrl                          from './image';
import canvasSize, { CanvasSize }        from './canvasSize';
import {
    imageId,
    canvasId,
    urlInputId,
    canvasHeight,
    canvasWidth,
    drawImageAtCanvas,
    loadImageOnCanvas, 
    clearCanvas,
    setImageSource, 
} from './init';


// here we are defining the state structure:
/*
* it will have a string field called zoom and another string field called imageUrl
*/

export interface IState {
    zoom: number,
    imageUrl: string,

    canvasId: string,
    imageId: string,
    urlInputId: string,

    canvasHeight: number,
    canvasWidth: number,

    canvasSize: CanvasSize,

    drawImageAtCanvas: (imageUrl: string) => boolean,
    loadImageOnCanvas: () => boolean,
    clearCanvas: () => void,
    setImageSource: (imageUrl: string) => boolean,
}



const rootReducer = combineReducers({
    zoom,
    imageUrl,

    imageId,
    canvasId,
    urlInputId,
    canvasHeight,
    canvasWidth,
    drawImageAtCanvas,
    loadImageOnCanvas, 
    clearCanvas,
    setImageSource,

    canvasSize,
});



export default rootReducer;

