import React from 'react';
import Menu from './components/pages/menu';
import Footer from './components/pages/footer';
import {bindActionCreators} from 'redux';
import {getCart} from '../src/actions/cartActions'
import {connect} from 'react-redux';

class Main extends React.Component{
  componentDidMount(){
    this.props.getCart();
  }

  render(){
    return(
      <div>
        <Menu cartItemsNumber={this.props.totalQty}/>
          {this.props.children}
        <Footer/>
      </div>)

  }
}

const mapStateToProps = state => {
  return {totalQty: state.cart.totalQty}
}

const mapDispatchToProps = dispatch =>{
  return bindActionCreators({
    getCart: getCart
  },dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(Main);
