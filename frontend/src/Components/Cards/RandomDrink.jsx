import React, {Component} from 'react';

class RandomDrinkCard extends Component {
    render() {
        const {name, imageUrl,altUrl,glass,amounts,ingredients,recipe,updateRandomDrink, showUpdateButton} = this.props;
        return (
            <div className="Random-Card-Container">
                <h1>{name}</h1>
                <div className="Random-Card flex-container-vertical">
                    <div className="flex-container-horizontal flex-space-between">
                        <div>
                            <img
                                width="300px"
                                height="300px"
                                src={imageUrl}
                                alt={altUrl}></img>
                            </div>
                        <div className="flex-container-vertical padding-listtext">
                            <div>
                                Served in a 
                                <strong> {glass} </strong>
                                glass.
                            </div>
                            <div className="flex-container-horizontal">
                                <div>
                                    <ul>
                                        {amounts.map((amount,index) => <li key={index}>{amount}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <ul>
                                        {ingredients.map((ingredient,index) => <li key={index}>
                                                {ingredient.name}</li>)
}
                                    </ul>

                                </div>
                            </div>
                            </div>
                    </div>
                    <h3>{recipe}</h3>
                    {showUpdateButton && <div>
                        <button type="submit" onClick={updateRandomDrink}>New random drink</button>
                    </div>}
                </div>
            </div>
        );
    }
}

export default RandomDrinkCard;