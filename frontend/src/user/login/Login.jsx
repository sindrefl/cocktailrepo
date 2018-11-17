import React, { Component } from 'react';
import './Login.css';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL, ACCESS_TOKEN } from '../../constants';
import {Redirect } from 'react-router-dom'
import fbLogo from '../../assets/fb-logo.png';
import googleLogo from '../../assets/google-logo.png';
import githubLogo from '../../assets/github-logo.png';

class Login extends Component {
    componentDidMount() {
        if(this.props.location.state && this.props.location.state.error) {
            setTimeout(() => {
                console.error(this.props.location.state.error, {
                    timeout: 5000
                });
                this.props.history.replace({
                    pathname: this.props.location.pathname,
                    state: {}
                });
            }, 100);
        }
    }
    
    render() {
        if(this.props.authenticated) {
            return <Redirect
                to={{
                pathname: "/",
                state: { from: this.props.location }
            }}/>;            
        }

        return (
            <div className="login-container">
                <div className="login-content">
                    <h1 className="login-title">Login to ...</h1>
                    <SocialLogin />
                </div>
            </div>
        );
    }
}

class SocialLogin extends Component {
    render() {
        return (
            <div className="social-login">
                <a className="btn btn-block social-btn google" href={GOOGLE_AUTH_URL}>
                    <img src={googleLogo} alt="Google" /> Log in with Google</a>
                <a className="btn btn-block social-btn facebook" href={FACEBOOK_AUTH_URL}>
                    <img src={fbLogo} alt="Facebook" /> Log in with Facebook</a>
                <a className="btn btn-block social-btn github" href={GITHUB_AUTH_URL}>
                    <img src={githubLogo} alt="Github" /> Log in with Github</a>
            </div>
        );
    }
}

export default Login