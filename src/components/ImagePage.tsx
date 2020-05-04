import React, { FunctionComponent } from 'react';
import { connect } from 'react-redux';
import { IState } from '../reducers';

interface IImagePageProps {
    imageId: string,
}

const ImagePage: FunctionComponent<IImagePageProps> = (props: IImagePageProps) => {
    const styleObject = {
        display: 'none',
    }
    console.info('ImagePage: reloading');
    return (
        <div style={styleObject}>
            <img id={props.imageId} onLoad={()=>{}} />
        </div>
    );
}

const mapStateToProps = (state: IState, ownProps: any) => ({ imageId: state.imageId });
const mapDispatchToProps = (state: IState, ownProps: any) => (
    {

    });

export default connect(mapStateToProps, undefined)(ImagePage);;