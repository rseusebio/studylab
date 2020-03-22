import React, { FunctionComponent } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import CanvasProps from './types/CanvasClasses';

const canvasProps: CanvasProps = { _id: "myCanvas", key: "canvasProps" };

const App: React.FunctionComponent = () => {
  return (
    <Canvas {...canvasProps} />
  );
}
export default App;
