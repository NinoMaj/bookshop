"use strict"

export function cartReducers(state = { cart: [] }, action) {
  switch (action.type) {
    case "GET_CART":
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).totalQty
      };
    case "ADD_TO_CART":
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).totalQty
      };
    case "UPDATE_CART":
      
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).totalQty
      };
    case "DELETE_CART_ITEM":
      return {
        ...state,
        cart: action.payload,
        totalAmount: totals(action.payload).amount,
        totalQty: totals(action.payload).totalQty
      };
    default:
      return state;
  }
}

// Calculate totals
export function totals(payloadArr) {

  const totalAmount = payloadArr.map((cartArr) => {
    return cartArr.price * cartArr.quantity;
  }).reduce((acc, val) => acc + val, 0);

  const totalQty = payloadArr
    .map(item => item.quantity)
    .reduce((acc, val) => acc + val, 0);

  return {
    amount: totalAmount.toFixed(2),
    totalQty
  };
}
