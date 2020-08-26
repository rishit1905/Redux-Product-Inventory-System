import React from 'react';
import ReactDOM from 'react-dom';
import "./index.css"
import { createStore } from "redux";
import { Provider } from 'react-redux';
import allReducers from './reducers/combinereducer';
import App from './app';
import { HashRouter } from 'react-router-dom';


const store = createStore(allReducers)
ReactDOM.render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root')
);

