import React, {Component} from 'react';
import { deleteCocktail } from '../../Containers/api';



class RandomDrinkCard extends Component {
    render() {
        const {drinkId, toggleEdit, name, imageUrl,altUrl,glass,
            amounts,ingredients,recipe,updateRandomDrink, showUpdateButton, admin, deleteCocktail, isOrderable, orderCocktail} = this.props;
        return (
            <div className="Random-Card-Container">
                {admin && <div className="flex-container-horizontal flex-space-between">
                    <button onClick={toggleEdit}>Edit</button>
                    <button onClick={() => deleteCocktail(drinkId)}>Delete</button>
                </div>
                } 
                {isOrderable && 
                <div className="flex-container-horizontal flex-space-around">
                    <div style={{paddingRight: "0.5em", paddingLeft:"0.5em"}}>
                        <label>Tlf (used for Vipps):</label>
                        <input value={this.props.phoneNumber} type="text" placeholder="TLF" onChange={this.props.updatePhoneNumber}/>
                    </div>
                    <div style={{paddingRight: "0.5em", paddingLeft:"0.5em"}}>
                        <button disabled={this.props.phoneNumber === ""} onClick={() => orderCocktail(drinkId)}>Order now: 25,-</button>                
                    </div>
                </div>
                } 
                <h1>{name}</h1>
                <div className="Random-Card flex-container-vertical">
                    <div className="flex-container-horizontal flex-space-between">
                        <div>
                            <img
                                width="100%"
                                height="100%"
                                src={imageUrl}
                                alt={altUrl}></img>
                            </div>
                        <div className="flex-container-vertical padding-listtext">
                            {!isOrderable &&
                                <div>
                                    Served in a 
                                    <strong> {glass} </strong>
                                    glass.
                                </div>
                            }
                            <div className="flex-container-horizontal">
                                <div className="padding-listtext-left">
                                    <ul>
                                        {amounts.map((amount,index) => <li key={index}>{amount}</li>)}
                                    </ul>
                                </div>
                                <div className="padding-listtext-right">
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