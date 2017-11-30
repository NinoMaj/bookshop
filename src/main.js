"use strict"
import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import Menu from './components/menu';
import Footer from './components/footer';
import { getCart } from '../src/actions/cartActions';

class Main extends React.Component {
  componentDidMount() {
    this.props.getCart();
  }
  render() {
    return (
      <div>
        <Menu cartItemsNumber={this.props.totalQty} />
          {this.props.children}
        <Footer />
      </div>
    );
  }
}

function mapStateToProps({ cart }) {
  return {
    totalQty: cart.totalQty
  };
}

export default withRouter(connect(mapStateToProps, { getCart })(Main));
