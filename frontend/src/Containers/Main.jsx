import React, {Component} from 'react';
import '../css/App.css';

import Navbar from '../Components/Navbar'

import {Route, Switch} from 'react-router-dom'
import CocktailDashboard from './CocktailDashboard';
import FilteredCocktailList from './FilteredCocktailList';
import MyBarPage from './MyBarPage'
import { getRandomDrink, getTopNCategories, getTopNGlassTypes, getCurrentUser } from './api';
import {ACCESS_TOKEN} from '../constants'
import PrivateRoute from '../Components/PrivateRoute'
import Login from '../Components/Modals/login/Login'
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomDrink: undefined,
            categories: [],
            glassTypes: [],
            authenticated: false,
            currentUser: undefined,
            loading: false,
            openLoginModal: false,
        }
        this.updateRandomDrink = this.updateRandomDrink.bind(this);
        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.openLogin = this.openLogin.bind(this);
        this.quitLoginModal = this.quitLoginModal.bind(this);
    }

    updateRandomDrink(e){
        e.preventDefault();
        getRandomDrink().then(response => {
            let drink = response
            this.setState({randomDrink: drink})
        })
        .catch((error) => {
            console.warn(error);
        });
    }
 
    componentDidMount() {
        getRandomDrink().then(response => {
            let drink = response
            this.setState({randomDrink: drink})
        })
        .catch((error) => {
            console.warn(error);
        });
        
        getTopNCategories(10).then(categoryList => {
            this.setState({categories: categoryList});
        }).catch((error) => {
            console.warn(error)
        });   
        getTopNGlassTypes(10).then(response => {
            this.setState({glassTypes : response})
        }).catch(error => {
            console.warn(error)
        });

        this.loadCurrentlyLoggedInUser()
    }

    loadCurrentlyLoggedInUser() {
        this.setState({
          loading: true
        });
    
        getCurrentUser()
        .then(response => {
          this.setState({
            currentUser: response,
            authenticated: true,
            loading: false
          });
        }).catch(error => {
          this.setState({
            loading: false
          });  
        });    
      }
    
      handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
          authenticated: false,
          currentUser: undefined
        });
      }

      openLogin(){
          this.setState({openLoginModal: true})
      }

      quitLoginModal(){
          this.setState({openLoginModal: false})
      }

    render() {
       
        return (
            <div className="Main">
             {this.state.loading && <div className="loader"></div>}
                {!this.state.loading &&
                    <div>
                        <Navbar openLogin={this.openLogin} user={this.state.currentUser} glassTypes={this.state.glassTypes} logout={this.handleLogout}/>

                         <Login isOpen={this.state.openLoginModal} close={this.quitLoginModal}/>


                        <Switch>
                            <Route path="/" exact render= {() => <CocktailDashboard randomDrink={this.state.randomDrink} categories={this.state.categories} glassTypes={this.state.glassTypes} updateRandomDrink={this.updateRandomDrink}/>}/>
                            <Route path="/filtered" render={() => <FilteredCocktailList/>}/>
                            <PrivateRoute path="/home/bar" authenticated={this.state.authenticated} loaded={this.state.loading} currentUser={this.state.currentUser} component={MyBarPage}/>
                            <Route path="/login" render={(props) => <Login authenticated={this.state.authenticated} {...props} />} />
                            <Route path="/oauth2/redirect" render={() => <OAuth2RedirectHandler/>}></Route>
                        </Switch>
            
                    </div>
                    }

            </div>
        );
    }
}


export default Main;