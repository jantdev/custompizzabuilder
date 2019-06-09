import React, { Component } from "react";
import propTypes from "prop-types";
import { Card, Container, Row, Col, Button, Modal } from "react-bootstrap";
import "./rating.scss";

class Rating extends Component {
  state = {
    ingredients: this.props.pizzaData.ingredients,
    messageData: this.props.pizzaData.rating,
    ratingData: null,
    smileyRating: [
      "M 40 140 S 100 80 160 140",
      "M 40 130 S 100 130 160 130",
      "M 40 120 S 100 200 160 120"
    ]
  };
  handleTryAgain = () => {
    this.props.handleTryAgain();
  };

  handleServe = () => {
    this.props.handleFinalPizza();
  };

  CalTotalIngredientPoints = () => {
    let totalpoints = 0;
    for (let item of this.state.ingredients) {
      totalpoints += item.points;
    }
    return totalpoints;
  };
  CalSelectedPoints = () => {
    let points = 0;
    for (let item of this.props.selected) {
      points += item.points;
    }
    return points;
  };

  CalPoints = () => {
    const points = Math.round(
      (this.CalSelectedPoints() / this.CalTotalIngredientPoints()) * 100
    );
    if (points >= 0 && points <= 33) {
      return 0;
    } else if (points >= 34 && points <= 66) {
      return 1;
    } else if (points >= 67 && points <= 100) {
      return 2;
    }
  };

  CalSmileys = () => {
    let results = this.CalPoints();
    return this.state.smileyRating[results];
  };

  CalMessage = () => {
    let results = this.CalPoints();

    return this.state.messageData[results].message;
  };

  componentWillMount = () => {
    this.setState({
      ratingData: this.props.rating
    });
  };

  render() {
    return (
      <div>
        <Modal
          show={this.props.handleShowRating}
          size="md"
          centered
          className="fade text-center"
        >
          <Modal.Body>
            <div className="rating">
              <Card>
                <Card.Body>
                  <Container>
                    <Row>
                      <Col sm={5}>
                        <svg className="smiley">
                          <defs>
                            <radialGradient id="f" fx="25%" fy="25%" r="60%">
                              <stop offset="0" stopColor="#fff" />
                              <stop offset="0.6" stopColor="#ff0" />
                              <stop offset="1" stopColor="#f80" />
                            </radialGradient>
                          </defs>
                          <circle
                            fill="url(#f)"
                            stroke="#000"
                            strokeWidth="2"
                            cx="100"
                            cy="100"
                            r="90"
                          />
                          <ellipse cx="70" cy="70" rx="10" ry="20" />
                          <ellipse cx="130" cy="70" rx="10" ry="20" />
                          <path
                            fill="none"
                            stroke="#000"
                            strokeWidth="5"
                            d={this.CalSmileys()}
                          />
                        </svg>
                      </Col>
                      <Col sm={7} className="pt-2">
                        <div className="score">
                          <p>
                            Points: {this.CalSelectedPoints()} of{" "}
                            {this.CalTotalIngredientPoints()}
                          </p>
                        </div>
                        <p>{this.CalMessage()}</p>

                        <Button
                          variant="secondary"
                          className="mr-2"
                          onClick={this.handleTryAgain}
                        >
                          Try again
                        </Button>

                        <Button variant="secondary" onClick={this.handleServe}>
                          Serve my Pizza
                        </Button>
                      </Col>
                    </Row>
                  </Container>
                </Card.Body>
              </Card>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}
Rating.propTypes = {
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
export default Rating;
