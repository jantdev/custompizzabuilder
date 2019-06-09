import React, { Component } from "react";
import { Image } from "react-bootstrap";
import "./finalpizza.scss";

class Finalpizza extends Component {
  state = {
    ingredients: this.props.pizzaData.ingredients
  };
  finalPizza = () => {
    // add base automatic
    const pizzaLayersData = [this.state.ingredients[0], ...this.props.selected];

    return pizzaLayersData.map(item => {
      return (
        <div key={item.title}>
          <Image
            className="layer"
            style={this.props.showFinalPizza}
            src={require("../../images/" + item.title + ".png")}
          />
        </div>
      );
    });
  };
  render() {
    return (
      <div className="pizzafinal" style={this.props.showFinalPizza}>
        <div className="pizzaholder">
          <div className="pizzalayer">{this.finalPizza()}</div>
          <div>hello</div>
        </div>
      </div>
    );
  }
}

export default Finalpizza;
