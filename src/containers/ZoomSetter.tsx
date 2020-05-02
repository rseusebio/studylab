import React, { FunctionComponent, useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { zoomOut, zoomIn } from '../actions';
import { StyledButton, ButtonContainer } from './ZoomSetter.styles';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { IState } from '../reducers';

interface IZoom {
    zoomIn: () => void,
    zoomOut: () => void,
    drawImageAtCanvas: (imgUrl: string) => boolean,
    imageUrl: string,
}

const ZoomSetter: FunctionComponent<IZoom> = ({ zoomIn, zoomOut, drawImageAtCanvas, imageUrl }: IZoom) => {
    console.info(`ZoomSetter: reloading!`);
    drawImageAtCanvas(imageUrl);
    return (
        <ButtonContainer>
            <StyledButton onClick={zoomIn}>
                <AddIcon />
            </StyledButton>
            <StyledButton onClick={zoomOut}>
                <RemoveIcon />
            </StyledButton>
        </ButtonContainer>
    );
}
const changeRate: number = 0.05;

const mapStateToProps = (state: IState, ownProps: any) => ({
    drawImageAtCanvas: state.drawImageAtCanvas,
    imageUrl: state.imageUrl,
    zoom: state.zoom,
});

const mapDispatchToProps = (dispatch: any) => (
    {
        zoomIn: () => { dispatch(zoomIn(changeRate)) },
        zoomOut: () => { dispatch(zoomOut(changeRate)) }
    }
);

export default connect(mapStateToProps, mapDispatchToProps)(ZoomSetter);