"use strict"
import axios from 'axios';

export function getBooks(book) {
  return function (dispatch) {
    axios.get('/api/books', book)
      .then(function (response) {
        dispatch({ type: "GET_BOOKS", payload: response.data });
      })
      .catch(function (err) {
        dispatch({ type: "GET_BOOKS_REJECTED", payload: err });
      })
  }
}

export function postBooks(book) {
  return function(dispatch) {
    axios.post('/api/books', book)
      .then(function (response) {
        dispatch({ type: "POST_BOOK", payload: response.data });
      })
      .catch(function(err) {
        dispatch({ type: "POST_BOOK_REJECTED", payload: 'There was an error when posting book.' });
      })
  }
}

export function deleteBooks(id) {
  return function (dispatch) {
    axios.delete(`/api/books/${id}`)
      .then(function (response) {
        dispatch({ type: "DELETE_BOOK", payload: id });
      })
      .catch(function (err) {
        dispatch({ type: "GET_BOOKS_REJECTED", payload: err });
      })
  }
}

export function updateBooks(book) {
  return {
    type: "UPDATE_BOOK",
    payload: book
  }
}

export function resetButton() {
  return {
    type: "RESET_BUTTON",
  }
}