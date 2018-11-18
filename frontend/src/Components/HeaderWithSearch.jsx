import React from 'react';
import {Autocomplete} from './Autocomplete';


const HeaderWithSearch = ({submitIngredients,categories, glassTypes, category,glass, specificDrink, setField, submit,searchDrinkByName, setFieldWithBackendCall, drinkSuggestions, ingredients,allIngredients, addIngredient,setIngredientNameField, removeIngredient}) => {
    return (<div className="Grid-header-container-square">
    <form className="Grid-header">
        <div className="header-item input-text">
            <Autocomplete 
                type="text"
                name="category"
                placeholder="Category"
                items={categories.map(cat => cat.name.toLowerCase())}
                value={category}
                setField={setField}
                text="Search by category"
                />
        </div>
        <div className="header-item input-text">
            <Autocomplete 
                type="text"
                name="glass"
                placeholder="Glass Type"
                items={glassTypes.map(glass => glass.toLowerCase())}
                value={glass}
                setField={setField}
                text="search by glass type"
                />
            </div>
    <div className="header-item">
        <div>
            <button type="submit" onClick={submit}>SEARCH</button>
        </div>
    </div>
    </form>

    <ListAutoComplete submit={submitIngredients} addIngredient={addIngredient} removeIngredient={removeIngredient} ingredients={ingredients} allIngredients={allIngredients} updateArrayField={setIngredientNameField}></ListAutoComplete>
    <form className="Grid-header">
        <div className="header-item">
            <Autocomplete 
                type="text"
                name="specificDrink"
                placeholder="Drink name"
                items={drinkSuggestions}
                value={specificDrink}
                setField={setFieldWithBackendCall}
                text="search by specific drink name"
                />
        </div>
        <div className="header-item">
            <button type="submit" onClick={searchDrinkByName}>SEARCH</button>
        </div>
    </form>
</div>)
}


const ListAutoComplete = ({addIngredient,removeIngredient,ingredients,allIngredients,updateArrayField, submit}) =>
    (<form className="Grid-header">
        <div className="flex-container-horizontal">
        <div className="header-item">
        {ingredients && ingredients.length < 3 && <button type="button" onClick={addIngredient}>Add another ingredient</button>}
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
        </div>
        <button onClick={submit}>SEARCH</button>
        </div>
    </form>
    )

export default HeaderWithSearch;