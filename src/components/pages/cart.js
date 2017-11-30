"use strict"
import React from 'react';
import { connect } from 'react-redux';
import {
  Panel,
  Col,
  Row,
  Well, 
  Button,
  ButtonGroup,
  Label,
  Modal
} from 'react-bootstrap';
import { deleteCartItem, updateCart, getCart } from '../../actions/cartActions';

class Cart extends React.Component {
  constructor() {
    super();

    this.state = {
      shodModal: false
    }
  }

  componentDidMount() {
    this.props.getCart();
  }

  open() {
    this.setState({ showModal: true });
  }

  close() {
    this.setState({ showModal: false });
  }

  onDelete(_id) {
    const currentCartToDelete = this.props.cart;
    const indexToDelete =
      currentCartToDelete.findIndex(
        function (cart) {
          return cart._id === _id;
        }
      )
    const cartAfterDelete = [
      ...currentCartToDelete.slice(0, indexToDelete),
      ...currentCartToDelete.slice(indexToDelete + 1)
    ];

    this.props.deleteCartItem(cartAfterDelete);
  }

  renderEmpty() {
    return(<div></div>);
  }

  renderCart() {
    const cartItemsList = this.props.cart.map((cartArr) => {
      return (
        <Panel key={cartArr._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{cartArr.title}</h6><span>    </span>
            </Col>
            <Col xs={12} sm={2}>
              <h6>{cartArr.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>qty. <Label bsStyle="success">{cartArr.quantity}</Label></h6>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonGroup style={{ minWidth: '300px' }}>
                <Button onClick={this.onDecrement.bind(this, cartArr._id, cartArr.quantity)} bsStyle="default" bsSize="small">-</Button>
                <Button onClick={this.onIncrement.bind(this, cartArr._id)} bsStyle="default" bsSize="small">+</Button>
                <span>    </span>
                <Button
                  bsStyle="danger"
                  bsSize="small"
                  onClick={this.onDelete.bind(this, cartArr._id)}
                  >DELETE
                </Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      );
    }, this);
    return (
      <Panel header="Cart" bsStyle="primary">
        {cartItemsList}
        <Row>
          <Col xs={12}>
            <h6>Total amount: {this.props.totalAmount}</h6>
            <Button onClick={this.open.bind(this)} bsStyle="success" bsSize="small">
              PROCEED TO CHECKOUT
            </Button>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.close.bind(this)}>
          <Modal.Header closeButton>
            <Modal.Title>Thank you!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Your order has been saved</h6>
            <p>You will recieve an email confirmation</p>
          </Modal.Body>
          <Modal.Footer>
            <Col xs={6}>
              <h6>total $: {this.props.totalAmount}</h6>
            </Col>
            <Button onClick={this.close.bind(this)}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    )
  }

  onIncrement(_id) {
    this.props.updateCart(_id, 1, this.props.cart);
  }

  onDecrement(_id, quantity) {
    if (quantity > 1) {
      this.props.updateCart(_id, -1, this.props.cart);
    }
  }

  render() {
    if (this.props.cart[0]) {
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount
  }
}

export default connect(mapStateToProps, { deleteCartItem, updateCart, getCart })(Cart);
