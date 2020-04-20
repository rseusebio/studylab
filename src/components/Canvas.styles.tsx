import styled from 'styled-components';
import globalProps from '../globalProps';

const CanvasContainer = styled.div`
    height: 100vh;
    width: 100vw;
    padding: 0mm;
    margin: 0mm;

    background-color: #e5eaee;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .open-panel{
        left: 0mm;
    }
`;

const CanvasHeader = styled.h3`
    height: auto;
    width: 100%;
    border: 1px solid blue;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;

    margin: 0mm;
    padding: 0mm;
`;

const BoostedCanvas = styled.canvas`
    padding: 0mm;
    margin: 0mm;
    border 0.1mm solid white;
    background-color: white;
    cursor: crosshair;
`;

const CanvasFrame = styled.div`
    height: ${globalProps.canvasHeight}px;
    width: ${globalProps.canvasWidth}px;
    border: 1px color blue;
`;

export {
    CanvasContainer,
    CanvasHeader,
    BoostedCanvas,
    CanvasFrame,
}