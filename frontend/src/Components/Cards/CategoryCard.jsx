import React, { Component } from 'react';

class CategoryCard extends Component {
  render() {
    return (
        <div className="CategoryCard-Container">
          <div className="CategoryCard-header">
            <h2>{this.props.name}</h2>
          </div>
          <div className="Drink-Card">
            <img src={this.props.imageUrl} alt="Drink Category"></img>
          </div>
          <div>
            {this.props.description}
          </div>  
        </div>
    );
  }
}

export default CategoryCard;