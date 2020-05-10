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

    const onLoadCallback = (ev: React.SyntheticEvent<HTMLImageElement, Event>) => {
        props.setCanvasSize(ev.currentTarget);
        const sizes = {
            height: ev.currentTarget.height, 
            clientHeight: ev.currentTarget.clientHeight,
            offsetHeight: ev.currentTarget.offsetHeight,
            naturalHeight: ev.currentTarget.naturalHeight,
            scrollHeight: ev.currentTarget.scrollHeight,

            width: ev.currentTarget.width, 
            clientwidth: ev.currentTarget.clientWidth,
            offsetwidth: ev.currentTarget.offsetWidth,
            naturalwidth: ev.currentTarget.naturalWidth,
            scrollwidth: ev.currentTarget.scrollWidth,
        }
        console.info(`ImagePage :: onLoadCallback :: dispatched`, ev.currentTarget.height, ev.currentTarget.width);
    }

    return (
        <div style={styleObject}>
            <img
                id={props.imageId}
                onLoad={onLoadCallback} />
        </div>
    );
}

const mapStateToProps    = (state: IState, ownProps: any) => ({ imageId: state.imageId });
const mapDispatchToProps = (dispatch: Function, ownProps: any) => (
    {
        setCanvasSize: (target: EventTarget & HTMLImageElement) => dispatch(changeCanvasSize(target))
    });

export default connect(mapStateToProps, mapDispatchToProps)(ImagePage);;