'use strict';

import React from 'react';
import styles from './styles';
import _ from 'lodash';


export default class MessageStream extends React.Component {

    constructor (props) {
        super(props);
        this.state = {messages: []};
    }

    componentDidMount () {

        // TODO: Her skal AJAX kall
    }

    render () {

        let messages = _.map(this.state.messages, (message) => {
            return (
                <li>{message}</li>
            );
        });

        return (
            <div style={styles.center}>
                <ul>
                    {messages}
                </ul>
            </div>
        );
    }
}