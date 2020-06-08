import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

import './template/src/assets/css/bootstrap.min.css';
import './template/src/assets/css/now-ui-kit.css';
// import "assets/css/now-ui-kit.min.css";
// import "assets/css/now-ui-kit.css.map";
import './template/src/assets/demo/demo.css';

ReactDOM.render(
  <React.StrictMode>
    <link href="https://fonts.googleapis.com/css?family=Montserrat:400,700,200" rel="stylesheet" />
    <link href="https://use.fontawesome.com/releases/v5.7.1/css/all.css" rel="stylesheet" />
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
