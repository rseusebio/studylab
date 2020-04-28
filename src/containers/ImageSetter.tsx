import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux'
import { IState } from '../reducers';
import { TextField, Button } from '@material-ui/core';

interface IImageSetterProps {
    urlInputId: string,
    drawImageAtCanvas: (imageUrl: string) => void
    clearCanvas: () => void,
}

const ImageSetter: FunctionComponent<IImageSetterProps> = (props: IImageSetterProps) => {

    const btnClick = () => {
        const textField: HTMLInputElement = document.getElementById(props.urlInputId) as HTMLInputElement;
        if (!textField) {
            return;
        }
        props.drawImageAtCanvas(textField.value);
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
            <Button color="primary" onClick={btnClick}>
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
});


export default connect(mapStateToProps, undefined)(ImageSetter);

