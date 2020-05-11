import React, { FunctionComponent } from 'react';
import { connect }                  from 'react-redux';
import { IState }                   from '../reducers/index';
import styled                       from 'styled-components';
import Canvas                       from './Canvas';


interface ICanvasContainerProps {
    canvasHeight:   number,
    canvasWidth:    number,
    children:       FunctionComponent<any>,
}

const CanvasContainer: FunctionComponent<ICanvasContainerProps> = (props: ICanvasContainerProps) => {
    console.info('CanvasContainer : reloading', props);
    
    const CanvasContainer = styled.div`
        height: ${props.canvasHeight}px;
        width: ${props.canvasWidth}px;
        overflow-y: scroll;
        overflow-x: scroll;
        padding: 0mm;
        margin: 0mm;

        .pointer{
            cursor: pointer;
        }
        .crosshair{
            cursor: crosshair;
        }
    `;

    return (
        <CanvasContainer>
           <Canvas/>
        </CanvasContainer>
    )
};

const mapStateToProps = (state: IState, ownProps: any) => ({
    canvasHeight:   state.canvasHeight,
    canvasWidth:    state.canvasWidth,
});

export default connect(mapStateToProps, undefined)(CanvasContainer);