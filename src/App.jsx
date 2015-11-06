'use strict';

import React from 'react';
import settings from './settings';
import styles from './styles';


export default class App extends React.Component {

    constructor (args) {
        super(args);
        this.state = {playerCode: ''};
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onSubmit (e) {
        e.preventDefault();
        settings.playerCode = this.state.playerCode;
        this.context.history.pushState(null, '/menu');
    }

    onChange (e) {
        e.preventDefault();
        this.setState({playerCode: e.target.value});
    }

    render () { console.log(this.state.playerCode);
        return (
            <div style={styles.center}>
                <form onSubmit={this.onSubmit}>
                    <label>
                        Telefonnummer
                        <input type="text" onChange={this.onChange}/>
                    </label>
                    <input type="submit" value="OK"/>
                </form>
            </div>
        );
    }
}

App.contextTypes = {
    location: React.PropTypes.object,
    history: React.PropTypes.object
};