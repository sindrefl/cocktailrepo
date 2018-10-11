import React, { Component } from 'react';
import PropTypes from 'prop-types'
import DrinkCard from '../Components/DrinkCard';
import {Autocomplete} from './Automplete'; 
import { withRouter } from 'react-router';
import AlcoholModal from '../Components/AlcoholModal';
import { getDrinkImage, getFilteredDrinks, getCategories, getGlassTypes } from './api';

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
            modal: undefined
        }
        
        this.toggleModal = this.toggleModal.bind(this);
        this.submit = this.submit.bind(this);  
        this.setField = this.setField.bind(this);      
    }

    submit(e){
        e.preventDefault()
        let {glass, category} = this.state
        getFilteredDrinks(glass,category).then((response) => {
                this.setState({drinks: response})
            }).catch((error)=>{
                console.warn(`error in newurl ${error}`);
            });

    }

    componentDidMount(){
        const {category, glass} = this.props.location.state
        this.setState({category,glass})
        getCategories().then(response => this.setState({categories: response}))
        getGlassTypes().then(response => this.setState({glassTypes: response}))
        getFilteredDrinks(glass,category).then(response => this.setState({drinks: response}))
        
    }

    setField = (changeEvent) => {
        const {name,value} = changeEvent.target
        this.setState({[name]: value})
    }


    toggleModal(drink){
        if(this.state.modal) this.setState({modal: undefined})
        else this.setState({modal: drink})
        console.log(drink)
    }
    
    render(){
        const {category, categories, glass,glassTypes, drinks, modal} = this.state;
        return <div>
                    <div>
                        <form className="Grid-header">
                            <div className="header-item input-text">
                                <Autocomplete 
                                type="text"
                                name="category"
                                placeholder="Category"
                                items={categories.map(cat => cat.name)}
                                value={category}
                                setField={this.setField}
                                />
                            </div>
                        <div className="header-item input-text">
                            <Autocomplete 
                                type="text"
                                name="glass"
                                placeholder="Glass Type"
                                items={glassTypes}
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
                    {modal && <AlcoholModal isOpen={modal !== undefined} contentLabel={'AlcoholModal'} toggleModal={this.toggleModal} drink={modal}/>}    
                    <div className="Grid-container">
                        <div className="Grid">
                            {drinks && drinks.length > 0 && drinks.map((drink,index) => <span onClick={(e) => this.toggleModal(drink)}>
                                                                            <DrinkCard 
                                                                                key={index} 
                                                                                imageUrl={getDrinkImage(drink)} 
                                                                                altUrl={drink.image_link}
                                                                                name={drink.name} 
                                                                                glass={drink.glass} 
                                                                                recipe={drink.recipe} 
                                                                                ingredients={drink.ingredients} 
                                                                                amounts ={drink.amounts}
                                                                                />
                                                                        </span>)
                            }
                        </div>
                    </div>
                </div>
    }
}

export default withRouter(CategoryList);