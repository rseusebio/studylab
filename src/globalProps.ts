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
const { canvasHeight, canvasWidth } = canvasSizes();

const globalProps = {
  imageId: "myImage",
  canvasId: "myCanvas",
  urlInputId: "myUrlInput",
  // it should be on state because it can change in the browser
  canvasHeight,
  canvasWidth,
}

export default globalProps;