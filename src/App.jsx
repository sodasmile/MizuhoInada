'use strict';

import React from 'react';
import _ from 'lodash';
import settings from './settings';
import styles from './styles';


export default class App extends React.Component {

    constructor (args) {
        super(args);
        this.buttons = [
            {name: 'Anders', phone: '40041446'},
            {name: 'Eivind', phone: '93057057'},
            {name: 'Emilie', phone: '99852667'},
            {name: 'Saikat', phone: '95084074'}
        ];
        this._onClick = this._onClick.bind(this);
    }

    _onClick (phone) {
        settings.playerCode = phone;
        this.context.history.pushState(null, '/menu');
    }

    render () {

        let buttons = _.map(this.buttons, (button) => {
            return (
                <li style={styles.li}><a style={{width:'100%'}} onClick={this._onClick.bind(this, button.phone)}>{button.name}</a></li>
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

App.contextTypes = {
    location: React.PropTypes.object,
    history: React.PropTypes.object
};