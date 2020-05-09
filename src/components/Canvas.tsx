import React, { useState, useEffect, FunctionComponent }    from    'react';
import {BoostedCanvas}                                      from    './Canvas.styles'
import { connect }                                          from    'react-redux';
import { IState }                                           from    '../reducers';
import CanvasManager                                        from    '../classes/CanvasManager';
import { CanvasSize }                                       from '../reducers/canvasSize';

interface ICanvasProps {
    canvasId: string,
    zoom: number,
    canvasHeight: number,
    canvasWidth: number,
    drawImageAtCanvas: (imgUrl: string) => boolean,
    canvasSize: CanvasSize
}


const Canvas: FunctionComponent<ICanvasProps> = (props: ICanvasProps) => {

    // it must be a state because it should not reload every time the component do.
    const [manager] = useState(new CanvasManager());

    // const canvasHeight = props.canvasHeight * props.zoom;
    // const canvasWidth = props.canvasWidth * props.zoom;
    const canvasHeight      = props.canvasSize.height * props.zoom;
    const canvasWidth       = props.canvasSize.width  * props.zoom;

    const initKeyPressListeners = () => {
        window.onkeydown    = (ev: KeyboardEvent) => manager.KeyDown(ev.keyCode.toString());
        window.onkeyup      = (ev: KeyboardEvent) => manager.KeyUp(ev.keyCode.toString());
    }
    
    useEffect(() => {
        initKeyPressListeners ();
        if (!props.drawImageAtCanvas ("")) {
            console.error ("could not draw image!");
        }
        manager.ReDraw (props.canvasId);
    });

    return (
        <BoostedCanvas
            height          = {canvasHeight}
            width           = {canvasWidth}
            id              = {props.canvasId}
            onMouseDown     = {()   =>  manager.SetFreeDrawing (true, canvasWidth, canvasHeight)}
            onMouseMove     = {(ev) =>  manager.FreeDraw (ev.nativeEvent.offsetX, ev.nativeEvent.offsetY, props.canvasId)}
            onMouseUp       = {()   =>  manager.SetFreeDrawing (false)}
            onMouseLeave    = {()   =>  manager.SetFreeDrawing (false)}
            onClick         = {(ev) =>  manager.DrawBracket( ev.nativeEvent.offsetX, ev.nativeEvent.offsetY, props.canvasId, canvasWidth, canvasHeight)}
        />);
}

const mapStateToProps = (state: IState, ownProps: any) => ({
    canvasId: state.canvasId,
    zoom: state.zoom,
    canvasHeight: state.canvasHeight,
    canvasWidth: state.canvasWidth,
    drawImageAtCanvas: state.drawImageAtCanvas,
    canvasSize: state.canvasSize, 
});

export default connect(mapStateToProps, undefined)(Canvas);