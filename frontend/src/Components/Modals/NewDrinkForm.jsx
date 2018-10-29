import React, {Component} from 'react';
import '../../css/App.css';


import update from 'immutability-helper';
import { Autocomplete } from '../Autocomplete';
import { getCategories, getGlassTypes, getIngredients, postDrink, saveImageFiles, saveImageFile } from '../../Containers/api';
import UploadImage from '../UploadImage';

class NewDrinkForm extends Component {
    constructor(props) {
        super(props);
        
        this.state = {
            name: "",
            category: "",
            ingredients: [""],
            allIngredients: [],
            allCategories: [],
            amounts: [""],
            image_link: undefined,
            description: "",
            glass: "HIGHBALL",
            submitted : false,
            image: [],
            imageInvalid: []
        }

        this.setField = this.setField.bind(this);
        this.submitForm = this.submitForm.bind(this);
        this.submitImage = this.submitImage.bind(this);
        this.addIngredient = this.addIngredient.bind(this);
        this.setIngredientNameField = this.setIngredientNameField.bind(this);
        this.setAmountsNameField = this.setAmountsNameField.bind(this);
        this.onDrop = this.onDrop.bind(this);
        
    }

    componentDidMount(){
        getIngredients().then(response => this.setState({allIngredients : response.map(ing => ing.name)}));
        getCategories().then(response => this.setState({allCategories : response}));
        getGlassTypes().then(response => this.setState({glassTypes : response}));
        
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
        let body = JSON.stringify({
                glass: this.state.glass,
                name: this.state.name,
                category: this.state.category,
                ingredients: this.state.ingredients,
                amounts: this.state.amounts,
                description: this.state.description,
                alcoholic: true,
                img_link: this.state.image_link,
                recipe: ""
            })

        postDrink(body).then((response) => {
                console.log(response)
                if(response.status === 200){
                    this.setState({submitted : true})
                }
            })
            .then((error) => {
                console.warn(error)
            });
    }

    submitImage = (e) => {
        e.preventDefault()
        console.log(this.state.image)
        console.log(this.state.image.map(image => image.name.split('\.')[0].replace(/_/g, ' ')))
        saveImageFiles(this.state.image, this.state.image.map(image => image.name.split('\.')[0].replace(/_/g, ' '))).then(response => console.log(response))
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

    onDrop(accepted, rejected){
        this.setState(prevState => ({
            image: [...prevState.image, ...accepted],
            imageInvalid: [...prevState.imageInvalid, ...rejected]
        }))
    }
    renderAll(){
        const {glassTypes,allCategories,allIngredients, category, name, ingredients, glass, submitted, image, imageInvalid} = this.state
        let finishedLoading = (glassTypes && allCategories && allIngredients)
        const {handleClose} = this.props
        return(
            <div className="horizontal-list-container hide">
                <UploadImage 
                        files={image}
                        invalid={imageInvalid}
                        onDrop={this.onDrop}
                    />
                <button type="submit" onClick={this.submitImage}>Send</button>
            </div>
        )
    }
    
    render() {
        const {glassTypes,allCategories,allIngredients, category, name, ingredients, glass, submitted, image, imageInvalid} = this.state
        let finishedLoading = (glassTypes && allCategories && allIngredients)
        const {handleClose} = this.props
        return (
                <div>
                    
                { !submitted && finishedLoading && <form>
                    <div>
                    <h1>FILL IN TO SUBMIT A NEW DRINK</h1>
                    <p>Here you can submit your own drink recipies. If your drink fits in one of the existing categories, or contains existing ingredients, it is preferable that you use these rather than creating new ingredients/categories.</p>
                    </div>

                    <div>
                        <button className="topright" onClick={handleClose}>X</button>
                    </div>

                    <UploadImage 
                        files={image}
                        invalid={imageInvalid}
                        onDrop={this.onDrop}
                    />
                    
                    <ul>
                        <li>
                            <input
                                type="text"
                                name="name"
                                placeholder="Name of Drink"
                                value={name}
                                onChange={this.setField}></input>
                        </li>
                        <li>
                            <Autocomplete
                                type="text"
                                name="category"
                                placeholder="Type of Drink"
                                value={category}
                                setField={this.setField}
                                items={allCategories.map(cat => cat.name)}
                                text="">
                                
                            </Autocomplete>
                        </li>
                        <li>
                            <select 
                                value={glass}
                                onChange={(e) => this.setState({glass : e.target.value})}
                            >
                            {glassTypes.map(glassType => <option key={glassType} value={glassType}>{glassType}</option>)}
                            </select>
                        </li>
                        <li>
                            <ul>
                            {ingredients.map((i, index) =>{
                                    return(
                                    <li>
                                        <Autocomplete
                                            type = "text"
                                            name = "ingredients"
                                            index = {index}
                                            placeholder = "Ingredient Name"
                                            value = {ingredients[index]}
                                            items={allIngredients}
                                            setField = {this.setIngredientNameField}
                                            text= ""
                                            >
                                        </Autocomplete>
                                        <input
                                            type = "text"
                                            name = "amounts"
                                            index={index}
                                            placeholder = "Amount"
                                            value = {this.state.amounts[index]}
                                            setField = {this.setAmountsNameField} > 
                                        </input>
                                    </li>)})
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

                {submitted && <div>Your drink was submitted successfully <button onClick={handleClose}>Close</button></div>}
                </div>
        );
    }
}

export default NewDrinkForm;