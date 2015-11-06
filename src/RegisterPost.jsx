'use strict';

import React from 'react';

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
            <div>
                <form onSubmit={this.onSubmit}>
                    <label>Postkode
                        <input type="text" value={this.state.code} onChange={this.onChange}/>
                    </label>
                    <label>Bombe?
                        <input type="checkbox" onChange={this.onChangeBomb}/>
                    </label>
                    <label>Felle?
                        <input type="checkbox" onChange={this.onChangeTrap}/>
                    </label>
                    <input type="submit" value="Registrer"/>
                    <input type="reset" value="Reset"/>
                </form>
            </div>
        );
    }
}