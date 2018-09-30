import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {

    state = {};

    componentDidMount() {
        setInterval(this.hello, 250);
    }

    hello = () => {
        fetch('/api/api/hello')
            .then(response => response.text())
            .then(message => {
                this.setState({message: message});
            });

        fetch('/api/allDrinks').then(response => response.text()).then(message => this.setState({db:message}));
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                    <h1 className="App-title">{this.state.message}</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload. This is the new version.
                </p>

                <div>
                  Dump from database: All drinks:
                    {this.state.db}
                </div>
            </div>
        );
    }
}

export default App;