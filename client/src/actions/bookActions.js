import axios from 'axios';

export const getBooks = () =>{
  return dispatch => {
    axios.get('/api/books')
      .then(response => dispatch({type:'GET_BOOKS',payload:response.data}))
      .catch(err => dispatch({type:'GET_BOOKS_REJECTED',payload:err}))
  }
}

export const postBook = (book) =>{
  return dispatch => {
    axios.post('/api/books',book)
      .then(response => dispatch({type:'POST_BOOK',payload:response.data}))
      .catch(err => dispatch({type:'POST_BOOK_REJECTED',payload:err}))
  }
}

export const deleteBook = (_id) =>{
  return dispatch => {
    axios.delete('/api/books/' + _id)
      .then(response => dispatch({type:'DELETE_BOOK',payload:_id}))
      .catch(err => dispatch({type:'DELETE_BOOK_REJECTED',payload:err}))
  }
}

export const updateBook = (book) =>{
  return {
    type:'UPDATE_BOOK',
    payload:book
  }
}

export const resetButton = () =>{
  return {
    type:'RESET_BUTTON'
  }
}
