import React, { Component } from "react";
import { Image, Button } from "react-bootstrap";
import "./finalpizza.scss";
import "./banner.scss";

class Finalpizza extends Component {
  state = {
    ingredients: this.props.pizzaData.ingredients
  };

  tryAgain = () => {
    document.location.reload();
  };
  finalPizza = () => {
    // add base automatic
    const pizzaLayersData = [this.state.ingredients[0], ...this.props.selected];

    return pizzaLayersData.map(item => {
      return (
        <div key={item.title}>
          <div>
            <Image
              className="layer"
              style={this.props.showFinalPizza}
              src={require("../../images/" + item.title + ".png")}
            />
          </div>
        </div>
      );
    });
  };
  render() {
    return (
      <div>
        <div className="pizzafinal" style={this.props.showFinalPizza}>
          <div className="bannerholder" style={this.props.showFinalPizza}>
            <div className="banner">Bon Appétit</div>
            <Button
              variant="secondary"
              className="bannerbutton"
              onClick={this.tryAgain}
            >
              Try again?
            </Button>
          </div>
          <div className="pizzaholder">
            <div className="pizzalayer">{this.finalPizza()}</div>
          </div>
        </div>
      </div>
    );
  }
}

export default Finalpizza;
