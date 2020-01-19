import { ReactNode } from "react";

export default interface CanvasProps extends JSX.IntrinsicAttributes {
    _id: string;
    children?: ReactNode;
}

export interface CanvasCoords {
    X: number;
    Y: number;
}
