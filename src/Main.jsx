'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';

import App from './App';
import Menu from './Menu';

import createHashHistory from 'history/lib/createHashHistory';
let history = createHashHistory();

ReactDOM.render((
    <Router history={history}>
        <Route path='/' component={App}/>
        <Route path='/menu' component={Menu}/>
    </Router>
), document.getElementById('app'));
