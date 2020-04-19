import React, { FunctionComponent, useState } from 'react';
import { connect, MapDispatchToProps } from 'react-redux'
import { IState } from '../reducers';
import { TextField, Button } from '@material-ui/core';
import { changeImg } from '../actions';
import globalProps from '../globalProps'
interface ImageProps extends IState {
    onClick: any;
}

const ImageController: FunctionComponent<ImageProps> = (props: ImageProps) => {
    console.info(`ImageController RELOADED :: props:  ${props}`);
    const loadImageOnCanvas = (imgSrc: CanvasImageSource) => {
        const canvas: HTMLCanvasElement = document.getElementById(globalProps.canvasId) as HTMLCanvasElement;
        if (!canvas) {
            return;
        }
        const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
        if (!context) {
            return;
        }
        context.drawImage(imgSrc, 0, 0);
    }
    const setImageContent = (imgUrl: string) => {
        const img: HTMLImageElement = document.getElementById(globalProps.imageId) as HTMLImageElement;
        if (!img) {
            return;
        }
        img.onload = (ev) => {
            // ev.preventDefault();
            loadImageOnCanvas(img as CanvasImageSource);
        }
        img.src = imgUrl;

    }
    const btnClick = () => {
        const textField: HTMLInputElement = document.getElementById(globalProps.urlInputId) as HTMLInputElement;
        if (!textField) {
            return;
        }
        setImageContent(textField.value);
    }
    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
                id={globalProps.urlInputId}
                style={{ maxWidth: "", backgroundColor: 'white', }}
                label={"Url"}
                helperText={"<insert url here>"}
            />
            <br />
            <Button color="primary" onClick={btnClick}>
                Set
            </Button>
        </div>
    );
}

const mapStateToProps = (state: IState, ownProps: any) => ({
    zoom: state.zoom,
    imageUrl: state.imageUrl,
    imageId: state.imageId,
    canvasId: state.canvasId
});

const mapDispatchToProps = (dispatch: any) => ({
    onClick: (url: string) => dispatch(changeImg(url))
});

const ImageSetter = connect(mapStateToProps, mapDispatchToProps)(ImageController);

export default ImageSetter;

