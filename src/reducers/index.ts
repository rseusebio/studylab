import { combineReducers } from 'redux'
import zoom from './zoom';
import imageUrl from './image';


// here we are defining are state structure:
/*
* it will have a string field called zoom and another string field called imageUrl
*/

export interface IState {
    zoom: number,
    imageUrl: string,
    canvasId: string,
    imageId: string,
}

const rootReducer = combineReducers({
    zoom,
    imageUrl,
});



export default rootReducer;
