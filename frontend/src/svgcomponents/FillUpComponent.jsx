import React from 'react';
import JugSvg from './JugSvg';


const wrapWithType = (inner, type) => {
    return <div>
        <div>{type}</div>
        <div className="max-parent">{inner}</div>
    </div>
}

const FillUpComponent = (props) => {
    const {type, percent} = props;
    console.log(percent);
    console.log(type);
    switch (type) {
        case "Jug":
            return wrapWithType(
                <JugSvg percent={percent} name={type}/>, type)
        case "Vodka":
            return wrapWithType(
                <JugSvg percent={percent} name={type}/>, type)
        case "Tequila":
            return wrapWithType(
                <JugSvg percent={percent} name={type}/>, type)
        case "Rum":
            return wrapWithType(
                <JugSvg percent={percent} name={type}/>, type)
        case "Triple-Sec":
            return wrapWithType(
                <JugSvg percent={percent} name={type}/>, type)
        case "Gin":
            return wrapWithType(
                <JugSvg percent={percent} name={type}/>, type)
        default:
            return <JugSvg percent={percent} name={type}/>
    }
}

export default FillUpComponent;