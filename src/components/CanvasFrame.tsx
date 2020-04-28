import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { IState } from '../reducers/index';
import styled from 'styled-components';


interface ICanvasFrameProps {
    canvasHeight: number,
    canvasWidth: number,
    children: FunctionComponent<any>,
}

const CanvasFrame: FunctionComponent<ICanvasFrameProps> = (props: ICanvasFrameProps) => {
    console.info('CanvasFrame : reloading', props);
    const FrameDiv = styled.div`
        height: ${props.canvasHeight}px;
        width: ${props.canvasWidth}px;
        overflow-y: scroll;
        overflow-x: scroll;
        padding: 0mm;
        margin: 0mm;`;
    return (
        <FrameDiv>
            {
                props.children
            }
        </FrameDiv>
    )
};

const mapStateToProps = (state: IState, ownProps: any) => ({
    canvasHeight: state.canvasHeight,
    canvasWidth: state.canvasWidth,
});

export default connect(mapStateToProps, undefined)(CanvasFrame);