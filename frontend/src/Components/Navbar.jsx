import React, { Component } from 'react';

import {Link} from 'react-router-dom'

import StickyNav from './StickyNav';

class Navbar extends Component {
  constructor(props){
    super(props);
    this.state = { showAddNewDrink: false };
}

showModal = () => {
this.setState({ showAddNewDrink: true });
};

hideModal = () => {
this.setState({ showAddNewDrink: false });
};


  render() {
    const {showAddNewDrink} = this.state;
    return (
      <div>
          <StickyNav 
            showAddNewDrink={showAddNewDrink}
            user={this.props.user} 
            logout={this.props.logout} 
            openLogin={this.props.openLogin} 
            showModal={this.showModal} 
            hideModal={this.hideModal}
            />
          <header className="App-header">
            
          </header>
      </div>
        
    );
  }
}

export default Navbar;