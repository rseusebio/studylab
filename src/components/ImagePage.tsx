import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { IState } from '../reducers';
import { changeCanvasSize } from '../actions';

interface IImagePageProps {
    imageId: string,
    setCanvasSize: (target: EventTarget & HTMLImageElement) => void
}

const ImagePage: FunctionComponent<IImagePageProps> = (props: IImagePageProps) => {
    const styleObject = {
        display: 'none',
    }
    console.info('ImagePage: reloading');
    return (
        <div style={styleObject}>
            <img
                id={props.imageId}
                onLoad={(ev) => props.setCanvasSize(ev.currentTarget)} />
        </div>
    );
}

const mapStateToProps    = (state: IState, ownProps: any) => ({ imageId: state.imageId });
const mapDispatchToProps = (dispatch: Function, ownProps: any) => (
    {
        setCanvasSize: (target: EventTarget & HTMLImageElement) => dispatch(changeCanvasSize(target))
    });

export default connect(mapStateToProps, undefined)(ImagePage);;