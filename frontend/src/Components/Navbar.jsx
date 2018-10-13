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
            Hello Sindre
            </div>
            <div className="header-item">
          <Link to={"/home/bar"}><img className="icon" src={require("../assets/profile4.png")} alt="Profile icon"></img></Link>
        </div>
        </div>
        </header>
    );
  }
}

export default Navbar;