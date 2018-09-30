import React from 'react';
import JugSvg from './JugSvg';
import VodkaSvg from './VodkaSvg';

import CategoryCard from '../Components/CategoryCard';

const wrapWithType = (inner, type) => {
    return <div>
        {type}
        {inner}
    </div>
}

const FillUpComponent = (props) => {
    const {type, percent} = props.type;
    console.log(percent);
    console.log(type);
    switch (type) {
        case "Jug":
            return wrapWithType(
                <JugSvg percent={percent}/>, type)
        case "Vodka":
            return wrapWithType(
                <JugSvg percent={percent}/>, type)
        case "Tequila":
            return wrapWithType(
                <JugSvg percent={percent}/>, type)
        case "Rum":
            return wrapWithType(
                <JugSvg percent={percent}/>, type)
        case "Triple Sec":
            return wrapWithType(
                <JugSvg percent={percent}/>, type)
        case "Gin":
            return wrapWithType(
                <JugSvg percent={percent}/>, type)
        default:
            return <JugSvg percent={percent}/>
    }
}

export default FillUpComponent;
8