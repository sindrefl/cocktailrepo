import React, { Component } from 'react';
import Main from './Containers/Main';



import './css/App.css';

import {BrowserRouter as Router} from 'react-router-dom'

class App extends Component {
  render() {
    return (
      <div className="App">
      <Router>
        <Main />  
      </Router>
      </div>
    );
  }
}

export default App;