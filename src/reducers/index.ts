import { combineReducers } from 'redux'
import zoom from './zoom';
import imageUrl from './image';
import {
    imageId,
    canvasId,
    urlInputId,
    canvasHeight,
    canvasWidth,
    drawImageAtCanvas,
    clearCanvas,
} from './init';


// here we are defining are state structure:
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

    drawImageAtCanvas: (imageUrl: string) => void,
    clearCanvas: () => void,
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
    clearCanvas
});



export default rootReducer;

