import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Home from './Home/Home.js';
import NotFound from './NotFound/NotFound.js';
import Register from './Register/Register.js';
import Packs from './Packs/Packs.js';
import Pack from './Pack/Pack.js';
import CreatePack from './CreatePack/CreatePack.js'
import Profile from './Profile/Profile.js';
import Admin from './Admin/Admin.js';

const Routes = props => {
    return (
    <BrowserRouter {...props}>
        <Route path="/" component={Home} exact />
        <Route path="/register" component={Register}/>
        <Route path="/packs" component={Packs} />
        <Route path="/pack/:id" component={Pack} />
        <Route path="/createpack" component={CreatePack} />
        <Route path="/user/:username" component={Profile} />
        <Route path="/admin" component={Admin} />
        {/* <Route component={NotFound} /> */}
    </BrowserRouter>
    );
};

export default Routes;