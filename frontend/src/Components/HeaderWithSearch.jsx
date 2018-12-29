import React from 'react';
import {Autocomplete} from './Autocomplete';
import {ListAutocomplete} from './ListAutocomplete';
import Media from 'react-media';

const HeaderWithSearch = ({setSearchType,searchType,submitIngredients,categories, glassTypes, category,glass, specificDrink, setField, submit,searchDrinkByName, setFieldWithBackendCall, drinkSuggestions, ingredients,allIngredients, addIngredient,setIngredientNameField, removeIngredient}) => {
    return (
        <Media query="(min-width: 768px)">
            {match => match ?     <div className="Grid-header-container-square">
            {categoryAndGlassSearch(categories, category,glassTypes,glass, setField, submit)}
            {ingredientsSearch(addIngredient,removeIngredient,ingredients,allIngredients,setIngredientNameField, submitIngredients)}
            {specificSearch(drinkSuggestions, specificDrink, setFieldWithBackendCall, searchDrinkByName)}    
            </div>
            :
            <div className="Grid-header-container-square">
                <select
                    style={{alignSelf: "center", height: "24px"}}
                    onChange={setSearchType}>
                    <option value="cat">Category/glass</option>
                    <option value="ing">Ingredients</option>
                    <option value="name">Cocktail name</option>
                </select>
                {searchType === "cat" && categoryAndGlassSearch(categories, category,glassTypes,glass, setField, submit)}
                {searchType === "ing" && ingredientsSearch(addIngredient,removeIngredient,ingredients,allIngredients,setIngredientNameField, submitIngredients)}
                {searchType === "name" && specificSearch(drinkSuggestions, specificDrink, setFieldWithBackendCall, searchDrinkByName)}

            </div>        
        }
        </Media>
        
)
}

const categoryAndGlassSearch = (categories, category,glassTypes, glass, setField, submit) =>
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
                <button type="submit" onClick={submit}><img height="20px" width="20px" src={require("../assets/search.png")} alt="SEARCH"/></button>
            </div>
        </div>
    </form>

const ingredientsSearch = (addIngredient,removeIngredient,ingredients,allIngredients,setIngredientNameField, submitIngredients) =>
    <form className="Grid-header">
        <ListAutocomplete 
            addIngredient={addIngredient}
            removeIngredient={removeIngredient}
            ingredients={ingredients}
            allIngredients={allIngredients}
            updateArrayField={setIngredientNameField}
            maxNItems={3}
        />
        <div className="header-item">
            <button type="submit" onClick={submitIngredients}><img height="20px" width="20px" src={require("../assets/search.png")} alt="SEARCH"/></button>    
        </div>
    </form>

const specificSearch = (drinkSuggestions, specificDrink, setFieldWithBackendCall, searchDrinkByName) => 
    <form className="Grid-header">
        <div className="header-item">
            <Autocomplete 
                type="text"
                name="specificDrink"
                placeholder="Drink name"
                items={drinkSuggestions}
                value={specificDrink}
                setField={setFieldWithBackendCall}
                text="drink name"
                />
        </div>
        <div className="header-item">
            <button type="submit" onClick={searchDrinkByName}><img height="20px" width="20px" src={require("../assets/search.png")} alt="SEARCH"/></button>
        </div>
    </form>
export default HeaderWithSearch;