import React, { Component } from 'react';
import {applyMiddleware, createStore} from 'redux';
import thunk from 'redux-thunk';
import combineReducers from './reducers/index';
import logger from 'redux-logger';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import BookList from './components/pages/booksList';
import Cart from './components/pages/cart';
import BookForm from './components/pages/bookForm';
import About from './components/pages/about';
import Contact from './components/pages/contact';
import Main from './main';

const middleware = applyMiddleware(thunk, logger);
const store = createStore(combineReducers, middleware);


class App extends Component {

  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <Router history={browserHistory}>
            <Route path='/' component={Main}>
            <IndexRoute component={BookList}/>
            <Route path='/about' component={About}/>
            <Route path='/contact' component={Contact}/>
            <Route path='/admin' component={BookForm}/>
            <Route path='/cart' component={Cart}/>
          </Route>
        </Router>
      </Provider>
    </div>
  );
}
}

export default App;
