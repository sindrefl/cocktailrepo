import React, {Component} from 'react';
import '../css/App.css';

import RandomDrinkCard from '../Components/RandomDrink'

import {Link} from 'react-router-dom'
import CategoryCard from '../Components/CategoryCard';
import { getGlassImage, getCategoryImage, getDrinkImage} from './api';

class CocktailDashboard extends Component {
    render() {
        const {randomDrink, glassTypes,categories} = this.props
        return (
            <div className="Main">
                {randomDrink && <RandomDrinkCard
                    name={randomDrink.name}
                    imageUrl={getDrinkImage(randomDrink)}
                    altUrl={randomDrink.imageUrl}
                    description={randomDrink.description}
                    glass={randomDrink.glass}
                    ingredients={randomDrink.ingredients}
                    amounts={randomDrink.amounts}/>
}
                {glassTypes && <div className="Grid-container">
                    <div className="Grid-header">
                        <div>
                            <h1>Find drinks by glass type</h1>
                        </div>
                    </div>
                    <div className="Grid">

                        {glassTypes.map((glass, index) => {
                                return <div>
                                    <Link key={glass} to={{pathname:'/filtered', state: {glass, category:"", page:1}}}>
                                        <CategoryCard
                                            imageUrl={getGlassImage(glass)}
                                            name={glass}/>
                                    </Link>

                                </div>
                            })}
                    </div>
                </div>
}

                {categories && <div className="Grid-container">
                    <div className="Grid-header">
                        <div>
                            <h1>Find drinks by category</h1>
                        </div>
                    </div>
                    <div className="Grid">
                        {categories.map((cat, index) => {
                                return <div>
                                    <Link key={index} to={{pathname:"/filtered", state:{glass: "", category:cat.name, page:1}}}>
                                        <CategoryCard
                                            imageUrl={getCategoryImage(cat)}
                                            name={cat.name}/>
                                    </Link>

                                </div>
                            })}
                    </div>
                </div>
}

            </div>
        );
    }
}

export default CocktailDashboard;