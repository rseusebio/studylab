
const canvasSizes = () => {
  const canvasHeightPercentage = 0.97;
  const canvasWidthHeightRatio = 0.9;
  const canvasHeight = window.innerHeight * canvasHeightPercentage;
  const canvasWidth = canvasHeight * canvasWidthHeightRatio;
  return {
    canvasHeight,
    canvasWidth
  }
}

const globalProps = {
  imageId: "myImage",
  canvasId: "myCanvas",
  urlInputId: "myUrlInput",
  ...canvasSizes()
}

export default globalProps;