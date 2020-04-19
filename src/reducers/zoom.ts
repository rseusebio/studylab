import { Actions, ZoomAction } from '../actions/index';

const zoom = (state: number = 100, action: ZoomAction) => {
    switch (action.type) {
        case Actions.ZOOM_IN:
            return state + action.percentage;
        case Actions.ZOOM_OUT:
            const newPercentage = state - action.percentage;
            return newPercentage < 0 ? 0 : newPercentage;
        default:
            return state;
    }
}

export default zoom;