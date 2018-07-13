import React from 'react';
import {connect} from 'react-redux';
import {Panel,Row, Col, Well, Button, ButtonGroup, Label, Modal} from 'react-bootstrap';
import {bindActionCreators} from 'redux';
import {deleteCartItem, updateCart, getCart} from '../../actions/cartActions'

class Cart extends React.Component{

  componentDidMount(){
    this.props.getCart();
  }

  onDelete(_id){

    const cartCopyForDelete = this.props.cart;
    const indexToDelete = cartCopyForDelete.findIndex((cart) => cart._id === _id)

    let cartAfterDelete = [...cartCopyForDelete.slice(0,indexToDelete),
      ...cartCopyForDelete.slice(indexToDelete + 1)];

      this.props.deleteCartItem(cartAfterDelete);
    }

    onIncrement(_id){
      this.props.updateCart(_id,1,this.props.cart);
    }

    onDecrement(_id, quantity){
      if(quantity > 1 ){
        this.props.updateCart(_id,-1,this.props.cart);
      }
    }

    constructor(){
      super();
      this.state = {
        show: false
      }
    }

    open(){
      this.setState({show:true})
    }

    close(){
      this.setState({show:false})
    }

    render(){
      if(!this.props.cart[0]){
        return this.renderEmpty();
      }
      else{
        return this.renderCart();
      }
    }
    renderEmpty(){
      return <div></div>
    }
    renderCart(){
      const cartItemsList = this.props.cart.map(item =>{
        return(
          <Panel key={item._id}>
            <Panel.Body>
              <Row>
                <Col xs = {12} sm ={4}>
                  <h6>{item.title}</h6>
                </Col>
                <Col xs = {12} sm ={2}>
                  <h6>${item.price}</h6>
                </Col>
                <Col xs = {12} sm ={2}>
                  <h6>quantity: <Label bsStyle ='success'>{item.quantity}</Label></h6>
                </Col>
                <Col xs = {6} sm ={4}>
                  <ButtonGroup style ={{minWidth:'300px'}}>
                    <Button onClick={this.onDecrement.bind(this,item._id, item.quantity)} bsStyle='default' bsSize='small'>-</Button>
                    <Button onClick={this.onIncrement.bind(this,item._id)} bsStyle='default' bsSize='small'>+</Button>
                    <span>     </span>
                    <Button onClick={this.onDelete.bind(this,item._id)} bsStyle = 'danger' bsSize ='small'>Delete</Button>
                  </ButtonGroup>
                </Col>
              </Row>
            </Panel.Body>
          </Panel>
        )
      },this)
      return(
        <Well>
          <Row>
            <Col xs ={18} md={12}>
              <Panel header='cart' bsStyle='primary'>
                <Panel.Heading>
                  <Panel.Title componentClass="h3">Cart</Panel.Title>
                </Panel.Heading>
                <Panel.Body>
                  {cartItemsList}
                  <Row>
                    <Col xs={12}>
                      <h6>Total amount: {this.props.totalAmount}</h6>
                      <Button onClick={this.open.bind(this)} bsStyle='success'>
                        Proceed to checkout
                      </Button>
                    </Col>
                  </Row>
                  <Modal show={this.state.show} onHide={this.close.bind(this)}>
                    <Modal.Header closeButton>
                      <Modal.Title>Thank you!</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <h5> Your order has been saved </h5>
                      <p>You will receive an email confirmation</p>
                    </Modal.Body>
                    <Modal.Footer>
                      <Col>
                        <h6>Total : ${this.props.totalAmount}</h6>
                      </Col>
                      <Button onClick={this.close.bind(this)}>Close</Button>
                    </Modal.Footer>
                  </Modal>
                </Panel.Body>
              </Panel>
            </Col>
          </Row>
        </Well>
      )
    }
  }

  const mapStateToProps = state =>{
    return{
      cart: state.cart.items,
      totalAmount: state.cart.totalAmount
    }
  }

  const mapDispatchToProps = dispatch =>{
    return bindActionCreators({
      deleteCartItem: deleteCartItem,
      updateCart: updateCart,
      getCart: getCart
    },dispatch)
  }
  export default connect (mapStateToProps,mapDispatchToProps)(Cart);
