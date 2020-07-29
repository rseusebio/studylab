import React, { useState, useEffect, FunctionComponent }    from    'react';
import {BoostedCanvas}                                      from    './Canvas.styles'
import { connect }                                          from    'react-redux';
import { IState }                                           from    '../reducers';
import CanvasDrawManager                                    from    '../classes/CanvasDrawManager';
import { CanvasSize }                                       from    '../reducers/canvasSize';
import CanvasUtilities                                      from    '../classes/CanvasUtilities';
import { useQuery }                                         from    '@apollo/react-hooks';
import { ZOOM }                                             from    '../gql/clientQueries';

interface ICanvasProps {
    zoom:               number,
    loadImageOnCanvas:  () => boolean,
    canvasSize:         CanvasSize
}

const Canvas: FunctionComponent<ICanvasProps> = (props: ICanvasProps) => {

    // it must be a state because it should not reload every time the component do.
    const [drawingCursor, setCursor] = useState(false);
    const [manager] = useState(new CanvasDrawManager (setCursor));
    const { data, loading, error } = useQuery(ZOOM);

    
    const canvasHeight      = props.canvasSize.height * props.zoom;
    const canvasWidth       = props.canvasSize.width  * props.zoom;

    console.info(`canvasHeight: `, canvasHeight, 'canvasWidth: ', canvasWidth, 'canvasSize: ', props.canvasSize, 'zoom: ', props.zoom);

    const initKeyPressListeners = () => {
        window.onkeydown    = (ev: KeyboardEvent) => manager.KeyDown(ev.keyCode.toString());
        window.onkeyup      = (ev: KeyboardEvent) => manager.KeyUp(ev.keyCode.toString());
    }
    
    useEffect(() => {
        initKeyPressListeners ();
        if (!props.loadImageOnCanvas ()) {
            console.error ("could not draw image!");
            return;
        }
        manager.ReDraw (CanvasUtilities.canvasId);
    });

    return (
        <BoostedCanvas
            className       = {drawingCursor ? "crosshair" : "pointer"}
            height          = {canvasHeight}
            width           = {canvasWidth}
            id              = {CanvasUtilities.canvasId}
            onMouseDown     = {()   =>  manager.SetFreeDrawing (true, canvasWidth, canvasHeight)}
            onMouseMove     = {(ev) =>  manager.FreeDraw (ev.nativeEvent.offsetX, ev.nativeEvent.offsetY, CanvasUtilities.canvasId)}
            onMouseUp       = {()   =>  manager.SetFreeDrawing (false)}
            onMouseLeave    = {()   =>  manager.SetFreeDrawing (false)}
            onClick         = {(ev) =>  manager.DrawBracket (ev.nativeEvent.offsetX, ev.nativeEvent.offsetY, CanvasUtilities.canvasId, canvasWidth, canvasHeight)}
        />);
}

const mapStateToProps = (state: IState, ownProps: any) => ({
    zoom: state.zoom,
    loadImageOnCanvas: state.loadImageOnCanvas,
    canvasSize: state.canvasSize, 
});

export default connect(mapStateToProps, undefined)(Canvas);