import React, { Component } from 'react';
import './Login.css';
import { GOOGLE_AUTH_URL, FACEBOOK_AUTH_URL, GITHUB_AUTH_URL } from '../../../constants';
import {Redirect } from 'react-router-dom'
import fbLogo from '../../../assets/fb-logo.png';
import googleLogo from '../../../assets/google-logo.png';
import githubLogo from '../../../assets/github-logo.png';
import ReactModal from 'react-modal';
import {withRouter} from 'react-router'

ReactModal.setAppElement('#root')

const modalStyle = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        background: '#fff',
        boxShadow: '0 1px 11px rgba(0, 0, 0, 0.27)',
        borderRadius: '2px',
        width: '500px',
        display: 'inline-block',
        marginTop: '30px',
        verticalAlign: 'middle',
        position: 'relative',
        padding: '35px',
        transform: 'translate(-50%,-50%)'
    }
}

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
                    <ReactModal isOpen={this.props.isOpen} style={modalStyle} onRequestClose={this.props.close}>
                            <h1 className="login-title">Login to access your barpage</h1>
                            <SocialLogin />
                        </ReactModal>

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

export default withRouter(Login)