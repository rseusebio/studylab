import React, { ReactNode } from 'react';
import logo from './logo.svg';
import './App.css';
import Canvas from './components/Canvas';
import CanvasProps from './types/CanvasProps'

// const App: React.FC = () => {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.tsx</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }
const canvasProps: JSX.IntrinsicAttributes & CanvasProps & { children?: ReactNode } = {
  _id: "myCanvas",
  key: "canvasProps"
}

const App: React.FC = () => {
  return (
    <Canvas {...canvasProps} />
  );
}
export default App;
