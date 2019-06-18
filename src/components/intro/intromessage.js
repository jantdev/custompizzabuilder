import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
import "./intromessage.scss";
import Logo from "../../images/logo.gif";

class Intromessage extends Component {
  handleClose = () => {
    this.props.handlemessage(false);
  };

  render() {
    return (
      <Modal
        className="fade text-center"
        show={this.props.showIntroMessage}
        size="md"
        centered
      >
        <Modal.Body>
          <img src={Logo} className="modal-img" alt="logo" />
          <h4 aria-labelledby="Welcom to Custom Pizza Builder">
            Welcome to Custom Pizza Builder
          </h4>
          <p>
            Here you can choose your own toppings, from a variant of
            ingredients. After you are finnish designing your Pizza, click on
            Rating, to bake your Pizza and get your rating.
          </p>
          <p className="warning">this is only a desktop demo</p>
          <Button variant="secondary" onClick={this.handleClose}>
            Got it
          </Button>
        </Modal.Body>
      </Modal>
    );
  }
}

export default Intromessage;
