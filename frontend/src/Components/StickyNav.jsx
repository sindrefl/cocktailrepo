import React from 'react';
import {Link} from 'react-router-dom';
import NewDrinkForm from './Modals/NewDrinkForm';
import ReactModal from 'react-modal'
import './StickyNav.css'
import Media from 'react-media';

class StickyNav extends React.Component {
  constructor(props) {
        super(props);
        this.state = {};
        this.handleScroll = this.handleScroll.bind(this);
    }

    handleScroll() {
        this.setState({scroll: window.scrollY});
    }
  
  componentDidMount() {
        const el = document.querySelector('nav');
        this.setState({top: el.offsetTop, height: el.offsetHeight});
        window.addEventListener('scroll', this.handleScroll);
    }
  
  componentDidUpdate() {
        this.state.scroll > this.state.top ? 
            document.body.style.paddingTop = `${this.state.height}px` :
            document.body.style.paddingTop = 0;
    }
  
  render() {
    return (
      <nav className={this.state.scroll > this.state.top ? "navbar fixed-nav" : "navbar"}>
            <ReactModal
                isOpen={this.props.showAddNewDrink}
                overlayClassName="modal"
                className="modal-main"
                contentLabel={'new drink modal'}
                onRequestClose={this.props.hideModal}
                >
              <NewDrinkForm glassTypes={this.props.glassTypes}></NewDrinkForm>
            </ReactModal>
        <ul>
          <li><Link to={"/"}><img className="icon" src={require("../assets/home.png")} alt="Home icon"></img></Link></li>
          {this.props.todo && 'REMOVE THIS WHEN ADD DRINK IS READY' && <li><img className="icon clickable" src={require("../assets/plus.png")} alt="plus icon" onClick={this.props.showModal}></img></li>}
          <li>{this.props.user ? <Link to={"/home/bar"}><img className="icon" src={require("../assets/profile4.png")} alt="Profile icon"></img></Link> : <img className="icon clickable" src={require("../assets/profile4.png")} alt="plus icon" onClick={this.props.openLogin}></img>}</li>
          
          <Media query="(min-width: 768px)">
                {match => match && 
                        <li>{this.props.user ? 
                        `Logged in as: ${this.props.user.name}`
                        :
                        "You are not logged in"
                        }
                        </li>
                }
            </Media>
         
              <li><button onClick={this.props.user ? this.props.logout : this.props.openLogin}>{this.props.user ? "Log Out": "Login"}</button></li>
        </ul>
      </nav>
    );
  }
}

export default StickyNav;