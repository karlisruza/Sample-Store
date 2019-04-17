import React from 'react';
import { Router, Route } from 'react-router';

import Home from './Home/Home.js';
import NotFound from './NotFound/NotFound.js';
import Register from './Register/Register.js';

const Routes = props => {
    return (
    <Router {...props}>
        <Route path="/" component={Home}>
            <Route path="/register" component={Register}/>
            <Route path="*" component={NotFound} />
        </Route>
    </Router>
    );
};

export default Routes;