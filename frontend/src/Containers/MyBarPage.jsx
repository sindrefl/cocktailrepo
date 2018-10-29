import React, {Component} from 'react';


import FillUpComponent from '../svgcomponents/FillUpComponent';
import RandomDrinkCard from '../Components/Cards/RandomDrink';
import { getRandomDrink, getDrinkImage } from './api';


class MyBarPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            lastProps : this.props,
            batteri : [{type : "Vodka", percent : 0.5}, {type: "Gin", percent: 0.7}, {type:"Rum", percent : 0.6}, {type:"Triple-Sec", percent: 0.5}, {type:"Tequila", percent: 0.4}],
            randomDrink : undefined
        }
    }

    componentDidMount(){
        getRandomDrink().then(drink => {
                this.setState({randomDrink: drink})
            }).catch(function (error) {
                console.warn(error);
            });
    }

    shouldComponentUpdate(nextProps,nextState){
        return(nextProps === this.state.lastProps);
    }

    render() {
        const {randomDrink,batteri} = this.state
        return <div>
            YOUR BAR
        <div className="flex-container-horizontal">
        {batteri && batteri.map((icon,index) => <div className="fifth" key={index}><FillUpComponent type={icon.type} percent={icon.percent}/></div>)}
        
        </div>
        <div className="flex-container-horizontal">
        <div>
        {randomDrink && <RandomDrinkCard
                    name={randomDrink.name}
                    imageUrl={getDrinkImage(randomDrink)}
                    description={randomDrink.description}
                    glass={randomDrink.glass}
                    ingredients={randomDrink.ingredients}
                    amounts ={randomDrink.amounts}
                    />
        }
        </div>
        <div>
            {randomDrink && <RandomDrinkCard
                    name={randomDrink.name}
                    imageUrl={getDrinkImage(randomDrink)}
                    glass={randomDrink.glass}
                    ingredients={randomDrink.ingredients}
                    amounts ={randomDrink.amounts}
                    description={"This could either be some statistics or a suggestion based on previous drinks"}
                    />
        }
        </div>
             
        </div>
        </div>
    }
}

export default MyBarPage;