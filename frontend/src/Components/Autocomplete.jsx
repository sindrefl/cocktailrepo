import React from 'react'
import Downshift from 'downshift'

export const Autocomplete = ({items, value, name, setField, text}) => {
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
            ? item.toLowerCase()
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
                        <label {...getLabelProps()}>{text}</label>
                    </div>
                    <div>
                        <input {...getInputProps()}/>
                    </div>
                    <ul className="downshift-dropdown" {...getMenuProps()}>
                        {isOpen && items ? items.length > 10
                            ? items.filter(item => !inputValue || item.indexOf(inputValue) !== -1).slice(0,10).map((item, index) => (
                                <li
                                    {...getItemProps({ key: item, index, item, style: { backgroundColor: highlightedIndex === index ? 'lightgray' : 'white', fontWeight: selectedItem === item ? 'bold' : 'normal', }, })}>
                                    {item}
                                </li>
                            ))
                            : items.filter(item => !inputValue || item.indexOf(inputValue) !== -1).slice(0,10).map((item, index) => (
                                <li
                                    {...getItemProps({ key: item, index, item, style: { backgroundColor: highlightedIndex === index ? 'lightgray' : 'white', fontWeight: selectedItem === item ? 'bold' : 'normal', }, })}>
                                    {item}
                                </li>
                            ))
                        :null}
                    </ul>
                </div>
            )}
        </Downshift>
    );
}
