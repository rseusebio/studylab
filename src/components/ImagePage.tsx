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
            <img id={props.imageId} />
        </div>
    );
}

const mapStateToProps = (state: IState, ownProps: any) => ({ imageId: state.imageId });


export default connect(mapStateToProps, undefined)(ImagePage);;