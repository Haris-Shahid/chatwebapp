import React from 'react';
import ReactDOM from 'react-dom';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

import RootReducer from './store/reducers'
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import AllRoutes from './routers';

const Store = createStore(RootReducer,
    {},
    applyMiddleware(
        thunk,
    )
);
ReactDOM.render(
    <Provider store={Store} >
        <AllRoutes />
    </Provider>
    , document.getElementById('root'));
registerServiceWorker();
