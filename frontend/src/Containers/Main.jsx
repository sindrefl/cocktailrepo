import React, {Component} from 'react';
import '../css/App.css';

import Navbar from '../Components/Navbar'

import {Route, Switch} from 'react-router-dom'
import CocktailDashboard from './CocktailDashboard';
import FilteredCocktailList from './FilteredCocktailList';
import MyBarPage from './MyBarPage'
import { getRandomDrink, getTopNCategories, getTopNGlassTypes } from './api';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            randomDrink: undefined,
            categories: [],
            glassTypes: [],
        }
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
    }

    render() {
        return (
            <div className="Main">
            <Navbar glassTypes={this.state.glassTypes}/>

            <Switch>
                <Route path="/" exact render= {() => <CocktailDashboard randomDrink={this.state.randomDrink} categories={this.state.categories} glassTypes={this.state.glassTypes}/>}></Route>
                <Route path="/filtered" render={() => <FilteredCocktailList/>}></Route>
                <Route path="/home/bar" render={() => <MyBarPage/>}></Route>
            </Switch>
    
            </div>
        );
    }
}


export default Main;