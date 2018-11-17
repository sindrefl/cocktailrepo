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
import Login from '../user/login/Login'
import OAuth2RedirectHandler from '../user/oauth2/OAuth2RedirectHandler'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomDrink: undefined,
            categories: [],
            glassTypes: [],
            authenticated: false,
            user: undefined,
        }
        this.updateRandomDrink = this.updateRandomDrink.bind(this);
        this.loadCurrentlyLoggedInUser = this.loadCurrentlyLoggedInUser.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
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
            console.log(response)
          this.setState({
            currentUser: response,
            authenticated: true,
            loading: false
          });
        }).catch(error => {
            console.log()
          this.setState({
            loading: false
          });  
        });    
      }
    
      handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        this.setState({
          authenticated: false,
          user: undefined
        });
      }

    render() {
        return (
            <div className="Main">
            <Navbar glassTypes={this.state.glassTypes}/>
            <button onClick={this.handleLogout}>LOG ME THE FUCK OUT</button>

            <Switch>
                <Route path="/" exact render= {() => <CocktailDashboard randomDrink={this.state.randomDrink} categories={this.state.categories} glassTypes={this.state.glassTypes} updateRandomDrink={this.updateRandomDrink}/>}/>
                <Route path="/filtered" render={() => <FilteredCocktailList/>}/>
                <PrivateRoute path="/home/bar" authenticated={this.state.authenticated} currentUser={this.state.currentUser} component={MyBarPage}/>
                <Route path="/login" render={(props) => <Login authenticated={this.state.authenticated} {...props} />} />
                <Route path="/oauth2/redirect" render={() => <OAuth2RedirectHandler/>}></Route>
            </Switch>
    
            </div>
        );
    }
}


export default Main;