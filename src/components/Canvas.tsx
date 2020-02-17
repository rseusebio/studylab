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
    let isShiftPressed: boolean = false;
    let isCKeyPressed: boolean = false;
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
    // #region Mouse Events
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
    const mouseClickHandler = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        if (!isCtrlPressed && !isShiftPressed && !isCKeyPressed) {
            return;
        }
        const coords = {
            X: ev.nativeEvent.offsetX,
            Y: ev.nativeEvent.offsetY,
        }
        console.info("[MOUSE_CLICKED] coords:", coords,
            `button: ${ev.button}, ctrl: ${isCtrlPressed}, shift:${isShiftPressed}, c_key: ${isCKeyPressed}`);
        if (isCtrlPressed) {
            drawingSquareBrackets(coords, 25, 2.5, true);
        }
        else if (isShiftPressed) {
            drawingSquareBrackets(coords, 25, 2.5, false);
        }
        else if (isCKeyPressed) {
            drawingCurlyBrackets(coords, 70, 1);
        }

    }
    // #endregion 
    // #region Keyboard Events
    const keyDownHandler = (ev: KeyboardEvent) => {
        console.info(`[DOWN] key: ${ev.key}, keyCode: ${ev.keyCode}`);
        switch (ev.keyCode) {
            // 'c' button
            case 67:
                isCKeyPressed = true;
                break;
            // shift button
            case 16:
                isShiftPressed = true;
                break;
            // ctrl button
            case 17:
            default:
                isCtrlPressed = true;
                break;
        }
    }
    const keyUpHandler = (ev: KeyboardEvent) => {
        console.info(`[UP] key: ${ev.key}, keyCode: ${ev.keyCode}`);
        switch (ev.keyCode) {
            // 'c' button
            case 67:
                isCKeyPressed = false;
                break;
            // shift button
            case 16:
                isShiftPressed = false;
                break;
            // ctrl button
            case 17:
            default:
                isCtrlPressed = false;
                break;
        }
    }
    // #endregion
    // #region Canvas Size Change Handlers
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
    // #endregion 
    // #region Types of brackets

    // round brackets or parentheses ()
    const drawingRoundBrackets = (coords: any, height: number, width: number, isOpen: boolean = true) => { }
    // square brackets []
    const drawingSquareBrackets = (coords: any, height: number, width: number, isOpen: boolean = true) => {
        let canvas: any = document.getElementById(props._id);
        // canvas as HTMLCanvasElement;
        if (!canvas) {
            return;
        }
        let ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        ctx.lineWidth = width;
        ctx.strokeStyle = "blue";
        let halfSize: number = height / 2;
        ctx.moveTo(coords.X, coords.Y);
        ctx.lineTo(coords.X, coords.Y + halfSize);
        if (isOpen) {
            ctx.lineTo(coords.X + halfSize, coords.Y + halfSize);
        }
        else {
            ctx.lineTo(coords.X - halfSize, coords.Y + halfSize);
        }
        ctx.moveTo(coords.X, coords.Y);
        ctx.lineTo(coords.X, coords.Y - halfSize);
        if (isOpen) {
            ctx.lineTo(coords.X + halfSize, coords.Y - halfSize);
        }
        else {
            ctx.lineTo(coords.X - halfSize, coords.Y - halfSize);
        }
        ctx.stroke();
    }
    // curly brackets or braces {} 
    const drawingCurlyBrackets = (coords: any, height: number, width: number, isOpen: boolean = true) => {
        // Getting canvas by id and checking if it exists
        let canvas: any = document.getElementById(props._id);
        if (!canvas) {
            return;
        }
        // getting canvas' context
        let ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        // setting context properties
        ctx.lineWidth = width;
        ctx.strokeStyle = "blue";
        let halfSize: number = height / 2;
        let quarterSize: number = height / 4;
        let oneEighthSize: number = height / 8;
        let radius: number = oneEighthSize;
        // #region drawing curly brackets
        ctx.moveTo(coords.X - oneEighthSize, coords.Y);
        ctx.arcTo(coords.X, coords.Y, coords.X, coords.Y - oneEighthSize, radius);
        ctx.lineTo(coords.X, coords.Y - oneEighthSize - quarterSize);
        ctx.arcTo(coords.X, coords.Y - halfSize, coords.X + oneEighthSize, coords.Y - halfSize, radius);
        ctx.moveTo(coords.X - oneEighthSize, coords.Y);
        ctx.arcTo(coords.X, coords.Y, coords.X, coords.Y + oneEighthSize, radius);
        ctx.lineTo(coords.X, coords.Y + oneEighthSize + quarterSize);
        ctx.arcTo(coords.X, coords.Y + halfSize, coords.X + oneEighthSize, coords.Y + halfSize, radius);
        // #endregion

        ctx.stroke();
    }

    // #endregion

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