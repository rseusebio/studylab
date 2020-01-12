import { ReactNode } from "react";

interface CanvasProps extends JSX.IntrinsicAttributes {
    _id: string;
    children?: ReactNode;
}

interface CanvasCoords {
    X: number;
    Y: number;
}

export default CanvasProps;

export {
    CanvasCoords
}