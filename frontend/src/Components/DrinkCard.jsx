import React, {Component} from 'react';

class DrinkCard extends Component {

    render() {
        return (
            <div className="Card-Container">
                <div>
                    <h2>{this.props.name}</h2>
                </div>
                <div className="Drink-Card">
                    <img
                        width="200px"
                        height="200px"
                        src={this.props.imageUrl}
                        alt={this.props.altUrl}></img>
                </div>
                <div className="flex-horizontal-container">
                    <div className="flex-vertical">
                        Served in a 
                        <strong> {this.props.glass} </strong>
                         glass.
                        <div className="flex-horizontal-container">
                            <div>
                                <ul>
                                    {this
                                        .props
                                        .amounts
                                        .map(amount => <li>{amount}</li>)}

                                </ul>
                            </div>
                            <div>
                                <ul>
                                    {this
                                        .props
                                        .ingredients
                                        .map(ingredient => <li>
                                            {ingredient.name}</li>)
}
                                </ul>
                            </div>
                        </div>
                        {this.props.description}
                    </div>
                </div>

            </div>
        );
    }
}

export default DrinkCard;