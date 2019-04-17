import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import 'bootstrap/dist/css/bootstrap.min.css'

import * as serviceWorker from './serviceWorker';
import Routes from './Routes'

ReactDOM.render(<Routes history={browserHistory}/>, document.getElementById('root'));
serviceWorker.unregister();
