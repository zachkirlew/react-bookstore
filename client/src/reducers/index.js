import {combineReducers} from 'redux';
import {bookReducer} from './bookReducer'
import {cartReducer} from './cartReducer'
import {contactReducer} from './contactReducer'

export default combineReducers({
  books: bookReducer,
  cart: cartReducer,
  contact: contactReducer,
})
