import React, { Component } from 'react';
import { ACCESS_TOKEN } from '../../constants';
import { Redirect } from 'react-router-dom'
import { withRouter } from 'react-router';

class OAuth2RedirectHandler extends Component {
    getUrlParameter(name) {
        name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
        var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

        var results = regex.exec(this.props.location.search);
        return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
    };

    render() {        
        const token = this.getUrlParameter('token');
        const error = this.getUrlParameter('error');

        console.log(token)
        console.log(error)

        if(token) {
            localStorage.setItem(ACCESS_TOKEN, token);
            return <Redirect to={{
                pathname: "/home/bar",
                state: { from: this.props.location }
            }}/>; 
        } else {
            return <Redirect to={{
                pathname: "/login",
                state: { 
                    from: this.props.location,
                    error: error 
                }
            }}/>; 
        }
    }
}

export default withRouter(OAuth2RedirectHandler);