import React, { Component } from "react";
import propTypes from "prop-types";
import "./ingredient.scss";
import "./funkyradio.scss";
class Ingredient extends Component {
  state = {
    ingredients: this.props.pizzaData.ingredients
  };

  handleClick = e => {
    let newselected = [];
    for (let ing of this.state.ingredients) {
      if (ing.title !== "Base") {
        if (document.getElementById(ing.htmlname).checked) {
          newselected.push(ing);
        }
      }
    }

    this.props.handleIngredients(newselected);
  };

  handleIngredientsReset = () => {
    const AllIngredients = document.getElementsByClassName("input-ingredients");
    for (let ing of AllIngredients) {
      ing.checked = false;
    }
  };

  creatList = () => {
    return this.state.ingredients.map(item => {
      if (item.title !== "Base") {
        return (
          <div className="funkyradio-success" key={item.title}>
            <input
              type="checkbox"
              onClick={this.handleClick}
              id={item.htmlname}
              className="input-ingredients"
            />
            <label htmlFor={item.htmlname}>
              {item.title + " ($" + item.price + ")"}
            </label>
          </div>
        );
      } else {
        return null;
      }
    });
  };
  render() {
    return (
      <div className="ingredients">
        <div className="funkyradio">{this.creatList()}</div>
      </div>
    );
  }
}
Ingredient.propTypes = {
  pizzaData: propTypes.objectOf(
    propTypes.oneOfType([
      propTypes.string.isRequired,
      propTypes.arrayOf(
        propTypes.oneOfType([
          propTypes.objectOf(
            propTypes.oneOfType([
              propTypes.string,
              propTypes.string,
              propTypes.number,
              propTypes.number
            ])
          )
        ]).isRequired,
        propTypes.arrayOf(
          propTypes.objectOf(propTypes.oneOfType([propTypes.string]))
        ).isRequired
      )
    ])
  ),
  handleIngredients: propTypes.func.isRequired
};
export default Ingredient;
