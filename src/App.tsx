import React, { FunctionComponent } from 'react';
import './App.css';
import CanvasPage from './components/CanvasPage';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducers';
import { Switch, Route } from 'react-router-dom';
import initialState from './reducers/init';

const store = createStore(rootReducer, initialState);

const App: FunctionComponent = () => {
  return (
    <Provider store={store}>

      <Switch>

        <Route path="/upload">
          <div>
            <p>To be implemented</p>
          </div>
        </Route>

        <Route path="/uploaded">
          <div>
            <p>To be implemented</p>
          </div>
        </Route>

        <Route path="/edition">
          <CanvasPage />
        </Route>

        <Route path="/">
          <div>
            <p>
              Login
            </p>
          </div>
        </Route>
      </Switch>

    </Provider>
  );
}
export default App;

