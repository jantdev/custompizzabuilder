import React, { Component, Fragment } from "react";
import propTypes from "prop-types";
import { Row, Col, Button } from "react-bootstrap";
import "./calculator.scss";

class Calculate extends Component {
  state = {
    ingredients: this.props.pizzaData.ingredients,
    ingredientHeight: 24
  };
  listIngredients = () => {
    //add base automatic
    const ingredients = [this.state.ingredients[0], ...this.props.selected];
    return ingredients.map(item => {
      return (
        <Row key={item.title}>
          <Col>{item.title}</Col>
          <Col className="ingredientprice">${item.price}</Col>
        </Row>
      );
    });
  };

  listTotalPrice = () => {
    //add base price automatic
    let price = this.state.ingredients[0].price;
    for (let ing of this.props.selected) {
      price += ing.price;
    }
    return (
      <Row>
        <Col className="total">total</Col>
        <Col className="totalprice">${String(price).substr(0, 4)}</Col>
      </Row>
    );
  };
  receiptLength = () => {
    let length = this.props.selected.length * this.state.ingredientHeight - 280;
    let style = {
      backgroundPosition: "0px " + length + "px"
    };

    return style;
  };
  handleRating = e => {
    this.props.handleShowRating();
  };
  render() {
    return (
      <div className="steeldesk" style={this.props.showCalculator}>
        <div className="calculator">
          <div className="receipt" style={this.receiptLength()}>
            <div className="content">
              <Row>
                <Col className="rheader">receipt</Col>
              </Row>
              <Fragment>{this.listIngredients()}</Fragment>
              <Fragment>{this.listTotalPrice()}</Fragment>
              <Row>
                <Col className="niceday">have a nice day</Col>
              </Row>
            </div>
          </div>
          <Button
            className="btn btn-rating"
            variant="secondary"
            onClick={this.handleRating}
          >
            Rating
          </Button>
        </div>
      </div>
    );
  }
}
Calculate.propTypes = {
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
export default Calculate;
