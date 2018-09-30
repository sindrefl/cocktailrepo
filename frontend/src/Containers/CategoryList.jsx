import React, { Component } from 'react';
import { Route, Link, Redirect} from 'react-router-dom';
import DrinkCard from '../Components/DrinkCard';



class CategoryList extends Component {
    constructor(props){
        super(props);
        this.state = {
            modal:false,
            category: "",
            glass: "",
            drinks : []
        }

        this.toggleModal = this.toggleModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.setStateFromUrl = this.setStateFromUrl.bind(this);
        this.updatePage = this.updatePage.bind(this);
        this.submit = this.submit.bind(this);
        
    }

    setStateFromUrl(path){
        let list = path.split('&')
        for(const el of list){
            const li = el.split('=')
            switch(li[0]){
                case "category": this.setState({category:li[1]})
                break;
                case "glass" : this.setState({glass:li[1]})
                break;
                default: break;
            }
        }
    }


    submit(e){
        e.preventDefault()
        this.updatePage(`glass=${this.state.glass}&category=${this.state.category}`)
    }

    updatePage(newUrl){
        this.setStateFromUrl(newUrl)
        fetch('/api/filteredDrinks/' + newUrl).then((response)=>response.json()).then((response) => {
                this.setState({drinks: response})
            }).catch((error)=>{
                console.log(error);
            });
    }

    componentDidMount(){
        const split = window.location.pathname.split('/')
        const query = split[split.length -1]
        this.updatePage(query)
    }

    setField = (changeEvent) => {
        const {target} = changeEvent
        const key = target.getAttribute("name")
        this.setState({[key]: changeEvent.target.value})
    }

    toggleModal(e){
        console.log(e)
    }
    hideModal(e){
        console.log(e)
    }
    
    render(){
        return <div>
                    <div>
                        <form className="Grid-header">
                            <input className="header-item input-text"
                            type="text"
                            name="category"
                            placeholder="Category"
                            value={this.state.category}
                            onChange={(e) => this.setField(e)}
                            >
                        </input>
                        <input className="header-item input-text"
                            type="text"
                            name="glass"
                            placeholder="Glass Type"
                            value={this.state.glass}
                            onChange={(e) => this.setField(e)}
                            >
                        </input>
                        <div className="header-item">
                            <button type="submit" onClick={(e) => this.submit(e)}>SEARCH</button>
                        </div>
                        </form>
                    </div>
                        
                    <div className="Grid-container">
                        <div className="Grid">
                            {this.state.drinks &&
                                this.state.drinks.map((drink,index) => <span onClick={(e) => this.toggleModal(e)}>
                                                                            <DrinkCard 
                                                                                key={index} 
                                                                                imageUrl={`/images/drinks/${drink.name.replace(/ /g,'_')}.jpg`} 
                                                                                altUrl={drink.imageUrl}
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

export default CategoryList;