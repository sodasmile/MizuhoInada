'use strict';

import React from 'react';
import $ from 'jquery';
import styles from './styles';
import settings from './settings';
import _ from 'lodash';


export default class MessageStream extends React.Component {

    constructor (props) {
        super(props);
        this.state = {messages: []};
        this.load = this.load.bind(this);
    }

    load () {
        $.ajax({
            url: `${settings.endpoint}/Meldinger`,
            headers: {
                'LagKode': `${settings.teamCode}`,
                'DeltakerKode': `${settings.playerCode}`
            },
            type: 'GET',
            contentType: 'application/json',
            success: (data) => this.setState({messages: data.meldinger}),
            error: (xhr, status, err) => console.log(`${status}: ${err}`)
        });
    }

    componentDidMount () {
        this.load();
        setTimeout(this.load, 6000);
    }

    render () {

        let messages = _.map(this.state.messages, (message) => {
            return (
                <li style={styles.li}>{message.melding}</li>
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