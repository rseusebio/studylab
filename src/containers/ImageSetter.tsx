import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux'
import { IState } from '../reducers';
import { TextField, Button } from '@material-ui/core';

interface IImageSetterProps {
    urlInputId: string,
    drawImageAtCanvas: (imageUrl: string) => boolean, 
    clearCanvas: () => void,
    setImageSource: (imageUrl: string) => boolean
}

const ImageSetter: FunctionComponent<IImageSetterProps> = (props: IImageSetterProps) => {

    const btnClick = () => {
        const textField: HTMLInputElement = document.getElementById(props.urlInputId) as HTMLInputElement;
        if (!textField) {
            return;
        }
        if( !props.drawImageAtCanvas(textField.value) )
        {
            console.error("could not Save image");
        }
    }

    const newBtnClick = () => {
        const textField: HTMLInputElement = document.getElementById(props.urlInputId) as HTMLInputElement;
        if (!textField) {
            console.error(`Could not get text field element: ${props.urlInputId}.`);
            return;
        }
        if (!props.setImageSource(textField.value))
        {
            console.error(`Could not set image source.`);
        }
    }

    console.info('ImageSetter: reloading');

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <TextField
                id={props.urlInputId}
                style={{ maxWidth: "", backgroundColor: 'white', }}
                label={"Url"}
                helperText={"<insert url here>"}
            />
            <br />
            <Button color="primary" onClick={newBtnClick}>
                SET CANVAS
            </Button>
            <Button color="primary" onClick={props.clearCanvas}>
                CLEAR CANVAS
            </Button>
        </div>
    );
}

const mapStateToProps = (state: IState, ownProps: any) => ({
    urlInputId: state.urlInputId,
    drawImageAtCanvas: state.drawImageAtCanvas,
    clearCanvas: state.clearCanvas,
    setImageSource: state.setImageSource
});


export default connect(mapStateToProps, undefined)(ImageSetter);

