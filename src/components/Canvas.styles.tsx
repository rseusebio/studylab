import styled from 'styled-components';

const CanvasContainer = styled.div`
    height: 100vh;
    width: 100vw;

    background-color: rgba(240, 240, 240, 1);

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    border: 1px dashed purple;
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
    // height: 30mm;
    // width: 30mm;
    border 1px dashed orange;
    cursor: crosshair;
    margin-left: 50mm;
`;

export {
    CanvasContainer,
    CanvasHeader,
    BoostedCanvas
}