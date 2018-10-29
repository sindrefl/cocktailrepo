import React from 'react';


const HorizontalButtons = ({maxPages, update}) => {
    return <ul className="horizontal-list-container center">{
                new Array(maxPages).fill(undefined).map((_,it) => 
                    <li key={it}>
                        <button 
                            type="button" 
                            onClick={() => update(it + 1)}>
                            {it + 1}
                        </button>
                    </li>)
                }
            </ul>
}

export default HorizontalButtons;