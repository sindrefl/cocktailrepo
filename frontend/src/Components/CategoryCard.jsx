import React, { Component } from 'react';

class CategoryCard extends Component {
  render() {
    return (
        <div className="CategoryCard-Container">
          <h2>{this.props.name}</h2>
          <div className="Drink-Card">
            <img width="200px" height="200px" src={this.props.imageUrl} alt="Drink Category"></img>
          </div>
          <div>
            {this.props.description}
          </div>  
        </div>
    );
  }
}

export default CategoryCard;