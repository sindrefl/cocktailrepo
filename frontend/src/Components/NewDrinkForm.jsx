import React, {Component} from 'react';
import '../css/App.css';

import update from 'immutability-helper';

const axios = require('axios');
class NewDrinkForm extends Component {
    
    constructor(props) {
        super(props);
        this.setField = this
            .setField
            .bind(this);
        this.submitForm = this
            .submitForm
            .bind(this);
        this.addIngredient = this
            .addIngredient
            .bind(this);
        this.setIngredientNameField = this.setIngredientNameField.bind(this);
        this.setAmountsNameField = this.setAmountsNameField.bind(this);
        
        this.state = {
            drinkName: "",
            drinkType: "",
            ingredients: [""],
            amounts: [""],
            img: undefined,
            description: "",
            glass: "HIGHBALL",
            submitted : false
        }
    }

    addIngredient() {
        this.setState(prevState => ({
            ingredients: [
                ...prevState.ingredients,
                ""
            ],
            amounts: [
                ...prevState.amounts,
                ""
            ]
        }))
    }

    submitForm(e) {
        e.preventDefault()
        console.log(this.state)
        axios
            .post('http://localhost:8080/addDrink', {
            glass: this.state.glass,
            name: this.state.drinkName,
            category: this.state.drinkType,
            ingredients: this.state.ingredients,
            amounts: this.state.amounts,
            description: this.state.description
        })
            .then((response) => {
                console.log(response)
                if(response.status === 200){
                    this.setState({submitted : true})
                }
            })
            .then((error) => {
                console.log(error)
            });
    }

    setIngredientNameField = (changeEvent) => {
        const {target} = changeEvent
        const index = target.getAttribute("index");
        this.setState({
            ingredients: update(this.state.ingredients, {[index]:{$set: target.value}})
          })
    }
    
    setAmountsNameField = (changeEvent) => {
        const {target} = changeEvent
        const index = target.getAttribute("index");
        this.setState({
            amounts: update(this.state.amounts, {[index]:{$set: target.value}})
          })
    }

    setField = (changeEvent) => {
        const {target} = changeEvent
        const key = target.getAttribute("name")
        this.setState({[key]: changeEvent.target.value})
    }

    render() {
        const showHideClassName = this.props.show
            ? "modal display-block"
            : "modal display-none";
        return (
            <div className={showHideClassName}>
                <div className="modal-main">
                { !this.state.submitted && <form>
                    FILL IN TO SUBMIT A NEW DRINK
                    <div>
                        <button className="right" onClick={this.props.handleClose}>X</button>
                    </div>
                    <ul>
                        <li>
                            <input
                                type="text"
                                name="drinkName"
                                placeholder="Name of Drink"
                                value={this.state.drinkName}
                                onChange={this.setField}></input>
                        </li>
                        <li>
                            <input
                                type="text"
                                name="drinkType"
                                placeholder="Type of Drink"
                                value={this.state.drinkType}
                                onChange={this.setField}></input>
                        </li>
                        <li>
                            <select value={this.state.glass}
                            onChange={(e) => this.setState({glass : e.target.value})}
                            >
                            {this.props.glassTypes.map(glassType => <option key={glassType} value={glassType}>{glassType}</option>)}
                            </select>
                        </li>
                        <li>
                            <ul>
                            {this
                                .state
                                .ingredients
                                .map((i, index) => {
                                    return<li><input
                                    type = "text"
                                    name = "ingredients"
                                    index = {index}
                                    placeholder = "Ingredient Name"
                                    value = {this.state.ingredients[index]}
                                    onChange = {this.setIngredientNameField}>
                                </input>
                                <input
                                    type = "text"
                                    name = "amounts"
                                    index={index}
                                    placeholder = "Amount"
                                    value = {this.state.amounts[index]}
                                    onChange = {this.setAmountsNameField} > 
                                </input></li>})
                                }
                                </ul>
                                <button type="button" onClick={this.addIngredient}>+</button>
                        </li>
                        <li>
                            <textarea
                                type="text"
                                placeholder="Description of drink"
                                name="description"
                                value={this.state.description}
                                onChange={this.setField}>
                            </textarea>
                        </li>
                    </ul>

                    <button type="submit" onClick={this.submitForm}>Click here to submit your drink</button>
                    
                </form>}

                {this.state.submitted && <div>Your drink was submitted successfully <button onClick={this.props.handleClose}>Close</button></div>}
                </div>
            </div>
        );
    }
}

export default NewDrinkForm;