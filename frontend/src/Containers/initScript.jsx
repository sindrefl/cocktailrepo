import React from 'react'

import drinks from './drinksDump'

const axios = require('axios');


class InitScript extends React.Component {
    
    shouldComponentUpdate (nextProps,nextState){
        return false;
    }

    isBattery(name){
        let n = name.toLowerCase()
        return n.includes('gin') || n.includes('vodka') || n.includes('rum') || n.includes('triple sec') || n.includes('tequila')
    }

    isJuice(name){
        return name.includes('juice')
    }

    isPeel(name){
        return name.includes('peel')
    }
    

    //TODO CONVERT OZ TO CL:
    //Modify backend slightly -> store all images, battery, recipe instructions
    render(){
        
        console.log(drinks.length)
        let d = drinks.map(drink => {
            
            if(drink !== null){
            let cocktailingredients = []
            let measures = []
            for(var i = 1; i < 16; i++){
                let ing = "strIngredient"+i
                let measure = "strMeasure"+i

                if(drink[ing] !== "" && drink[ing] !== null){
                    let ingredient = ""
                    if (this.isBattery(drink[ing])){
                        ingredient = {name:drink[ing], description : "", type: "Hard liquor", battery:true}
                    }else if(this.isJuice(drink[ing])){
                        ingredient = {name:drink[ing], description : "", type: "Juice", battery :false}
                    }
                    else if (this.isPeel(drink[ing])){
                        ingredient = {name: drink[ing], description: "", type: "Garnish", battery:false}
                    }
                    else{
                        ingredient = {name:drink[ing], description : "", type: "", battery: false}
                    }
                    cocktailingredients.push(ingredient);
                    measures.push(drink[measure]);
                }
            }

            if(drink.strAlcoholic === null){
                drink.strAlcoholic = "non"
            }
            if(drink.strGlass.includes('/')){
                drink.strGlass = drink.strGlass.replace('/', '_')
            }
            if(drink.strGlass.includes('-')){
                drink.strGlass = drink.strGlass.replace('-', '_')
            }

            let res = { description: "", name : drink.strDrink, category : {name : drink.strCategory},ingredients: cocktailingredients, amounts : measures, glass:drink.strGlass.split(" ")[0].toUpperCase(), alcoholic : !drink.strAlcoholic.includes('non'), image_link : drink.strDrinkThumb, recipe : drink.strInstructions} 

            
          
            axios
            .post('/api/addDrink', res)
            .then((response) => {
            })
            .then((error) => {
            });

            return res
        }
        })
        


    
        return <div>hello</div>
    
    }
    
}

export default InitScript;
