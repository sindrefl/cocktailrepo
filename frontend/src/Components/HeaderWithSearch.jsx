import React from 'react';
import {Autocomplete} from './Autocomplete';


const HeaderWithSearch = ({categories, glassTypes, category,glass, specificDrink, setField, submit,searchDrinkByName, setFieldWithBackendCall, drinkSuggestions}) => {
    return (<div className="Grid-header-container">
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

    <form className="Grid-header">
        <div className="header-item">
            <Autocomplete 
                type="text"
                name="specificDrink"
                placeholder="Drink"
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

export default HeaderWithSearch;