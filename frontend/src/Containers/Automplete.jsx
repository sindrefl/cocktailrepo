import React from 'react'
import Downshift from 'downshift'

export const Autocomplete = ({items, select, name}) => {
    return (
        <Downshift
            itemToString={item => (item
            ? item
            : '')}>
            {({
                getInputProps,
                getItemProps,
                getLabelProps,
                getMenuProps,
                isOpen,
                inputValue,
                highlightedIndex,
                selectedItem
            }) => (
                <div className="autocomplete">
                    <div>
                        <label {...getLabelProps()}>Search by {name}</label>
                    </div>
                    <div>
                        <input {...getInputProps()}/>
                    </div>
                    <ul {...getMenuProps()}>
                        {isOpen && items
                            ? items.filter(item => !inputValue || item.indexOf(inputValue) !== -1).map((item, index) => (
                                <li
                                    {...getItemProps({ key: item, index, item, style: { backgroundColor: highlightedIndex === index ? 'lightgray' : 'white', fontWeight: selectedItem === item ? 'bold' : 'normal', }, })}>
                                    {item}
                                </li>
                            ))
                            : null}
                    </ul>
                </div>
            )}
        </Downshift>
    );
}
