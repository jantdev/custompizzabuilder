import Calculate from "./components/calculater/calculate";
import FinalPizza from "./components/finalpizza/finalpizza";
import Ingredient from "./components/ingredient/ingredient";
import IntroMessage from "./components/intro/intromessage";
import Pizza from "./components/pizza/pizza";
import pizzaData from "./pizzadata.json";
import React, { Component } from "react";
import Rating from "./components/rating/rating";
import { Container, Row, Col, Image } from "react-bootstrap";
import "./components/app/app.scss";

class App extends Component {
  state = {
    selectedIngredients: [],
    showIntroMessage: false,
    showRating: false,
    showFinalPizza: { visibility: "hidden", animationPlayState: "paused" },
    showCalculator: { visibility: "visible" },
    showPizza: { visibility: "visible" }
  };

  handleIngredients = ingredients => {
    this.setState({ selectedIngredients: ingredients });
  };
  handleIntroMessage = modalShow => {
    this.setState({ showIntroMessage: modalShow });
  };
  handleTryAgain = () => {
    this.setState({ showRating: false, selectedIngredients: [] });
    this.refs.reset.handleIngredientsReset();
  };
  handleShowRating = () => {
    this.setState({ showRating: true });
  };
  handleShowFinalPizza = () => {
    this.setState({
      showFinalPizza: { visibility: "visible", animationPlayState: "running" },
      showCalculator: { visibility: "hidden" },
      showPizza: { visibility: "hidden" },
      showRating: false
    });
  };

  componentDidMount = () => {
    setTimeout(() => {
      this.setState({ showIntroMessage: true });
    }, 3000);
  };

  render() {
    return (
      <div>
        <FinalPizza
          pizzaData={pizzaData}
          selected={this.state.selectedIngredients}
          showFinalPizza={this.state.showFinalPizza}
        />
        <Rating
          pizzaData={pizzaData}
          selected={this.state.selectedIngredients}
          handleTryAgain={this.handleTryAgain}
          handleShowRating={this.state.showRating}
          handleFinalPizza={this.handleShowFinalPizza}
        />
        <Calculate
          pizzaData={pizzaData}
          handleShowRating={this.handleShowRating}
          selected={this.state.selectedIngredients}
          showCalculator={this.state.showCalculator}
        />

        <Container>
          <Row>
            <Col className="mb-2">
              <Image src={require("./images/canopy.png")} fluid />
            </Col>
          </Row>
          <Row>
            <Col sm={7}>
              <Row>
                <Col>
                  <Pizza
                    pizzaData={pizzaData}
                    selected={this.state.selectedIngredients}
                    showPizza={this.state.showPizza}
                  />
                </Col>
              </Row>
            </Col>
            <Col sm={5}>
              <div className="menu">
                <h3>Toppings:</h3>

                <Ingredient
                  pizzaData={pizzaData}
                  handleIngredients={this.handleIngredients}
                  ref="reset"
                />
              </div>
            </Col>
          </Row>
        </Container>
        <IntroMessage
          showIntroMessage={this.state.showIntroMessage}
          handlemessage={this.handleIntroMessage}
        />
      </div>
    );
  }
}

export default App;
