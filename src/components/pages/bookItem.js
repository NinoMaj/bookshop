"use strict"
import React from 'react';
import { Row, Col, Well, Button, Image } from 'react-bootstrap';
import { connect } from 'react-redux';
import { addToCart, updateCart } from '../../actions/cartActions';

class BookItem extends React.Component {
  constructor() {
    super();

    this.state = {
      isClicked: false
    };
  }

  onReadMore() {
    this.setState({ isClicked: true });
  }

  handleCart() {
    const book = [...this.props.cart, {
      _id: this.props._id,
      title: this.props.title,
      description: this.props.description,
      images: this.props.images,
      price: this.props.price,
      quantity: 1
    }]
    // Check if cart is empty
    if (this.props.cart.length > 0) {
      // Cart is not empty
      const _id = this.props._id;
      const cartIndex = this.props.cart.findIndex((cart) => cart._id === _id);
      // If cartIndex == -1 there are no items with same ID
      if (cartIndex === -1) {
        this.props.addToCart(book);
      } else {
        // Update qty.
        this.props.updateCart(_id, 1, this.props.cart)

      }

    } else {
      // Cart is emtpy
      this.props.addToCart(book);
    }
    
  }

  render() {
    const { title, description, price } = this.props;
    return (
      <Well>
        <Row>
          <Col xs={12} sm={4}>
            <Image src={this.props.images} responsive />
          </Col>
          <Col xs={6} sm={8}>
            <h6>{title}</h6>
            <p>
              { description.length > 50 && this.state.isClicked === false ?
              description.substring(0, 50) : description }
              <button className="link" onClick={this.onReadMore.bind(this)}>
                { this.state.isClicked === false && description !== null &&
                description.length > 50 ? '...read more' : '' }
              </button>
            </p>
            <h6>usd. {price}</h6>
            <Button
              onClick={ this.handleCart.bind(this) }
              bsStyle="primary"
              >Buy Now
            </Button>
          </Col>
        </Row>
      </Well>
    );
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart
  }
}


export default connect(mapStateToProps, { addToCart, updateCart })(BookItem);
