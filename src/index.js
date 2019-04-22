import React from 'react';
import ReactDOM from 'react-dom';
import { withRouter } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'

import * as serviceWorker from './serviceWorker';
import Routes from './Routes'

ReactDOM.render(<Routes history={withRouter}/>, document.getElementById('root'));
serviceWorker.unregister();
