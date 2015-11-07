'use strict';

import React from 'react';
import $ from 'jquery';
import settings from './settings';
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
        $.ajax({
            url: `${settings.endpoint}/Meldinger`,
            headers: {
                'LagKode': `${settings.teamCode}`,
                'DeltakerKode': `${settings.playerCode}`
            },
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify({tekst: this.state.message}),
            success: (data) => console.log(data),
            error: (xhr, status, err) => console.log(`${status}: ${err}`)
        });
    }

    render () {

        return (
            <div style={styles.center}>
                <form onSubmit={this.onSubmit}>
                    <ul>
                        <li style={styles.li}>
                            <textarea style={{width: '100%'}} value={this.state.message} onChange={this.onChange}/>
                        </li>
                        <li style={styles.li}>
                            <input type="submit" value="Send"/>
                        </li>
                        <li style={styles.li}>
                            <input type="reset" value="Reset"/>
                        </li>
                    </ul>
                </form>
            </div>
        );
    }
}