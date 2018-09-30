import React, { Component } from 'react';

import {Link} from 'react-router-dom'
import NewDrinkForm from './NewDrinkForm';

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
    return (
        <header className="App-header"> 
        <div className="left-header">
        <div className="header-item">
        <Link to={"/"}><img className="icon" src={require("../assets/home.png")}></img></Link>
        </div>
        </div>
        <div className="right-header">
        <div className="header-item">
          <img className="icon clickable" src={require("../assets/plus.png")} onClick={this.showModal}></img>
        </div>
          <NewDrinkForm glassTypes={this.props.glassTypes} show={this.state.showAddNewDrink} handleClose={this.hideModal}>
        </NewDrinkForm>
          <div className="header-item">
            Hello Sindre
            </div>
            <div className="header-item">
          <Link to={"/home/bar"}><img className="icon" src={require("../assets/profile4.png")}></img></Link>
        </div>
        </div>
        </header>
    );
  }
}

export default Navbar;