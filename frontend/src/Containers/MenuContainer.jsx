import React, { Component } from 'react';
import DrinkCard from '../Components/Cards/DrinkCard';
import AlcoholModal from '../Components/Modals/AlcoholModal';
import {getDrinkImage, getMenu} from './api';

class MenuContainer extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal: undefined,
            modal_url: undefined,
            drinks: [],

        }
        
        this.toggleModal = this.toggleModal.bind(this);
        this.onImageError = this.onImageError.bind(this);
        this.onLoad = this.onLoad.bind(this);
    }

    componentDidMount(){    
        getMenu().then(response => this.setState({
            drinks: response
        }))
    }
    
    onLoad(){

    }

    onImageError(){

    }

    toggleModal(drink, drinkUrl){
        if(this.state.modal) this.setState({modal: undefined, modal_url: undefined})
        else this.setState({modal: drink, modal_url:drinkUrl})
    }
    
    render(){
        const {drinks, modal, modal_url} = this.state;
        return <div>
                    {modal && <AlcoholModal admin={this.props.admin} isOpen={modal !== undefined} contentLabel={'AlcoholModal'} toggleModal={this.toggleModal} drink={modal} drinkUrl={modal_url} isLoading = {drinks.filter(drink => drink === modal).length === 0}/>}    

                    <div className="Grid-container">
                        <div className="Grid">
                            {drinks && drinks.length > 0 && drinks.map((drink,index) => {
                                                                        const drinkUrl = getDrinkImage(drink)
                                                                        return <span key={index + 1} onClick={(e) => this.toggleModal(drink,drinkUrl)}>
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
                                                                                show={true}
                                                                                />
                                                                        </span>
                                                                        })
                                }
                            </div>
                        </div>
                </div>
    }
}

export default MenuContainer;