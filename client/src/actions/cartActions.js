import axios from 'axios';

export const getCart = () =>{
  return dispatch => {
    axios.get('/api/cart')
    .then(response => dispatch({type:'GET_CART',payload:response.data}))
    .catch(err => dispatch({type:'GET_CART_REJECTED',payload:err}))
  }
}

export const addToCart = (item) =>{
  return dispatch => {
    axios.post('/api/cart',item)
    .then(response => dispatch({type:'ADD_TO_CART',payload:response.data}))
    .catch(err => dispatch({type:'ADD_TO_CART_REJECTED',payload:err}))
  }
}

export const updateCart = (_id, quantity, items) =>{
    const cartCopyForUpdate = items;
    const indexToUpdate = cartCopyForUpdate.findIndex((item) => item._id === _id)

    const itemToUpdate = {
      ...cartCopyForUpdate[indexToUpdate],
      quantity : cartCopyForUpdate[indexToUpdate].quantity + quantity
    }

    let updatedCart = [...cartCopyForUpdate.slice(0,indexToUpdate), itemToUpdate,
    ...cartCopyForUpdate.slice(indexToUpdate + 1)];

    return dispatch => {
      axios.post('/api/cart',updatedCart)
      .then(response => dispatch({type:'UPDATE_CART',payload:response.data}))
      .catch(err => dispatch({type:'UPDATE_CART_REJECTED',payload:err}))
    }
}

export const deleteCartItem = (cart) =>{
  return dispatch => {
    axios.post('/api/cart',cart)
    .then(response => dispatch({type:'DELETE_CART_ITEM',payload:response.data}))
    .catch(err => dispatch({type:'DELETE_CART_ITEM_REJECTED',payload:err}))
  }
}
