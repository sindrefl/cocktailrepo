import React, {Component} from 'react';

class DrinkCard extends Component {
    render() {
        const {imageUrl, altUrl, name, amounts,ingredients, description,glass, show, onImageLoad, onImageError} = this.props;
        return (
            <div className={show ? "Card-Container": "hide"}>
                    <div>
                        <h2>{name}</h2>
                    </div>
                <div className={"Drink-Card"}>
                    <img
                        width="200px"
                        height="200px"
                        src={imageUrl}
                        alt={altUrl}
                        onLoad={onImageLoad}
                        onError={onImageError}
                        />
                </div>
                    <div className="flex-horizontal-container">
                        <div className="flex-vertical">
                            Served in a 
                            <strong> {glass} </strong>
                            glass.
                            <div className="flex-horizontal-container">
                                <div>
                                    <ul>
                                        {amounts && amounts.map((amount,i) => <li key={i}>{amount}</li>)}
                                    </ul>
                                </div>
                                <div>
                                    <ul>
                                        {ingredients && ingredients.map((ingredient,i) => <li key={i}>{ingredient.name}</li>)}
                                    </ul>
                                </div>
                            </div>
                            {description}
                        </div>
                    </div>
            </div>
        );
    }
}

export default DrinkCard;