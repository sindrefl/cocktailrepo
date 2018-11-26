import React, {Component} from 'react';
import UploadImage from '../UploadImage';
import { getGlassTypes, getIngredients, updateCocktail } from '../../Containers/api';

import update from 'immutability-helper';
import { ListAutocomplete } from '../ListAutocomplete';

class EditableDrink extends Component {
    constructor(props){
        super(props);
        this.state = {
            name: "",
            image: [],
            imageInvalid: [],
            glass: "",
            glassTypes: [],
            amounts : [],
            ingredients: [],
            recipe: "",
            loading: true
        }
        this.onDrop = this.onDrop.bind(this);
        this.setIngredientNameField = this.setIngredientNameField.bind(this);
        this.updateField = this.updateField.bind(this);
        this.updateDrink = this.updateDrink.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.removeIngredient = this.removeIngredient.bind(this);
    }

    componentWillMount = () => {
        getGlassTypes().then(response => this.setState({
            glassTypes: response
        }))

        getIngredients().then(response => this.setState({
            allIngredients: response,
            loading: false
        }))

        const {name, glass,amounts,ingredients,recipe} = this.props;
        this.setState(prevState => ({
            name,
            glass,
            amounts,
            ingredients,
            recipe,
        }))
    }

    onDrop = (accepted, rejected) => {
        if(accepted.length > 0){
            this.setState({image: accepted[0]})
        }
    }

    updateField = (event) => {
        event.preventDefault();
        const {name, value} = event.target;
        this.setState({
            [name]: value
        })
    }

    setIngredientNameField = (changeEvent, index) => {
        const {target} = changeEvent
        this.setState({
            ingredients: update(this.state.ingredients, {[index]:{$set: target.value}})
          })
    }

    addIngredient = () => {  
        this.setState(prevstate => ({ingredients: [...prevstate.ingredients, ""]}))
    }

    removeIngredient = (index) => {
        if(index === 0){
            this.setState(prevstate => ({ingredients: [...prevstate.ingredients.slice(1, this.state.ingredients.length)]}))
        }
        else if (index === this.state.ingredients.length){
            this.setState(prevstate => ({ingredients: [...prevstate.ingredients.slice(0, this.state.ingredients.length - 1)]}))
        }
        else{
            this.setState(prevstate => ({
                ingredients: [...prevstate.ingredients.slice(0,index), ...prevstate.ingredients.slice(index + 1, prevstate.ingredients.length)] 
            })
            )
        }
    }



    updateDrink = () => {
        const {name, ingredients,amounts,glass,recipe} = this.state;
        console.log(this.props)
        const {drinkId} = this.props;
        updateCocktail(this.state.image,
            {  
                drinkId,
                name,
                ingredients,
                amounts,
                glass,
                recipe
        })
    }

    render() {
        const {name, image,imageInvalid, glass,amounts,ingredients,recipe, glassTypes, allIngredients, loading} = this.state;
        const {toggleEdit} = this.props;
        return (
            <div className="Random-Card-Container">
                <button onClick={toggleEdit}>Cancel editing mode</button>
                <h3>Drink Name:</h3>
                <input type="text" value={name} name="name" onChange={this.updateField}/>
                <div className="Random-Card flex-container-vertical">
                    <div className="flex-container-horizontal flex-space-between">        
                        <div>
                        <h3>Picture:</h3>
                        <UploadImage 
                            files={image}
                            invalid={imageInvalid}
                            onDrop={this.onDrop}
                        />
                        </div>
                        <div className="flex-container-vertical padding-listtext">
                            <h3>Glass Type:</h3>
                                <select 
                                    value={glass}
                                    onChange={(e) => this.setState({glass : e.target.value})}
                                >
                                    {glassTypes.map(glassType => <option key={glassType} value={glassType}>{glassType}</option>)}
                                </select>
                                <div className="flex-container-horizontal">
                                    <div>
                                      <h3>Amounts:</h3>
                                        <ul>
                                            {amounts.map((amount,index) => <li key={index}>{amount}</li>)}
                                        </ul>
                                    </div>
                                {!loading 
                                    && 

                                    <form>
                                    <h3>Ingredients:</h3>
                                    <ListAutocomplete 
                                        submit={this.submitIngredients} 
                                        addIngredient={this.addIngredient} 
                                        removeIngredient={this.removeIngredient} 
                                        ingredients={ingredients.map(ing => ing.name)} 
                                        allIngredients={allIngredients.map(ing => ing.name)} 
                                        updateArrayField={this.setIngredientNameField}
                                        maxNItems={10}
                                        />
                                    </form>
                                    }
    
                            </div>
                            </div>
                    </div>
                    <h3>Recipe/Instructions:</h3>
                    <textarea name="recipe" value={recipe} onChange={this.updateField}/>
                    <button type="submit" onClick={this.updateDrink}>Save changes</button>
                
                </div>
            </div>
        );
    }
}

export default EditableDrink;