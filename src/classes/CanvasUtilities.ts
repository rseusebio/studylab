class CanvasUtilities {

    static imageId: string = "picture-invisible-container";
    static canvasId: string = "editing-frame";
    static urlInputId: string = "source-input";

    static setImageSource = (imgSource: string): boolean => {
        const img: HTMLImageElement = document.getElementById(CanvasUtilities.imageId) as HTMLImageElement;
        if (!img || !imgSource) {
            return false;
        }
        img.src = imgSource;
        return true;
    }

    static DrawImageAtCanvas(): boolean {
        const imgSrc: HTMLImageElement = document.getElementById(CanvasUtilities.imageId) as HTMLImageElement;
        if (!imgSrc) {
            return false;
        }
        const canvas: HTMLCanvasElement = document.getElementById(CanvasUtilities.canvasId) as HTMLCanvasElement;
        if (!canvas) {
            return false;
        }
        const context: CanvasRenderingContext2D = canvas.getContext("2d") as CanvasRenderingContext2D;
        if (!context) {
            return false;
        }
        context.drawImage(imgSrc, 0, 0, imgSrc.width as number, imgSrc.height as number, 0, 0, canvas.width, canvas.height);
        return true;
    }
}

export default CanvasUtilities;