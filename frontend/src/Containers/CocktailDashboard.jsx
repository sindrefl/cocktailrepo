import React, {Component} from 'react';
import '../css/App.css';

import RandomDrinkCard from '../Components/Cards/RandomDrink'

import {Link} from 'react-router-dom'
import CategoryCard from '../Components/Cards/CategoryCard';
import { getGlassImage, getCategoryImage, getDrinkImage} from './api';

class CocktailDashboard extends Component {
    render() {
        const {randomDrink, glassTypes,categories} = this.props
        return (
            <div className="Main">
                {randomDrink && 
                    <RandomDrinkCard
                        name={randomDrink.name}
                        imageUrl={getDrinkImage(randomDrink)}
                        altUrl={randomDrink.imageUrl}
                        description={randomDrink.description}
                        glass={randomDrink.glass}
                        ingredients={randomDrink.ingredients}
                        amounts={randomDrink.amounts}/>
                    }
                {glassTypes && <GlassTypesList glassTypes={glassTypes} />}

                {categories && <CategoriesList categories={categories}/>}
            </div>
        );
    }
}

const GlassTypesList = ({glassTypes}) =>  
    <div className="Grid-container">
        <div className="Grid-header-container">
            <div className="Grid-header">
                <h1>Find drinks by glass type</h1>
            </div>
        </div>
        <div className="Grid">
            {glassTypes.map((glass, index) => {
                return <div key={index}>
                    <Link key={glass} to={{pathname:'/filtered', state: {glass, category:"", page:1}}}>
                        <CategoryCard
                            imageUrl={getGlassImage(glass)}
                            name={glass}/>
                    </Link>
                </div>
            })}
        </div>
    </div>

const CategoriesList = ({categories}) => 
    <div className="Grid-container">
        <div className="Grid-header-container">
            <div className="Grid-header">
                <h1>Find drinks by category</h1>
            </div>
        </div>
        <div className="Grid">
            {categories.map((cat, index) => {
                return 
                    <div key={index}>
                        <Link to={{pathname:"/filtered", state:{glass: "", category:cat.name, page:1}}}>
                            <CategoryCard
                                imageUrl={getCategoryImage(cat)}
                                name={cat.name}/>
                        </Link>
                    </div>
            })}
        </div>
    </div>


export default CocktailDashboard;