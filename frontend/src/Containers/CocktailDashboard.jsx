import React, {Component} from 'react';
import '../css/App.css';

import RandomDrinkCard from '../Components/RandomDrink'

import {Link} from 'react-router-dom'
import CategoryCard from '../Components/CategoryCard';


class CocktailDashboard extends Component {
    render() {
        return (
            <div className="Main">
                {this.props.randomDrink && <RandomDrinkCard
                    name={this.props.randomDrink.name}
                    imageUrl={`/drinks/${this.props.randomDrink.name.replace(/ /g, '_')}.jpg`}
                    altUrl={this.props.randomDrink.imageUrl}
                    description={this.props.randomDrink.description}
                    glass={this.props.randomDrink.glass}
                    ingredients={this.props.randomDrink.ingredients}
                    amounts={this.props.randomDrink.amounts}/>
}
                {this.props.glassTypes && <div className="Grid-container">
                    <div className="Grid-header">
                        <div>
                            <h1>Find drinks by glass type</h1>
                        </div>
                    </div>
                    <div className="Grid">

                        {this
                            .props
                            .glassTypes
                            .map((glass, index) => {
                                return <div>
                                    <Link key={glass} to={ {pathname:'/filtered', state: {glass: glass, category:""}}}>
                                        <CategoryCard
                                            imageUrl={`/glass/${glass}.jpg`}
                                            name={glass}/>
                                    </Link>

                                </div>
                            })}
                    </div>
                </div>
}

                {this.props.glassTypes && <div className="Grid-container">
                    <div className="Grid-header">
                        <div>
                            <h1>Find drinks by category</h1>
                        </div>
                    </div>
                    <div className="Grid">
                        {this
                            .props
                            .categories
                            .map((cat, index) => {
                                return <div>
                                    <Link key={index} to={{pathname:"/filtered", state:{glass: "", category:cat.name}}}>
                                        <CategoryCard
                                            imageUrl={`/categories/${cat.name.replace(/\//g,"")}.jpg`}
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