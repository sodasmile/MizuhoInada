'use strict';

import React from 'react';
import {Link} from 'react-router';
import _ from 'lodash';
import styles from './styles';

export default class Menu extends React.Component {

    constructor (props) {
        super(props);
        this.buttons = [
            {path: '/register_post', text: 'Registrer post'},
            {path: '/post_message', text: 'Send melding'},
            {path: '/message_stream', text: 'Meldingsstrøm'},
            {path: '/', text: 'Kart!!!'}
        ];
    }


    render () {

        let buttons = _.map(this.buttons, (button) => {
            return (
                <li>
                    <Link to={button.path}>
                        {button.text}
                    </Link>
                </li>
            );
        });

        return (
            <div style={styles.center}>
                <ul>
                    {buttons}
                </ul>
            </div>
        );
    }
}