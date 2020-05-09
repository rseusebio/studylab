import { CanvasSizeAction, Actions } from "../actions";
import { defaultCanvasSizes } from './init';

export interface CanvasSize {
    height: number,
    width: number,
}

const { _canvasHeight, _canvasWidth } = defaultCanvasSizes();
const defaultSize = { height: _canvasHeight, width: _canvasWidth };

const canvasSize = (state: CanvasSize = defaultSize, action: CanvasSizeAction) => {
    switch (action.type) {
        case Actions.CANVAS_SIZE_CHANGE:
            return {
                height: action.imgHeight,
                width: action.imgWidth
            };
        default:
            return defaultSize;
    }
}

export default canvasSize;

