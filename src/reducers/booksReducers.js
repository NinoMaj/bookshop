"use strict"
//BOOKS REDUCERS

export function booksReducers
  (state = { books: [] }, action) {
  switch (action.type) {
    case "GET_BOOKS":
      return { ...state, books: [...action.payload] };
    case "POST_BOOK":
      return {
        ...state,
        books: [...state.books, ...action.payload],
        msg: 'Saved! Click to continue.',
        style: 'success',
        validation: 'success'
      }
      break;
    case "POST_BOOK_REJECTED":
      return {
        ...state,
        msg: 'Please, try again.',
        style: 'danger',
        validation: 'error'
      };
      break;
    case "RESET_BUTTON":
      return { ...state, msg: '', style: 'primary', validation: null };
      break;
    case "DELETE_BOOK":
      // Create a copy of the current array of books
      const currentBooksBeforeDeleting = [...state.books]
      console.log(action.payload, typeof action.payload);
      // Determine at which index in books 
      // array is the book to be deleted
      const indexToDelete = 
        currentBooksBeforeDeleting.findIndex(
          function (book) {
            return book._id.toString() === action.payload;
          }
        )
      //use slice to remove the book at the specified index
      return {
        books:
          [...currentBooksBeforeDeleting.slice(0, indexToDelete),
            ...currentBooksBeforeDeleting.slice(indexToDelete + 1)]
      }
      break;
    case "UPDATE_BOOK":
      // Create a copy of the current array of 
      // books
      const currentBookToUpdate = [...state.books]
      // Determine at which index in books array 
      // is the book to be deleted
      const indexToUpdate =
        currentBookToUpdate.findIndex(
          function (book) {
            return book.id === action.payload._id;
          }
        )
      // Create a new book object with the new 
      // values and with the same array index of the item
      // we want to replace.To achieve this we will use 
      // ...spread but we could use concat method as well
      const newBookToUpdate = {
        ...currentBookToUpdate[indexToUpdate],
        title: action.payload.title
      }
      // This Log has the purpose to show you how 
      // newBookToUpdate looks like
      console.log("what is it newBookToUpdate", newBookToUpdate);
      //use slice to remove the book at the 
      // specified index, replace with the new object and
      // concatenate witht he rest of items in the array
      return {
        books:
          [...currentBookToUpdate.slice(0, indexToUpdate),
            newBookToUpdate,
          ...currentBookToUpdate.slice(indexToUpdate +
            1)]
      }
      break;
  }
  return state
}
