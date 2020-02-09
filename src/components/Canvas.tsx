import React, { useState, useEffect, ChangeEventHandler, ChangeEvent, FunctionComponent } from 'react';
import styled from 'styled-components';
import CanvasProps, { CanvasCoords } from '../types/CanvasProps';


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

const BoostedCanvas = styled.canvas`
    // height: 30mm;
    // width: 30mm;
    border 1px dashed orange;
    cursor: crosshair;
    margin-left: 50mm;
`;

const IMG_SRC: string = "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg";
const IMG_ID: string = "dog_image";

const loadingAnImage = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => {
    const src: string = IMG_SRC;
    const id: string = IMG_ID;
    const img = document.getElementById(IMG_ID) as HTMLImageElement;
    img.onload = () => {
        // window.alert(`image loaded`);
        console.info("img :: height", img.height, "width", img.width, "clientHeight", img.clientHeight, "clientWidth", img.clientWidth);
        img.height = 500;
        img.width = 500;
        console.info("img :: height", img.height, "width", img.width, "clientHeight", img.clientHeight, "clientWidth", img.clientWidth);

    }
    img.src = src;
}

const MyCanvas: FunctionComponent<CanvasProps> = (props: CanvasProps) => {

    // #region Component States
    let [canvasHeight, setCanvasHeight] = useState(500);
    let [canvasWidth, setCanvasWidth] = useState(500);
    useEffect(() => {
        loadingAnImage(null);
        printAnImage(null);
        initKeyPressListeners();
    });
    // #endregion

    // #region Component Variables
    // This is just a Flag that changes according to button click. 
    // there is no need for it to be a state variable.
    let coords: CanvasCoords = {
        X: 0,
        Y: 0
    }
    let isDrawing: boolean = false;
    let isCtrlPressed: boolean = false;
    // #endregion

    const printAnImage = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => {
        const id: string = IMG_ID;
        let img = document.getElementById(id) as HTMLImageElement;
        if (!img) {
            window.alert("failed ")
            return;
        }
        let canvas = document.getElementById(props._id) as HTMLCanvasElement;
        const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
        let undefinedHolder: any = undefined;
        ctx.drawImage(img, 0, 0, 500, 500);
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

    const mouseUpHandler = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        isDrawing = false;
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

        // offset is the coordinate relative to the position of the padding edge of the target node
        coords.X = ev.nativeEvent.offsetX;
        coords.Y = ev.nativeEvent.offsetY;
        // moviment is the coordinate relative to the position of the last mousemove event.
        let prevX = coords.X - ev.movementX;
        let prevY = coords.Y - ev.movementY;

        let ctx = canvas.getContext("2d");
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(coords.X, coords.Y);
        ctx.stroke();
    }

    const handleHeightChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const value: number = parseInt(ev.target.value);
        if (isNaN(value)) {
            return;
        }
        console.info(`height value: ${value}`);
        setCanvasHeight(value);
    }

    const handleWidthChange = (ev: React.ChangeEvent<HTMLInputElement>) => {
        const value: number = parseInt(ev.target.value);
        if (isNaN(value)) {
            return;
        }
        console.info(`height value: ${value}`);
        setCanvasWidth(value);
    }

    const drawingRoundBrackets = (coords: any, height: number, width: number) => {
        let canvas: any = document.getElementById(props._id);
        // canvas as HTMLCanvasElement;
        if (!canvas) {
            return;
        }
        let ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        ctx.moveTo(coords.X, coords.Y);
        ctx.lineTo(coords.X, coords.Y + height / 2);
        ctx.lineTo(coords.X + height / 2, coords.Y + height / 2);
        ctx.moveTo(coords.X, coords.Y);
        ctx.lineTo(coords.X, coords.Y - height / 2);
        ctx.lineTo(coords.X + height / 2, coords.Y - height / 2);
        ctx.stroke();
    }

    const keyDownHandler = (ev: KeyboardEvent) => {
        console.info(`[DOWN] key: ${ev.key}, keyCode: ${ev.keyCode}`);
        if (ev.keyCode == 17) {
            isCtrlPressed = true;
        }
    }

    const keyUpHandler = (ev: KeyboardEvent) => {
        console.info(`[UP] key: ${ev.key}, keyCode: ${ev.keyCode}`);
        if (ev.keyCode == 17) {
            isCtrlPressed = false;
        }
    }

    const mouseClickHandler = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const coords = {
            X: ev.nativeEvent.offsetX,
            Y: ev.nativeEvent.offsetY,
        }
        console.info("[MOUSE_CLICKED] coords:", coords);
        if (!isCtrlPressed) {
            return;
        }
        drawingRoundBrackets(coords, 50, 50);
    }

    const initKeyPressListeners = () => {
        let canvas = document.getElementById(props._id);
        if (!canvas) {
            return;
        }
        window.onkeydown = keyDownHandler;
        window.onkeyup = keyUpHandler;
    }

    return (
        <CanvasContainer>

            <CanvasHeader>MyCanvas</CanvasHeader>

            <div>
                <p>canvas setting</p>
                <input type="number" value={canvasHeight} onChange={handleHeightChange} />
                <input type="number" value={canvasWidth} onChange={handleWidthChange} />
            </div>

            <BoostedCanvas
                height={canvasHeight}
                width={canvasWidth}
                id={props._id}
                onMouseDown={mouseDownHandler}
                onMouseMove={mouseMovementHandler}
                onMouseUp={mouseUpHandler}
                onMouseLeave={mouseUpHandler}
                onClick={mouseClickHandler}
            />

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