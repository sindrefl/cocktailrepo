import React, {Component} from 'react';

class DrinkCard extends Component {
    render() {
        const {imageUrl, altUrl, name, amounts,ingredients, description,glass, show, onImageLoad, onImageError} = this.props;
        return (
            <div className={show ? "Card-Container": "hide"}>
                    <div className="DrinkCard-header">
                            <h2>{name}</h2>                    
                    </div>
                <div className={"Drink-Card"}>
                    <img
                        src={imageUrl}
                        alt={altUrl}
                        onLoad={onImageLoad}
                        onError={onImageError}
                        />
                </div>
                    <div className="flex-container-vertical">
                        <div className="flex-vertical">
                            Served in a 
                            <strong> {glass} </strong>
                            glass.
                            <GenerateLists amounts={amounts} ingredients={ingredients}/>
                            {description}
                        </div>
                    </div>
            </div>
        );
    }
}

const GenerateLists = ({amounts, ingredients}) => {
    if(ingredients.length <= 6){
        return <div className="flex-container-horizontal">
        <div    >
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
    }else{
        return <div className="flex-container-horizontal">
        <div>
            <ul>
                {amounts.slice(0,6).map((amount,i) => <li key={i}>{i === 5 ? "..." : amount}</li>)}
            </ul>
        </div>
        <div>
            <ul>
                {ingredients.slice(0,6).map((ingredient,i) => <li key={i}>{ i === 5 ? "..." : ingredient.name}</li>)}
            </ul>
        </div>
    </div>
    }
}
export default DrinkCard;