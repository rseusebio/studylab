import React, { useState, useEffect, ChangeEventHandler, ChangeEvent, FunctionComponent } from 'react';
import styled from 'styled-components';
import CanvasProps, { CanvasCoords, CanvasInternalStates } from '../types/CanvasClasses';
import {
    CanvasContainer,
    CanvasHeader,
    BoostedCanvas,
    PanelOpener,
    PanelContainer,
    PanelControllers
} from './Canvas.styles'
import ImageSetter from '../containers/ImageSetter';
import ImageComponent from '../components/ImagePage';

const IMG_SRC: string = "https://i.ytimg.com/vi/MPV2METPeJU/maxresdefault.jpg";
const IMG_ID: string = "dog_image";

const loadAnImage = (ev: React.MouseEvent<HTMLButtonElement, MouseEvent> | null) => {
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

const canvasSizes = () => {
    const heightPercent = 0.97;
    const widthRatio = 0.9;
    const height = window.innerHeight * heightPercent;
    const width = height * widthRatio;
    return { height, width }
}

const ControlPanel = () => {
    const [open, setOpen] = useState(false);
    return (
        <PanelContainer className={open ? "open-panel" : ""}>
            <PanelControllers>
                <ImageSetter/>
            </PanelControllers>
            <PanelOpener onClick={() => { console.info(`setting open to ${!open}`); setOpen(!open); }} />
        </PanelContainer>
    )
}

const MyCanvas: FunctionComponent<CanvasProps> = (props: CanvasProps) => {

    //#region Component States
    // I should work on how to zoom in and zoom out 
    const { height, width } = canvasSizes();
    const [canvasHeight, setCanvasHeight] = useState(height);
    const [canvasWidth, setCanvasWidth] = useState(width);
    const [cursor, setCursor] = useState("default");
    useEffect(() => {
        // loadAnImage(null);
        // printAnImage(null);
        initKeyPressListeners();
    });
    //#endregion

    // #region Component Variables
    // This is just a Flag that changes according to button click. 
    // there is no need for it to be a state variable.
    // because we don't want it to reload the screen
    const canvasState = new CanvasInternalStates();
    // #endregion

    //this should reload the screen
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
        // rerender the canvas to change its cursor.
        // setCursor("crosshair");
        // set canvas's state to drawing mode
        canvasState.Drawing = true;
        // set the beginning coordinate
        canvasState.Coords.X = ev.nativeEvent.offsetX;
        canvasState.Coords.Y = ev.nativeEvent.offsetY;

    }
    const mouseUpHandler = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        canvasState.Drawing = false;
    }
    const mouseMovementHandler = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        const canvas: any = document.getElementById(props._id) as HTMLCanvasElement;
        if (!canvas) {
            return;
        }
        if (!canvasState.Drawing) {
            return;
        }
        else {
            // free drawing
            // offset is the coordinate relative to the position of the padding edge of the target node
            const currentX = ev.nativeEvent.offsetX;
            const currentY = ev.nativeEvent.offsetY;
            // moviment is the coordinate relative to the position of the last mousemove event.
            const prevX = currentX - ev.movementX;
            const prevY = currentY - ev.movementY;
            const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
            ctx.beginPath();
            ctx.strokeStyle = "";
            ctx.moveTo(prevX, prevY);
            ctx.lineTo(currentX, currentY);
            ctx.stroke();
        }
    }
    const mouseClickHandler = (ev: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
        canvasState.Coords.X = ev.nativeEvent.offsetX;
        canvasState.Coords.Y = ev.nativeEvent.offsetY;
        // CTRL key
        if (canvasState.keyState.get("17")) {
            drawingSquareBrackets(true);
        }
        // SHIFT key
        else if (canvasState.keyState.get("16")) {
            drawingSquareBrackets(false);
        }
        // 'C' key
        else if (canvasState.keyState.get("67")) {
            drawingCurlyBrackets(true);
        }
        // 'V' key
        else if (canvasState.keyState.get("86")) {
            drawingCurlyBrackets(false);
        }
    }
    // #endregion 

    // #region Keyboard Events
    const keyDownHandler = (ev: KeyboardEvent) => {
        canvasState.keyState.set(ev.keyCode + "", true);
    }
    const keyUpHandler = (ev: KeyboardEvent) => {
        canvasState.keyState.set(ev.keyCode + "", false);
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
        ctx.lineWidth = canvasState.Width;
        ctx.strokeStyle = "blue";
        let halfSize: number = canvasState.Height / 2;
        ctx.moveTo(canvasState.Coords.X, canvasState.Coords.Y);
        ctx.lineTo(canvasState.Coords.X, canvasState.Coords.Y + halfSize);
        if (isOpen) {
            ctx.lineTo(canvasState.Coords.X + halfSize, canvasState.Coords.Y + halfSize);
        }
        else {
            ctx.lineTo(canvasState.Coords.X - halfSize, canvasState.Coords.Y + halfSize);
        }
        ctx.moveTo(canvasState.Coords.X, canvasState.Coords.Y);
        ctx.lineTo(canvasState.Coords.X, canvasState.Coords.Y - halfSize);
        if (isOpen) {
            ctx.lineTo(canvasState.Coords.X + halfSize, canvasState.Coords.Y - halfSize);
        }
        else {
            ctx.lineTo(canvasState.Coords.X - halfSize, canvasState.Coords.Y - halfSize);
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
        ctx.lineWidth = canvasState.Width;
        ctx.strokeStyle = "blue";
        let halfSize: number = canvasState.Height / 2;
        let quarterSize: number = canvasState.Height / 4;
        let oneEighthSize: number = canvasState.Height / 8;
        let radius: number = oneEighthSize;
        // #region drawing curly brackets
        if (isOpen) {
            ctx.moveTo(canvasState.Coords.X - oneEighthSize, canvasState.Coords.Y);
            ctx.arcTo(canvasState.Coords.X, canvasState.Coords.Y, canvasState.Coords.X, canvasState.Coords.Y - oneEighthSize, radius);
            ctx.lineTo(canvasState.Coords.X, canvasState.Coords.Y - oneEighthSize - quarterSize);
            ctx.arcTo(canvasState.Coords.X, canvasState.Coords.Y - halfSize, canvasState.Coords.X + oneEighthSize, canvasState.Coords.Y - halfSize, radius);
            ctx.moveTo(canvasState.Coords.X - oneEighthSize, canvasState.Coords.Y);
            ctx.arcTo(canvasState.Coords.X, canvasState.Coords.Y, canvasState.Coords.X, canvasState.Coords.Y + oneEighthSize, radius);
            ctx.lineTo(canvasState.Coords.X, canvasState.Coords.Y + oneEighthSize + quarterSize);
            ctx.arcTo(canvasState.Coords.X, canvasState.Coords.Y + halfSize, canvasState.Coords.X + oneEighthSize, canvasState.Coords.Y + halfSize, radius);
        }
        else {
            ctx.moveTo(canvasState.Coords.X + oneEighthSize, canvasState.Coords.Y);
            ctx.arcTo(canvasState.Coords.X, canvasState.Coords.Y, canvasState.Coords.X, canvasState.Coords.Y - oneEighthSize, radius);
            ctx.lineTo(canvasState.Coords.X, canvasState.Coords.Y - oneEighthSize - quarterSize);
            ctx.arcTo(canvasState.Coords.X, canvasState.Coords.Y - halfSize, canvasState.Coords.X - oneEighthSize, canvasState.Coords.Y - halfSize, radius);
            ctx.moveTo(canvasState.Coords.X + oneEighthSize, canvasState.Coords.Y);
            ctx.arcTo(canvasState.Coords.X, canvasState.Coords.Y, canvasState.Coords.X, canvasState.Coords.Y + oneEighthSize, radius);
            ctx.lineTo(canvasState.Coords.X, canvasState.Coords.Y + oneEighthSize + quarterSize);
            ctx.arcTo(canvasState.Coords.X, canvasState.Coords.Y + halfSize, canvasState.Coords.X - oneEighthSize, canvasState.Coords.Y + halfSize, radius);
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
            <ControlPanel />
            {/* <div>
                <p>canvas setting</p>
                <input type="number" value={canvasHeight} onChange={handleHeightChange} />
                <input type="number" value={canvasWidth} onChange={handleWidthChange} />
            </div> */}
            <BoostedCanvas
                height={canvasHeight}
                width={canvasWidth}
                id={props._id}
                // style={{ cursor: cursor }}
                onMouseDown={mouseDownHandler}
                onMouseMove={mouseMovementHandler}
                onMouseUp={mouseUpHandler}
                onMouseLeave={mouseUpHandler}
                onClick={mouseClickHandler}

            />
            <ImageComponent/>

        </CanvasContainer>
    )
}



export default MyCanvas;