import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import './react-grid-layout.css';
import './react-resizable.css';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
