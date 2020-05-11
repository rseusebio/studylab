import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux'
import { IState } from '../reducers';
import { TextField, Button } from '@material-ui/core';
import CanvasUtilities from '../classes/CanvasUtilities';

interface IImageSetterProps {
    clearCanvas: () => void,
    setImageSource: (imageUrl: string) => boolean
}

const ImageSetter: FunctionComponent<IImageSetterProps> = (props: IImageSetterProps) => {

    const newBtnClick = () => {
        const textField: HTMLInputElement = document.getElementById(CanvasUtilities.urlInputId) as HTMLInputElement;
        if (!textField) {
            console.error(`Could not get text field element: ${CanvasUtilities.urlInputId}.`);
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
                id={CanvasUtilities.urlInputId}
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
    clearCanvas: state.clearCanvas,
    setImageSource: state.setImageSource
});


export default connect(mapStateToProps, undefined)(ImageSetter);

