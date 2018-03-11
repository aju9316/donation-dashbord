import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';
import dataArray from './seed-data';

let donorArray = window.localStorage.getItem('donors');

if(!donorArray) {
  window.localStorage.setItem('donors', JSON.stringify(dataArray));
}

ReactDOM.render(<App />, document.getElementById('app'))