import styled from 'styled-components';

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
const PanelContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: flex-start;

    position: fixed;
    top: 10mm;
    left: -50mm;

    transition: left 0.25s;
`;
const PanelOpener = styled.div`
    height: 12mm;
    width: 14mm;
    background-color: #333333;
    border-radius: 0mm 1.8mm 1.8mm 0mm;

    margin-top: 5mm;    

    position: relative;

    cursor: pointer;
`;
const PanelControllers = styled.div`
    height: ${(window.innerHeight * 25.4 / 96) - 10}mm;
    width: 50mm;
    background-color:#333333;
    position: relative;
    overflow-y: scroll;
`;
// const CanvasOpacity

export {
    CanvasContainer,
    CanvasHeader,
    BoostedCanvas,
    PanelOpener,
    PanelContainer,
    PanelControllers
}