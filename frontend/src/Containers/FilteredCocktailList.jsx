import React, { Component } from 'react';
import PropTypes from 'prop-types'
import DrinkCard from '../Components/Cards/DrinkCard';
import { withRouter } from 'react-router';
import AlcoholModal from '../Components/Modals/AlcoholModal';
import { getDrinkImage, getFilteredDrinks, getCategories, getGlassTypes, getPageSize, getDrinkSuggestions, getFilteredDrinksBySpecificDrink} from './api';
import {throttle, debounce} from 'throttle-debounce';
import HeaderWithSearch from '../Components/HeaderWithSearch';

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
            //forms
            category: "",
            glass: "",        
            specificDrink: "",
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
        this.update = this.update.bind(this);
        this.searchDrinkByName = this.searchDrinkByName.bind(this);    
        this.onLoad = this.onLoad.bind(this); 
        this.suggestionsLoaded = this.suggestionsLoaded.bind(this);
        this.drinkSuggestions = this.drinkSuggestions.bind(this);
        this.drinkSuggestionsThrottled = throttle(500, this.drinkSuggestions);
        this.drinkSuggestionsDebounced = debounce(1000, this.drinkSuggestions);
        this.setFieldWithSuggestion = this.setFieldWithSuggestion.bind(this);
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

    drinkSuggestions = (input) => {
        getDrinkSuggestions(input).then(response => this.setState({
            drinkSuggestions: response
        }))
    }

    submit(e){
        e.preventDefault()
        this.update(1)
    }

    update(page){
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

    componentDidMount(){
        let {category, glass,page} = this.props.location.state
        if (!page) page = 1
        this.setState({category,glass})
        getCategories().then(response => this.setState({categories: response}))
        getGlassTypes().then(response => this.setState({glassTypes: response}))
        getFilteredDrinks(glass,category, page).then(response => this.setState({drinks: response}))
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
                    {this.suggestionsLoaded && <HeaderWithSearch  {...this.state} setField={this.setField} setFieldWithBackendCall={this.setFieldWithSuggestion} submit={this.submit} searchDrinkByName={this.searchDrinkByName}/>}

                    {modal && <AlcoholModal isOpen={modal !== undefined} contentLabel={'AlcoholModal'} toggleModal={this.toggleModal} drink={modal} drinkUrl={modal_url}/>}    
                    
                    {loadedImages < 2 && <div className="loader"></div>}
                    <div className="Grid-container">
                        <div className="Grid">
                            {loadedImages > 2 && drinks && drinks.length === 0 && <div>There are no drinks for category <h4>{category}</h4> and glass <h4>{glass}</h4></div>}
                            {drinks && drinks.length > 0 && drinks.map((drink,index) => {
                                                                        const drinkUrl = getDrinkImage(drink)
                                                                        return <span key={index} onClick={(e) => this.toggleModal(drink,drinkUrl)}>
                                                                            <DrinkCard 
                                                                                imageUrl={drinkUrl} 
                                                                                altUrl={drink.image_link}
                                                                                name={drink.name} 
                                                                                glass={drink.glass} 
                                                                                recipe={drink.recipe} 
                                                                                ingredients={drink.ingredients} 
                                                                                amounts ={drink.amounts}
                                                                                onImageLoad={this.onLoad}
                                                                                onImageError={this.onLoad}
                                                                                show={loadedImages > 2}
                                                                                />
                                                                        </span>
                                                                        })
                                }
                            </div>
                        </div>
                        {loadedImages > 2 && <HorizontalButtons update={this.update} maxPages={maxPages}/>}
                        
                </div>
    }
}

export default withRouter(FilteredCocktailList);