import React, { Component } from 'react';
import PropTypes from 'prop-types'
import DrinkCard from '../Components/DrinkCard';
import {Autocomplete} from './Automplete'; 
import { withRouter } from 'react-router';
import {Link} from 'react-router-dom';
import AlcoholModal from '../Components/AlcoholModal';
import { getDrinkImage, getFilteredDrinks, getCategories, getGlassTypes, getPageSize} from './api';

class CategoryList extends Component {
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }
    constructor(props){
        super(props);
        this.state = {
            category: "",
            categories: [],
            glassTypes: [],
            glass: "",
            drinks: [],
            modal: undefined,
            modal_url: undefined,
            page: 1,
            maxPages: 1
        }
        
        this.toggleModal = this.toggleModal.bind(this);
        this.submit = this.submit.bind(this);  
        this.setField = this.setField.bind(this); 
        this.update = this.update.bind(this);     
    }

    submit(e){
        e.preventDefault()
        this.update(1)
    }

    update(page){
        const {category, glass} = this.state
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
        console.log(this.props.location.state)
        this.setState({category,glass})
        getCategories().then(response => this.setState({categories: response}))
        getGlassTypes().then(response => this.setState({glassTypes: response}))
        getFilteredDrinks(glass,category, page).then(response => this.setState({drinks: response}))
        getPageSize(glass, category).then(response => this.setState({maxPages: response}))
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
        const {category, categories, glass,glassTypes, drinks, modal, modal_url, maxPages} = this.state;
        return <div>
                    <div>
                        <form className="Grid-header">
                            <div className="header-item input-text">
                                <Autocomplete 
                                type="text"
                                name="category"
                                placeholder="Category"
                                items={categories.map(cat => cat.name.toLowerCase())}
                                value={category}
                                setField={this.setField}
                                />
                            </div>
                        <div className="header-item input-text">
                            <Autocomplete 
                                type="text"
                                name="glass"
                                placeholder="Glass Type"
                                items={glassTypes.map(glass => glass.toLowerCase())}
                                value={glass}
                                setField={this.setField}
                                />
                            </div>
                        <div className="header-item">
                            <div>
                                <button type="submit" onClick={this.submit}>SEARCH</button>
                            </div>
                        </div>
                        </form>
                    </div>
                    {modal && <AlcoholModal isOpen={modal !== undefined} contentLabel={'AlcoholModal'} toggleModal={this.toggleModal} drink={modal} drinkUrl={modal_url}/>}    
                    
                    
                    <div className="Grid-container">
                        <div className="Grid">
                            {drinks && drinks.length === 0 && <div>There are no drinks for category <h4>{category}</h4> and glass <h4>{glass}</h4></div>}
                            {drinks && drinks.length > 0 && drinks.map((drink,index) => {
                                                                        const drinkUrl = getDrinkImage(drink)

                                                                        return<span onClick={(e) => this.toggleModal(drink,drinkUrl)}>
                                                                            <DrinkCard 
                                                                                key={index} 
                                                                                imageUrl={drinkUrl} 
                                                                                altUrl={drink.image_link}
                                                                                name={drink.name} 
                                                                                glass={drink.glass} 
                                                                                recipe={drink.recipe} 
                                                                                ingredients={drink.ingredients} 
                                                                                amounts ={drink.amounts}
                                                                                />
                                                                        </span>
                            })
                            }
                        </div>
                    </div>
                        <HorizontalButtons update={this.update} maxPages={maxPages}/>
                </div>
    }
}

const HorizontalButtons = ({maxPages, update}) => {
    return <ul className="horizontal-list-container center">{
                new Array(maxPages).fill(undefined).map((_,it) => 
                    <li key={it}>
                        <button 
                            className="horizontal-list" 
                            type="button" 
                            onClick={() => update(it + 1)}>
                            {it + 1}
                        </button>
                    </li>)
                }
            </ul>
}

export default withRouter(CategoryList);