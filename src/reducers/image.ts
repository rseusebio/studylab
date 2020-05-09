import { Actions, ImageAction } from '../actions/index';
import { _imageUrl } from './init';

const imageUrl = (state: any = _imageUrl, action: ImageAction) => {
    switch (action.type) {
        case Actions.IMG_CHANGE:
            return action.imgUrl;
        default:
            return state;
    }
}



export default imageUrl;