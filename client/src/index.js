import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import axios from 'axios';
import { Provider } from 'react-redux';
import  store  from './redux-toolkit/store';
import dotenv from 'dotenv'

dotenv.config()
if (module.hot && process.env.NODE_ENV !== "production"){
  module.hot.accept()
}
axios.defaults.baseURL = process.env.REACT_APP_API || "http://localhost:3001";
ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
