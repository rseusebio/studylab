import styled from 'styled-components';

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
    PanelContainer,
    PanelOpener,
    PanelControllers
}