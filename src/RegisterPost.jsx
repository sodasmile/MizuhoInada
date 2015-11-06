'use strict';

import React from 'react';
import styles from './styles';

export default class RegisterPost extends React.Component {

    constructor (props) {
        super(props);
        this.state = {
            code: '',
            bomb: false,
            trap: false
        };
        this.onChange = this.onChange.bind(this);
        this.onChangeTrap = this.onChangeTrap.bind(this);
        this.onChangeBomb = this.onChangeBomb.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit (e) {
        e.preventDefault();

        let code = this.state.code;

        // TODO: Ajax call here!
    }

    onChange (e) {
        e.preventDefault();
        this.setState({code: e.target.value});
    }

    onChangeTrap (e) {
        this.setState({trap: e.target.checked});
    }

    onChangeBomb (e) {
        this.setState({bomb: e.target.checked});
    }

    render () {
        return (
            <div style={styles.center}>
                <form onSubmit={this.onSubmit}>
                    <ul>
                        <li style={styles.li}>
                            <label>Postkode
                                <input type="text" value={this.state.code} onChange={this.onChange}/>
                            </label>
                        </li>
                        <li style={styles.li}>
                            <label>Bombe?
                                <input type="checkbox" onChange={this.onChangeBomb}/>
                            </label>
                        </li>
                        <li style={styles.li}>
                            <label>Felle?
                                <input type="checkbox" onChange={this.onChangeTrap}/>
                            </label>
                        </li>
                        <li style={styles.li}>
                            <input type="submit" value="Registrer"/>
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