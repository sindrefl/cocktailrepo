import React, {Component} from 'react';


import FillUpComponent from '../svgcomponents/FillUpComponent';
import RandomDrinkCard from '../Components/Cards/RandomDrink';
import { getRandomDrink, getDrinkImage, getBatteriLevels } from './api';


class MyBarPage extends Component {
    constructor(props){
        super(props);
        this.state = {
            lastProps : this.props,
            batteri : [],
            randomDrink : undefined
        }
    }

    componentDidMount(){
        getBatteriLevels()
            .then(response =>
                this.setState({batteri: response})
        )
        
        getRandomDrink()
            .then(drink => {
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
        console.log(batteri)
        return <div>
            YOUR BAR
        <div className="flex-container-horizontal">
        {batteri && Object.keys(batteri).map((key,index) => <div className="fifth" key={key}><FillUpComponent type={key} percent={batteri[key]}/></div>)}
        
        
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