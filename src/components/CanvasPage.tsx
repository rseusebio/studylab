import React from 'react';
import {
    CanvasContainer
} from './Canvas.styles'
import ImageComponent from '../components/ImagePage';
import ControlPanel from './ControlPanel';
import Canvas from './Canvas';

const CanvasPage = (props: any) => {
    return (
        <CanvasContainer>
            <ControlPanel />
            <Canvas />
            <ImageComponent />
        </CanvasContainer>
    )
}

export default CanvasPage;