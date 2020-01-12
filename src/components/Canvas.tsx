import React, { useState, useEffect, ChangeEventHandler, ChangeEvent, FunctionComponent } from 'react';
import styled from 'styled-components';
import CanvasProps, { CanvasCoords } from '../types/CanvasProps';


const allowedColors: Array<string> = [
    "blue",
    "red",
    "green",
    "purple"
];
const CanvasContainer = styled.div`
    height: 80vh;
    width: 80vw;

    background-color: rgba(250, 250, 250, 1);

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;

    border: 1px dashed purple;
`;

const StyledCanvas = styled.canvas`
    height: 500px;
    width: 500px;
    border: 1px solid blue;
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
const CanvasColorSelect = styled.select`
    padding: 0mm;
    margin: 0mm;
`;

const LittleDiv = styled.div`
    height: 5mm;
    width: 5mm;
`;

const BoostedCanvas = styled.canvas`
    // height: 50mm;
    // width: 50mm;
    border 1px dashed orange;
    cursor: crosshair;
    margin-left: 50mm;
`;

const MyCanvas: FunctionComponent<CanvasProps> = (props: CanvasProps) => {

    let [color, setColor] = useState(allowedColors[0]);

    let [canvasHeight, setCanvasHeight] = useState(100);

    let [canvasWidth, setCanvasWidth] = useState(100);

    const selectionHandler = (e: ChangeEvent<HTMLSelectElement>) => {
        setColor(e.target.value);
    }

    let coords: CanvasCoords = {
        X: 0,
        Y: 0
    }

    let isDrawing: boolean = false;

    const mouseDownHandler = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {

        var showMeEvent = `
        clientX: ${ev.clientX},
        clientY: ${ev.clientY},
        movementX: ${ev.movementX},
        movementY: ${ev.movementY},
        pageX: ${ev.pageX},
        pageY: ${ev.pageY},
        screenX: ${ev.screenX},
        screenY: ${ev.screenY}
       `;
        console.info(showMeEvent);

        let canvas = document.getElementById(props._id);
        if (!canvas) {
            console.error(`canvas is null, ${props._id}`)
            return;
        }
        console.info(`offsetTop: ${canvas?.offsetTop}, offsetLeft: ${canvas?.offsetLeft}`);
        console.info(`x: ${ev.clientX - canvas?.offsetLeft}, offsetLeft: ${ev.clientY - canvas?.offsetTop}`);

        coords.X = ev.clientX - canvas?.offsetLeft;
        coords.Y = ev.clientY - canvas?.offsetTop;
        isDrawing = true;

    }

    const mouseMovementHandler = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {

        if (!isDrawing) {
            return;
        }

        let canvas: any = document.getElementById(props._id);
        if (!canvas) {
            console.error(`canvas is null, ${props._id}`)
            return;
        }

        coords.X = ev.clientX - canvas?.offsetLeft;
        coords.Y = ev.clientY - canvas?.offsetTop;

        let prevX = coords.X - ev.movementX;
        let prevY = coords.Y - ev.movementY;

        let ctx = canvas.getContext("2d");
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(coords.X, coords.Y);
        ctx.stroke();
    }

    const mouseUpHandler = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        isDrawing = false;
    }


    return (
        <CanvasContainer>

            <CanvasHeader>MyCanvas</CanvasHeader>

            <CanvasColorSelect onChange={selectionHandler} defaultValue={allowedColors[0]}>
                {
                    (() => {
                        let count: number = 0;
                        return allowedColors.map((color: string, index: number) => {
                            return (
                                <option key={index} value={color} style={{ backgroundColor: color }} >
                                    {
                                        color
                                    }
                                </option>
                            );
                        })
                    })()
                }
            </CanvasColorSelect>

            <LittleDiv style={{ backgroundColor: color }} />

            <BoostedCanvas /*height={500} width={500}*/ id={props._id} onMouseDown={mouseDownHandler} onMouseMove={mouseMovementHandler} onMouseUp={mouseUpHandler} >

            </BoostedCanvas>

        </CanvasContainer>
    )
}

export default MyCanvas;