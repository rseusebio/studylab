import React, { FunctionComponent } from 'react';
import './App.css';
import Canvas from './components/Canvas';
import CanvasProps from './types/CanvasClasses';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import globalProps from './globalProps';

const canvasProps: CanvasProps = { _id: globalProps.canvasId, key: "canvasProps" };

const initialState: any = {
  zoom: 100,
  imageUrl: "<INSERT IMAGE URL>",
}

const store = createStore(rootReducer, initialState);

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>
      <Canvas {...canvasProps} />
    </Provider>

  );
}
export default App;

