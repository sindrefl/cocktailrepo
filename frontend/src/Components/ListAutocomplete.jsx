import React from 'react';

import {Autocomplete} from './Autocomplete';

export const ListAutocomplete = ({addIngredient,removeIngredient,ingredients,allIngredients,updateArrayField, maxNItems}) =>
    (
        <div className="flex-container-horizontal">
        <div className="header-item">
            {ingredients.map((i, index) => (
                                        <div className="flex-container-horizontal">
                                            <Autocomplete
                                                type = "text"
                                                name = "ingredients"
                                                placeholder = "Ingredient Name"
                                                value = {ingredients[index]}
                                                items={allIngredients}
                                                setField = {(e) => updateArrayField(e, index)}
                                                text= ""
                                                >
                                            </Autocomplete>
                                        <button className="small-button" type="button" onClick={() => removeIngredient(index)}>X</button>  
                                        </div>                                      
                                    )
                            )
            }
        {ingredients && ingredients.length < maxNItems && <button type="button" onClick={addIngredient}>Add another ingredient</button>}
        </div>
        </div>
    )
