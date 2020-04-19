import { Actions, ImageAction } from '../actions/index';

const imageUrl = (state: string = "", action: ImageAction) => {
    switch (action.type) {
        case Actions.IMG_CHANGE:
            return action.imgUrl;
        default:
            return state;
    }
}

export default imageUrl;