import React, { Component } from 'react';

import { BrowserRouter, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.css';
import Signup from './container/authScreen/signup';
import Login from './container/authScreen/login';

class AllRoutes extends Component {
    render() {
        return (
            <BrowserRouter>
                <div>
                    <Route path='/' exact component={Login} />
                    <Route path='/signup' component={Signup} />
                </div>
            </BrowserRouter>
        )
    }
}

export default AllRoutes;