import React, {Component} from 'react';


import FillUpComponent from '../svgcomponents/FillUpComponent';
import RandomDrinkCard from '../Components/RandomDrink';

const axios = require('axios');

class MyBarPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            lastProps : this.props,
            batteri : [{type : "Vodka", percent : 0.6}, {type: "Gin", percent: 0.2}, {type:"Rum", percent : 0.7,}, {type:"Triple Sec", percent: 0.2}, {type:"Tequila", percent: 0.2}],
            randomDrink : undefined
        }
    }

    componentDidMount(){
        axios
            .get('http://localhost:8080/random')
            .then((response) => {
                let drink = response.data;
                this.setState({randomDrink: drink})
            })
            .catch(function (error) {
                // handle error
                console.log(error);
            });
    }

    shouldComponentUpdate(nextProps,nextState){
        return(nextProps === this.state.lastProps);
    }

    render() {
        return <div>

            YOUR BAR

        <div className="flex-horizontal-container">
        {this.state.batteri.map((icon,index) => <div className="bottleIcon"><FillUpComponent key={index.toString()} type={icon}></FillUpComponent></div>)}
        
        </div>
        <div className="flex-horizontal-container">
        <div>
        {this.state.randomDrink && <RandomDrinkCard
                    name={this.state.randomDrink.name}
                    imageUrl={"http://localhost:8080/images/drinks/Whisky-Sour.jpg"}
                    description={this.state.randomDrink.description}
                    glass={this.state.randomDrink.glass}
                    ingredients={this.state.randomDrink.ingredients}
                    amounts ={this.state.randomDrink.amounts}
                    />
        }
        </div>
        <div>
            {this.state.randomDrink && <RandomDrinkCard
                    name={this.state.randomDrink.name}
                    imageUrl={"http://localhost:8080/images/drinks/Whisky-Sour.jpg"}
                    glass={this.state.randomDrink.glass}
                    ingredients={this.state.randomDrink.ingredients}
                    amounts ={this.state.randomDrink.amounts}
                    description={"This could either be some statistics or a suggestion based on previous drinks"}
                    />
        }
        </div>
             
        </div>
        </div>
    }
}

export default MyBarPage;