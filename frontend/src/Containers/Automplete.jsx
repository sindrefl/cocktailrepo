import React from 'react'
import Downshift from 'downshift'

export const Autocomplete = ({items, value, name, setField}) => {
    return (
        <Downshift
            onStateChange={changes => {
            if (changes.hasOwnProperty('selectedItem')) {
                setField({target: {value: changes.selectedItem, name}})
            } else if (changes.hasOwnProperty('inputValue')) {
                setField({target:{value: changes.inputValue, name}})
            }
        }}  
            selectedItem={value}
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
                    <ul className="downshift-dropdown" {...getMenuProps()}>
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
