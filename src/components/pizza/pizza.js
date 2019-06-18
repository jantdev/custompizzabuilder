import React, { Component } from "react";
import propTypes from "prop-types";
import "./pizza.scss";

class Pizza extends Component {
  state = {
    ingredient: this.props.pizzaData.ingredients
  };

  createLayes = () => {
    let localLayer = 100;
    return this.state.ingredient.map(item => {
      let style = {};

      for (let nameOfLayer of this.props.selected) {
        if (nameOfLayer.title === item.title) {
          style = {
            zIndex: localLayer,
            display: "block",
            background:
              "url(" +
              require("../../images/" + item.title + ".png") +
              ") no-repeat",
            backgroundSize: "contain"
          };
        }
        localLayer++;
      }

      return (
        <div
          className="ingredient"
          key={item.title}
          style={style}
          ref={item.htmlname}
        />
      );
    });
  };

  render() {
    return (
      <div className="Pizza" style={this.props.showPizza}>
        <div className="Shovel" />
        <div className="Base" /> {this.createLayes()}
      </div>
    );
  }
}

Pizza.propTypes = {
  selected: propTypes.arrayOf(
    propTypes.oneOfType([
      propTypes.objectOf(
        propTypes.oneOfType([
          propTypes.string,
          propTypes.string,
          propTypes.number,
          propTypes.number
        ])
      )
    ]).isRequired
  ),
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
  )
};
export default Pizza;
