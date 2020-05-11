import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { IState }               from '../reducers';
import { changeCanvasSize }     from '../actions';
import CanvasUtilities          from '../classes/CanvasUtilities';

interface IImagePageProps {
    setCanvasSize: (target: EventTarget & HTMLImageElement) => void
}

const ImagePage: FunctionComponent<IImagePageProps> = (props: IImagePageProps) => {

    const styleObject = {
        display: 'none',
    }

    const onLoadCallback = (ev: React.SyntheticEvent<HTMLImageElement, Event>) => {
        props.setCanvasSize(ev.currentTarget);
        console.info(`ImagePage :: onLoadCallback :: dispatched`, ev.currentTarget.height, ev.currentTarget.width);
    }

    return (
        <div style={styleObject}>
            <img
                alt     =   {"not displayed to hold canvas draw"}
                id      =   {CanvasUtilities.imageId}
                onLoad  =   {onLoadCallback}
                />
        </div>
    );
}

const mapStateToProps    = (state: IState, ownProps: any) => ({  });
const mapDispatchToProps = (dispatch: Function, ownProps: any) => ({
    setCanvasSize: (target: EventTarget & HTMLImageElement) => dispatch(changeCanvasSize(target))
});

export default connect(mapStateToProps, mapDispatchToProps)(ImagePage);;