import React from 'react';
import {Image, Row, Col, Well, Button} from 'react-bootstrap';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {addToCart,updateCart} from '../../actions/cartActions'

class BookItem extends React.Component{

  constructor(){
    super();
    this.state = {
      isClicked: false
    }
  }

  onReadMore(){
    this.setState({isClicked:true});
  }

  handleCart(){
    const newItem = [...this.props.cart,{
      _id:this.props._id,
      title: this.props.title,
      image: this.props.image,
      description: this.props.description,
      price: this.props.price,
      quantity:1}];

    if(!this.props.cart.length){
      this.props.addToCart(newItem);
    }
    else{

      let _id = this.props._id;

      let cartIndex = this.props.cart.findIndex(item => item._id === _id);

      if(cartIndex ===-1){
        this.props.addToCart(newItem);
      }
      else{
        this.props.updateCart(_id,1,this.props.cart);
      }
    }
  }

  render(){
    return(
      <Well>
        <Row>
          <Col xs={12}  sm={4}>
            <Image src={this.props.image} responsive/>
          </Col>
          <Col xs={6} sm={8}>
            <h6>{this.props.title}</h6>
            <p>{(this.props.description.length > 50 && !this.state.isClicked)?(this.props.description.substring(0,50) + '...'):(this.props.description)}
              <Button bsStyle="link" onClick={this.onReadMore.bind(this)}>
                {(!this.state.isClicked && this.props.description.length > 50)?('...read more'):('')}
              </Button>
            </p>
            <h6>${this.props.price}</h6>
            <Button bsStyle='primary' onClick={this.handleCart.bind(this)}>Buy now</Button>
          </Col>
        </Row>
      </Well>)
    }
  }

  const mapStateToProps = state =>{
    return{
      cart: state.cart.items
    }
  }

  const mapDispatchToProps = dispatch =>{
    return bindActionCreators({
      addToCart:addToCart,
      updateCart:updateCart
    },dispatch)
  }
  export default connect(mapStateToProps,mapDispatchToProps)(BookItem);
