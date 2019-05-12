import React, { Component } from 'react';

import { BrowserRouter, Route, NavLink, Redirect } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';

import Signup from './container/authScreen/signup';
import Login from './container/authScreen/login';
import Profile from './container/profile'
import Chat from './container/chat';

import Navbar from './component/navbar/index';

class AllRoutes extends Component {

    render() {
        return (
            <BrowserRouter>
                <Navbar />
                <div>
                    <Route path='/' exact component={Login} />
                    <Route path='/signup' exact component={Signup} />
                    <Route path='/profile' component={Profile} />
                    <Route path='/inbox/:username' component={Chat} />
                </div>

            </BrowserRouter>
        )
    }
}

export default AllRoutes;