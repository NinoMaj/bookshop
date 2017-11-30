"use strict"
import axios from 'axios';

export function getCart() {
  return function (dispatch) {
    axios.get('/api/cart')
      .then((response) => {
        dispatch({ type: 'GET_CART', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'GET_REJECTED', msg: 'Error when getting the cart.' });
      });
  }
}

export function addToCart(cart) {
  return function (dispatch) {
    axios.post('/api/cart', cart)
      .then((response) => {
        dispatch({ type: 'ADD_TO_CART', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'ADD_TO_CART_REJECTED', msg: 'Error when adding to the cart.' });
      });
  }
}

export function deleteCartItem(cart) {
  return function (dispatch) {
    axios.post('/api/cart', cart)
      .then((response) => {
        dispatch({ type: 'DELETE_CART_ITEM', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'DELETE_CART_ITEM_REJECTED', msg: 'Error when deleting an item from the cart.' });
      });
  }
}

export function updateCart(_id, unit, cart) {
  const currentCartToUpdate = cart;

  const indexToUpdate = currentCartToUpdate.findIndex(cart => cart._id === _id);

  const newCartToUpdate = {
    ...currentCartToUpdate[indexToUpdate],
    quantity: currentCartToUpdate[indexToUpdate].quantity + unit
  }

  const newCart = [
    ...currentCartToUpdate.slice(0, indexToUpdate),
    newCartToUpdate,
    ...currentCartToUpdate.slice(indexToUpdate + 1)
  ];

  return function (dispatch) {
    axios.post('/api/cart', newCart)
      .then((response) => {
        dispatch({ type: 'UPDATE_CART', payload: response.data });
      })
      .catch((err) => {
        dispatch({ type: 'UPDATE_CART_REJECTED', msg: 'Error when updating cart.' });
      });
  }
}
