 enum Actions {
    ZOOM_IN = 1,
    ZOOM_OUT,
    IMG_CHANGE,
    CANVAS_SIZE_CHANGE, 
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

const changeCanvasSize = (target: EventTarget & HTMLImageElement) => ({
    type: Actions.CANVAS_SIZE_CHANGE,
    imgWidth: target.width,
    imgHeight: target.height,
});

interface ActionPayload {
    type: Actions
}

export interface ZoomAction extends ActionPayload {
    percentage: number;
}

export interface ImageAction extends ActionPayload {
    imgUrl: string
}

export interface CanvasSizeAction extends ActionPayload {
    imgWidth: number, 
    imgHeight: number, 
}

export {
    Actions,
        
    zoomIn,
    zoomOut,
    changeImg,
    changeCanvasSize
}