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
        let data = {tekst: `${settings.playerName}: ${this.state.message}`};
        $.ajax({
            url: `${settings.endpoint}/Meldinger`,
            headers: {
                'LagKode': `${settings.teamCode}`,
                'DeltakerKode': `${settings.playerCode}`
            },
            type: 'POST',
            dataType: 'json',
            contentType: 'application/json',
            data: JSON.stringify(data),
            success: () => this.context.history.pushState(null, '/message_stream'),
            error: (xhr, status, err) => {
                this.context.history.pushState(null, '/message_stream');
                console.log(`${status}: ${err}`);
            }
        });
    }

    render () {

        return (
            <div style={styles.center}>
                <form onSubmit={this.onSubmit}>
                    <ul>
                        <li style={styles.li}>
                            <textarea style={{width: '100%'}}
                                      value={this.state.message}
                                      onChange={this.onChange}
                                      cols={35}
                                        rows={10}/>
                        </li>
                        <li style={styles.li}>
                            <input style={{width:'100%', height: '40px'}} type="submit" value="Send"/>
                        </li>
                        <li style={styles.li}>
                            <input style={{width:'100%', height: '40px'}} type="reset" value="Reset"/>
                        </li>
                    </ul>
                </form>
            </div>
        );
    }
}

PostMessage.contextTypes = {
    location: React.PropTypes.object,
    history: React.PropTypes.object
};