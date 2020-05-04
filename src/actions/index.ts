 enum Actions {
    ZOOM_IN = 1,
    ZOOM_OUT,
    IMG_CHANGE,
}

const zoomIn = (percentage: number) => ({
    type: Actions.ZOOM_IN,
    percentage
});

const zoomOut = (percentage: number) => ({
    type: Actions.ZOOM_OUT,
    percentage
});

const changeImg = (imgUrl: string) => ({
    type: Actions.IMG_CHANGE,
    imgUrl
})

interface ActionPayload {
    type: Actions
}

export interface ZoomAction extends ActionPayload {
    percentage: number;
}

export interface ImageAction extends ActionPayload {
    imgUrl: string
}

export {
    Actions,
    zoomIn,
    zoomOut,
    changeImg
}