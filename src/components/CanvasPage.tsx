import React from 'react';
import {
    CanvasContainer,
    BoostedCanvas,
    CanvasFrame
} from './Canvas.styles'
import ImageComponent from '../components/ImagePage';
import ControlPanel from './ControlPanel';
import Canvas from './Canvas';
import globalProps from '../globalProps';
import CanvasProps from '../types/CanvasClasses';

const canvasProps: CanvasProps = { _id: globalProps.canvasId, key: "canvasProps" };

const CanvasPage = (props: any) => {
    return (
        <CanvasContainer>
            <ControlPanel />
            <Canvas {...canvasProps} />
            <ImageComponent />
        </CanvasContainer>
    )
}

export default CanvasPage;