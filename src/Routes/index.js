import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './Home/Home.js';
import NotFound from './NotFound/NotFound.js';
import Register from './Register/Register.js';

const Routes = props => {
    return (
    <BrowserRouter {...props}>
        <Route path="/" component={Home} exact />
        <Route path="/register" component={Register}/>
        <Route component={NotFound} />
    </BrowserRouter>
    );
};

export default Routes;