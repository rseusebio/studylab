import React, { FunctionComponent } from 'react';
import globalProps from '../globalProps';

const ImageComponent: FunctionComponent<any> = (props: any) => {
    const styleObject = {
        display: 'none',
    }
    return (
        <div style={styleObject}>
            <img id={globalProps.imageId} />
        </div>
    );
}

export default ImageComponent;