import React, { Component } from 'react';

import {Link} from 'react-router-dom'
import NewDrinkForm from './Modals/NewDrinkForm';
import ReactModal from 'react-modal'

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
        <header className="App-header"> 
        <div className="left-header">
        <div className="header-item">
        <Link to={"/"}><img className="icon" src={require("../assets/home.png")} alt="Home icon"></img></Link>
        </div>
        </div>
        <div className="right-header">
        <div className="header-item">
          <img className="icon clickable" src={require("../assets/plus.png")} alt="plus icon" onClick={this.showModal}></img>
        </div>
          <ReactModal
            isOpen={showAddNewDrink}
            overlayClassName="modal"
            className="modal-main"
            contentLabel={'new drink modal'}
            onRequestClose={this.hideModal}
            >
          <NewDrinkForm glassTypes={this.props.glassTypes}></NewDrinkForm>
        </ReactModal>
        <div className="header-item">
          {this.props.user ? 
          `Logged in as: ${this.props.user.name}`
          :
          "You are not logged in"
          }
          </div>
            <div className="header-item">
          {this.props.user ? <Link to={"/home/bar"}><img className="icon" src={require("../assets/profile4.png")} alt="Profile icon"></img></Link> : <img className="icon clickable" src={require("../assets/profile4.png")} alt="plus icon" onClick={this.props.openLogin}></img>}
        </div>
        <div className="header-item">
            <button onClick={this.props.user ? this.props.logout : this.props.openLogin}>{this.props.user ? "Log Out": "Login"}</button>
        </div>
        </div>
        
        </header>
    );
  }
}

export default Navbar;