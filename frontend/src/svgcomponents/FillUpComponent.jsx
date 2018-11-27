import React from 'react';
import JugSvg from './JugSvg';
import CointreauSvg from './CointreauSvg';
import VodkaSvg from './VodkaSvg';
import GinSvg from './GinSvg';
import RumSvg from './RumSvg';
import TequilaSvg from './TequilaSvg';


const wrapWithType = (inner, type) => {
    return <div>
        <div>{type}</div>
        <div className="max-parent">{inner}</div>
    </div>
}

const FillUpComponent = (props) => {
    let {type, percent} = props;
    percent = percent / 70;
    switch (type) {
        case "jug":
            return wrapWithType(
                <JugSvg percent={percent} name={type}/>, type)
        case "vodka":
            return wrapWithType(
                <VodkaSvg percent={percent} name={type}/>, type)
        case "tequila":
            return wrapWithType(
                <TequilaSvg percent={percent} name={type}/>, type)
        case "rum":
            return wrapWithType(
                <RumSvg percent={percent} name={type}/>, type)
        case "triple_sec":
            return wrapWithType(
                <CointreauSvg percent={percent} name={type}/>, type)
        case "gin":
            return wrapWithType(
                <GinSvg percent={percent} name={type}/>, type)
        default:
            return <JugSvg percent={percent} name={type}/>
    }
}

export default FillUpComponent;