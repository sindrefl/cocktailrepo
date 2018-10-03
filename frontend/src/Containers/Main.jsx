import React, {Component} from 'react';
import '../css/App.css';

import Navbar from '../Components/Navbar'

import {Route, Switch} from 'react-router-dom'
import CocktailDashboard from './CocktailDashboard';
import CategoryList from './CategoryList';
import MyBarPage from './MyBarPage'

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomDrink: undefined,
            categories: [],
            allDrinks: undefined,
            glassTypes : []
        }
    }

    componentDidMount() {
        fetch('/api/random', {
            method : 'GET'
        }).then((response) => response.json()).then(response => {
                let drink = response;
                this.setState({randomDrink: drink})
            })
            .catch(function (error) {
                // handle error
                console.warn(error);
            });
        fetch('/api/categories/10',{
            method:'GET'
        }).then(response => response.json()).then((response) => {
            let categoryList = response;
            this.setState({categories: categoryList});
        })
        .catch((error) => {
            console.warn(error)
        });    
        fetch('/api/allDrinks').then(response => response.json()).then((response) => {
                this.setState({allDrinks: response})
            });
        fetch('/api/glassTypes/10').then(response => response.json()).then((response) => {
            this.setState({glassTypes : response})
        }).catch(error => {
            console.warn(error)
        });
    }

    render() {
        return (
            <div className="Main">
            
            
            <Navbar glassTypes={this.state.glassTypes}/>

            <Switch>
            <Route path="/" exact render= {() => <CocktailDashboard randomDrink={this.state.randomDrink} categories={this.state.categories} allDrinks={this.state.allDrinks} glassTypes={this.state.glassTypes}/>}></Route>
            <Route path="/filtered/:query" render={({match}) => <CategoryList url={match} drinks={this.state.allDrinks}></CategoryList>}></Route>
            <Route path="/home/bar" render={() => <MyBarPage></MyBarPage>}></Route>
            </Switch>
    
            </div>
        );
    }
}


export default Main;