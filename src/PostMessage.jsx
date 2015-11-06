'use strict';

import React from 'react';
import styles from './styles';


export default class PostMessage extends React.Component {

    constructor (props) {
        super(props);
        this.state = {message: ''};
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onChange (e) {
        e.preventDefault();
        this.setState({message: e.target.value});
    }

    onSubmit (e) {
        e.preventDefault();

        // TODO: Send melding her
    }

    render () {

        return (
            <div style={styles.center}>
                <form onSubmit={this.onSubmit}>
                    <textarea value={this.state.message} onChange={this.onChange}/>
                    <input type="submit" value="Send"/>
                    <input type="reset" value="Reset"/>
                </form>
            </div>
        );
    }
}