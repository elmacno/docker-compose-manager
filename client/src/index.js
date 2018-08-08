import React from 'react';
import ReactDOM from 'react-dom';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faArrowRight, faPlus, faMinus, faPlayCircle, faSyncAlt, faTimes } from '@fortawesome/free-solid-svg-icons';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

library.add([faArrowRight, faPlus, faMinus, faPlayCircle, faSyncAlt, faTimes]);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
