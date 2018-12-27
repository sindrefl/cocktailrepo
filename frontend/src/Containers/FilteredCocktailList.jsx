import React, { Component } from 'react';
import PropTypes from 'prop-types'
import DrinkCard from '../Components/Cards/DrinkCard';
import { withRouter } from 'react-router';
import AlcoholModal from '../Components/Modals/AlcoholModal';
import { getFilteredDrinksByIngredients, getIngredientSuggestions, getDrinkImage, getFilteredDrinks, getCategories, getGlassTypes, getPageSize, getDrinkSuggestions, getFilteredDrinksBySpecificDrink} from './api';
import {throttle, debounce} from 'throttle-debounce';
import HeaderWithSearch from '../Components/HeaderWithSearch';

import update from 'immutability-helper';

import HorizontalButtons from '../Components/HorizontalButtons';

class FilteredCocktailList extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }

    constructor(props){
        super(props);
        this.state = {
            //suggestions:
            categories: [],
            glassTypes: [],
            drinkSuggestions: [],
            allIngredients: [],
            //forms
            category: "",
            glass: "",        
            specificDrink: "",
            ingredients: [""],
            //modal         
            modal: undefined,
            modal_url: undefined,
            //page-count
            page: 1,
            maxPages: 1,

            loadedImages: 0,
            drinks: [],

        }
        
        this.toggleModal = this.toggleModal.bind(this);
        this.submit = this.submit.bind(this);  
        this.setField = this.setField.bind(this); 
        this.updatePage = this.updatePage.bind(this);
        this.searchDrinkByName = this.searchDrinkByName.bind(this);    
        this.onLoad = this.onLoad.bind(this); 
        this.suggestionsLoaded = this.suggestionsLoaded.bind(this);
        this.drinkSuggestions = this.drinkSuggestions.bind(this);
        this.drinkSuggestionsThrottled = throttle(500, this.drinkSuggestions);
        this.drinkSuggestionsDebounced = debounce(1000, this.drinkSuggestions);
        this.ingredientSuggestionsThrottled = throttle(500, this.ingredientSuggestions);
        this.ingredientSuggestionsDebounced = debounce(1000, this.ingredientSuggestions);
        this.setFieldWithSuggestion = this.setFieldWithSuggestion.bind(this);
        this.setListFieldWithSuggestion = this.setListFieldWithSuggestion.bind(this);
        this.setIngredientNameField = this.setIngredientNameField.bind(this);
        this.ingredientSuggestions = this.ingredientSuggestions.bind(this);
        this.searchDrinkByIngredients = this.searchDrinkByIngredients.bind(this);
    }

    suggestionsLoaded = () => {
        return this.state.categories.length > 0 && this.state.glassTypes.length > 0;
    }

    onLoad(){
        this.setState(prevstate => ({loadedImages: prevstate.loadedImages + 1}))
    }

    searchDrinkByName = (e) => {
        e.preventDefault()
        getFilteredDrinksBySpecificDrink(this.state.specificDrink).then(response => {
            this.setState({
                drinks: response,
                maxPages: 1
            })
        })
    }

    searchDrinkByIngredients = (e) => {
        e.preventDefault()
        getFilteredDrinksByIngredients(this.state.ingredients).then(response => {
            this.setState({
                drinks: response,
                maxPages: 1
            })
        })
    }

    drinkSuggestions = (input) => {
        getDrinkSuggestions(input).then(response => this.setState({
            drinkSuggestions: response
        }))
    }

    ingredientSuggestions = (input) => {
        getIngredientSuggestions(input).then(response =>
            this.setState({
                allIngredients: response
            })
        )
    }

    submit(e){
        e.preventDefault()
        this.updatePage(1)
    }

    updatePage(page){
        const {category, glass} = this.state
        this.setState({loadedImages:0})
        getFilteredDrinks(glass,category, page).then((response) => {
            this.setState({drinks: response})
        }).catch((error)=>{
            console.warn(`error in newurl ${error}`);
        });
        getPageSize(glass,category).then((response) => {
            this.setState({page,maxPages:response})
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

    componentDidMount(){    
        let category = ""
        let glass = ""
        let page = 1
        
        if (this.props.location.state){
            const state = this.props.location.state;
            category = state.category;
            glass = state.glass;
            page = state.page;
        }
        this.setState({category,glass})

        getCategories().then(response => this.setState({categories: response}))
        getGlassTypes().then(response => this.setState({glassTypes: response}))
        getFilteredDrinks(glass,category, page).then(response => {
            this.setState({drinks: response})
        })
        getPageSize(glass, category).then(response => this.setState({maxPages: response}))
    }

    setFieldWithSuggestion(changeEvent){
        this.setField(changeEvent);
        if(changeEvent.target.value < 5){
            this.drinkSuggestionsThrottled(changeEvent.target.value)
        }
        else{
            this.drinkSuggestionsDebounced(changeEvent.target.value)
        }
    }

    setListFieldWithSuggestion(changeEvent, index){
        this.setIngredientNameField(changeEvent, index);
        if(changeEvent.target.value < 5){
            this.ingredientSuggestionsThrottled(changeEvent.target.value)
        }
        else{
            this.ingredientSuggestionsDebounced(changeEvent.target.value)
        }
    }

    setField = (changeEvent) => {
        const {name,value} = changeEvent.target
        this.setState({[name]: value})
    }


    toggleModal(drink, drinkUrl){
        if(this.state.modal) this.setState({modal: undefined, modal_url: undefined})
        else this.setState({modal: drink, modal_url:drinkUrl})
    }
    
    render(){
        const {category, glass,drinks, modal, modal_url, maxPages, loadedImages} = this.state;
        return <div>
                    {this.suggestionsLoaded && <HeaderWithSearch  {...this.state} submitIngredients={this.searchDrinkByIngredients} removeIngredient={this.removeIngredient} addIngredient={this.addIngredient} setIngredientNameField={this.setListFieldWithSuggestion} setField={this.setField} setFieldWithBackendCall={this.setFieldWithSuggestion} submit={this.submit} searchDrinkByName={this.searchDrinkByName}/>}

                    {loadedImages > 0 && modal && 
                        <AlcoholModal 
                            admin={this.props.admin} 
                            isOpen={modal !== undefined} 
                            contentLabel={'AlcoholModal'} 
                            toggleModal={this.toggleModal} 
                            drink={modal} 
                            drinkUrl={modal_url} 
                            isLoading = {drinks.filter(drink => drink === modal).length === 0}
                            isOrderable={false}
                            />}    
                    
                    {loadedImages === 0 && <div className="loader"></div>}
                    <div className="Grid-container">
                        <div className="Grid">
                            {drinks && drinks.length === 0 && <div>There are no drinks for category <h4>{category}</h4> and glass <h4>{glass}</h4></div>}
                            {drinks && drinks.length > 0 && drinks.map((drink,index) => {
                                                                        const drinkUrl = getDrinkImage(drink)
                                                                        return <span className="clickable-card-content" key={index + 1} onClick={(e) => this.toggleModal(drink,drinkUrl)}>
                                                                            <DrinkCard
                                                                                drinkId={drink.id}
                                                                                imageUrl={drinkUrl} 
                                                                                altUrl={drink.image_link}
                                                                                name={drink.name} 
                                                                                glass={drink.glass} 
                                                                                recipe={drink.recipe} 
                                                                                ingredients={drink.ingredients} 
                                                                                amounts ={drink.amounts}
                                                                                onImageLoad={this.onLoad}
                                                                                onImageError={this.onLoad}
                                                                                show={loadedImages > 0}
                                                                                />
                                                                        </span>
                                                                        })
                                }
                            </div>
                        </div>
                        {loadedImages > 0 && <HorizontalButtons update={this.updatePage} maxPages={maxPages}/>}
                        
                </div>
    }
}

export default withRouter(FilteredCocktailList);