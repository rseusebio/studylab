import React, { useState, useEffect, ChangeEventHandler, ChangeEvent, FunctionComponent } from 'react';
import styled from 'styled-components';
import CanvasProps, { CanvasCoords, CanvasInternalStates } from '../types/CanvasClasses';
import {
    CanvasContainer,
    CanvasHeader,
    BoostedCanvas
} from './Canvas.styles'

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
    const [canvasHeight, setCanvasHeight] = useState(500);
    const [canvasWidth, setCanvasWidth] = useState(500);
    const [cursor, setCursor] = useState("default");
    useEffect(() => {
        loadingAnImage(null);
        printAnImage(null);
        initKeyPressListeners();
    });
    // #endregion

    // #region Component Variables
    // This is just a Flag that changes according to button click. 
    // there is no need for it to be a state variable.
    const internalState = new CanvasInternalStates();
    // #endregion

    const printAnImage = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => {
        const id: string = IMG_ID;
        let img = document.getElementById(id) as HTMLImageElement;
        if (!img) {
            window.alert("failed ")
            return;
        }
        let canvas = document.getElementById(props._id) as HTMLCanvasElement;
        if (!canvas) {
            return;
        }
        const ctx = canvas?.getContext("2d") as CanvasRenderingContext2D;
        ctx.drawImage(img, 0, 0, 500, 500);
    }
    // #region Mouse Events
    const mouseDownHandler = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        setCursor("crosshair");
        internalState.Drawing = true;
        internalState.Coords.X = ev.nativeEvent.offsetX;
        internalState.Coords.Y = ev.nativeEvent.offsetY;

    }
    const mouseUpHandler = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        internalState.Drawing = false;
    }
    const mouseMovementHandler = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const canvas: any = document.getElementById(props._id) as HTMLCanvasElement;
        if (!canvas) {
            return;
        }
        if (!internalState.Drawing) {
            // start checking 
            // ev.nativeEvent.
        }
        else {
            // free drawing
            // offset is the coordinate relative to the position of the padding edge of the target node
            internalState.Coords.X = ev.nativeEvent.offsetX;
            internalState.Coords.Y = ev.nativeEvent.offsetY;
            // moviment is the coordinate relative to the position of the last mousemove event.
            const prevX = internalState.Coords.X - ev.movementX;
            const prevY = internalState.Coords.Y - ev.movementY;
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(internalState.Coords.X, internalState.Coords.Y);
            ctx.stroke();
        }
    }
    const mouseClickHandler = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        internalState.Coords.X = ev.nativeEvent.offsetX;
        internalState.Coords.Y = ev.nativeEvent.offsetY;
        // CTRL key
        if (internalState.keyState.get("17")) {
            drawingSquareBrackets(true);
        }
        // SHIFT key
        else if (internalState.keyState.get("16")) {
            drawingSquareBrackets(false);
        }
        // 'C' key
        else if (internalState.keyState.get("67")) {
            drawingCurlyBrackets(true);
        }
        // 'V' key
        else if (internalState.keyState.get("86")) {
            drawingCurlyBrackets(false);
        }
    }
    // #endregion 

    // #region Keyboard Events
    const keyDownHandler = (ev: KeyboardEvent) => {
        internalState.keyState.set(ev.keyCode + "", true);
    }
    const keyUpHandler = (ev: KeyboardEvent) => {
        internalState.keyState.set(ev.keyCode + "", false);
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
    const drawingRoundBrackets = (isOpen: boolean) => { }
    // square brackets []
    const drawingSquareBrackets = (isOpen: boolean) => {
        let canvas: any = document.getElementById(props._id);
        // canvas as HTMLCanvasElement;
        if (!canvas) {
            return;
        }
        let ctx = canvas.getContext("2d");
        if (!ctx) {
            return;
        }
        ctx.lineWidth = internalState.Width;
        ctx.strokeStyle = "blue";
        let halfSize: number = internalState.Height / 2;
        ctx.moveTo(internalState.Coords.X, internalState.Coords.Y);
        ctx.lineTo(internalState.Coords.X, internalState.Coords.Y + halfSize);
        if (isOpen) {
            ctx.lineTo(internalState.Coords.X + halfSize, internalState.Coords.Y + halfSize);
        }
        else {
            ctx.lineTo(internalState.Coords.X - halfSize, internalState.Coords.Y + halfSize);
        }
        ctx.moveTo(internalState.Coords.X, internalState.Coords.Y);
        ctx.lineTo(internalState.Coords.X, internalState.Coords.Y - halfSize);
        if (isOpen) {
            ctx.lineTo(internalState.Coords.X + halfSize, internalState.Coords.Y - halfSize);
        }
        else {
            ctx.lineTo(internalState.Coords.X - halfSize, internalState.Coords.Y - halfSize);
        }
        ctx.stroke();
    }
    // curly brackets or braces {} 
    const drawingCurlyBrackets = (isOpen: boolean) => {
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
        ctx.lineWidth = internalState.Width;
        ctx.strokeStyle = "blue";
        let halfSize: number = internalState.Height / 2;
        let quarterSize: number = internalState.Height / 4;
        let oneEighthSize: number = internalState.Height / 8;
        let radius: number = oneEighthSize;
        // #region drawing curly brackets
        if (isOpen) {
            ctx.moveTo(internalState.Coords.X - oneEighthSize, internalState.Coords.Y);
            ctx.arcTo(internalState.Coords.X, internalState.Coords.Y, internalState.Coords.X, internalState.Coords.Y - oneEighthSize, radius);
            ctx.lineTo(internalState.Coords.X, internalState.Coords.Y - oneEighthSize - quarterSize);
            ctx.arcTo(internalState.Coords.X, internalState.Coords.Y - halfSize, internalState.Coords.X + oneEighthSize, internalState.Coords.Y - halfSize, radius);
            ctx.moveTo(internalState.Coords.X - oneEighthSize, internalState.Coords.Y);
            ctx.arcTo(internalState.Coords.X, internalState.Coords.Y, internalState.Coords.X, internalState.Coords.Y + oneEighthSize, radius);
            ctx.lineTo(internalState.Coords.X, internalState.Coords.Y + oneEighthSize + quarterSize);
            ctx.arcTo(internalState.Coords.X, internalState.Coords.Y + halfSize, internalState.Coords.X + oneEighthSize, internalState.Coords.Y + halfSize, radius);
        }
        else {
            ctx.moveTo(internalState.Coords.X + oneEighthSize, internalState.Coords.Y);
            ctx.arcTo(internalState.Coords.X, internalState.Coords.Y, internalState.Coords.X, internalState.Coords.Y - oneEighthSize, radius);
            ctx.lineTo(internalState.Coords.X, internalState.Coords.Y - oneEighthSize - quarterSize);
            ctx.arcTo(internalState.Coords.X, internalState.Coords.Y - halfSize, internalState.Coords.X - oneEighthSize, internalState.Coords.Y - halfSize, radius);
            ctx.moveTo(internalState.Coords.X + oneEighthSize, internalState.Coords.Y);
            ctx.arcTo(internalState.Coords.X, internalState.Coords.Y, internalState.Coords.X, internalState.Coords.Y + oneEighthSize, radius);
            ctx.lineTo(internalState.Coords.X, internalState.Coords.Y + oneEighthSize + quarterSize);
            ctx.arcTo(internalState.Coords.X, internalState.Coords.Y + halfSize, internalState.Coords.X - oneEighthSize, internalState.Coords.Y + halfSize, radius);
        }
        // #endregion

        ctx.stroke();
    }
    // como identificar o brackets e as notações
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
                style={{ cursor: cursor }}
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