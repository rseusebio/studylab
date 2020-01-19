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
    height: 100vh;
    width: 100vw;

    background-color: rgba(240, 240, 240, 1);

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
    // height: 30mm;
    // width: 30mm;
    border 1px dashed orange;
    cursor: crosshair;
    margin-left: 50mm;
`;
const IMG_SRC: string = "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg";
const IMG_ID: string = "dog_image";
const loadingAnImage = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const src: string = IMG_SRC;
    const id: string = IMG_ID;
    const img = document.getElementById(IMG_ID) as HTMLImageElement;
    img.onload = () => {
        window.alert(`image loaded`);
        console.info("img :: height", img.height, "width", img.width, "clientHeight", img.clientHeight, "clientWidth", img.clientWidth);
        img.height = 500;
        img.width = 500;
        console.info("img :: height", img.height, "width", img.width, "clientHeight", img.clientHeight, "clientWidth", img.clientWidth);

    }
    img.src = src;
}

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

    const printAnImage = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const id: string = IMG_ID;
        let img = document.getElementById(id) as HTMLImageElement;
        if (!img) {
            window.alert("failed ")
            return;
        }
        let canvas = document.getElementById(props._id) as HTMLCanvasElement;
        const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
        ctx.drawImage(img, 0, 0);
        console.info("canvas :: height", canvas.height, "width", canvas.width, "clientHeight", canvas.clientHeight, "clientWidth", canvas.clientWidth);
    }

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

            <BoostedCanvas
                height={500}
                width={500}
                id={props._id}
                onMouseDown={mouseDownHandler}
                onMouseMove={mouseMovementHandler}
                onMouseUp={mouseUpHandler}
                onMouseLeave={mouseUpHandler} >

            </BoostedCanvas>

            <button onClick={loadingAnImage}>
                Load Image
            </button>

            <button onClick={printAnImage}>
                Print image
            </button>

            <img id={IMG_ID} style={{ display: 'none' }} />
        </CanvasContainer>
    )
}

export default MyCanvas;