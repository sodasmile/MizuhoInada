'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router';

import App from './App';
import Menu from './Menu';
import MessageStream from './MessageStream';
import PostMessage from './PostMessage';

import createHashHistory from 'history/lib/createHashHistory';
let history = createHashHistory();

ReactDOM.render((
    <Router history={history}>
        <Route path='/' component={App}/>
        <Route path='/menu' component={Menu}/>
        <Route path='/message_stream' component={MessageStream}/>
        <Route path='/post_message' component={PostMessage}/>
    </Router>
), document.getElementById('app'));
